import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { getLocationDetails, getTemperature } from "./helper_functions";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("HNGi11: Stage 1 Task - Farhan S.");
});

app.get("/api/hello", async (req: Request, res: Response) => {
  const name = req.query.visitor_name;
  const client_ip = req.ip || "";

  // Get the location
  const response: any = await getLocationDetails(client_ip);
  if (response.error) {
    return res.status(500).json({
      message: response.message,
      data: {},
    });
  }
  const { city, region, country, loc } = response.data;

  // Get the temperature of city
  const [lat, long] = loc.split(",");
  const weatherResponse: any = await getTemperature(lat, long);
  if (weatherResponse.error) {
    return res.status(500).json({
      message: weatherResponse.message,
      data: {},
    });
  }

  const temperature = weatherResponse.data;

  return res.json({
    client_ip: client_ip,
    location: city,
    greeting: `Hello, ${name}!, the temperature is ${temperature} degrees Celcius in ${city}`,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
