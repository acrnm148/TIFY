import "../css/giftItem.styles.css"
// import type { Gift } from "../interface/interface"
interface GiftProps {
    gift :{
        name : string;
        price : number;
    }
    key : number;
}
export function GiftItem({ gift, key } : GiftProps){
    return(
        <div className="gift-item-card-container">
            <div className="gift-item-card">
                <div className="gift-image">
                    <img src="" alt="" />
                </div>
                <div>
                    {/* <p>삼성 비스포크</p>
                    <p>₩ 2,000,000</p> */}
                    <div>
                        <p>{gift.name}</p>
                        <p>{gift.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}