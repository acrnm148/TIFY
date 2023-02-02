import home from "../assets/iconCHome.svg";
import beauty from "../assets/iconCBeauty.svg";
import device from "../assets/iconCDevice.svg";
import kitchen from "../assets/iconCKitchen.svg";
import drink from "../assets/iconCFood.svg";
import baby from "../assets/iconCBirthBaby.svg";
import interior from "../assets/iconCInterior.svg"
import dogcat from "../assets/iconCDogCat.svg";

import "../css/giftHubCategory.styles.css"
import { useState } from "react";

const CATEGORY_DATA = [
    {id: 0, name : 'all', ko:'전체', src:home},
    {id: 1, name : 'beauty', ko:'뷰티', src: beauty},
    {id: 2, name : 'device', ko:'전자기기', src: device},
    {id: 3, name : 'kitchen', ko:'키친', src: kitchen},
    {id: 4, name : 'food', ko:'식품', src:drink},
    {id: 5, name : 'birthbaby', ko:'출산유아', src:baby},
    {id: 6, name : 'interior', ko:'인테리어', src:interior},
    {id: 7, name : 'dogcat', ko:'반려동물', src:dogcat},

]
const GiftHubCategory = (props:{propFunction: (arg0: number) => void}) =>{
    
    const cateChangeHandler =(e:number) =>{
        props.propFunction(e)
        console.log(e , 'e') // 
    }

    return(
        <div className="gift-category-icon"  >
            {CATEGORY_DATA.map((data, i:number) => {
                return(
                    <div>
                        <p>{data.name}</p>
                        <img onClick={() =>cateChangeHandler(i)} src={data.src} alt={data.name} key={data.id}/>
                        <p>{data.ko}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default GiftHubCategory