import beauty from "../assets/iconGhBeauty.svg";
import device from "../assets/iconGhDevice.svg";
import health from "../assets/iconGhHealth.svg";
import fashion from "../assets/iconGhFashion.svg";
import baby from "../assets/iconGhBaby.svg";
import drink from "../assets/iconGhDrink.svg";

import "../css/giftHubCategory.styles.css"
import { useState } from "react";

const CATEGORY_DATA = [
    {id: 1, name : 'beauty', ko:'뷰티', src: beauty},
    {id: 2, name : 'device', ko:'전자기기', src: device},
    {id: 3, name : 'health', ko:'건강', src: health},
    {id: 4, name : 'fashion', ko:'의류', src:fashion},
    {id: 5, name : 'baby', ko:'유아', src:baby},
    {id: 6, name : 'drink', ko:'식품', src:drink},
]
const GiftHubCategory = (props: { propFunction: (arg0: number) => void; }) =>{
    // const [cateSelected, SetCateSelected ] = useState<number | null>();
    
    const cateChangeHandler : React.MouseEventHandler<HTMLImageElement> =(e) =>{
        // SetCateSelected(e.target.value);
        // props.propFunction(cateSelected)
        console.log(e.target , 'e.target') // 
    }

    return(
        <div className="gift-category-icon"  >
            {CATEGORY_DATA.map(data => {
                return(
                    <div>
                        <p>{data.name}</p>
                        <img onClick={cateChangeHandler} src={data.src} alt={data.name} key={data.id}/>
                        <p>{data.ko}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default GiftHubCategory