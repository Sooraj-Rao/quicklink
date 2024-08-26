"use client";

import Analytics from "@/components/component/analytics";
import Home from "@/components/component/home";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Analytics />
        <Home />
      </Suspense>
    </>
  );
}
