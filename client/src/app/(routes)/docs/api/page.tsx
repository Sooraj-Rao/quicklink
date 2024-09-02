import Loading from "@/app/loading";
import ApiPage from "@/components/component/apidocs";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ApiPage />
    </Suspense>
  );
};

export default Page;
