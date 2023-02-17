import '../css/styles.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import XMLParser from 'react-xml-parser';
import { NavLink, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { NavLink } from 'react-router-dom';
// import { Delivery } from '../components/Delivery';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import '../css/orderList.styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

interface orders {
  state: number;
  wishFinishDate: string;
  giftImgUrl: string;
  wishName: string;
  giftName: string;
  orderPrice: number;
  gatheredPrice: number;
  userOption: string;
  max_result: number;
  page: number;
  gift_gift_id: number;
  gift_product_id: number;
  id: number;
  wishId: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
  deliveryNumber: number;
  refUserName: string;
  refUserBank: string;
  refUserAccount: string;
  refDate: string;
}

const DELIVERY_STATE = [
  { id: 0, name: '배송대기중' },
  { id: 1, name: '배송중' },
  { id: 2, name: '배송완료' },
  { id: 3, name: '환불완료' },
  { id: 4, name: '재고부족' },
  { id: 5, name: '축하부족' },
];
const getOrderState = (state: any) => {
  switch (state) {
    case 0:
      return <p className="p-order-state">배송대기중</p>;
    case 1:
      return <p className="p-order-state">배송중</p>;
    case 2:
      return <p className="p-order-state">배송완료</p>;
    case 3:
      return <p className="p-order-state">환불완료</p>;
    case 4:
      return <p className="p-order-state">재고부족</p>;
    case 5:
      return <p className="p-order-state">축하부족</p>;
    default:
      return <p className="p-order-state">상태없음</p>;
  }
};
const Refund = () => {
  let { orderId } = useParams();

  const [open, setOpen] = React.useState(false);

  // Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [nowPage, setNowPage] = useState<number>(0);
  const [nowStartNum, setNowStartNum] = useState<number>(1);
  const pamount = 5;
  const [nowLastNum, setNowLastNum] = useState<number>(pamount);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<orders[] | null>(null);
  const maxResults = 10;

  const baseUrl = 'https://i8e208.p.ssafy.io/api/account/getOrder';
  // const baseUrl = 'http://localhost:8081/api/account/getOrder';

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );

  const handleOpen = (num: any) => {
    const url =
      'http://info.sweettracker.co.kr/tracking/5?t_code=04&t_invoice=' +
      num +
      '&t_key=Hzm5Yw8F24dc4RJvSYkGWA';
    const left = Math.ceil((window.screen.width - 500) / 2);
    const top = Math.ceil((window.screen.height - 680) / 2);
    window.open(
      url,
      'delivery',
      'width=500,height=600,location=no,status=no,scrollbars=yes,left=' +
        left +
        ', top=' +
        top,
    );
    return console.log(num);
  };
  const handleClose = () => setOpen(false);
  const NoResult = () => {
    return (
      <div className="no-result">
        <h1>주문 내역이 없습니다.</h1>
      </div>
    );
  };
  // 환불 요청 데이터
  const [userId, setUserId] = useState(
    useSelector((state: RootState) => state.authToken.userId),
  );
  //const [orderId, setOrderId] = useState<number>();
  const [userName, setUserName] = useState<string>('');
  const [bank, setBank] = useState<string>('');
  const [account, setAccount] = useState<string>('');

  // 유저 폼 유효성 검사
  const [refValidated, setRefValidated] = useState<boolean>();
  const [goUserName, setGoUserName] = useState<boolean>();
  const [goAccount, setGoAccount] = useState<boolean>();
  const [goBank, setGoBank] = useState<boolean>();
  const notValid = () => {
    userName ? setGoUserName(true) : setGoUserName(false);
    bank ? setGoBank(true) : setGoBank(false);
    account ? setGoAccount(true) : setGoAccount(false);
  };
  const requestRefundData = async (userId: number) => {
    try {
      const response = await axios.post(
        `https://i8e208.p.ssafy.io/api/refund`,
        {
          userId: userId,
          orderId: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      console.log(response.data);
      //setUserName();
    } catch (error) {}
  };
  const getData = async (page: number) => {
    axios({
      method: 'get',
      url: baseUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        console.log(response);
        setOrders([...response.data.content]);
        console.log(response.data.content);
        return response.data.content;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (orders === null) {
    getData(0);
  }
  const refund = (orderId: any) => {
    //환불 요청
    const API_URL = 'https://i8e208.p.ssafy.io/api/refund';
    const data = {
      userId: userId,
      userName: userName,
      orderId: orderId,
      account: account,
      bank: bank,
    };
    console.log('data', data);
    axios({
      url: API_URL,
      method: 'POST',
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
    })
      .then((con: any) => {
        console.log('환불 요청 성공', con, userId);

        Swal.fire('환불 요청이 완료되었습니다.');
        window.location.href = '/mypage/order';
      })
      .catch((err: any) => {
        console.log('환불 요청 실패', err);
      });
    //refund(orderId);
  };

  return (
    <div className="order-div">
      {orders ? (
        <>
          {orders.map((order: orders, idx: any) => (
            <div className="order-refund-input-box shadow-xl">
              <div className="order-box-top">
                <p className="p-order-state">{getOrderState(order.state)}</p>
                <p className="p-finished-date">
                  {order.wishFinishDate} 위시 종료
                </p>
              </div>
              <div className="gift-info-div">
                <img
                  src={
                    order.giftImgUrl === null
                      ? 'https://tifyimage.s3.ap-northeast-2.amazonaws.com/63ba5e95-1e5d-4579-9c67-f1f0ebc6c694.png'
                      : order.giftImgUrl
                  }
                  alt=" "
                  className="gift-img"
                />
                <div className="gift-info-detail-div">
                  <div className="detail-top-div">
                    <p className="p-wish-name">{order.wishName}</p>
                  </div>
                  <div className="wrap-detail-div">
                    <div className="detail-left-div">
                      <p className="p-gift-name">상품명 : {order.giftName}</p>
                      <p className="p-gift-price">
                        결제금액 : {order.orderPrice}원
                      </p>
                    </div>
                    <div className="detail-right-div">
                      <p className="p-gift-option">
                        옵션 : {order.userOption ? order.userOption : '없음'}
                      </p>
                      <p className="p-gift-gathered-price">
                        축하금액 : {order.gatheredPrice}원
                      </p>
                    </div>
                    {order.state == 1 || order.state == 2 ? (
                      <p
                        className="p-delilvery"
                        onClick={() => handleOpen(order.deliveryNumber)}
                      >
                        배송조회
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="refund-info-box">
                  <p className="refund-info-head">환불 계좌 정보</p>
                  <hr />
                  <div className="refund-info-con">
                    <div className="refund-input">
                      <label htmlFor="성명">성명</label>
                      <input
                        className="input-small"
                        type="text"
                        name="성명"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="성명"
                      />
                      {goUserName === false && (
                        <span className="warning">
                          환불 받으실 분의 성명을 입력해주세요.
                        </span>
                      )}
                    </div>
                    <div className="refund-input">
                      <label htmlFor="은행">은행</label>
                      <select
                        name="refund-bank"
                        className="refund-bank-select"
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option disabled selected>
                          은행 선택
                        </option>
                        <option value="부산은행">부산은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="KB국민은행">KB국민은행</option>
                        <option value="경남은행">경남은행</option>
                        <option value="NH농협">NH농협</option>
                        <option value="하나은행">하나은행</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                      </select>
                      {goBank === false && (
                        <span className="warning">은행을 선택해주세요.</span>
                      )}
                    </div>
                    <div className="refund-input">
                      <label htmlFor="계좌번호">계좌번호</label>
                      <input
                        className="input-small"
                        type="text"
                        name="계좌번호"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="계좌번호"
                      />
                      {goAccount === false && (
                        <span className="warning">
                          환불 받을 계좌를 입력해주세요.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="button-div">
                    <button
                      className="button-refund"
                      onClick={() => refund(orderId)}
                    >
                      환불 요청
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <NoResult />
      )}
      {/* {orders && (
        <ul className="page-btns">
          <div onClick={() => GoToBeforePage()}>좌</div>
          <PageButtons totalPages={totalPages} />
          <button onClick={() => GoToNextPage()}>우</button>
        </ul>
      )} */}
    </div>
  );
};
export default Refund;
