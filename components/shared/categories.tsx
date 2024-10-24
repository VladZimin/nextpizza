"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

interface CategoriesProps {
  className?: string;
}

const cats = [
  { id: 1, name: "Пиццы" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Коктейли" },
  { id: 5, name: "Напитки" },
  { id: 6, name: "Кофе" },
  { id: 7, name: "Десерты" },
];

export const Categories = ({ className }: CategoriesProps) => {
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map(({ name, id }, index) => (
        <a
          key={index}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl cursor-pointer px-5",
            activeId === id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          {name}
        </a>
      ))}
    </div>
  );
};
