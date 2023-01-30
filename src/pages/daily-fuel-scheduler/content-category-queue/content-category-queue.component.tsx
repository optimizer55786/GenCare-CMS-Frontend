import { useState } from 'react';
import SubPanelBoard from '../../../components/templates/sub-panel/sub-panel.component';
import EmptyQueue from './category-queue-detail/empty-queue/empty-queue.component';
import CategoryListByGroup from './categorylist-by-group/categorylist-by-group.component';
import ContentCategoryQueueItem from './category-queue-detail/content-category-queue-item/content-category-queue-item.component';
import { CategoryType, DataType } from './content-category-queue.type';
import mockData from './mockdata.json';

const ContentCategoryQueue = () => {
  const [flag, setFlag] = useState<number>(1);
  const [selected, setSelected] = useState<CategoryType>();
  const [title, setTitle] = useState<string>('');

  const selectCategory = (selected: CategoryType, title: string): void => {
    console.log(selected, 'selected');
    console.log(title);
    setSelected(selected);
    setTitle(title);
    selected?.number_items_in_queue ? setFlag(2) : setFlag(3); // check
  };

  return (
    <>
      {flag === 1 ? (
        <CategoryListByGroup
          allcategories={mockData}
          selectCategory={selectCategory}
        />
      ) : (
        <SubPanelBoard>
          {flag === 2 ? (
            <EmptyQueue
              selectCategory={selectCategory}
              selected={selected}
              title={title}
            />
          ) : (
            <ContentCategoryQueueItem selected={selected} title={title} />
          )}
        </SubPanelBoard>
      )}
    </>
  );
};

export default ContentCategoryQueue;
