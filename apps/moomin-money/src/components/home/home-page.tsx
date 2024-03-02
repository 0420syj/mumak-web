import dynamic from "next/dynamic";

import { Skeleton } from "@repo/ui/skeleton";
import { HomeForm } from "@moomin-money/components/home/home-form";

const MoneySpendBoard = dynamic(
  () => import("@moomin-money/components/money-spend-board"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col w-full mb-4">
        <div className="flex flex-row justify-around">
          <div className="flex flex-col items-center">
            <Skeleton className="w-[60px] h-[24px]" />
            <Skeleton className="w-[64px] h-[20px]" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="w-[60px] h-[24px]" />
            <Skeleton className="w-[64px] h-[20px]" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="w-[60px] h-[24px]" />
            <Skeleton className="w-[64px] h-[20px]" />
          </div>
        </div>
      </div>
    ),
  }
);

const HomePage = () => {
  return (
    <div className="container items-center">
      <MoneySpendBoard />
      <HomeForm />
    </div>
  );
};

export default HomePage;
