"use client";

import { useEffect } from "react";
import { useRouter as useRouterNavigate } from "@/MUST_USE_IT_navigation";
import { Spin } from "antd";

export default function withAuth(Component: any) {
  return function WithAuthComponent(props: any) {
    const { user, isLoading } = { user: null, isLoading: null } as any;
    const router = useRouterNavigate();

    useEffect(() => {
      if (!user?.data?.uuid && !isLoading) {
        router.push(`/login`);
      }
    }, [user, router, isLoading]);

    if (!user) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
