import axios from "axios";
import { useState } from "react";
import { Paying } from "../interface/interface";


let paying = {
            amount : -1,
            payType : "",
            celebFrom : "",
            celebTel : "",
            celebContent : "",
            celebImgUrl : "",
            giftId : -1,
            userId : -1,
}
export function onClickPayment(congratsInfo:Paying, giftName:string) {
  paying = congratsInfo
    /* 1. 가맹점 식별하기 */
    const {IMP} = window;
    IMP.init('imp34060260');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis.INIpayTest',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: 100,                                // 결제금액
      name: giftName,                  // 주문명
      buyer_name: congratsInfo.celebFrom,                           // 구매자 이름
      buyer_tel: congratsInfo.celebTel,                     // 구매자 전화번호
      buyer_email: 'TIFY',               // 구매자 이메일
      buyer_addr: '제주시 첨단로8 8',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
    }
    /* 3. 콜백 함수 정의하기 */
    function callback(response: { [x: string]: any; success: any; merchant_uid: any; error_msg: any; }) {
      const {
        success,
        merchant_uid,
        error_msg,
      } = response;
  
      if (success) {
        // success = true
        alert(`결제 성공 ${success}`);
        // api/celebrate/ 로 축하요청
        const data = {
          "amount": String(paying?.amount),
          "payType": "card",
          "celebFrom": paying.celebFrom,
          "celebTel":  paying.celebTel,
          "celebContent": paying.celebContent,
          "celebImgUrl": paying.celebImgUrl,
          "giftId": paying.giftId,
          "userId": paying.userId
        }
        const API_URL = "https://i8e208.p.ssafy.io/api/celebrate/"
        axios.post(API_URL, data
          ).then((res) =>{
            console.log('축하 결제 성공!!!')
            
          }).catch((err) => {
            console.log('축하 결제 실패', err)
          })
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    } 

export default onClickPayment;

