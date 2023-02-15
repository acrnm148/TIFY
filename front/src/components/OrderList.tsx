import '../css/styles.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import XMLParser from 'react-xml-parser';

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

const OrderInfo = () => {
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
  const getBtnType = (
    btnState: any,
    productId: any,
    orderId: any,
    wishId: any,
    giftId: any,
  ) => {
    switch (btnState) {
      case 0: //배송대기중
      case 1: //배송중
      case 2: //배송완료
      case 3: //환불완료
        return (
          <div className="button-div">
            <button
              className="button-left"
              onClick={() => GoToWishPage(wishId)}
            >
              내 위시로 가기
            </button>
            <button
              className="button-right"
              onClick={() => GoProductPage(productId)}
            >
              상품 상세
            </button>
          </div>
        );
      case 4: //재고부족
        return (
          <div className="button-div">
            <button className="button-left">입고 대기</button>
            <button
              className="button-right"
              onClick={() => GoRefundPage(orderId)}
            >
              환불 요청
            </button>
          </div>
        );
      case 5: //축하부족
        return (
          <div className="button-div">
            <button
              className="button-left"
              onClick={() => GoCongratsPage(giftId)}
            >
              축하 보태기
            </button>
            <button
              className="button-right"
              onClick={() => GoRefundPage(orderId)}
            >
              환불 요청
            </button>
          </div>
        );
      default: //상태없음
        return (
          <div className="button-div">
            <button
              className="button-left"
              onClick={() => GoToWishPage(wishId)}
            >
              내 위시로 가기
            </button>
            <button
              className="button-right"
              onClick={() => GoProductPage(productId)}
            >
              상품 상세
            </button>
          </div>
        );
    }
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
        // setTotalPages(response.data.totalPages);
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

  const PageButtons = ({ totalPages }: { totalPages: number }) => {
    // let buttons = [];
    // if (nowLastNum > totalPages) {
    //   setNowLastNum(totalPages);
    // }
    // for (let i = nowStartNum; i <= nowLastNum; i++) {
    //   buttons.push(
    //     <li className={`page-item ${nowPage == i && 'isNowPage'}`} key={i}>
    //       <button
    //         className="page-link"
    //         onClick={() => {
    //           getData(i), setNowPage(i);
    //         }}
    //       >
    //         {i}
    //       </button>
    //     </li>,
    //   );
    // }
    // return <>{buttons}</>;
  };
  const GoToNextPage = () => {
    // let target = nowLastNum + 1;
    // // if(target)
    // //setNowPage(target);
    // getData(target);
    // setNowStartNum(target);
    // setNowLastNum(nowLastNum + pamount);
  };
  const GoToBeforePage = () => {
    // let target = nowStartNum - pamount;
    // if (target < 1) {
    //   return;
    // }
    // //setNowPage(target);
    // getData(target);
    // setNowStartNum(target);
    // setNowLastNum(nowStartNum - 1);
  };

  const navigate = useNavigate();

  const GoToWishPage = (wishId: any) => {
    //나의 위시
    navigate(`/congrats/${wishId}`);
  };
  const GoProductPage = (productId: any) => {
    //상품 상세
    navigate(`/gifthub/${productId}`);
  };
  const GoRefundPage = (orderId: any) => {
    //환불 요청
    navigate(`/mypage/refund/${orderId}`);
  };
  const GoCongratsPage = (giftId: any) => {
    //축하보태기 wishId??
    navigate(`/congrats/${giftId}/giftcard`);
  };
  return (
    <div className="order-div">
      {orders ? (
        <>
          {orders.map((order: orders, idx: any) => (
            <div
              className={
                order.state == 3
                  ? 'order-refund-box shadow-xl'
                  : 'order-box shadow-xl'
              }
            >
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
                {order.state == 3 ? (
                  <div className="refund-info-box">
                    <hr />
                    <div className="refund-info-con">
                      <table>
                        <tr>
                          <td className="td-head">성명</td>
                          <td className="td-con">{order.refUserName}</td>
                        </tr>
                        <tr>
                          <td className="td-head">은행</td>
                          <td className="td-con">{order.refUserBank}</td>
                        </tr>
                        <tr>
                          <td className="td-head">계좌번호</td>
                          <td className="td-con">{order.refUserAccount}</td>
                        </tr>
                        <tr>
                          <td className="td-head">환불일자</td>
                          <td className="td-con">{order.refDate}</td>
                        </tr>
                        <tr>
                          <td className="td-head">환불금액</td>
                          <td className="td-con">{order.orderPrice}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {getBtnType(
                order.state,
                order.gift_product_id,
                order.id,
                order.wishId,
                order.gift_gift_id,
              )}
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
export default OrderInfo;
