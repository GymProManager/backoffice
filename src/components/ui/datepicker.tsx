import { CalendarIcon } from "lucide-react";

import * as React from "react"

import { cn } from "./../../lib/utils"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "./popover";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { format } from "date-fns"
import { DateTimePicker } from "./datePicker/date-time-picker";
import { DateFormatter } from "react-aria";

const DatePicker = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({onChange, defaultValue, className, type, ...props }, ref) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)


    const today:string = defaultValue?.toString() || new Date().toISOString().split('T')[0];
    const [date, setDate] = React.useState<string>(today)

    const onDateChange = (date: Date) => {
        setDate(date);
        onChange(date);
    }

    return (
        <div>
        <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">

            <input type="text"
             className="block bg-white min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              defaultValue={ format(date, "dd/MM/yyyy")}
              lang="es"
              placeholder="YYYY-MM-DD"
              />
            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[56px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={onDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>               
            </div>
            </div>
        </div>
        </div>

    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
