import { useParams } from "react-router";
import "../css/GiftItemDetailPage.styles.css";

export default function GiftItemDetailPage(){
    let {giftId} = useParams();
    return(
        <div className="gift-item-detail-container">
            <h1> {giftId}번 상품의 디테일페이지</h1>
            <p>뒤로가기</p>
            <div className="product-info">
                <img src="" alt="" />
                <div className="product-info-right">
                    <div className="product-name-like">
                        <p></p>
                        <img src="" alt="" />
                    </div>
                    <div className="product-price-option">
                        <p></p>
                        <div></div>
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
            <div className="product-image"></div>
        </div>
    )
}