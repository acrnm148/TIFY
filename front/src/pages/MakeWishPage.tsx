import "../css/makeWishPage.styles.css"
import "../css/styles.css"
import addHeart from "../assets/addHeart.svg";
import React, { Component, useState } from 'react';

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {DateRange} from "react-date-range";
import {addDays} from "date-fns";
import moment from 'moment'; //현재(한국)시간 불러오기
import { ko } from 'date-fns/esm/locale'; // 한국어 불러오기

import Postcode from "../components/Post"

// 선물 불러오기 모달
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from "axios";
import {GiftItem} from "../components/GiftItem"
import { GiftHubList } from "../components/GiftHubList";
import { Gift } from "../interface/interface";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function MakeWishPage() {
  // declare {Post}: Component;

  const formList = ['제목', '내용']
  const wishOption = ['생일', '결혼', '입학', '졸업','출산', '독립', '비혼', '건강']
  const [category, setCategory] = useState()
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [addr2, setAddr2] = useState<string>()
  // calendar 
  const [range, setRange] = useState<any[]>([
    {
      endDate: addDays(new Date(), 0),
      key: "selection",
      startDate : new Date(),
    },
  ])
  const now = new Date()
  const disableDates = new Date(now.setMonth(now.getMonth()+3)) //위시 기간 최대 3개월
  const duration = Math.abs((range[0].endDate - range[0].startDate) / (1000 * 60 * 60 * 24))+1
  
  const zero = (num: string | number) => num < 10 && num >= 0 ? "0" + num : num;
  const dateKo = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) => `${date.getFullYear()}년 ${zero(date.getMonth() + 1)}월 ${zero(date.getDate())}일`;
  const startDate = dateKo(range[0].startDate)
  const endDate = dateKo(range[0].endDate)

  // address
  const [enroll_company, setEnroll_company] = useState({ address : '',},)
  const [popup, setPopup] = useState(false);
  const handleInput = (e:any) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]:e.target.value,
    })
  }
  // gift cart
  const [userId , setUserId] = useState(1);
  const [cartList, setCartList] = useState([
    // temp data
    {
      id : 1,
      name : "삼성전자 갤럭시S22 5G 256GB [자급제]",
      price: 879910,
      repImg:"https://shopping-phinf.pstatic.net/main_3092747/30927477618.20220811174246.jpg?type=f640",
      giftId: 1,
      options:[],
      // imgList : [{id:31, idx:0, url : 'https://shopping-phinf.pstatic.net/main_3092747/30927477618.20220811174246.jpg?type=f640'}]
      imgList : [{url : ''}]
    }
  ])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    const putCart = async() =>{
      const API_URL = `https://i8e208.p.ssafy.io:8081/api/cart/list/${userId}`;
        axios({
            method: 'get',
            url: API_URL,
            headers: {}, 
            params:{
              page:1,
            }
        }).then((con) => {
            console.log('상품 리스트불러오기 성공', con)
            setCartList(con.data)
        }).catch((err) => {
            console.log('상품 리스트불러오기 실패', err)
        })
    }
    putCart();
  }
  const handleClose = () => setOpen(false);
  const [wishCart, setWishCart] = useState<Gift[]>()
  const pushItem = (i:number) =>{
    setWishCart([cartList[i]])
    console.log(wishCart)
  }
  const CartList = (props:{w:string}) => {
    return(
      <>
          {
            cartList.length > 0
            ?
            <div className="gift-list-container">
                <div className="gift-list">
                {cartList.map((gift, i:number) => (
                  <div onClick={()=>pushItem(i)} className="gift-item-card-container">
                      <div className="gift-item-card">
                          <div className="gift-image">
                              {gift.repImg  
                                  ? <img src={gift.repImg} alt="" />
                                  : <img src="https://user-images.githubusercontent.com/87971876/215664788-d0359920-497d-4b2a-86db-6381254637d6.jpg" alt="이미지가 없습니다" />}
                          </div>
                          <div>
                            {
                              props.w==='wishCard'
                              ? <p></p>
                              :
                              <div>
                                  <p>{gift.name}</p>
                                  <p>{gift.price}원</p>
                              </div>

                            }
                          </div>
                      </div>
              </div>
                ))}
                </div>
            </div> 
            : <p>카드에 상품이 없습니다.</p>
          }
      </>
    )
  }
  const wishData = {
      userId : userId,
      giftItems:[
        {
          productId: 1,
          quantity: 1,
          userOption: ''
        }
        // wishCart?.map((w) =>{
        //   return(
        //     {
        //       productId: w.giftId,
        //       quantity: 1,
        //       userOption: w.options,
        //       type: "string",
        //     }
        //     )
        // })
        
      ],
      wishTitle:title,
      wishContent :content,
      category:category,
      startDate :startDate,
      endDate:endDate,
      wishCard:0,
      addr1: enroll_company.address,
      addr2:addr2,
  }
  const MakeWish = () =>{
    const makeWish = async() =>{
      const API_URL = `http://i8e208.p.ssafy.io:8081/api/wish/add/`;
        axios({
          url : API_URL,
          method: "POST",
          headers:{"Content-type" : "application/json"},
          data : {wishData},
        }).then((con) => {
          console.log('위시생성 성공', con)
          // setCartList(con.data)
        }).catch((err) => {
          console.log('위시생성 실패', err)
        })
      }
      makeWish();
      // post(API_URL,JSON.stringify(wishData)
  }

  const handleCategory = (e:any)=>{
    setCategory(e.target.value)
  }
  return (
      <>
      <div className="page-name-block">
        <div className="page-name" />
        <div className="make-wish-form">
          <div className="input-form input-select">
            <label htmlFor="카테고리">카테고리</label>
            <select onChange={handleCategory} name="" id="">
              {wishOption.map(op => (
                <option value={op}>{op}</option>
              ))}
            </select>
          </div>
          <div className='input-form'>
              <label htmlFor="태그">제목</label>
              <input type="text" name="태그" onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className='input-form input-wide'>
              <label htmlFor="태그">내용</label>
              <input type="textarea" name="태그" onChange={(e)=>setContent(e.target.value)}/>
          </div>
          
          <div className="duration-container">
            <label htmlFor="">기간</label>
            <h1>위시 진행 기간을 선택해주세요</h1>
            
            <div className="duration-from calendar-container">
            
            <DateRange 
              editableDateInputs={false}
              onChange={item => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              retainEndDateOnFirstSelection={true}
              ranges={range}
              months={2}
              direction="horizontal"
              minDate={moment().add(1,'days').toDate()}
              maxDate={disableDates}
              locale={ko}
              dateDisplayFormat="yyyy년 MM월 dd일"
              />          
            <h1>위시 시작 일 : <span>{startDate}</span></h1>
            <h1>위시 종료 : <span>{endDate}</span></h1>
            <h1>위시 진행 일 : <span>{duration}</span> 일</h1>
            </div>
          </div>
          <div>
            <label htmlFor="">카드</label>
            <div className="wish-card-container">
              <div className="wish-card">
                <div className="wish-card-item" />
              </div>
              <div>
                <img src={addHeart} alt="" />
              </div>
              
            </div>
          </div>
          <div >
            <label htmlFor="">선물</label>
            <div className="wish-card-container">
              <div className="wish-card">
                {/* <div className="wish-card-gift">선물</div> */}
                <div className="wish-card-gift"><CartList w='wishCard'/></div>
                
              </div>
              <div>
                <img className="add-gift-icon" onClick={handleOpen} src={addHeart} alt="" />
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <CartList w='cart'/>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>
          <div className="address-form-container">
            <label htmlFor="태그">주소</label>
            <div className="address-form">
              <input type="text" placeholder="주소"required={true} name="address" onChange={handleInput} value={enroll_company.address} disabled/>
              <Postcode company={enroll_company} setcompany={setEnroll_company}/>
            </div>
          </div>
          <div>
            <label htmlFor="상세주소">상세주소</label>
            <div className="input-form">
              <input type='text' name="상세주소" onChange={(e)=>setAddr2(e.target.value)}/>
            </div>
          </div>
          <div className="make-wish-btn-con">
            <div className="make-wish-btn" onClick={MakeWish}>위시만들기</div>
          </div>
        </div>
      </div>
      </>
    )
  }
