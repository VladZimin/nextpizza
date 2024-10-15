import { cn } from "@/lib/utils";
import { Title } from "@/components/shared/title";
import { FilterCheckbox } from "@/components/shared/filterCheckbox";
import { Input } from "@/components/ui";
import { RangeSlider } from "@/components/shared/rangeSlider";
import { CheckboxFiltersGroup } from "@/components/shared/checkboxFiltersGroup";

interface FiltersProps {
  className?: string;
}

export const Filters = ({ className }: FiltersProps) => {
  return (
    <div className={cn("", className)}>
      <Title
        text={"Фильтрация"}
        size={"sm"}
        className={"mb-5 font-bold pb-4 border-b border-b-neutral-100"}
      />
      <div className={"flex flex-col gap-4"}>
        <FilterCheckbox text={"Можно собирать"} value={"1"} />
        <FilterCheckbox text={"Новинки"} value={"2"} />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>
      <CheckboxFiltersGroup
        title={"Ингридиенты"}
        className={"mt-5"}
        limit={5}
        defaultItems={[
          {
            text: "Сырный соус",
            value: "1",
          },
          {
            text: "Чеснок",
            value: "2",
          },
          {
            text: "Сырный соус",
            value: "3",
          },
          {
            text: "Чеснок",
            value: "4",
          },
          {
            text: "Сырный соус",
            value: "5",
          },
          {
            text: "Чеснок",
            value: "6",
          },
        ]}
        items={[
          {
            text: "Сырный соус",
            value: "1",
          },
          {
            text: "Чеснок",
            value: "2",
          },
          {
            text: "Сырный соус",
            value: "3",
          },
          {
            text: "Чеснок",
            value: "4",
          },
          {
            text: "Сырный соус",
            value: "5",
          },
          {
            text: "Чеснок",
            value: "6",
          },
        ]}
      />
    </div>
  );
};
