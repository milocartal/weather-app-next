"use client";
import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { type WeatherData } from "~/lib/type";
import { Separator } from "./ui/separator";
import CustomImage from "./image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

export const Display: React.FC<Props> = ({ className }) => {
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // Vérifie si le code est exécuté côté client
    if (typeof window !== "undefined") {
      const current = localStorage.getItem("currentCity");
      const storedCities = localStorage.getItem("cities");
      if (storedCities) {
        setCities(JSON.parse(storedCities) as string[]);
      }
      setCurrentCity(current);
      if (current) {
        void setCurrent(current);
      }
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      void fetch(`/api/city/${currentCity}`)
        .then((response) => response.json() as Promise<WeatherData>)
        .then((data) => setData(data));
    }
  }, [currentCity]);

  async function setCurrent(city: string, relaod?: boolean) {
    localStorage.setItem("currentCity", city);
    const response = await fetch(`/api/city/${city}`);
    const data = (await response.json()) as WeatherData;
    setData(data);

    if (relaod) {
      window.location.reload();
    }
    return;
  }

  return (
    <section className={cn("flex flex-row gap-8", className)}>
      <Navbar cities={cities} current={currentCity} setCurrent={setCurrent} />
      <article className="h-full space-y-4 overflow-y-auto rounded-lg bg-white p-6">
        <div className="w-full">
          <h2>
            {data?.location.name} - {data?.location.country}
          </h2>
        </div>
        <Separator className="w-full bg-primary" />
        <div className="flex flex-row rounded-lg shadow-lg">
          <aside className="w-1/2 rounded-lg bg-card">
            <CustomImage
              src={data ? `https:${data.current.condition.icon}` : undefined}
              alt={data?.current.condition.text ?? ""}
              width={300}
              height={300}
              loader={
                data
                  ? () => {
                      return `https:${data.current.condition.icon}`;
                    }
                  : undefined
              }
            />
          </aside>
          <aside className="flex w-1/2 flex-col items-start justify-center p-6">
            <p>
              {data
                ? format(new Date(data.location.localtime), "PPP", {
                    locale: fr,
                  })
                : format(new Date(), "PPP", {
                    locale: fr,
                  })}
            </p>
            <h3>{data?.current.condition.text}</h3>
            <p>Il fait aussi {data?.current.temp_c}°C</p>
          </aside>
        </div>
        <div className="gap-' grid grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg font-normal">
                {data
                  ? format(new Date(data.location.localtime), "PPP", {
                      locale: fr,
                    })
                  : format(new Date(), "PPP", {
                      locale: fr,
                    })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomImage
                src={data ? `https:${data.current.condition.icon}` : undefined}
                alt={data?.current.condition.text ?? ""}
                width={100}
                height={100}
                loader={
                  data
                    ? () => {
                        return `https:${data.current.condition.icon}`;
                      }
                    : undefined
                }
              />
              <p>{data?.current.condition.text}</p>
            </CardContent>
            <CardFooter>
              <p>{data?.current.temp_c}°C</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg font-normal">
                {data
                  ? format(new Date(data.location.localtime), "PPP", {
                      locale: fr,
                    })
                  : format(new Date(), "PPP", {
                      locale: fr,
                    })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomImage
                src={data ? `https:${data.current.condition.icon}` : undefined}
                alt={data?.current.condition.text ?? ""}
                width={100}
                height={100}
                loader={
                  data
                    ? () => {
                        return `https:${data.current.condition.icon}`;
                      }
                    : undefined
                }
              />
              <p>{data?.current.condition.text}</p>
            </CardContent>
            <CardFooter>
              <p>{data?.current.temp_c}°C</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg font-normal">
                {data
                  ? format(new Date(data.location.localtime), "PPP", {
                      locale: fr,
                    })
                  : format(new Date(), "PPP", {
                      locale: fr,
                    })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomImage
                src={data ? `https:${data.current.condition.icon}` : undefined}
                alt={data?.current.condition.text ?? ""}
                width={100}
                height={100}
                loader={
                  data
                    ? () => {
                        return `https:${data.current.condition.icon}`;
                      }
                    : undefined
                }
              />
              <p>{data?.current.condition.text}</p>
            </CardContent>
            <CardFooter>
              <p>{data?.current.temp_c}°C</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg font-normal">
                {data
                  ? format(new Date(data.location.localtime), "PPP", {
                      locale: fr,
                    })
                  : format(new Date(), "PPP", {
                      locale: fr,
                    })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomImage
                src={data ? `https:${data.current.condition.icon}` : undefined}
                alt={data?.current.condition.text ?? ""}
                width={100}
                height={100}
                loader={
                  data
                    ? () => {
                        return `https:${data.current.condition.icon}`;
                      }
                    : undefined
                }
              />
              <p>{data?.current.condition.text}</p>
            </CardContent>
            <CardFooter>
              <p>{data?.current.temp_c}°C</p>
            </CardFooter>
          </Card>
        </div>
      </article>
    </section>
  );
};
