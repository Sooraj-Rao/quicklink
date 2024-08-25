"use client";

import axios from "axios";
import Cookies from "js-cookie";

export const fetchData = async (
  eventType: string,
  additionalData: string,
  ref: string
) => {
  if (ref === process.env.NEXT_PUBLIC_USER!) return;
  const token = Cookies.get(eventType);
  if (token == eventType) return;
  const Server = process.env.NEXT_PUBLIC_API!;
  const res = await axios.post(Server, {
    eventType,
    ref,
    additionalData,
  });
  const { error } = res.data;
  if (!error) {
    Cookies.set(eventType, eventType);
  }
};

