import rateLimit from "express-rate-limit";
import path from "path";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res
      .status(429)
      .sendFile(path.join(__dirname, "../../html/rate-limit.html"));
  },
  message: {
    error: true,
    message: "Too many requests, please try again later.",
  },
  legacyHeaders: false,
});
