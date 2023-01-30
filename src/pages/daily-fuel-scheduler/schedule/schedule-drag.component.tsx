import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import RGL, { WidthProvider } from "react-grid-layout";
import _, { each } from "lodash";
import { v4 as uuidV4 } from "uuid";
import { Popover, InputNumber, Button } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons"

import PopUp from './popup/popup.component'
import SvgIcon from "~/components/atoms/SvgIcon/SvgIcon";

import { DAY_OF_WEEK } from "./schedule.component";
import { MockDataType } from "./schedule.type";
import './schedule.less';

const ReactGridLayout = WidthProvider(RGL);
const addText = "+ add";

export interface ScheduleDragComponentProps {
    items: MockDataType[];
    setItems: (data: any) => any;
}

export interface PopUpTitleElementProps {
    title: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AddPopOverProps {
    el: number;
}

export interface EditPopOverProps {
    el: any;
    onEditItem: (id: string) => void;
}

const PopUpTitleElement = ({ title, setOpen }: PopUpTitleElementProps) => {

    return (
        <>
            <span className="popup-schedule-title">{title}</span>
            <SvgIcon name="close" color="#888888" width={12} height={12} onClick={() => setOpen(false)} />
        </>
    )
}

const AddPopOver = ({
    el
}: AddPopOverProps) => {

    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover
            placement="bottom"
            title={
                <PopUpTitleElement title="What content category would you like to add to the schedule?" setOpen={setOpen} />}
            open={open}
            content={
                <PopUp prefix={el} setOpen={setOpen} />
            }
            trigger="click"
            onOpenChange={handleOpenChange}
        >
            <div className="schedule-card-add-btn" onClick={() => setOpen(true)}>
                {addText}
            </div>
        </Popover>
    )

}


const EditPopOver = ({
    el,
    onEditItem
}: EditPopOverProps) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number>();
    // console.log(el, "element")
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    useEffect(() => {
        setValue(el.w)
    }, [el])

    return (
        <Popover
            placement="bottom"
            title="Edit Item"
            open={open}
            trigger="click"
            onOpenChange={handleOpenChange}
            content={
                <>
                    <InputNumber
                        min={1}
                        max={7}
                        defaultValue={3}
                        value={value}
                        onChange={(v: number | null) => { v && setValue(v) }}
                    // onPressEnter={() => moveByInput()}
                    // onClick={() => onEditItem(el.id)}
                    />
                    <Button onClick={() => console.log(el, "edit item")} type="default">Set</Button>
                </>
            }
        >
            <EditFilled className="card-icon" onClick={() => setOpen(true)} />
        </Popover>
    )
}

const ScheduleDragComponent = ({
    items,
    setItems,
}: ScheduleDragComponentProps) => {

    const [scheduleData, setScheduleData] = useState<any>();
    const [breakpoint, setBreakpoint] = useState();
    const [cols, setCols] = useState();

    // We're using the cols coming back from this to calculate where to add new items.
    const onBreakpointChange = (breakpoint: any, cols: any) => {
        setBreakpoint(breakpoint);
        setCols(cols);
    }

    const updateScheduleData = () => {
        
    }

    const onEditItem = (i: string) => {
        console.log(i)
    }

    const onRemoveItem = (i: string) => {
        console.log(i, "=============")
        console.log(scheduleData, "scheduleData")
        setScheduleData(_.reject(scheduleData, { id: i }));
        // setItems(_.reject(scheduleData, { id: i }));
    }

    const createElement = (el: any) => {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        }
        // const i = el.add ? "+" : el.i;
        const category = el.category;
        return (
            <div className="schedule-card" key={el.id} data-grid={el} style={{ backgroundColor: el.background_color + "50" }}>
                <div className="schedule-card-vbar" style={{ backgroundColor: el.background_color }}></div>
                <div className="schedule-card-body">
                    <p className="text text-center schedule-card-category-text">{category}</p>
                    <div className="schedule-card-icon-container">
                        <EditPopOver el={el} onEditItem={() => onEditItem(el.id)} />
                        <DeleteFilled className="card-icon" onClick={() => onRemoveItem(el.id)} />
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => { // set schedule data when loading
        let rawItems: any = [];

        items && items.length && items.map((each, index) => {
            each && each.data && each.data.length && each.data.map((every, id) => {
                let h = every.number_days ? 2 : 0;
                let minH = every.number_days ? 2 : 0;
                let minW = every.number_days ? 1 : 0;
                // console.log(id)
                rawItems.push({
                    ...every,
                    order: each.order,
                    id: uuidV4(),
                    x: id,
                    y: 0,
                    w: every.number_days,
                    h: h,
                    minW: minW,
                    minH: minH,
                    resizeHandles: ['e']
                })
            })
        })
        setScheduleData(rawItems);
    }, [items])

    return (
        <>
            <div className="schedule-detailed-container">
                <ReactGridLayout
                    onBreakpointChange={onBreakpointChange}
                    items={7}
                    rowHeight={30}
                    cols={7}
                >
                    {_.map(scheduleData, (el) => createElement(el))}
                </ReactGridLayout>

                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {
                        DAY_OF_WEEK.map((el) => (
                            <AddPopOver
                                el={el}
                                key={uuidV4()}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="schedule-virtual-component">
                {DAY_OF_WEEK.map((e, id) => {
                    return (
                        <div key={uuidV4()}></div>
                    )
                })}
            </div>
        </>
    )
}


export default ScheduleDragComponent;