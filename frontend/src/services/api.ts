import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl, "-------------------------------------------");


export const API = axios.create({
  baseURL: apiUrl ?? 'http://localhost:5000/api',
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = "An unknown error occurred";

    if (error.response && error.response.data) {
      const data = error.response.data as any;

      if (typeof data === "object" && !Array.isArray(data)) {
        const messages: string[] = [];

        for (const key in data) {
          if (Array.isArray(data[key])) {
            messages.push(`${key}: ${data[key].join(", ")}`);
          } else if (typeof data[key] === "string") {
            messages.push(`${key}: ${data[key]}`);
          }
        }

        if (messages.length > 0) {
          errorMessage = messages.join(" | ");
        }
      } else if (data.message) {
        errorMessage = data.message;
      }
    }

    return Promise.reject({ message: errorMessage });
  }
);
