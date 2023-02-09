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
}

const OrderInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<orders[]>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const maxResults = 10;
  const baseUrl = 'https://i8e208.p.ssafy.io/api/account/getOrder';

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
        setOrders([...response.data]);
        // setTotalPages(response.data.totalPages);
        console.log(response.data);
        return response.data;
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
          {/* <OrderCardActive searchResults={searchResults}></OrderCardActive> */}
          {/* <OrderCardActive searchResults={searchResults}></OrderCardActive> */}
          {/* <OrderCardActive searchResults={searchResults}></OrderCardActive> */}
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

  /*
  function getOrderState(state) {
    switch (state) {
      case 0:
        return <p className="p-order-state">축하부족</p>;
      case 1:
        return <p className="p-order-state">배송중</p>;
      case 2:
        return <p className="p-order-state">배송완료</p>;
      case 3:
        return <p className="p-order-state">환불완료</p>;
      case 4:
        return <p className="p-order-state">재고부족</p>;
      default:
        return <p className="p-order-state">상태없음</p>;
    }
  }
  */

  return (
    // jsx요소로 쓸 때 리턴값이 <div></div> 나 <></> 하나로 묶여있어야함
    <div className="order-div">
      {props.orders.map((order: orders, idx: any) => (
        <div className="order-box shadow-xl">
          <div className="order-box-top">
            <p className="p-order-state">
              {order.state === 1 ? '배송완료' : ''}
            </p>
            <p className="p-finished-date">
              {order.wishFinishDate} 2023.02.09 위시 종료
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
                  <p className="p-gift-name">{order.giftName}</p>
                  <p className="p-gift-price">
                    결제금액 : {order.orderPrice}원
                  </p>
                </div>
                <div className="detail-right-div">
                  <p className="p-gift-option">옵션 : 없음</p>
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
          <div className="button-div">
            <button className="button-go-wish">내 위시로 가기</button>
            <button className="button-detail">상품 상세</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrderInfo;
