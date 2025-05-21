// import { ITrans } from "@/types/common";

export const convertNumber = (tr: any, number: string) => {
  const numberStr = number.split("").map((item) => {
    if (item === " " || item === "+" || item === "," || item === "-") {
      return item;
    }
    return tr(item);
  });
  return numberStr.join("");
};
