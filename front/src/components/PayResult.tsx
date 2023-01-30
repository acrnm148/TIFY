import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../css/payResult.styles.css"
import iconGift from "../assets/iconGift.svg"


let payStatus = true
function retryHandler(){
    history.go(-1);
  }

class PayResult extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    const { params } = this.state;
    // const {location: { search }} = props;
    const search = window.location.search;
    // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    params.pg_token = search.split("=")[1];
  }

  state = {
    params: {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: "",
    },
  };

  componentDidMount() {
    const { params } = this.state;

    axios({
      url: "/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK ca400177396e50742c260c10224231f9",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log(response);
      if(response.status === 200){
          console.log('결제성공');
      } 
    }).catch((error) => {
        console.log(error);
        
        if(error.response.status === 400){
            if (error.response.data.code === -702){
                alert('결제가 이미 처리되었습니다!')
                return
            } 
            else if (error.response.data.code === -723){
                // alert('결제 요청이 만료되었습니다! 다시 시도해주세요!')
                payStatus = false
                return
            } 
            else{
                // alert('결제를 다시 시도해주세요')
                // history.go(-1);
                payStatus = false
                // 결제 다시 시도하기 선택 버튼 
                console.log('결제실패');
                return
            }
        }
    })
  }
  render() {
    return (
        <>
        {
            payStatus?
            <div className="pay-result-container">
                <div className="pay-result">
                    <img src={iconGift} />
                    <p>축하보내기가 완료되었습니다!</p>
                    <p className="fin">지금 티피에서 {}님의 위시를 만들어보세요!</p>
                    <NavLink className="make-wish-btn" to="/makewish">위시만들기</NavLink>
                </div>
            </div>
            :
            <div className="pay-result-container">
                <p>결제에 실패했습니다</p>
                <p>다시 시도해주세요!</p>
                <a onClick={()=> retryHandler()}>결제 다시 시도하기</a>
            </div>
        }
        
        </>
    );
  }
}
export default PayResult;