
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowUpCircleIcon, ThermometerIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-40">Flood Risk Manager

      <Button variant="outline">Get Started</Button>
      <Button variant="outline">
        <ArrowUpCircleIcon className="mr-2" />
        Download
      </Button>
    
      <Button variant="outline">
        <ThermometerIcon/>
      </Button>
    </div>
  );
}
