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
                        {gift.repImg  
                            ? <img src={gift.repImg} alt="" />
                            : <img src="https://user-images.githubusercontent.com/87971876/215664788-d0359920-497d-4b2a-86db-6381254637d6.jpg" alt="이미지가 없습니다" />}
                        
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