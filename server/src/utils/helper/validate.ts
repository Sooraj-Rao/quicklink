type ValidationResult = {
  message: string | null;
  error: boolean;
};

export const Validator = (URL: {
  long: string;
  short?: string;
}): ValidationResult => {
  const { long, short } = URL;
  if (!long) {
    return { message: "Please enter a URL", error: true };
  } else if (!isValidURL(long)) {
    return { message: "Invalid URL format", error: true };
  }

  if (short && !isValidCustom(short)) {
    return { message: "Invalid custom URL", error: true };
  }
  if (short && short.length < 8) {
    return { message: "Custom URL is too short", error: true };
  }

  return { error: false, message: null };
};

const isValidURL = (url: string): boolean => {
  if (!url || !url.includes(".")) {
    return false;
  }
  return true;
};

const isValidCustom = (short: string): boolean => {
  const customRegex = /^[a-zA-Z0-9_-]+$/;
  return customRegex.test(short);
};
