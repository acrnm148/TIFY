import { memo, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import TapNameKor from '../components/TapNameKor';
import '../css/congratsCardPage.styles.css';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import loading7 from '../assets/loading7.svg';
import loading2 from '../assets/loading2.svg';
import { Dictionary } from '@reduxjs/toolkit';
import axios from 'axios';
import { useCallback, useRef } from 'react';
import * as PayingPort from '../components/PayingPort';
import { Paying } from '../interface/interface';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Policy from '../components/Policy';

export function CongratsPayPage(){
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const params = useParams();
  const wishId = params.wishId;
  const payAmount = ['5,000', '10,000', '50,000', '100,000'];
  const payAmountNum = [5000, 10000, 50000, 100000];
  const [amount, setAmount] = useState<any>();

  // 선택한 선물 정보 prop으로 받음
  const location = useLocation();
  const { state } = location;
  const [wishDetail, setWishDetail] = useState();

  // makeCard form 데이터
  const [cardFrom, setCardFrom] = useState<string>('');
  const [cardPhone, setCardPhone] = useState('');
  const [cardContents, setCardContents] = useState('');

  //이용약관동의 선택여부
  const [isChecked, setIsChecked] = useState(false);

  // modal
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [openPayInfo, setOpenPayInfo] = useState(false)
  const handlePayInfoClose = () => setOpenPayInfo(false);
  const handleOpen = () => {
    setOpen(true);
  };
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
  // file upload----------------------------------------------------------------
  const [imgUrl, setImgUrl] = useState<string>('');
  // div 박스 클릭하면 이미지 input이 클릭되도록 useRef사용
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  // 이미지 업로드 버튼 클릭시 발생하는 이벤트
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(state, 'state');
      if (!e.target.files) {
        return;
      }
      const sizeLimit = 300 * 10000;
      // 300만 byte 넘으면 경고문구 출력
      if (e.target.files[0].size > sizeLimit) {
        alert('사진 크기가 3MB를 넘을 수 없습니다.');
      } else {
        // 파일을 formData로 만들어주기
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        // 3. imgFile 을 보내서 S3에 저장된 url받기
        const getImgUrl = async () => {
          const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
          await axios
            .post(API_URL, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((con) => {
              console.log('이미지주소불러오기 성공', con.data);
              setImgUrl(con.data);
            })
            .catch((err) => {
              console.log('이미지주소불러오기 실패', err);
            });
        };
        getImgUrl();
      }
    },
    [],
  );
  // end file upload----------------------------------------------------------------

  const amountSelected = (i: any) => {
    console.log(payAmount[i]);
    setAmount(payAmountNum[i]);
  };
  const getAmount = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    const neww = e.target.value;
    setAmount(neww);
  };

  function checkValidate(e: any) {
    // e.preventDefault()

    // amount 숫자이고 공백아닌지 확인
    if (Number.isNaN(amount)) {
      e.preventDefault();
      alert('축하금액에 숫자를 입력하세요!');
      return;
    }
    // card from 입력 확인 =>>> 자동완성에 카드문구들어가도록
    // console.log(cardFrom, cardContents, cardPhone)
    //if(cardData.title && cardData.phone && cardData.content)
    // 이용약관 동의 확인
    if (!isChecked) {
      e.preventDefault();
      alert('이용약관에 동의해주세요!');
      return;
    }
    const congratsInfo: Paying = {
      amount: amount,
      payType: '',
      celebFrom: cardFrom,
      celebTel: cardPhone,
      celebContent: cardContents,
      celebImgUrl: imgUrl,
      giftId: -1,
      userId: userId,
    };
    // Paying 자료형 >> 결제창으로 넘어갈때 결제정보 인자로 넘기기
    PayingPort.onClickPayment(congratsInfo, '티피로 축하하기', state.wishUserId);
  }
  function ifisChecked() {
    return isChecked ? true : false;
  }

  const onChangeFrom = (e: any) => {
    setCardFrom(e.target.value);
  };
  const onChangePhone = (e: any) => {
    setCardPhone(e.target.value);
  };
  const onChangeContents = (e: any) => {
    setCardContents(e.target.value);
  };

  function setCheckbox() {
    setIsChecked(!isChecked);
    console.log('이용약관..', isChecked);
  }
  const showPolicy=()=>{
    setOpen(true)
  }
  function GogoPay(){
    const congratsInfo: Paying = {
      amount: amount,
      payType: 'card',
      celebFrom: cardFrom,
      celebTel: cardPhone,
      celebContent: cardContents,
      celebImgUrl: imgUrl,
      giftId: 0,
      userId: userId?userId:0,
    };
    // Paying 자료형 >> 결제창으로 넘어갈때 결제정보 인자로 넘기기
    PayingPort.onClickPayment(congratsInfo, state.selectGift.name, state.wishUserId);
  }
  
    const PayInfo = () =>{
      return(
        <div>
          <h1>결제정보입니다</h1>
            <div className='underline'></div>
              <p>축하금액 : {amount}</p>
              <p>연락처 : {cardPhone}</p>
            <div className='underline'></div>
                <div className='disp-flex align-center pb10 pt10'>
                  <div className="con-card">
                    <div className='tofrom'>From {cardFrom} </div>
                    <div className='con-photo' style={{"backgroundImage":`url(${imgUrl})`}}></div>
                    <div className='con-text' style={{"lineHeight":"2"}}><pre>{cardContents?.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</pre></div>
                  </div>
                </div>
          
          <button onClick={()=>(GogoPay(),setOpenPayInfo(false))}>결제하기</button>
        </div>
      )
    }
  return (
    <>
      <TapNameKor
        title="축하하기"
        content="친구의 생일을 페이로 축하해주세요!"
    ></TapNameKor>
      <div className="congrats-card-page-containger">
        <div className="congrats-card-page-containger-border">
          <div className="congrats-card-page-left">
            <div className="gift-info">
        
              <div className="underline"></div>
              <div className="pay-amount-selection">
                <p className="selection-label">축하 금액 선택</p>
                <div className="pay-amount-selection-btns">
                  {payAmount.map((amt, i: number) => (
                    <button
                      onClick={() => {
                        amountSelected(i);
                      }}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pay-amount-selected">
                <label htmlFor=""></label>
                <input
                  className=""
                  type="text"
                  placeholder="축하금액"
                  value={amount}
                  onChange={getAmount}
                />
              </div>
            </div>
          </div>
          <div className="middle-line-vertical"></div>
          <div className="congrats-card-page-right">
            <div className="thanks-card-container">
              <div className="thanks-card">
                <div className="thanks-input">
                  <label htmlFor="제목">보내는 사람</label>
                  <input
                    className="input-small"
                    type="text"
                    name="제목"
                    value={cardFrom}
                    onChange={onChangeFrom}
                    placeholder="받는 사람이 알 수 있도록 이름을 입력해주세요!"
                  />
                </div>
                <div className="thanks-input">
                  <label htmlFor="내용">축하메세지</label>
                  <textarea
                    name="내용"
                    placeholder="카드 내용을 입력하세요"
                    value={cardContents}
                    onChange={onChangeContents}
                  ></textarea>
                </div>
                <div className="thanks-input">
                  <label htmlFor="">사진</label>
                  <input
                    className="img-input"
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={onUploadImage}
                    name="thumbnail"
                  />
                  <div
                    className={`thanks-photo-btn`}
                    onClick={onUploadImageButtonClick}
                    style={{
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  >
                    {!imgUrl && <h1>+</h1>}
                  </div>
                </div>
                <div className="thanks-input">
                  <label htmlFor="연락처">연락처</label>
                  <input
                    className="input-small"
                    type="text"
                    name="연락처"
                    value={cardPhone}
                    onChange={onChangePhone}
                    placeholder="000-0000-0000"
                  />
                </div>
              </div>
            </div>
            <div className="policy">
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={setCheckbox}
              />
              <p className="txt-underline cursor gray" onClick={showPolicy}>이용약관동의</p>
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
                  <Box sx={style} className="concard-policy">
                    <Policy />
                  </Box>
                </Fade>
              </Modal>
            </div>

            <div className="congrats-input">
            <Modal
              className="modal-modal"
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openPayInfo}
              onClose={handlePayInfoClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openPayInfo}>
                <Box sx={style} className="concard-info">
                  <PayInfo />
                </Box>
              </Fade>
            </Modal>
              <div onClick={checkValidate} className="congrats-form-btn">
                축하보내기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}