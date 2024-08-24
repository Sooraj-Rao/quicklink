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

export default function ApiPage() {
  const token = Cookies.get("token");
  const [apiKey, setApiKey] = useState(token || "");
  const [copied, setCopied] = useState(false);

  const generateApiKey = async () => {
    try {
      const res = await axios.post(Server + "/api/new");
      const { data, success, status, message } = res.data;
      setApiKey(data?.apikey);
      toast({
        variant: success ? "default" : "destructive",
        description: message,
      });
      if (success || status == 200) {
        Cookies.set("token", data.apikey, { expires: 7 });
        setApiKey(data?.apikey);
      }
    } catch (error) {}
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Get Your API Key</CardTitle>
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>
            Follow these steps to shorten URLs using our API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold tracking-wide mb-2">
            POST &nbsp;&nbsp; /api?apikey= [ your api key ]
          </h3>
          <p className="mb-4">Shorten a URL</p>

          {/* <h4 className="font-semibold mb-2">Headers:</h4>
          <pre className="bg-muted p-2 rounded mb-4">
            {`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
          </pre> */}
          <h4 className="font-semibold mb-2">Request Body:</h4>
          <pre className="bg-muted p-2 rounded mb-4">
            {`{
  "long": "https://quicklink.soorajrao.in",
  "custom":"LinkProject"        //optional
}`}
          </pre>
          <h4 className="font-semibold mb-2">Query params:</h4>
          <pre className="bg-muted p-2 rounded mb-4">
            {` https://sj1.xyz/api?apikey= [API_KEY] &size=15
        `}
            <p>
              Size refers to the number of characters in the link and by deafult
              it is 10
            </p>
            <p>The API key has to be passed in Params as above</p>
          </pre>
          <h4 className="font-semibold mb-2">Response:</h4>
          <pre className="bg-muted p-2 rounded mb-4">
            {`{
    "success": true,
    "status": 200,
    "message": "Short URL created"  
    "data": {
      "shortUrl": "https://short.url/abc123"
     }
}`}
          </pre>
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
              <pre className="bg-muted p-2 rounded">
                {`curl -X POST https://api.urlshortener.com/api/shorten \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/very-long-url-that-needs-shortening"}'`}
              </pre>
            </TabsContent>
            <TabsContent value="python">
              <pre className="bg-muted p-2 rounded">
                {`import requests

api_key = "YOUR_API_KEY"
url = "https://example.com/very-long-url-that-needs-shortening"

response = requests.post(
    "https://api.urlshortener.com/api/shorten",
    headers={"Authorization": f"Bearer {api_key}"},
    json={"url": url}
)

print(response.json()["shortUrl"])`}
              </pre>
            </TabsContent>
            <TabsContent value="javascript">
              <pre className="bg-muted p-2 rounded">
                {`const apiKey = YOUR_API_KEY;
const url = 'https://example.com/very-long-url-that-needs-shortening';

fetch('https://sj1.xyz/api?apikey=\${apiKey}\`
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json',
  },
  body: ({ long }),
})
  .then(response => response.json())
  .then(data => console.log(data.shortUrl))
  .catch(error => console.error('Error:', error));`}
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
          <ul className="list-disc list-inside space-y-2">
            <li>Rate limit: 100 requests per minute per API key</li>
            <li>Maximum URL length: 2048 characters</li>
            <li>Shortened URLs expire after 1 year of inactivity</li>
            <li>No shortening of already shortened URLs</li>
            <li>Prohibited content: No illegal, harmful, or adult content</li>
            <li>API keys may be revoked for violation of terms</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
