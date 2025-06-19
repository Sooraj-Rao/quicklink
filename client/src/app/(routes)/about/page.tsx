"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import fetchData from "@/components/component/fetchData";
import { useZustandStore } from "@/components/component/zustand.store";
import { siteMetaData } from "@/data/siteMetaData";

export default function AboutPage() {
  const { Ref } = useZustandStore();

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicklink-about", "none");
  };

  return (
    <div className="max-w-3xl mx-auto p-4  ">
      <Card className="mb-2 border-none shadow-none">
        <CardHeader>
          <CardTitle className=" text-base ">About QuickLink</CardTitle>
        </CardHeader>
        <CardContent className="  text-muted-foreground">
          <p className=" mb-2">
            QuickLink is a simple URL shortening service that turns long links
            into short, easy-to-share URLs. It offers custom backhalves, API
            access, and link tracking to make managing your links effortless.
          </p>
          <p className="">
            QuickLink helps you share clean, short links with ease whether
            you&apos;re a developer or just looking to simplify your URLs.
          </p>
        </CardContent>
      </Card>
      <hr className=" dark:border-foreground/20" />
      <Card className="mb-2 border-none shadow-none">
        <CardHeader>
          <CardTitle className=" text-base ">Features</CardTitle>
        </CardHeader>
        <CardContent className="  text-muted-foreground">
          <ul className="list-disc ml-5">
            <li>Customizable link backhalves</li>
            <li>API access for developers</li>
            <li>Link analytics and tracking</li>
            <li>Easy integration with existing applications</li>
            <li>Fast and simple to use</li>
          </ul>
        </CardContent>
      </Card>

      <hr className=" dark:border-foreground/20" />
      <div className=" m-3  flex gap-x-5  items-center">
        <span className="sm:text-sm text-xs">Get in touch</span>
        <a target="_blank" href={siteMetaData.contact}>
          <Button
            onClick={() => SendData("click_contact_about")}
            className="sm:text-sm text-xs"
            variant="secondary"
          >
            Contact
          </Button>
        </a>
      </div>
    </div>
  );
}
