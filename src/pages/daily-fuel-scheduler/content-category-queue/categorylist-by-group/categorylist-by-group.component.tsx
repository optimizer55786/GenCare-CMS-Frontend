import { Row, Col } from "antd";
import SubPanelBoard from "../../../../components/templates/sub-panel/sub-panel.component";
import CategoryListItem from "./categorylist-item/categorylist-item.component";
import { CategoryType, DataType } from "../content-category-queue.type";

interface CategoryListByGroupProps {
  allcategories: DataType[];
  selectCategory: (category: CategoryType, title: string) => void;
}

const CategoryListByGroup = ({
  allcategories,
  selectCategory,
}: CategoryListByGroupProps) => {
  return (
    <>
      {allcategories &&
        allcategories.map((each: DataType, index: number) => {
          return (
            <SubPanelBoard key={index} className="panel-content-category-queue">
              <div className="content-category-queue-title text-uppercase text-mulish-bold text-20">
                {each.title}
              </div>

              <CategoryListItem
                categories={each.categories}
                title={each.title}
                selectCategory={selectCategory}
              />
            </SubPanelBoard>
          );
        })}
    </>
  );
};

export default CategoryListByGroup;
