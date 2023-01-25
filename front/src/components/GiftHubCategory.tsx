import beauty from "../assets/iconGhBeauty.svg";
import device from "../assets/iconGhDevice.svg";
import health from "../assets/iconGhHealth.svg";
import fashion from "../assets/iconGhFashion.svg";
import baby from "../assets/iconGhBaby.svg";
import drink from "../assets/iconGhDrink.svg";

import "../css/giftHubCategory.styles.css"

export function GiftHubCategory(){
    return(
        <div className="gift-category-icon">
            <div>
                <img src={beauty} alt="beauty" />
                <p>뷰티</p>
            </div>
            <div>
                <img src={device} alt="device" />
                <p>전자제품</p>
            </div>
            <div>
                <img src={health} alt="health" />
                <p>건강</p>
            </div>
            <div>
                <img src={fashion} alt="fashion" />
                <p>의류</p>
            </div>
            <div>
                <img src={baby} alt="baby" />
                <p>아기</p>
            </div>
            <div>
                <img src={drink} alt="drink" />
                <p>식품</p>
            </div>

        </div>
    );
}