"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// https://tailwindcomponents.com/component/radio-buttons-1

import React, { use } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {

  const router = useRouter();

  const [selected, setSelected] = React.useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString(), { expires: new Date(Date.now() + 365 * 1 * 60 * 60 * 1000)});
    router.refresh();
  }

  return (
    <div className={`grid ${'grid-cols-4'} w-full space-x-2 rounded-xl bg-gray-200 p-2 `}>

      {
        tabOptions.map(tab => (
          <div key={tab}>
            <input
              checked={selected === tab}
              onChange={() => {}}
              type="radio"
              id={tab.toString()}
              className="peer hidden"
            />
            <label
              onClick={() => onTabSelected(tab)}
              className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {tab}
            </label>
          </div>
        ))
      }
    </div>
  )
}