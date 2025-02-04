"use client";

import { cn } from "~/lib/utils";
import { AddCityForm } from "./form";
import { Button } from "./ui/button";
import CustomImage from "./image";

interface NavbarProps {
  cities: string[];
  current: string | null;
  className?: string;
  setCurrent: (city: string, relaod?: boolean) => void;
}
export const Navbar: React.FC<NavbarProps> = ({
  cities,
  current,
  className,
  setCurrent,
}) => {
  return (
    <nav
      className={cn("flex flex-col gap-4 rounded-lg bg-white p-6", className)}
    >
      <AddCityForm setCurrent={setCurrent} />

      <div className="w-fukk flex flex-col gap-4 overflow-y-auto">
        {cities.map((city: string) => (
          <Button
            key={city}
            variant={city === current ? "default" : "secondary"}
            onClick={() => setCurrent(city, true)}
            className="justify-between"
          >
            {city}
            <CustomImage
              src={`/eye.svg`}
              alt={"eye"}
              className="h-5 w-5"
              width={20}
              height={20}
            />
          </Button>
        ))}
      </div>
    </nav>
  );
};
