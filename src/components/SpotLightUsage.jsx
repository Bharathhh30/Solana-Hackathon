import React from "react";
import { cn } from "../lib/utils";
import { Spotlight } from "../components/ui/SpotLight";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Moving-border";

function SpotlightPreview() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden  bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b p-3 from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Tip Instantly <br /> Powered by Solana.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Send SOL directly to your favorite creators in just one click. No
          logins, no fees — just pure support.
        </p>
      </div>
      <div className="text-white">
        <Link to={"/tipping"}>
          <Button
            borderRadius="1.75rem"
            className="bg-white  cursor-pointer dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <p className="font-medium">Start Tipping</p>
            
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SpotlightPreview;