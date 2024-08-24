export const RandomGenerator = (size: number, isAdmin?: boolean) => {
  const validSize = size ? (size >= 8 && size <= 32 ? size : 8) : 8;
  const Length = isAdmin ? 4 : validSize;
  let caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let small = caps.toLowerCase();
  let total = caps + small;
  let short = "";
  for (let i = 0; i < Length; i++) {
    const ele = Math.floor(Math.random() * total.length);
    short += total.charAt(ele);
  }
  return short;
};

export const StatusMessages = {
  "500": "Internal Server Error",
  "404": "Resource Not Found",
  "200": "Ok",
};
