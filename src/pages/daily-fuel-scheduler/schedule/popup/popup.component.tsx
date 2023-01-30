import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Select as AntdSelect } from "antd"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from "~/components/atoms/Button";

import "./popup.less"


const { Option } = AntdSelect;
const labelDaysOfWeekToShow = "day of the week to be shown";
const labelSameContentDays = "same content should be shown for how many days?";
const labelTimeToShow = "time to be shown";
const categoryMockData = [
    {
        value: "care-breathworks",
        label: "Care: Breathworks"
    },
    {
        value: "care-meditations",
        label: "Care: Meditations"
    },
    {
        value: "care-mindfulness",
        label: "Care: Mindfulness"
    },
];

const generateDimentionalArray = (day: string): Array<number> => {
    let newArrayFromDays = new Array();
    for (let i = 1; i <= Number(day); i++) {
        newArrayFromDays.push(i);
    }

    return newArrayFromDays;
}

const generateTimeDimentionalArray = () => {
    let x = 30; //minutes interval
    let times = []; // time array
    let tt = 480; // start time
    var ap = ['AM', 'PM']; // AM-PM

    //loop to increment the time and push results in array
    for (let i = 0; tt < 20.5 * 60; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = (tt % 60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
    }

    return times;

}

const convertFullDay = (prefix: number): string => {
    switch (prefix) {
        case 0:
            return "Monday"
        case 1:
            return "Tuesday"
        case 2:
            return "Wednesday"
        case 3:
            return "Thursday"
        case 4:
            return "Friday"
        case 5:
            return "Saturday"
        case 6:
            return "Sunday"
        default:
            return "Monday"
    }
}

interface PopUpProps {
    prefix: number;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const PopUp = ({
    prefix,
    setOpen
}: PopUpProps) => {

    const [sameContentDayOrigin, setSameContentDayOrigin] = useState<string>("1");
    const [sameContentDay, setSameContentDay] = useState<string>("1");
    const [timeToShow, setTimeToShow] = useState<string>("08:00AM");

    const onChangeCategory = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearchCategory = (value: string) => {
        console.log('search:', value);
    };

    const onChangeValue = (event: SelectChangeEvent, id: number) => {
        switch (id) {
            case 1:
                setSameContentDay(event.target.value as string);
                break;
            case 2:
                console.log(event.target.value)
                setTimeToShow(event.target.value as string);
                break;
            default:
                break;
        }
    }

    const getRestDays = (prefix: number) => {
        switch (prefix) {
            case 0:
                setSameContentDayOrigin("6");
                break;
            case 1:
                setSameContentDayOrigin("5");
                break;
            case 2:
                setSameContentDayOrigin("4");
                break;
            case 3:
                setSameContentDayOrigin("3");
                break;
            case 4:
                setSameContentDayOrigin("2");
                break;
            case 5:
                setSameContentDayOrigin("1");
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getRestDays(prefix);
    }, [])

    return (
        <div style={{ zIndex: 9999 }}>
            <div className="popup-content" style={{ zIndex: 9999 }}>
                <AntdSelect
                    className="popup-schedule-select"
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    onChange={onChangeCategory}
                    onSearch={onSearchCategory}
                    filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {
                        categoryMockData?.map((each, index) => {
                            return (
                                <Option value={each.value} key={each.value + index}>{each.label}</Option>
                            )
                        })
                    }

                </AntdSelect>

                <FormControl fullWidth margin='normal'>
                    <InputLabel id="label-days-week days-week" className="schedule-select">{labelDaysOfWeekToShow}</InputLabel>
                    <Select
                        labelId="label-days-week"
                        id="select-days-week"
                        className='days-week text-camelcase'
                        value={prefix}
                        label={labelDaysOfWeekToShow}
                    >
                        <MenuItem value={prefix}>{convertFullDay(prefix)}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin='normal'>
                    <InputLabel id="label-same-content-day">{labelSameContentDays}</InputLabel>
                    <Select
                        labelId="label-same-content-day"
                        id="select-same-content-day"
                        value={sameContentDay}
                        label={labelSameContentDays}
                        onChange={(e) => onChangeValue(e, 1)}
                    >
                        {generateDimentionalArray(sameContentDayOrigin).map(each => {
                            return (
                                <MenuItem value={each} key={`same-content-${each}`}>{each}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin='normal'>
                    <InputLabel id="label-time-to-show">{labelTimeToShow}</InputLabel>
                    <Select
                        labelId="label-time-to-show"
                        id="select-time-to-show"
                        value={timeToShow}
                        label={labelTimeToShow}
                        onChange={(e) => onChangeValue(e, 2)}
                    >
                        {generateTimeDimentionalArray().map(each => {
                            return (
                                <MenuItem value={each} key={`time-to-show-${each}`}>{each}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className="popup-footer">
                <Button onClick={() => setOpen(false)}>save</Button>
            </div>
        </div >
    )
}

export default PopUp;