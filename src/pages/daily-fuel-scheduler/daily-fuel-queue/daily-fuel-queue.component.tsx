import { useState } from "react";
import DailyQueueItem from "./daily-queue-item/daily-queue-item.component"

import { DailyFuelQueueDataProps } from "./daily-fuel-queue.type";
import mockdata from './mockdata.json'

const DailyFuelQueue = () => {
    return (
        <>
            {
                mockdata.map((each: DailyFuelQueueDataProps, index) => {
                    return (
                        <DailyQueueItem
                            key={index}
                            date={each.date}
                            cards={each.cards}
                        />
                    )
                })
            }
        </>
    )
}

export default DailyFuelQueue;