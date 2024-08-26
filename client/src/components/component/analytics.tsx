import { fetchData } from "@/components/component";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Analytics = () => {
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
  return "";
};

export default Analytics;
