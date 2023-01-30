import { Link } from "react-router-dom";
import "../css/giftItem.styles.css"
// import type { Gift } from "../interface/interface"
interface GiftProps {
    gift :{
        name : string;
        price : number;
        repImg : string;
        id : number;
    }
    key : number;
}
export function GiftItem({ gift } : GiftProps, key:number){
    return(
        <div  className="gift-item-card-container">
            <Link to={`/gifthub/${gift.id}`}>
                <div className="gift-item-card">
                    <div className="gift-image">
                        <img src={gift.repImg} alt="" />
                    </div>
                    <div>
                        <div>
                            <p>{gift.name}</p>
                            <p>{gift.price}원</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}