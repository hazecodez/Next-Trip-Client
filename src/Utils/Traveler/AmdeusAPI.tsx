//---to get amadeus access token

import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  data: Location[];
  // Add other properties as needed
}
interface Location {
  subType: string;
  iataCode: string;
  // Add other properties as needed
}

const AmdeusAPI = {
  getToken: async () => {
    const client_id = import.meta.env.VITE_AMADEUS_API_KEY;
    const client_secret = import.meta.env.VITE_AMADEUS_SECRET;

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", client_id);
    params.append("client_secret", client_secret);

    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  },
  getIATACode: async (city: string, token: string) => {
    const url = "https://test.api.amadeus.com/v1/reference-data/locations";
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          keyword: city,
          subType: "CITY",
        },
      });
      const location = response.data.data.find((loc) => loc.subType === "CITY");
      return location ? location.iataCode : null;
    } catch (error) {
      console.error("Error fetching IATA code:", error);
      throw error;
    }
  },
  getFlightOffers: async (
    accessToken: string,
    origin: string,
    destination: string,
    departureDate: string
  ) => {
    const url = "https://test.api.amadeus.com/v2/shopping/flight-offers";
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: 1,
      nonStop: false,
      max: 250,
      currencyCode: "INR",
    };

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching flight offers:", error);
    }
  },
};

export default AmdeusAPI;
