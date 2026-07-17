"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot-field for the hero background.
 * A grid of dots that illuminate + scale + get pushed away near the cursor,
 * behind a soft cursor-following crimson glow. Idle breathing keeps it alive.
 * pointer-events-none so it never blocks the hero CTAs.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const c = cv.getContext("2d");
    if (!c) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const SPACING = 30;
    const RADIUS = 150; // cursor influence radius
    const MAX_PUSH = 11;

    type Dot = { x: number; y: number };
    let dots: Dot[] = [];

    const target = { x: -9999, y: -9999 };
    const mouse = { x: -9999, y: -9999 };
    let active = false;
    let glow = 0; // eased 0..1

    function build() {
      const rect = cv!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv!.width = Math.floor(width * dpr);
      cv!.height = Math.floor(height * dpr);
      c!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offX = (width - (cols - 1) * SPACING) / 2;
      const offY = (height - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          dots.push({ x: offX + col * SPACING, y: offY + r * SPACING });
        }
      }
    }

    function drawStatic() {
      c!.clearRect(0, 0, width, height);
      for (const d of dots) {
        c!.beginPath();
        c!.arc(d.x, d.y, 1, 0, Math.PI * 2);
        c!.fillStyle = "rgba(230,225,215,0.13)";
        c!.fill();
      }
    }

    let raf = 0;
    let running = false;
    function frame(t: number) {
      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;
      glow += ((active ? 1 : 0) - glow) * 0.06;

      c!.clearRect(0, 0, width, height);

      if (glow > 0.01 && mouse.x > -9000) {
        c!.globalCompositeOperation = "lighter";
        const g = c!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
        g.addColorStop(0, `rgba(165,28,48,${0.16 * glow})`);
        g.addColorStop(1, "rgba(165,28,48,0)");
        c!.fillStyle = g;
        c!.fillRect(0, 0, width, height);
        c!.globalCompositeOperation = "source-over";
      }

      const breath = t * 0.0011;
      for (const d of dots) {
        const wob = Math.sin(breath + d.x * 0.012 + d.y * 0.012) * 1.2;
        let px = d.x;
        let py = d.y + wob;

        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);
        let inf = 0;
        if (dist < RADIUS) {
          inf = 1 - dist / RADIUS;
          inf = inf * inf;
          const nx = dist > 0.01 ? dx / dist : 0;
          const ny = dist > 0.01 ? dy / dist : 0;
          px += nx * inf * MAX_PUSH;
          py += ny * inf * MAX_PUSH;
        }

        const rad = 1 + inf * 2.1;
        const alpha = 0.13 + inf * 0.8;
        const rr = Math.round(230 + (196 - 230) * inf);
        const gg = Math.round(225 + (58 - 225) * inf);
        const bb = Math.round(215 + (78 - 215) * inf);

        c!.beginPath();
        c!.arc(px, py, rad, 0, Math.PI * 2);
        c!.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        c!.fill();
      }

      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e: MouseEvent) {
      const rect = cv!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        target.x = x;
        target.y = y;
        if (!active && mouse.x < -9000) {
          mouse.x = x;
          mouse.y = y;
        }
        active = true;
      } else {
        active = false;
      }
    }
    function onLeave() {
      active = false;
    }
    function onResize() {
      build();
      if (reduce) drawStatic();
    }

    build();
    if (reduce) {
      drawStatic();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    // Browsers natively pause requestAnimationFrame in backgrounded tabs, so no
    // manual visibility gating is needed — it stays battery-friendly on its own.
    start();

    return () => {
      stop();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
