import React, {  useState,  } from "react";
import Slider from "@mui/material/Slider";


export function FriendsPage() {
    const [min, max] = [0, 1000000]
    const step = 1000
    const [value, setValue] = useState<number[]>([20, 37]);
    
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        console.log(value)
    };

    return (
        <>
            <h1>테스트중</h1>
            <div>{value[0]}원 ~ {value[1]}원</div>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={step}
                min = {min}
                max = {max}
                />
        </>
    ); 
}


