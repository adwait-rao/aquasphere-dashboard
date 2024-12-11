import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dams = [
  { value: "hoover", label: "Hoover Dam" },
  { value: "grand-coulee", label: "Grand Coulee Dam" },
  { value: "itaipu", label: "Itaipu Dam" },
  { value: "three-gorges", label: "Three Gorges Dam" },
  { value: "kariba", label: "Kariba Dam" },
];

export function GlobalDamSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="dark:bg-current text-current">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-lg font-semibold mr-4">Selected Dam:</span>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between bg-white text-black"
                >
                  {value
                    ? dams.find((dam) => dam.value === value)?.label
                    : "Select dam..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search dam..." />
                  <CommandEmpty>No dam found.</CommandEmpty>
                  <CommandGroup>
                    {dams.map((dam) => (
                      <CommandItem
                        key={dam.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === dam.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {dam.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
