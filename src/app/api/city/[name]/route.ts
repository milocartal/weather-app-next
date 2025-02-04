/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { env } from "~/env";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  try {
    const city = (await params).name;

    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${env.WEATHER_API_KEY}&q=${city}&aqi=no`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    return new Response(JSON.stringify(data));
  } catch (error) {
    throw new Error("Error get city weather: ", error as Error);
  }
}
