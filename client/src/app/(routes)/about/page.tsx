"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteMetaData } from "@/data/siteMetaData";
import { IoIosChatbubbles } from "react-icons/io";
import { ChatBubbleIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IoMdMail } from "react-icons/io";
import { IoMdChatboxes } from "react-icons/io";
import { BsFillCursorFill } from "react-icons/bs";
import { PiCursorClickFill } from "react-icons/pi";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 text-sm sm:text-base ">
      <div className="mb-4 border-transparent">
        <CardHeader>
          <CardTitle className=" text-base ">About QuickLink</CardTitle>
        </CardHeader>
        <CardContent>
          <p className=" mb-4">
            QuickLink is a powerful and easy-to-use URL shortening service
            designed to make sharing long URLs quick and effortless. With
            customizable backhalves, API access, and tracking features, you can
            manage and monitor your links efficiently.
          </p>
          <p className="">
            Whether {"you're"} a developer looking for a seamless way to
            integrate URL shortening into your application or a user wanting to
            share cleaner, shorter URLs, QuickLink has got you covered.
          </p>
        </CardContent>
      </div>
      <hr className=" dark:border-foreground/20" />
      <div className="mb-4">
        <CardHeader>
          <CardTitle className="text-base ">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Have any questions, feedback, or issues? {"We're"} here to help!
          </p>

          <div className="mt-6 flex space-x-4">
            <Button asChild variant="outline" className=" flex gap-x-3 ">
              <a
                href={siteMetaData.contact + "quicklink_about"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoMdChatboxes className="h-5 w-5" />
                Contact Us
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
      <hr className=" dark:border-foreground/20" />
      <div className="mb-4">
        <CardHeader>
          <CardTitle className="text-base ">Socials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Reach me out here!</p>

          <div className="mt-6 flex space-x-4">
            <Button title="mail" asChild variant="outline" size="icon">
              <a
                href={siteMetaData.mail}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoMdMail className="h-5 w-5" />
              </a>
            </Button>
            <Button title="linkedin" asChild variant="outline" size="icon">
              <a
                href={siteMetaData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button title="portfolio" asChild variant="outline" size="icon">
              <a
                href={siteMetaData.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PiCursorClickFill className=" rotate-90 h-5 w-5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
