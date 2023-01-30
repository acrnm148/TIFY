import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../css/GiftItemDetailPage.styles.css";

export default function GiftItemDetailPage(){
    const [data, setData] = useState({ hits: [] });
    let {giftId} = useParams();
    useEffect(() => {

        async function get() {
            let completed = false;
            const result = await axios.get(
                `https://i8e208.p.ssafy.io/api/gifthub/product/${giftId}`
            );
            if (!completed) setData(result.data);
            console.log('요청응답',result);
          }
          get();
        
        //   return () => {
        //     completed = true;
        //   };
        // async function fetchData() {
        //     const API_URL = `https://i8e208.p.ssafy.io/api/gifthub/product/${giftId}`;
        //     await axios.get(API_URL
        //         ).then((e)=>{
        //             console.log('상품 디테일 데이터를 받아옴')
        //         }).catch((err) => {
        //             console.log('error', err)
        //         });
        //     }
        // fetchData();
    });
   
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
                    <div className="pro">

                    </div>
                </div>
            </div>
            <div className="product-image"></div>
        </div>
    )
}