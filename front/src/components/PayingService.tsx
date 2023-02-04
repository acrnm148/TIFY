import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

let giftName = '';
let giftPrice = '';
function callProps() {
  const location = useLocation();
  giftName = location.state.giftName;
  giftPrice = location.state.giftPrice;
  return [giftName, giftPrice];
}

class PayingService extends React.Component {
  // result = callProps()
  state = {
    // 응답에서 가져올 값들
    next_redirect_pc_url: '',
    tid: '',
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '선물골라서 이름 받아아하는데 안오네 ㅠ',
      quantity: 1,
      total_amount: 53412,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: 'http://localhost:5173/congrats/kakaopay/result', //결제 성공시 url => 결제가 성공되었습니다
      fail_url: 'http://localhost:5173/congrats/kakaopay/result', //결제 실패시 url => 작성중이던 페이지로
      cancel_url: 'http://localhost:5173/congrats/kakaopay/result', // 결제 취소시 url => 작성중이던 페이지로
    },
  };
  componentDidMount() {
    const { params } = this.state;
    axios({
      // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
      url: '/v1/payment/ready',
      // 결제 준비 API는 POST 메소드라고 한다.
      method: 'POST',
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        Authorization: 'KakaoAK ca400177396e50742c260c10224231f9',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then((response) => {
      // 응답에서 필요한 data만 뽑는다.
      const {
        data: { next_redirect_pc_url, tid },
      } = response;

      console.log(next_redirect_pc_url);
      console.log(tid);
      window.localStorage.setItem('tid', tid); // localStorage에 tid
      this.setState({ next_redirect_pc_url, tid }); // 응답 data로 state 갱신

      window.location.href = next_redirect_pc_url;
    });
  }

  render() {
    const { next_redirect_pc_url } = this.state;

    return (
      <div>
        <h2>결제요청중...</h2>
      </div>
    );
  }
}
export default PayingService;

// 위의 과정까지는 결제요청완료
// pg_token=28fdad2c08a69a771b69 받은 토큰으로 승인요청해야 완전히 결제완료
