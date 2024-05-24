import React from "react";

import { classNames } from "@/utils";

interface Props {
  current: string;
  suggections: ReadonlyArray<string>;
  onChange: (current: string) => void;
}

const Tabs: React.FC<Props> = ({ current, suggections, onChange }) => {
  const hasCurrentMemoize = (prev: string) => prev === current;

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b-[3px] border-gray-200">
      <ul className="flex flex-wrap -mb-px">
        {suggections.map((name) => (
          <li key={name}>
            <button
              onClick={() => onChange(name)}
              aria-current={hasCurrentMemoize(name) ? "page" : undefined}
              className={classNames(
                "inline-block py-4 px-6 rounded-t-lg font-semibold transition-all",
                hasCurrentMemoize(name)
                  ? "text-primary border-b-[3px] border-primary active"
                  : "border-b-[3px] border-transparent hover:text-[#6D727E] hover:border-gray-300"
              )}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Tabs);
