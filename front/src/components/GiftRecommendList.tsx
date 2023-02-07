import { GiftItem } from "./GiftItem";
import "../css/giftRecommendList.styles.css";
import type { Gift, GiftProps } from "../interface/interface"
export function GiftRecommendList(props:{ giftList: GiftProps, category:number}){
    // const a = Math.random()  * (giftList.length-3)
    // const b = Math.random()  * (giftList.length-3)
    // const c = Math.random()  * (giftList.length-3)
    const GiftRecommend = (props:{
        giftList: any;num:number, wish:string
}) =>{
        return(
            <div className="gift-recommend-list">
                    <p>{props.wish}위시에 가장 많이 주고받은 선물</p>
                    <div className="gift-only-list">
                        {props.giftList.slice(props.num, props.num+3).map((gift: { name: string; price: number; repImg: string; id: number; }, i:number) => (
                            <GiftItem key={i} gift={gift} />
                        ))}
                    </div>
                </div>
        )
    }
    return(
        <div className="gift-recommend-list-container">
            <div className="recommend-lists">
                <GiftRecommend giftList={props.giftList} wish='생일' num = {Math.random()  * (props.giftList.length-3)}/>
                <GiftRecommend giftList={props.giftList} wish='결혼' num = {Math.random()  * (props.giftList.length-3)}/>
                <GiftRecommend giftList={props.giftList} wish='졸업' num = {Math.random()  * (props.giftList.length-3)}/>
                
            </div>
        </div>

    );
}