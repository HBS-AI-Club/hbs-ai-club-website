"use client";

import { useLayoutEffect } from "react";

function scrollToTopImmediately() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  // The site uses smooth scrolling globally. Override it briefly so restored
  // browser positions do not animate back to the top after the page appears.
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}

export function HomepageScrollRestoration() {
  useLayoutEffect(() => {
    if (window.location.hash) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    scrollToTopImmediately();

    // A page restored from Chrome's back-forward cache does not remount React,
    // so reset it again when the browser shows the cached homepage.
    const handlePageShow = () => {
      if (!window.location.hash) scrollToTopImmediately();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}
