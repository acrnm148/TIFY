import axios from "axios";
import { Paying } from "../interface/interface";
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';

// alarm
import { push, ref } from "firebase/database";
import { db } from '../components/firebase';

import defaultProfile from '../assets/defaultProfile.svg'
import Swal from "sweetalert2";

// 기존 윈도우에 없는 객체에 접근할 때 에러 발생
// 임의로 IMP 값이 있다고 정의해주는 부분
declare const window: typeof globalThis & {
  IMP: any;
};

let paying = {
            amount : -1,
            payType : "카드",
            celebFrom : "",
            celebTel : "",
            celebContent : "",
            celebImgUrl : "",
            giftId : -1, 
            userId : 0, // userId 없을 때 0 : 비회원축하
}
let tk: string | null = null
export function onClickPayment(congratsInfo:Paying, giftName:string, wishUserId:number, wishId:number|undefined) {
  console.log(congratsInfo.giftId)
  paying = congratsInfo
  /* 1. 가맹점 식별하기 */
    const {IMP} = window;
    IMP.init('imp34060260');
    if(!giftName || giftName=='현금'){giftName = '티피로 축하하기'}
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

    // giftId값이 없으면 못넘어가게
    if (!paying.giftId || paying.giftId == -1){{
      const result = Swal.fire({
        text:'현금으로 축하하시겠습니까?',
        icon: 'question',
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '승인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        
        reverseButtons: true, // 버튼 순서 거꾸로
      }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        console.log('giftId가 없거나 -1임')
        }
     });
     return
    }}
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
        time: Date.now()
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
        Swal.fire({icon:'success', text:`결제가 완료되었습니다.`});
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

            // 축하해준 유저가 회원이면 유저정보 불러와서 profile 사진 받아오기 
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
              pushData(defaultProfile)
            }
            window.location.href =`https://i8e208.p.ssafy.io/congrats/${wishId}`
            console.log('축하결제성공', data)
          }).catch((err:any) => {
            console.log('축하 결제 실패', err)
            console.log('시도한데이터', data)
          })
      } else {
        Swal.fire({icon:'error', text:`결제 실패: ${error_msg}`});
      }
    } 

  }



export default onClickPayment;
