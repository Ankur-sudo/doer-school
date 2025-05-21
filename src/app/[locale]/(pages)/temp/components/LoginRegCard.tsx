import { BeemaBoxIcon } from "@/components/common/SVG/Icons";
import RoundSvg from "@/components/common/SVG/RoundSvg";
import { Link } from "@/MUST_USE_IT_navigation";
import { ReactNode } from "react";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type Props = {
  children: ReactNode;
  isLogin?: boolean;
  isForgotPassword?: boolean;
};

export default function LoginRegCard({
  children,
  isLogin,
  isForgotPassword,
}: Props) {
  return (
    <div className="lg:max-w-[880px] sm:w-[90%] w-[96%] relative mx-auto my-[40px] md:my-[20px]">
      <div className="min-h-[50vh] border border-[#99CFF9] bg-white rounded-[20px] md:p-[80px] p-[20px] pt-[70px]">
        {/* Rounded Top-Right Shape */}
        <div className="rounded-shape hidden lg:block">
          <div className="rounded-shape-top-left-before-after"></div>
          <div className="absolute -top-[0.5rem] left-[0.5rem]">
            <BeemaBoxIcon width={250} />
          </div>
          <div className="rounded-shape-bottom-right-before-after"></div>
        </div>

        <h3 className="text-heading !text-center lg:!text-left xl:text-[42px] text-[22px] font-bold">
          {isForgotPassword
            ? "Forgot Password"
            : isLogin
            ? "Log In"
            : "Create Account"}
        </h3>
        {children}
        {!isForgotPassword ? (
          <div>
            {isLogin ? (
              <div className="flex justify-between gap-2">
                <p className="text-sm">
                  Don’t have an account?{" "}
                  <Link className="text-button" href={"/registration"}>
                    Sign Up
                  </Link>
                </p>
                <Link className="text-button text-sm" href={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
            ) : (
              <p className="text-sm">
                Already have an account?{" "}
                <Link className="text-button" href={"/login "}>
                  Log In
                </Link>
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
