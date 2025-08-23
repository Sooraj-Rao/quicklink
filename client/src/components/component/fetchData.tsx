"use client";

import axios from "axios";
import Cookies from "js-cookie";

const fetchData = async (
  eventType: string,
  ref?: string,
  utm_source?: string,
  additionalData?: string
) => {
  const token = Cookies.get(eventType);
  if (token == eventType) return;
  if (ref === process.env.NEXT_PUBLIC_USER!) return;

  const Server = process.env.NEXT_PUBLIC_API!;
  const res = await axios.post(Server, {
    eventType: eventType.trim(),
    ref,
    utm_source,
    additionalData: JSON.stringify(additionalData),
  });

  const { error } = res.data;
  if (!error) {
    Cookies.set(eventType, eventType);
  }
};

export default fetchData;
