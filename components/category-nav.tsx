import { category } from "@/lib/utils";
import Link from "next/link";

export default function CategoryNav({ selected }: { selected?: string }) {
  return (
    <div className="w-full flex gap-4">
      {category.map((cat, ind) => (
        <Link
          key={ind}
          href={"/blog/categoria/" + cat.value}
          data-selected={cat.value === selected}
          className="text-green uppercase border text-sm data-[selected=true]:bg-green data-[selected=true]:text-dark-blue border-green px-4 py-2 rounded-full"
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
