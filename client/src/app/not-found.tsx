"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen lg:h-[calc(100vh-3rem)] overflow-hidden bg-gray-100">
      <div className=" flex items-center gap-8 mb-5">
        <h1 className=" text-lg sm:text-6xl font-extrabold text-red-600">
          404
        </h1>
        <p className="sm:text-6xl text-lg text-gray-700  font-extrabold">
          Page Not Found
        </p>
      </div>
      <Button
        className="mt-5 text-xs sm:text-sm"
        onClick={() => router.push("/")}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
