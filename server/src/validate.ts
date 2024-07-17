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

  if ((short && !isValidCustom(short)) || (short && short.length < 8)) {
    return { message: "Invalid custom backhalf format", error: true };
  }

  return { error: false, message: null };
};

const isValidURL = (url: string): boolean => {
  if (!url || url.length < 8 || !url.includes(".")) {
    return false;
  }
  return true;
};

const isValidCustom = (short: string): boolean => {
  const customRegex = /^[a-zA-Z0-9_-]+$/;
  return customRegex.test(short);
};
