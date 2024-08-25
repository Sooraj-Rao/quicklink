"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyIcon, CheckIcon } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { Server } from "@/components/component";
import { toast } from "@/components/ui/use-toast";
import { siteMetaData } from "@/data/siteMetaData";

export default function ApiPage() {
  const token = Cookies.get("token");
  const [apiKey, setApiKey] = useState(token || "");
  const [copied, setCopied] = useState(false);

  const generateApiKey = async () => {
    try {
      const res = await axios.post(`${Server}/api/new`);
      const { data, error, message } = res.data;
      if (error) {
        return toast({
          variant: "destructive",
          description: message,
        });
      }
      setApiKey(data?.apikey);
      Cookies.set("token", data.apikey, { expires: 7 });
      setApiKey(data?.apikey);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to generate API key",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=" mx-auto p-4 max-w-4xl">
      <h1 className="sm:text-3xl text-xl font-bold mb-6">API Documentation</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{!apiKey && "Get"} Your API Key</CardTitle>
          <CardDescription>
            You need an API key to make requests to our service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKey ? (
            <div className="flex items-center gap-2">
              <Input value={apiKey} readOnly />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(apiKey)}
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <Button onClick={generateApiKey}>Generate API Key</Button>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8 ">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>
            Follow these steps to shorten URLs using our API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Generate an API key {"(if you haven't already)"}.</li>
            <li>Use the API key in the header of your requests.</li>
            <li>
              Send a POST request to our endpoint with the URL you want to
              shorten.
            </li>
            <li>Receive the shortened URL in the response.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-8 ">
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold tracking-wide mb-2">
            POST &nbsp;&nbsp; /api
          </h3>
          <p className="mb-4 text-sm">Shorten a URL</p>

          <h4 className="font-semibold mb-2">Request Body</h4>
          <pre className="bg-muted p-2 rounded mb-2 overflow-x-scroll">
            {`{
  "long": "https://quicklink.soorajrao.in",
  "custom": "mywebsiteurl" // optional
}
`}
          </pre>
          <p className="mb-4 text-sm">
            <b>long</b> - Your long URL to be shortened <br />
            <b>Custom</b>{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>{" "}
            - Custom backhalf for your URL
            <span className=" text-sm text-muted-foreground font-normal">
              ( Only letters, numbers, hyphens, and underscores allowed )
            </span>
          </p>
          <h4 className="font-semibold mb-2 ">
            Query Params{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </h4>
          <pre className="bg-muted p-2 rounded mb-4 overflow-x-scroll">
            {`https://sj1.xyz/api?size=15`}
          </pre>
          <p className="mb-4 text-sm">
            <b>size</b> - Size refers to the number of characters in the link.
            By default, it is 10
          </p>
          <h4 className="font-semibold mb-2">Response:</h4>
          <pre className="bg-muted p-2 rounded mb-4 overflow-x-scroll">
            {`{
  "error": false,
  "message": "Short URL created",
  "data": {
    "short": "ju5whysf"
  }
}`}
          </pre>

          <h3 className="text-xl font-semibold tracking-wide mb-2">
            GET &nbsp;&nbsp; /api/count/[shortUrl]
          </h3>
          <p className="mb-4 text-sm">
            Track the number of clicks on your shortened URL.
          </p>

          <h4 className="font-semibold mb-2">Response:</h4>
          <pre className="bg-muted p-2 rounded mb-4 overflow-x-scroll">
            {`{
  "error": false,
  "message": "Click count retrieved",
  "data": {
    "shortUrl": "https://sj1.xyz/ju5whysf",
    "clicks": 2,
    "lastClicked": "25/08/2024, 11:48:20",
    "timestamp": [
      "25/08/2024, 11:39:45",
      "25/08/2024, 11:48:20",
    ]
  }
}`}
          </pre>
          <p className="mb-4 text-sm">
            <b>shortUrl</b> - The shortened URL you want to track <br />
            <b>clicks</b> - Number of times the URL has been clicked <br />
            <b>lastClicked</b> - Timestamp of the last click <br />
            <b>timestamp</b> - The list of click timestamps
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl">
            <TabsList>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="curl">
              <pre className="bg-muted p-2 rounded overflow-x-scroll">
                {`curl -X POST https://sj1.xyz/api \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"long": "https://example.com/very-long-url-that-needs-shortening"}'`}
              </pre>
            </TabsContent>
            <TabsContent value="python">
              <pre className="bg-muted p-2 rounded overflow-x-scroll">
                {`import requests

api_key = "YOUR_API_KEY"
url = "https://example.com/very-long-url-that-needs-shortening"

response = requests.post(
    "https://sj1.xyz/api",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={"long": url}
)

print(response.json()["data"]["shortUrl"])`}
              </pre>
            </TabsContent>
            <TabsContent value="javascript">
              <pre className="bg-muted p-2 rounded overflow-x-scroll">
                {`const apiKey = "YOUR_API_KEY";
const url = "https://example.com/very-long-url-that-needs-shortening";

fetch("https://sj1.xyz/api", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ long: url }),
})
  .then((response) => response.json())
  .then((result) => console.log(result.data.shortUrl))
  .catch((error) => console.error("Error:", error));`}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Conditions and Limitations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              The API is free to use indefinitely. If you lose your API key, you
              can generate a new one at no cost.
            </li>
            <li>URL length: Minimum 8 characters, maximum 32 characters.</li>
            <li>Shortened URLs expire after 1 year of inactivity.</li>
            <li>Already shortened URLs cannot be shortened again.</li>
            <li>
              If you get any issue please report it
              <a
                target="_blank"
                href={siteMetaData.report + "quicklink_docs_api_footer"}
                className=" mx-1 underline"
              >
                here
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
