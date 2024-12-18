import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "./ui/tooltip";
import { useState } from 'react';

export function ModeToggle() {
    const [theme, setTheme] = useState("light");

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8 bg-background mr-2"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Cambiar tema</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Cambiar tema</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}