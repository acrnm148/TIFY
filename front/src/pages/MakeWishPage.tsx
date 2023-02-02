import "../css/makeWishPage.styles.css"
import "../css/styles.css"
import addHeart from "../assets/addHeart.svg";
import React, { Component, useCallback, useEffect, useRef, useState } from 'react';

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
import { CongratsPage } from "./CongratsPage";
import BlueLogoTify from "../assets/BlueLogoTify.svg";

import "../css/congratsPage.styles.css"

// user
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';

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
//[TODO] 카드 선택 옵션중에 한가지만 하고 선택된 카드 표시 V
// [TODO] 주소 찾기할때 우편번호 자동으로 입력되도록 V
// [TODO] 찜하기목록 불러오기 V
// [TODO] 카테고리 선택 mui..
// [TODO] 완료 페이지로 위시 정보 넘기기 
// [TODO] 위시 총 금액

export function MakeWishPage() {
  // const [userId , setUserId] = useState(104);
  const [userId, setUserId] = useState(useSelector((state: RootState) => state.authToken.userId))

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const wishOption = ['생일', '결혼', '입학', '졸업','출산', '독립', '비혼', '건강']
  const cardList = ['https://user-images.githubusercontent.com/87971876/216435039-6eb5b4ba-24b6-4305-9274-2b9766fa68a2.jpg',
                    'https://user-images.githubusercontent.com/87971876/216435043-77c5fa12-a4ce-4b5a-b767-5e3c012efb9e.jpg', 
                    'https://user-images.githubusercontent.com/87971876/216435045-ef976fc6-09db-4de6-9f89-c412196b609a.jpg',
                    'https://user-images.githubusercontent.com/87971876/216435046-1ef30270-a505-4f79-8f5e-d41eedaeb3ba.jpg',
                    ]
                    // 5:'', 
                    // 6:'',
                    // 7:''} // [TODO] 카드 디자인하고 주소 보관
  const [category, setCategory] = useState()
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [selectCard, setSelectCard] = useState('-1')
  const [selectCardUrl, setSelectCardUrl] = useState('')
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
  const dateFomat = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) => `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())}`;
  const startDate = dateFomat(range[0].startDate)
  const endDate = dateFomat(range[0].endDate)

  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	
  // photo
  const inputRef = useRef<HTMLInputElement | null>(null);

  // address
  const [enroll_company, setEnroll_company] = useState({ address : '', zonecode: ''},)
  const [popup, setPopup] = useState(false);
  const handleInput = (e:any) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]:e.target.value,
    })
  }
  // gift cart
  const [cartList, setCartList] = useState<Gift[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalProduct, setTotalProduct] = useState<Object[]>([])

  const wishData = {'title':'', 'content':'', 'wishCard':'', 'giftItem':[]}

  // 위시생성페이지 mount시 유저의 id를 담아서 cart정보 요청
  useEffect(()=>{
    const putCart = async() =>{
      const API_URL = `https://i8e208.p.ssafy.io/api/cart/forwish/${userId}`;
        axios({
            method: 'get',
            url: API_URL,
            headers: {"Authorization": `Bearer ${accessToken}`,}, 
        }).then((con) => {
          const lst = con.data
          const conlst:Gift[] = []
          
          lst.map((d:any) => {
            conlst.push(d.product)
          })
          console.log('카트 리스트불러오기 성공', conlst)
          setCartList(conlst)
        }).catch((err) => {
            console.log('카트 리스트불러오기 실패', err)
        })
    }
    putCart();
  },[]);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [wishCart, setWishCart] = useState<Gift[]>()
  const pushItem = (i:number) =>{
      if (wishCart){
        setWishCart([...wishCart,cartList[i]])
      } else {
        setWishCart([cartList[i]])
      }
      setTotalPrice(totalPrice+cartList[i].price)
      setTotalProduct([...totalProduct,{"productId" : cartList[i].id}])
      // console.log(wishCart)
      console.log(totalPrice, totalProduct)
  }
  const CartList = () => {
    return(
      <>
          {
            cartList.length > 0
            ?
            <div>
                <div className="like-list">
                {cartList.map((gift, i:number) => (
                  <div onClick={()=>pushItem(i)} className="like-item-card-container">
                      <div className="like-item-card">
                          <div className="like-gift-image">
                              {gift.repImg  
                                  ? <img src={gift.repImg} alt="" />
                                  : <img src="https://user-images.githubusercontent.com/87971876/215664788-d0359920-497d-4b2a-86db-6381254637d6.jpg" alt="이미지가 없습니다" />}
                          </div>
                          <div className="gift-text">
                              <p>{gift.name}</p>
                              <p>{gift.price}원</p>
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
  const [finished, setFinished] = useState(false)
  const MakeWish = () =>{
    const selectedWishCard = Number(selectCard)>=0? imgBase64:cardList[Number(selectCard)]
    console.log('선택한 카드', selectedWishCard, Number(selectCard), imgBase64)
    const makeWish = async() =>{
      const API_URL = 'https://i8e208.p.ssafy.io/api/wish/add/';
        axios({
          url : API_URL,
          method: "POST",
          data : {
            "userId": userId,
            "giftItems": [
              ...totalProduct
            ],
            "totalPrice": totalPrice,
            "wishTitle": title,
            "wishContent" :content,
            "category":category,
            "startDate" : startDate, 
            "endDate":endDate,
            // "wishCard": selectedWishCard, //string
            "addr1": enroll_company.address,
            "addr2":addr2,
          },
          headers:{"Authorization": `Bearer ${accessToken}`,"Content-type" : "application/json"}
        }).then((con) => {
          console.log('위시생성 성공', con)
          setFinished(true)
          console.log('wishCart', wishCart)
        }).catch((err) => {
          console.log('위시생성 실패', err)
        })
      }
      makeWish();
  }

  const handleCategory = (e:any)=>{
    setCategory(e.target.value)
  }
  
  // 사진 등록
  const handleChangeFile = (event:any) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
      console.log(imgFile, 'imgFile') // 
    }
  }
  const onUploadImageButtonClick = useCallback(() => {
      inputRef.current?.click();
    }, []);

    function CardClicked(e:any){
      const id = Number(e.target.id)
      setSelectCard(e.target.id)
      if(id >= 0){
        setSelectCardUrl(cardList[id])
        console.log(selectCardUrl)
      } else{
        setSelectCardUrl(imgBase64)
      }
    }
  const CardList = (): JSX.Element[] => {
    const filteredTitles = cardList.map(
      (c, i:number) => {
        return <div className={`wish-card-item ${selectCard === String(i)? 'selectedCard':''}`} 
                    onClick={CardClicked} id={String(i)}
                    style={{"backgroundImage":`url(${c})`}}/>
      }
    );
    return filteredTitles;
    
  };
  const delWishGift = (i:number) => {
    if (wishCart){
      const minusPrice = wishCart[i].price
      setTotalPrice(totalPrice-minusPrice)
    }
    setWishCart(wishCart?.filter((w, idx:number) => idx !== i));
    // wishCart의 idx번호로 삭제
    setTotalProduct(totalProduct?.filter((p, idx:Number) => idx !== i))
    console.log(i)
  }
  const FinishedWishComponent = () => {
    
    return(
      <div className="finish-wish-con">
        <div className="finish-congrats congrats-page-container">
              <div className="wish-components">
                  <div className="wish-components-title">
                      <h1>{category}축하해주세요!</h1>
                  </div>
                  <div className="wish-card-box">
                    <div className="wish-card fin-wcd wish-card-cover" style={{backgroundImage:`url(${selectCardUrl})`}}/>
                    <div className="wish-card fin-wcd wish-card-content">
                        <h1>{title}</h1>
                        <p>{content}</p>
                    </div>
                  </div>
                  <div className="wish-gift-list">
                  {
                  wishCart?.map((wishGift, i:number) => (
                          <div className='wish-gift' id={String(i)} >
                              <div className='gift-img' style={{backgroundImage:`url(${wishGift.repImg})`}}>
                                  <div className="gift-bar-gray" />
                              </div>
                              <p>{wishGift.name}</p>
                          </div>
                  ))}
              </div>
              <div className="wish-congrats-btns">
                  <div className="button color" >선택한 선물로 축하하기 →</div>
                  <div className="button gray" >축하금으로 보내기 →</div>
              </div>  
              </div>
          </div>
          <div className="finish-wish-comment">
            <h1>위시 생성이 완료되었습니다!</h1>
            <p></p>
          </div>
        </div>
    )
  }
  return (
      <>
      {

        finished ? <FinishedWishComponent /> :
      
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
            <h1>위시 진행 기간 <span>{duration}일</span></h1>
            
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

            </div>
          </div>
          <div>
            <label htmlFor="">카드</label>
            <div className="wish-card-container">
                <div className="m-wish-card">
                  <div className="wish-card-item" onClick={onUploadImageButtonClick} style={{"border":"none"}} id="-1">
                    <input type="file" name="imgFile" accept="image/*" ref={inputRef} id="imgFile" onChange={handleChangeFile} style={{"display":"none"}}/>
                    <img src={addHeart} alt="직접추가하기"/>
                  </div>
                  {imgBase64 &&
                    <div className={`wish-card-item ${selectCard === '-1'? 'selectedCard':''}`} onClick={CardClicked} id="-1">
                      <img src={imgBase64} alt="등록한사진"  id="-1" />
                    </div>
                  }
                  {CardList () }
                  
                </div>
              
            </div>
          </div>
          <div >
            <label htmlFor="">선물</label>
            <div className="wish-card-container">
              <div className="modal-con" >
                <Modal 
                  className="modal-modal"
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
                      <CartList/>
                    </Box>
                  </Fade>
                </Modal>
              </div>
              <div className="m-wish-card">
              <div className="add-gift-icon-con" onClick={handleOpen}>
                  <img className="add-gift-icon" src={addHeart} alt="" />
                </div>
                  {
                    wishCart?.map((e, i:number) => {
                      return (
                        <div className="wish-card-gift" onClick={()=>delWishGift(i)}>
                          <img src={e.repImg}></img>
                        </div>
                      )
                    })
                  }
                
              </div>
            </div>
              <div>총 위시금액 : {totalPrice}원</div>
          </div>
          <div className="address-form-container">
            <label htmlFor="태그">주소</label>
              <input className="address-form postcode" type="text" value={enroll_company.zonecode} placeholder="우편번호" disabled />
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
      }
      </>
    )
  }
