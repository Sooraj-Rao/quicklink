"use client";
import { fetchData } from "@/components/component";
import Home from "@/components/component/home";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [isRefLoaded, setIsRefLoaded] = useState(false);
  const fetchDataCalled = useRef(false);
  const params = useSearchParams();
  const isRefPresent = params.get("ref");

  useEffect(() => {
    isRefPresent ? setIsRefLoaded(true) : setIsRefLoaded(false);
    !isRefPresent && setIsRefLoaded(true);
  }, [isRefPresent]);

  useEffect(() => {
    if (isRefLoaded && !fetchDataCalled.current) {
      fetchData("view", "view:quicklink", isRefPresent || "search");
      fetchDataCalled.current = true;
    }
  }, [isRefLoaded, isRefPresent]);
  return (
    <>
      <Home />
    </>
  );
}
