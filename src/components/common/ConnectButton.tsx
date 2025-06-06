"use client";
import classNames from "classnames";
import React from "react";

type Props = { className?: string };

export default function ConnectButton({ className }: Props) {
  const phoneNumber = "8801993805760"; // Replace with your WhatsApp Business number
  const message = "Hello! I'd like to know more about your services.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const openWhatsApp = () => {
    // Redirects the current window/tab on mobile, opens a new tab on desktop
    window.open(whatsappLink, "_blank");
  };
  return (
    <button
      onClick={openWhatsApp}
      className={classNames(
        "group mx-4 sm:mx-0 border border-gray-200/50 shadow-xl bg-[#fafafa] rounded-[10px] text-heading p-[10px] pl-[15px] flex gap-4 justify-center items-center mt-[40px] font-poppins text-[18px] font-semibold",
        className
      )}
    >
      Connect with us instantly{" "}
      <div className="flex group-hover:gap-2 transition-all !duration-1000 h-[50px] p-[10px] rounded-[8px] bg-[#4FCE5D] z-10 text-white items-center justify-center">
        <p className="font-poppins max-w-0 overflow-hidden transition-all !duration-200 group-hover:max-w-[150px] text-nowrap hidden sm:block pt-1">
          Whatsapp Us
        </p>
        <svg
          width="31"
          height="30"
          viewBox="0 0 31 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.1292 4.35944C24.7424 2.97198 23.0949 1.87253 21.2815 1.12437C19.4681 0.376201 17.5246 -0.00589715 15.5629 6.87987e-05C7.33035 6.87987e-05 0.628571 6.66836 0.625223 14.8661C0.621581 17.4765 1.30966 20.0412 2.61942 22.2991L0.5 30L8.41851 27.9328C10.6104 29.1203 13.064 29.7417 15.5569 29.7409H15.5629C23.7948 29.7409 30.4959 23.0719 30.5 14.8748C30.5049 12.9198 30.1211 10.9834 29.3707 9.17814C28.6204 7.37289 27.5185 5.73488 26.1292 4.35944ZM15.5629 27.2317H15.5576C13.3353 27.2324 11.1534 26.6377 9.23883 25.5094L8.78548 25.2416L4.0866 26.4683L5.34084 21.9087L5.04553 21.44C3.80293 19.4727 3.14458 17.193 3.14709 14.8661C3.14709 8.05385 8.71918 2.51123 15.5676 2.51123C18.8529 2.50536 22.0059 3.80466 24.3333 6.12335C26.6606 8.44205 27.9717 11.5902 27.9781 14.8755C27.9754 21.6884 22.406 27.2317 15.5629 27.2317ZM22.3725 17.9779C21.9995 17.7918 20.1627 16.8931 19.8225 16.7692C19.4823 16.6454 19.2312 16.5831 18.9828 16.9554C18.7343 17.3277 18.0185 18.1608 17.8009 18.4119C17.5832 18.663 17.3656 18.6904 16.9926 18.5043C16.6196 18.3181 15.4163 17.9264 13.9906 16.6608C12.881 15.6757 12.1323 14.4596 11.9147 14.088C11.6971 13.7163 11.8913 13.5148 12.0781 13.33C12.2462 13.1632 12.4511 12.896 12.6379 12.6791C12.8248 12.4621 12.887 12.3067 13.0109 12.059C13.1348 11.8112 13.0732 11.5942 12.9801 11.4088C12.887 11.2233 12.1404 9.39447 11.8297 8.6505C11.5263 7.92595 11.219 8.02439 10.9899 8.013C10.7723 8.00229 10.5212 7.99961 10.2741 7.99961C10.0852 8.00453 9.89934 8.04833 9.72812 8.12829C9.55691 8.20825 9.40403 8.32265 9.279 8.46434C8.93682 8.83666 7.97253 9.73666 7.97253 11.5634C7.97253 13.3902 9.31182 15.1581 9.49664 15.4058C9.68146 15.6536 12.1283 19.4056 15.8723 21.0148C16.5675 21.3125 17.2779 21.5736 18.0004 21.7969C18.8944 22.0795 19.708 22.04 20.3509 21.9442C21.068 21.8378 22.5607 21.0456 22.8707 20.1777C23.1808 19.3099 23.1814 18.5666 23.0884 18.4119C22.9953 18.2572 22.7462 18.1634 22.3725 17.9779Z"
            fill="#E9F5FE"
          />
        </svg>
      </div>
    </button>
  );
}
