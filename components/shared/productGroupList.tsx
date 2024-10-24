"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import { Title } from "@/components/shared/title";
import { ProductCard } from "@/components/shared/productCard";
import { useCategoryStore } from "@/store/category";

interface ProductGroupListProps {
  title: string;
  products: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductGroupList = (props: ProductGroupListProps) => {
  const { title, products, listClassName, categoryId, className } = props;
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });
  const setActiveId = useCategoryStore((state) => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveId]);
  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className={"font-extrabold mb-5"} />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products
          .filter((product) => product.items.length > 0)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
            />
          ))}
      </div>
    </div>
  );
};
