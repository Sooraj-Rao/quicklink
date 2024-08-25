"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Check, Copy, Link, Loader, QrCode, Stars } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Validator } from "@/app/util/validate.hook";
import QRCodeView from "./qr";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { siteMetaData } from "@/data/siteMetaData";

export const Server = process.env.NEXT_PUBLIC_SERVER!;

const Home = ({ Portfolio }: { Portfolio: string }) => {
  const [Iscustom, setCustom] = useState(false);
  const [Copied, setCopied] = useState(false);
  const refer = useRef<HTMLInputElement>(null);
  const [ShortUrl, setShortUrl] = useState("");
  const [QrDisplay, setQrDisplay] = useState(false);
  const [loader, setloader] = useState(false);
  const [URL, setURL] = useState({
    long: "",
    custom: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setURL((prevURL) => {
      const updatedURL = { ...prevURL, [name]: value };
      if (!updatedURL.long) {
        setCustom(false);
      }
      return updatedURL;
    });
  };

  const user = process.env.NEXT_PUBLIC_OWNER;

  const ShortenLongUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item = localStorage.getItem(user || "");
    const isAdmin = user === item ? user : null;
    const { error } = Validator(URL, Iscustom, isAdmin);

    if (error) {
      return toast({
        variant: "destructive",
        description: error,
      });
    }
    const API_KEY = "CIOGAHELrrSECJhOlgfqfddxBdunPtPn";
    try {
      setloader(true);
      const res = await fetch(`${Server}/api`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...URL, key: isAdmin }),
      });
      const respose = await res.json();
      const { error, message, data } = respose;
      if (error)
        return toast({
          variant: "destructive",
          description: message,
        });
      const shortUrl = Server + "/" + data.shortUrl;
      setShortUrl(shortUrl);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to shorten URL",
      });
    } finally {
      setloader(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=" h-[calc(100vh-200px)] ">
      {QrDisplay && <QRCodeView setQrDisply={setQrDisplay} value={ShortUrl} />}
      <h1
        className={`scroll-m-20 text-center  mb-10 font-extrabold tracking-tight text-3xl px-2 sm:px-0 sm:text-4xl lg:text-6xl
        ${Iscustom ? "mt-14 duration-" : "duratison-75 mt-20"}
        `}
      >
        {URL?.long ? (
          <span
            className={` sm:text-4xl text-xl  font-bold tracking-normal 
          ${ShortUrl ? " hidden  duration-0" : " duration-75  block"}
         
          `}
          >
            Shorten unlimited URLs here for free!
          </span>
        ) : (
          <span>Quick Link : A Rapid URL Shortener</span>
        )}
      </h1>

      <div className=" flex justify-center duration-500   ">
        {!ShortUrl ? (
          <form onSubmit={ShortenLongUrl}>
            <div className="grid w-full  items-center gap-1.5 mt-10">
              <Label htmlFor="url">Enter a long URL</Label>
              <Input
                value={URL.long}
                onChange={handleChange}
                name="long"
                type="text"
                placeholder="Your long URL here.."
                className=" mt-2  sm:min-w-80 w-60 "
              />
              <div className=" flex my-2 gap-x-3 items-center">
                <Checkbox
                  checked={Iscustom && URL.long ? true : false}
                  onCheckedChange={() => {
                    if (!URL.long)
                      return toast({
                        variant: "destructive",
                        description: "Enter URL first!",
                      });
                    if (URL.custom) setURL({ ...URL, custom: "" });
                    setCustom(!Iscustom);
                  }}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Need Custom backhalf for URL
                </label>
              </div>
            </div>

            <div
              className={`  
            ${
              !Iscustom
                ? "-translate-y-5 invisible duration-75 "
                : " duration-300 translate-y-0 visible "
            }
            `}
            >
              <Input
                value={URL.custom}
                onChange={handleChange}
                name="custom"
                autoComplete="off"
                placeholder="Enter custom backhalf "
                className=" mt-2  sm:min-w-80 w-60 "
              />
              <h1
                className={`  text-xs text-red-500 ml-2 mt-2 transform
                ${
                  Iscustom && URL.custom.length < 9
                    ? " duration-300 translate-y-0 visible "
                    : "-translate-y-2 invisible duration-75 "
                }
              `}
              >
                min 8 charcaters
              </h1>
              {Iscustom && (
                <div className=" mt-6 max-w-[30rem]  shadow-lg p-3  border border-foreground/10  rounded-md">
                  <h1 className=" text-sm font-semibold text-center ">
                    Your custom URL will look like
                  </h1>
                  <Input
                    value={`${Server?.split("//")[1]}/${URL.custom}`}
                    readOnly
                    className="mt-3 cursor-not-allowed text-foreground  border border-foreground/10"
                  />
                </div>
              )}
            </div>
            <div
              className={`duration-200  ${
                !Iscustom ? "-translate-y-14  " : "translate-y-0  "
              }`}
            >
              <Button
                type="submit"
                disabled={loader}
                className=" disabled:opacity-70  mt-4"
              >
                {!loader ? (
                  "Submit"
                ) : (
                  <>
                    Shortening..
                    <Loader size={20} className="ml-1 animate-spin" />
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          !loader && (
            <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="rounded-lg shadow-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl space-y-6">
                <h1 className="text-xl sm:text-2xl font-bold text-center">
                  Your Shortened URL is Ready!
                </h1>

                <div className="space-y-2">
                  <label
                    htmlFor="shortened-url"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Shortened URL
                  </label>
                  <div className="flex">
                    <Input
                      id="shortened-url"
                      value={ShortUrl}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={() => copyToClipboard(ShortUrl)}
                      className="rounded-l-none"
                    >
                      {Copied ? (
                        <Check className="h-5 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={() => setQrDisplay(!QrDisplay)}
                    variant="outline"
                    className="flex-1"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {QrDisplay ? "Hide QR Code" : "Show QR Code"}
                  </Button>
                  <Button
                    onClick={() => {
                      setShortUrl("");
                      setURL({ long: "", custom: "" });
                      setCustom(false);
                    }}
                    className="flex-1"
                  >
                    <Link className="h-4 w-4 mr-2" />
                    Create New URL
                  </Button>
                </div>

                <p className="text-center text-sm">
                  Share your shortened URL with anyone, anywhere!
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

export const Footer = () => {
  return (
    <footer>
      <a
        target="_blank"
        href={siteMetaData.portfolio}
        className=" absolute  sm:hidden text-sm bottom-3 left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        Developed by
        <span className=" cursor-pointer  ml-1 font-semibold">Sooraj</span>
      </a>
    </footer>
  );
};
