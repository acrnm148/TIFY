import axios from "axios";
import { Paying } from "../interface/interface";
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';

// alarm
import { push, ref } from "firebase/database";
import { db } from '../components/firebase';

// 기존 윈도우에 없는 객체에 접근할 때 에러 발생
// 임의로 IMP 값이 있다고 정의해주는 부분
declare const window: typeof globalThis & {
  IMP: any;
};

let paying = {
            amount : -1,
            payType : "",
            celebFrom : "",
            celebTel : "",
            celebContent : "",
            celebImgUrl : "",
            giftId : -1,
            userId : 0,
}
let tk: string | null = null
export function onClickPayment(congratsInfo:Paying, giftName:string, wishUserId:number) {
  paying = congratsInfo
  /* 1. 가맹점 식별하기 */
    const {IMP} = window;
    IMP.init('imp34060260');
    if(!giftName){giftName = '티피로 축하하기'}
    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis.INIpayTest',                           // PG사
      pay_method: 'card',                                     // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,            // 주문번호
      amount: 100,                                            // 결제금액
      name: giftName,                                         // 주문명
      buyer_name: congratsInfo.celebFrom,                    // 구매자 이름
      buyer_tel: congratsInfo.celebTel,                     // 구매자 전화번호
      buyer_email: 'TIFY',                                  // 구매자 이메일
      buyer_addr: '제주시 첨단로8 8',                       // 구매자 주소
      buyer_postcode: '06018',                              // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);


    const pushData = (profile:string) => {
      let base = "/test/tify/"; // 우리 db 기본 주소입니다.
      // email에서 사용가능한 특수문자로 변경한형태로 유저 개인 db table 이름이 설정되어 있습니다.
      // let userCollection = friendsId.replace("@","-").replace(".","-") // ex) rkdrlgks321-naver-com
      push(ref(db, base + wishUserId), {
        text: paying.celebFrom+'님이 '+ giftName+ '에 축하를 보냈습니다!', // 필드는 자유롭게 추가 하셔도 됩니다.
        profile : profile,
        interval: "Daily", // nonSql db라서 확장/수정이 자유롭습니다.
      });
      console.log(wishUserId+'위시 당사자에게 알림 발송 완료!')
    };

    /* 3. 콜백 함수 정의하기 */
    function callback(response: { [x: string]: any; success: any; merchant_uid: any; error_msg: any; }) {
      const {
        success,
        x,
        merchant_uid,
        error_msg,
      } = response;
      console.log(paying, 'paying')
      
      if (success) {
        // success = true
        alert(`결제가 완료되었습니다.`);
        // api/celebrate/ 로 축하요청
        const data = {
          "amount": paying.amount?String(paying.amount):88,
          "payType": "card",
          "celebFrom": paying.celebFrom,
          "celebTel":  paying.celebTel,
          "celebContent": paying.celebContent,
          "celebImgUrl": paying.celebImgUrl,
          "giftId": paying.giftId,
          "userId": paying.userId
        }
        const API_URL = "https://i8e208.p.ssafy.io/api/celebrate/"
        // axios.defaults.headers.common['Authorization'] = `Bearer ${tk?tk:null}`;
        axios.post(API_URL, data
          ).then((res:any) =>{
            console.log('축하 결제 성공!!!', res)
            window.location.href = 'https://i8e208.p.ssafy.io'

            // 축하해준 유저가 비회원이면 유저정보 불러와서 profile 사진 받아오기 
            if (paying.userId!==0){
              const getUser = async () =>{
                const API_URL = `https://i8e208.p.ssafy.io/api/account/userInfo`
                axios({
                  method: 'get',
                  url: API_URL,
                  // headers: { Authorization: `Bearer ${accessToken}` },
                })
                  .then((con: { data: { profileImg: string | undefined }; }) => {
                    console.log('유저정보 불러오기 성공',con.data);
                    if(con.data.profileImg){pushData(con.data.profileImg)}
                  })
                  .catch((err: any) => {
                    console.log('유저정보 불러오기 실패', err);
                  });
              }
              getUser();
            } else{
              // 비회원이면 기본 프로필 이미지
              pushData('')
            }
            history.go(-2)
          }).catch((err:any) => {
            console.log('축하 결제 실패', err)
          })
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    } 

  }



export default onClickPayment;
