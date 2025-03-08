"use client";

import { FilterCheckbox, FilterCheckboxProps } from "./filterCheckbox";
import { Input, Skeleton } from "../ui";
import { ChangeEvent, useState } from "react";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  loading?: boolean;
  defaultValues?: string[];
  onClickCheckbox?: (value: string) => void;
  selected?: Set<string>;
  name?: string
}

export const CheckboxFiltersGroup = (props: CheckboxFiltersGroupProps) => {
  const {
    className,
    defaultItems,
    onClickCheckbox,
    name,
    selected,
    limit = 5,
    loading,
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
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {
          ...Array(limit)
            .fill(null)
            .map((_, i) => <Skeleton key={i} className="h-6 mb-4 rounded-[6px]" />)
        }
        <Skeleton className="w-28 h-6 mb-4 rounded-[6px]" />
      </div>
    )
  }

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
            name={name}
            checked={selected?.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
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
