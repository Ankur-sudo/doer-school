import classNames from "classnames";
import React from "react";

type Props = {
  width: string;
  fill: string;
  topLeft?: boolean;
  topRight?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
  className?: string;
};

export default function RoundSvg({
  fill,
  width,
  bottomRight,
  topLeft,
  bottomLeft,
  topRight,
  className,
}: Props) {
  return (
    <>
      <div>
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames("absolute z-[9]", className, {
            "-rotate-90": topLeft || bottomLeft,
            "rotate-90": bottomRight,
          })}
          // topLeft done
          // bottomRight done
          style={{
            top:
              topLeft || bottomRight
                ? `${bottomRight ? "-" + width : 0}px`
                : undefined,
            left: bottomLeft ? `-${bottomLeft ? 0 : width}px` : undefined,
            right:
              bottomRight || topLeft
                ? `-${bottomRight ? 0 : width}px`
                : undefined,
            bottom: bottomLeft ? `-${width}px` : undefined,
          }}
        >
          <path
            d={`M0 0C0 0 ${width} 0.00161267 ${width} ${width}V0H0Z`}
            fill={fill}
          />
        </svg>
      </div>
      <div>
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames("absolute z-[9]", className, {
            "-rotate-90": topLeft || bottomLeft,
            "rotate-90": bottomRight,
          })}
          // topLeft done
          style={{
            top: topRight ? 0 : undefined,
            left:
              topLeft || bottomLeft || bottomRight
                ? `-${topLeft ? 0 : width}px`
                : undefined,
            right: topRight ? `-${width}px` : undefined,
            bottom:
              bottomRight || topLeft
                ? `-${bottomRight ? 0 : width}px`
                : undefined,
          }}
        >
          <path
            d={`M0 0C0 0 ${width} 0.00161267 ${width} ${width}V0H0Z`}
            fill={fill}
          />
        </svg>
      </div>
    </>
  );
}
