"use client";
import React from "react";
import dynamic from "next/dynamic";

import { TABS } from "@/utils";
import { TabsSelectorType } from "@/types/components";

import { Tabs } from "@/components";
import FormsCreateRequest from "./components/forms/create-request";

const FormsDepositLimit = dynamic(
  () => import("./components/forms/deposit-limit")
);

export default function Home() {
  const [currentTab, setCurrentTab] = React.useState<TabsSelectorType>(TABS[0]);

  const [, startTransition] = React.useTransition();

  const handleChangeTab = (prev: string) =>
    startTransition(() => setCurrentTab(prev as TabsSelectorType));

  return (
    <main className="flex flex-col gap-3 p-4 sm:p-24">
      <Tabs
        suggections={TABS}
        current={currentTab}
        onChange={handleChangeTab}
      />
      {currentTab === TABS[0] && <FormsCreateRequest />}
      {currentTab === TABS[1] && <FormsDepositLimit />}
    </main>
  );
}
