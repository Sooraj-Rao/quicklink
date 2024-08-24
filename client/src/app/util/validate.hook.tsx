type T_URL = {
  long: string;
  custom: string;
};

const user = process.env.NEXT_PUBLIC_USER;
const item = localStorage.getItem(user || "");

export const Validator = (URL: T_URL, isCustom: boolean) => {
  if (item === user) return { key: user };

  const { long, custom } = URL;

  if (isCustom) {
    if (!custom) return { error: "Please Enter custom URL" };
    if (custom.length < 8) return { error: "Custom URL is too short" };
    if (!isValidCustom(custom))
      return { error: "Only letters, numbers, and underscores are allowed" };
  }

  if (!long) return { error: "Please enter a URL" };
  if (!isValidURL(long)) return { error: "Invalid URL format" };

  return { error: null };
};

const isValidURL = (url: string) => url.includes(".");

const isValidCustom = (custom: string) => /^[a-zA-Z0-9_-]+$/.test(custom);
