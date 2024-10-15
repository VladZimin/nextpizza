"use client";

import { FilterCheckbox, FilterCheckboxProps } from "./filterCheckbox";
import { Input } from "@/components/ui";
import { ChangeEvent, useState } from "react";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  defaultValues?: string[];
  onChange?: (values: string[]) => void;
}

export const CheckboxFiltersGroup = (props: CheckboxFiltersGroupProps) => {
  const {
    className,
    onChange,
    defaultItems,
    defaultValues,
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    items,
    title,
  } = props;
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);
  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        {showAll && (
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={onChangeSearchValue}
            value={searchValue}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            checked={false}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            onCheckedChange={(checked) => console.log(checked)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className={"text-primary mt-3"}
          >
            {showAll ? "Скрыть" : "+ Показать всё"}
          </button>
        </div>
      )}
    </div>
  );
};
