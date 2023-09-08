export const concatClassNames = (...args: (string | undefined)[]) => {
  return args.join(" ").trim();
};

export const deepCopy = <T>(obj: T) => {
  if (typeof obj !== "object" || obj === null) return obj;

  let copy: { [key: string]: any } = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy as T;
};
