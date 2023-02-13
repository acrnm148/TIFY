import '../css/styles.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import XMLParser from 'react-xml-parser';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Delivery } from '../components/Delivery';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import '../css/orderList.styles.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';

interface orders {
  state: number;
  wishFinishDate: string;
  giftImgUrl: string;
  wishName: string;
  giftName: string;
  orderPrice: number;
  gatheredPrice: number;
  userOption: string;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<orders[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const maxResults = 10;
  //const baseUrl = 'https://i8e208.p.ssafy.io/api/account/getOrder';
  const baseUrl = 'http://localhost:8081/api/account/getOrder';

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
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
  return (
    <div className="order-div">
      {orders && (
        <>
          <OrderCardActive orders={orders}></OrderCardActive>
        </>
      )}
    </div>
  );
};

const OrderCardActive = (props: { orders: orders[] }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const NoResult = () => {
    //console.log(props.orders.length);
    return (
      <div className="no-result">
        <h1>주문 내역이 없습니다.</h1>
      </div>
    );
  };
  const getOrderState = (state: any) => {
    //console.log(props.orders.length);
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
  const getBtnType = (btnState: any) => {
    //console.log(props.orders.length);
    switch (btnState) {
      case 0: //배송대기중
      case 1: //배송중
      case 2: //배송완료
      case 3: //환불완료
        return (
          <div className="button-div">
            <button className="button-left">내 위시로 가기</button>
            <button className="button-right">상품 상세</button>
          </div>
        );
      case 4: //재고부족
        return (
          <div className="button-div">
            <button className="button-left">입고 대기</button>
            <button className="button-right">환불 요청</button>
          </div>
        );
      case 5: //축하부족
        return (
          <div className="button-div">
            <button className="button-left">축하 보태기</button>
            <button className="button-right">환불 요청</button>
          </div>
        );
      default: //상태없음
        return (
          <div className="button-div">
            <button className="button-left">내 위시로 가기</button>
            <button className="button-right">상품 상세</button>
          </div>
        );
    }
  };

  return (
    // jsx요소로 쓸 때 리턴값이 <div></div> 나 <></> 하나로 묶여있어야함
    <div className="order-div">
      {props.orders.length > 0 ? (
        <>
          {props.orders.map((order: orders, idx: any) => (
            <div className="order-box shadow-xl">
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
                      <p className="p-gift-option">옵션 : {order.userOption}</p>
                      <p className="p-gift-gathered-price">
                        축하금액 : {order.gatheredPrice}원
                      </p>
                    </div>
                    <p className="p-delilvery" onClick={handleOpen}>
                      배송조회
                    </p>
                  </div>
                  <div className="modal-con">
                    <Modal
                      className="modal-modal"
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                    >
                      <Fade in={open}>
                        <Box>
                          <Delivery />
                        </Box>
                      </Fade>
                    </Modal>
                  </div>
                </div>
              </div>
              {getBtnType(order.state)}
            </div>
          ))}
        </>
      ) : (
        <NoResult />
      )}
    </div>
  );
};
export default OrderInfo;
