import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";


interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-8 h-8 border-[#B0A462] bg-[#B0A462] hover:bg-hover"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-5 w-5 transition-transform ease-in-out duration-700 text-[#FFFFFF]",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
