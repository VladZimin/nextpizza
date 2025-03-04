"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import {Category} from '@prisma/client'

interface CategoriesProps {
  items: Category[]
  className?: string;
}


export const Categories = ({ className, items }: CategoriesProps) => {
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map(({ name, id }, index) => (
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
