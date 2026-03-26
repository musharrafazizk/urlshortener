import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export interface ShortenResponse {
  short_code: string;
  short_url: string;
  original_url: string;
}

export async function shortenUrl(url: string): Promise<ShortenResponse> {
  const { data } = await axios.post<ShortenResponse>(`${BASE}/api/shorten`, { url });
  return data;
}
