"use client";

import { useEffect, useState } from "react";
import { type WeatherData } from "~/lib/type";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Vérifie si le code est exécuté côté client
    if (typeof window !== "undefined") {
      const current = localStorage.getItem("currentCity");
      setCurrentCity(current);
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      void fetch(`/api/city/${currentCity}`)
        .then((response) => response.json() as Promise<WeatherData>)
        .then((data) => setData(data));
    }
  }, [currentCity]);

  const weather = data ? data.current.condition.text : "Chargement...";
  return (
    <header className={cn("flex w-full flex-col items-center", className)}>
      <h1 className="text-6xl font-normal uppercase">
        <span className="font-bold">Oh non</span>, {weather}
      </h1>
      <p className="pt-4">
        Trouvez là où il fait bon vivre pour les prochains jours dans les villes
        que vous avez définies.
      </p>
    </header>
  );
};
