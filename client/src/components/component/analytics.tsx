import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import fetchData from "./fetchData";
import { useZustandStore } from "./zustand.store";

const Analytics = () => {
  const { setRef, Ref } = useZustandStore();
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
      fetchData("view:quicklink", Ref || isRefPresent || "search", "", "");
      fetchDataCalled.current = true;
      setRef(isRefPresent ? isRefPresent : "");
    }
  }, [Ref, isRefLoaded, isRefPresent, setRef]);
  return null;
};

export default Analytics;
