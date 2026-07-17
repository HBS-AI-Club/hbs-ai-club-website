import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "node:crypto";

// This handler must run per-request (never cached).
export const dynamic = "force-dynamic";

/**
 * On-demand revalidation endpoint.
 * Point a Notion integration webhook at POST /api/revalidate so that editing
 * content in Notion refreshes the live site within seconds instead of waiting
 * for the time-based ISR window.
 *
 * Optional envs:
 *   NOTION_WEBHOOK_SECRET  — the verification token Notion gives you; when set,
 *                            incoming webhook signatures are verified.
 *   REVALIDATE_SECRET      — protects the manual GET trigger below.
 */

function refresh() {
  // Revalidating the root layout invalidates every page that renders under it.
  revalidatePath("/", "layout");
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(raw);
  } catch {
    /* non-JSON body is fine */
  }

  // 1) Notion webhook verification handshake — echo + log the token so you can
  //    paste it into Notion's Webhooks tab to confirm ownership.
  if (typeof body.verification_token === "string") {
    console.log("[notion-webhook] verification_token:", body.verification_token);
    return NextResponse.json({ verification_token: body.verification_token });
  }

  // 2) Optional signature verification (recommended once you have the token).
  const secret = process.env.NOTION_WEBHOOK_SECRET;
  if (secret) {
    const provided = req.headers.get("x-notion-signature") ?? "";
    const expected =
      "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  refresh();
  return NextResponse.json({ revalidated: true, at: Date.now() });
}

// Manual "refresh now" trigger: GET /api/revalidate?secret=... (guarded by REVALIDATE_SECRET if set)
export async function GET(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret && req.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  refresh();
  return NextResponse.json({ revalidated: true, at: Date.now() });
}
