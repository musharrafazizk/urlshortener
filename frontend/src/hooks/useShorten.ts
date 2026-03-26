import { useState } from "react";
import { shortenUrl } from "../lib/api";
import type { ShortenResponse } from "../lib/api";
import toast from "react-hot-toast";

export function useShorten() {
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const shorten = async (url: string) => {
    setLoading(true);
    try {
      const data = await shortenUrl(url);
      setResult(data);
      toast.success("URL shortened!", { duration: 3000 });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setResult(null);

  return { result, loading, shorten, reset };
}
