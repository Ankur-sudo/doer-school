import { Link } from "@/MUST_USE_IT_navigation";
import classNames from "classnames";
import React from "react";
import { TiArrowRight } from "react-icons/ti";

type Props = {
  title: string;
  isFilled?: boolean;
  size?: "small" | "medium" | "large";
  isIcon?: boolean;
  link?: string;
  target?: "_blank";
};

export default function CommonButton({
  title,
  isFilled,
  size,
  isIcon,
  link,
  target,
}: Props) {
  return link ? (
    <Link target={target} href={link}>
      <button
        className={classNames("w-full flex justify-center items-center", {
          "button-filled": isFilled,
          "button-outline": !isFilled,
          "!p-[10px] !px-[20px] !rounded-[6px]": size === "small",
          "": size === "medium",
          "": size === "large",
        })}
      >
        {title}{" "}
        {isIcon ? (
          <TiArrowRight className="text-white !hover:text-blue-500 text-xl" />
        ) : (
          ""
        )}
      </button>
    </Link>
  ) : (
    <button
      className={classNames({
        "button-filled": isFilled,
        "button-outline": !isFilled,
        "!p-[10px] !px-[20px] !rounded-[6px]": size === "small",
        "": size === "medium",
        "": size === "large",
      })}
    >
      {title}{" "}
      {isIcon ? (
        <TiArrowRight className="text-white !hover:text-blue-500" />
      ) : (
        ""
      )}
    </button>
  );
}
