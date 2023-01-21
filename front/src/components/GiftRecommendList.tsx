import { GiftItem } from "./GiftItem";
import "../css/giftRecommendList.styles.css";
import type { Gift, GiftProps } from "../interface/interface"

export function GiftRecommendList({ giftList } : GiftProps){
    return(
        <div className="gift-recommend-list-container">
            <div className="recommend-lists">
                <div className="gift-recommend-list">
                    <p>{}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        {giftList.map((gift, i:number) => (
                            <GiftItem key={i} gift={gift} />
                        ))}
                    </div>
                </div>
                <div className="gift-recommend-list">
                    <p>{}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        {giftList.map((gift, i:number) => (
                            <GiftItem key={i} gift={gift} />
                        ))}
                    </div>
                </div>
                <div className="gift-recommend-list">
                    <p>{}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        {giftList.map((gift, i:number) => (
                            <GiftItem key={i} gift={gift} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}