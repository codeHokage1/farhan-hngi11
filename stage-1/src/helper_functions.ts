import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.IPINFO_TOKEN || "";

const ipinfoWrapper = new IPinfoWrapper(token);

export const getLocationDetails = async (ip: string) => {
  try {
    const locationDetails = await ipinfoWrapper.lookupIp("1.1.1.1");
    if (!locationDetails) {
      return {
        error: true,
        message: "Error: No location details found",
        data: null,
      };
    }

    return {
      error: false,
      message: "Success: Location details found",
      data: locationDetails,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
      data: null,
    };
  }
};

export const getTemperature = async (lat: any, long: any) => {
  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    if (!weatherResponse) {
      return {
        error: true,
        message: "Error: No weather details found",
        data: null,
      };
    }

    const temperature = weatherResponse.data.main.temp;
    return {
      error: false,
      message: "Success: Weather details found",
      data: temperature,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error,
      data: null,
    };
  }
};
