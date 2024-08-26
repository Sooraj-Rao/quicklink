"use client";

import Analytics from "@/components/component/analytics";
import Home from "@/components/component/home";
import { Suspense } from "react";
import Loading from "./loading";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Analytics />
        <Home />
      </Suspense>
    </>
  );
}
