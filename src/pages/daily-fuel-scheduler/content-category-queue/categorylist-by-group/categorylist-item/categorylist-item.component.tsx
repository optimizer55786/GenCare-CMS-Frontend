import { Row, Col } from "antd";
import { CategoryType } from "../../content-category-queue.type"
import "./categorylist-item.less";

interface CategoryListItemProps {
    categories: CategoryType[];
    title: string;
    selectCategory: (category: CategoryType, title: string) => void;
}

const CategoryListItem = ({
    categories,
    title,
    selectCategory
}: CategoryListItemProps) => {

    const onClickCategoryItem = (category: CategoryType, title: string) => {
        selectCategory(category, title);
    }

    return (
        <Row>
            {
                categories && categories.map((each: CategoryType, index: number) => {
                    return (
                        <Col xs={24} sm={12} md={8} xl={8} lg={8} key={`content_category_${index}`} className="category-list-container">
                            <div className="content-category-item col-4" onClick={() => onClickCategoryItem(each, title)}>
                                <div className="content-category-item-name text-uppercase text-16">
                                    {each?.name}
                                </div>
                                <div className="content-category-item-queue content-category-item-queue-active">
                                    {`${each?.number_items_in_queue} Items in Queue`}
                                </div>
                                <div className="content-category-item-queue content-category-item-queue-expired">
                                    {`${each?.number_items_disabled} expired`}
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
        </Row >
    )
}

export default CategoryListItem;