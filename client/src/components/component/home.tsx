"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Check, Link, Loader, QrCode } from "lucide-react";
import { FormEvent, useState } from "react";
import { Validator } from "@/app/util/validate.hook";
import QRCodeView from "./qr";
import { CopyIcon } from "@radix-ui/react-icons";
import { siteMetaData } from "@/data/siteMetaData";
import fetchData from "./fetchData";
import { useZustandStore } from "./zustand.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Server = process.env.NEXT_PUBLIC_SERVER!;

const Home = () => {
  const { Ref } = useZustandStore();
  const [Iscustom, setCustom] = useState(false);
  const [Copied, setCopied] = useState(false);
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
    try {
      setloader(true);
      const res = await fetch(`${Server}/api`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${"ilnMxRHMWwNIWhvsvFHpxufJ"}`,
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
      fetchData("shorten-url", Ref || "search", "quicklink-home", "none");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8  h-[35rem] overflow-hidden flex flex-col justify-center">
      {QrDisplay && <QRCodeView setQrDisply={setQrDisplay} value={ShortUrl} />}
      <Card className="w-full max-w-xl mx-auto   border-none">
        <CardHeader>
          <CardTitle className="sm:text-3xl text-xl  font-bold text-center">
            Make Your Links Short and Simple!
          </CardTitle>
          <CardDescription className=" text-center text-xs sm:text-base">
            Shorten URLs for free, fast, and hassle-free
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!ShortUrl ? (
            <form onSubmit={ShortenLongUrl} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Enter a long URL</Label>
                <Input
                  id="url"
                  value={URL.long}
                  onChange={handleChange}
                  name="long"
                  type="url"
                  placeholder="Your long URL here..."
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="custom"
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
                <Label htmlFor="custom" className="text-sm">
                  Need custom backhalf for URL
                </Label>
              </div>
              {
                <div
                  className={`space-y-2 duration-200
                ${Iscustom ? "h-48" : "h-0 invisible overflow-hidden"}
                `}
                >
                  <Input
                    value={URL.custom}
                    onChange={handleChange}
                    name="custom"
                    autoComplete="off"
                    placeholder="Enter custom backhalf"
                    className="w-full"
                  />
                  {URL.custom.length < 9 && (
                    <p className="text-xs text-red-500">Min 8 characters</p>
                  )}
                  <div className="mt-2 p-3  rounded-md dark:bg-zinc-900 bg-zinc-100 ">
                    <p className="text-sm font-semibold text-center">
                      Your custom URL will look like
                    </p>
                    <Input
                      value={`${Server?.split("//")[1]}/${URL.custom}`}
                      readOnly
                      className="mt-2 cursor-not-allowed text-muted-foreground"
                    />
                  </div>
                </div>
              }
              <Button type="submit" disabled={loader} className="w-full">
                {!loader ? (
                  "Shorten URL"
                ) : (
                  <>
                    Shortening..
                    <Loader size={20} className="ml-2 animate-spin" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            !loader && (
              <div className="space-y-4">
                <h2 className=" text-sm sm:text-xl font-bold text-center">
                  Your Shortened URL is Ready
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="shortened-url">Shortened URL</Label>
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
              </div>
            )
          )}
        </CardContent>
      </Card>
      <Footer Ref={Ref} />
    </div>
  );
};

export default Home;

export const Footer = ({ Ref }: { Ref: string }) => {
  return (
    <footer className="mt-12 text-center sm:text-sm text-xs text-muted-foreground">
      <a
        onClick={() =>
          fetchData(
            "open-portfolio",
            Ref || "search",
            "quicklink-mobile-footer"
          )
        }
        target="_blank"
        href={siteMetaData.portfolio}
        className="hover:underline"
      >
        Developed by
        <span className="font-semibold ml-1">Sooraj</span>
      </a>
    </footer>
  );
};
