
import { PanelsTopLeft } from "lucide-react";
import { useStore } from "../hooks/use-store";
import { useSidebar } from "../hooks/use-sidebar";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { SidebarToggle } from "./admin-panel/sidebar-toggle";
import { Menu } from "./admin-panel/menu";

export function Sidebar() {
    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
    return (
      <aside
        className={cn(
          "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-[#1D1D1B] text-[#ffffffa6]",
          !getOpenState() ? "w-[90px]" : "w-72",
          settings.disabled && "hidden"
        )}
      >
        <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative h-full flex flex-col px-3 py-4 shadow-md dark:shadow-zinc-800 overflow-hidden mt-2"
        >
          <Button
            className={cn(
              "transition-transform ease-in-out duration-300 mb-1",
              !getOpenState() ? "translate-x-1" : "translate-x-0"
            )}
            variant="link"
            asChild
          >
            <a href="/dashboard" className="flex items-center gap-2">
              <h1
                className={cn(
                  "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                  !getOpenState()
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              >
              </h1>
              <img width="100"  src={"/assets/images/logo.png"} alt=""/>              
            </a>
          </Button>
          <Menu isOpen={getOpenState()} />
        </div>
      </aside>
    );
  }
  