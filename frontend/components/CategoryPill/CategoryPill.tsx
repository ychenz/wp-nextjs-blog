import React, { ReactElement, PureComponent } from "react";
import Link from "next/link";
import {  WPCategory } from "services/dataModels";
import {
  CategoryLink
} from "./styles";

interface CategoryPillProps {
  category: Partial<WPCategory>;
  isActive?: boolean;
}

class CategoryPill extends PureComponent<CategoryPillProps> {
  render(): ReactElement {
    const { category, isActive } =  this.props;
    const urlPathname = `/category/${category.slug}`;

    return (
      <Link
        as={urlPathname}
        href={`/category?slug=${category.slug}&apiRoute=category`}
        key={category.id}
      >
        <CategoryLink isActive={isActive} categoryId={category.id}>{category.name}</CategoryLink>
      </Link>
    );
  }
}

export default CategoryPill;
