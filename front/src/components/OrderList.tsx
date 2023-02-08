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

const OrderInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<orders[]>(null);
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
        setSearchResults([...response.data]);
        // setTotalPages(response.data.totalPages);
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (searchResults === null) {
    getData(0);
  }
  return (
    <div className="order-div">
      {searchResults && (
        <>
          <OrderCardActive searchResults={searchResults}></OrderCardActive>
          {/* <OrderCardActive searchResults={searchResults}></OrderCardActive> */}
          {/* <OrderCardActive searchResults={searchResults}></OrderCardActive> */}
          {/* <OrderCardActive searchResults={searchResults}></OrderCardActive> */}
        </>
      )}
    </div>
  );
};

const OrderCardActive = (props: { searchResults: orders[] }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    // jsx요소로 쓸 때 리턴값이 <div></div> 나 <></> 하나로 묶여있어야함
    <div>
      {props.searchResults.map((order: orders, idx: any) => (
        <div className="order-box shadow-xl">
          <p className="p-order-state">배송완료{order.state}</p>
          <div className="gift-info-div">
            <img src={order.gift.giftImgUrl} alt=" " className="gift-img" />
            <div className="gift-info-detail-div">
              <div className="detail-top-div">
                <p className="p-finished-date">
                  {order.gift.finishDate} 기프트 종료&nbsp;
                </p>
                <p className="p-wish-name">({order.wishName})</p>
              </div>
              <div className="wrap-detail-div">
                <div className="detail-left-div">
                  <p className="p-gift-name">
                    플레이스테이션 5{order.giftName}
                  </p>
                  <p className="p-gift-price">{order.purePrice}원</p>
                </div>
                <div className="detail-right-div">
                  <p className="p-gift-option">옵션 : 듀얼쇼크/512gb</p>
                  <p className="p-gift-gathered-price">
                    축하금액 : {order.gatheredPrice}원
                  </p>
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
      ))}
    </div>
  );
};
export default OrderInfo;
