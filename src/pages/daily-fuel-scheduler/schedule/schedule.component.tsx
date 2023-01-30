import React, { useEffect, useState } from 'react'
import { v4 as uuidV4 } from "uuid";

import ScheduleDragComponent from './schedule-drag.component';
import { CategoryDataType, MockDataType } from './schedule.type'

import mockData from './mockdata.json'

// get data when component first mounted
// update data when drop or drag end in onDrag function
// update data when add schedule

export const DAY_OF_WEEK: Array<number> = [0, 1, 2, 3, 4, 5, 6];
const TITLE_DAY_OF_WEEK: Array<string> = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Schedule = () => {
    const [items, setItems] = useState<any>();

    const updateData = (data:any) => {
        console.log(data)
    }

    useEffect(() => {
        // get schedule data from backend
        // sort by order
        // and use setItems to set the data
        // let rawItems: any = [];

        // mockData && mockData.length && mockData.map((each, index) => {
        //     each && each.data && each.data.length && each.data.map((every, id) => {
        //         let h = every.number_days ? 2 : 0;
        //         let minH = every.number_days ? 2 : 0;
        //         let minW = every.number_days ? 1 : 0;
        //         rawItems.push({
        //             ...every,
        //             order: each.order,
        //             id: uuidV4(),
        //             x: id,
        //             y: 0,
        //             w: every.number_days,
        //             h: h,
        //             minW: minW,
        //             minH: minH,
        //             resizeHandles: ['e']
        //         })
        //     })
        // })
        // setItems(rawItems);
        setItems(mockData);
    }, [])

    return (
        <>
            <DayOfWeek />

            <ScheduleDragComponent
                items={items}
                // setItems={setItems}
                setItems={updateData}
            />
        </>
    )
}

const DayOfWeek = () => (
    <div className="schedule-tab-dayweek">
        {TITLE_DAY_OF_WEEK.map((each, index) => (
            <div className="title-dayweek text-mulish-bold text-17" key={uuidV4()}>
                {each}
            </div>
        ))}
    </div>
)


export default Schedule;