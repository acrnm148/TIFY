import { GiftRecommend } from "./GiftRecommend";
import "../css/giftRecommendList.styles.css";

export function GiftRecommendList(){
    return(
        <div className="gift-recommend-list-container">
            <div className="recommend-lists">
                <div className="gift-recommend-list">
                    <p>{}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        <GiftRecommend />
                        <GiftRecommend />
                        <GiftRecommend />

                    </div>
                </div>
                <div className="gift-recommend-list">
                    <p>{}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        <GiftRecommend />
                        <GiftRecommend />
                        <GiftRecommend />
                    </div>
                </div>
                <div className="gift-recommend-list">
                    <p>{}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        <GiftRecommend />
                        <GiftRecommend />
                        <GiftRecommend />
                    </div>
                </div>
            </div>
        </div>

    );
}