import '../css/styles.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import XMLParser from 'react-xml-parser';

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Delivery } from '../components/Delivery';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import '../css/orderList.styles.css';

export function OrderList() {
  return (
    <div className="order-div">
      <OrderCardActive title="hello"></OrderCardActive>
      <OrderCardActive title="hello"></OrderCardActive>
      <OrderCardActive title="hello"></OrderCardActive>
      <OrderCardActive title="hello"></OrderCardActive>
    </div>
  );
}

function OrderCardActive(props: { title: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="order-box shadow-xl">
      <p className="p-order-state">배송완료</p>
      {/* <p className="joined-wish-title">"{props.title}"</p> */}
      <div className="gift-info-div">
        <img src="" alt=" " className="gift-img" />
        <div className="gift-info-detail-div">
          <div className="detail-top-div">
            <p className="p-finished-date">22.01.13. 위시 종료&nbsp;</p>
            <p className="p-wish-name">(22번째 생일)</p>
          </div>
          <div className="wrap-detail-div">
            <div className="detail-left-div">
              <p className="p-gift-name">플레이스테이션 5</p>
              <p className="p-gift-price">430,000원</p>
            </div>
            <div className="detail-right-div">
              <p className="p-gift-option">옵션 : 듀얼쇼크/512gb</p>
              <p className="p-gift-gathered-price">축하금액 : 1,920,000원</p>
            </div>
          </div>
          <p className="p-delilvery" onClick={handleOpen}>
            배송조회
          </p>
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
  );
}
