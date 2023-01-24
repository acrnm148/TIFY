import { GiftItem } from "./GiftItem";
import "../css/giftHubList.styles.css"
import type { Gift, GiftProps } from "../interface/interface"

export function GiftHubList({ giftList } : GiftProps){
    return (
        <div className="gift-list-con-container">
           <div className="gift-list-container">
                <div className="gift-list">
                    {giftList.map((gift, i:number) => (
                        <GiftItem key={i} gift={gift} />
                    ))}
                </div>
            </div> 
            <div>
                
            </div>    
        </div>
    
    );
}