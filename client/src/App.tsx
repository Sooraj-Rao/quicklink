import { Toaster } from "./components/ui/toaster";
import { SomeData } from "./data/linkData";
import Home from "./module/home";
import Header from "./module/header";
import { ThemeProvider } from "./module/theme.provider";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <SpeedInsights />
      <Analytics />
      <Header data={SomeData} />
      <Home Portfolio={SomeData.main} />
    </ThemeProvider>
  );
};

export default App;
