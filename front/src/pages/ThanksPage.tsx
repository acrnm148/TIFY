import { useNavigate,useParams} from 'react-router-dom';
import {useCallback, useRef, useState} from 'react';
import "../css/thanksPage.styles.css"

import circleArrowL from "../assets/iconArrowLeft.svg";
import circleArrowR from "../assets/iconArrowRight.svg";
import iconPlus from "../assets/iconPlus.svg";
import axios from 'axios';
import MakeCardComponent from '../components/MakeCardComponent';

export function ThanksPage() {
  let navigate = useNavigate();
  let {wishId, conId} = useParams()
  let cardPhone = '010-0151-4796';
  // 사진업로드
  const API_HOST = ''
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    axios({
      baseURL: API_HOST,
      url: '/images/:username/thumbnail',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  // 해당 축하카드에 대해서 감사카드가 존재하는지 확인
  let [replystate, setReplyState] = useState<Boolean>(false)

  // 카드 하나의 정보 useState로 관리
  const ThanksReply = () => {
    return(
      <div>감사카드답장 유
      </div>

    )
  }
  const addPhoto = () =>{
    return (
      <div>

      </div>
    )
  }
  const ThanksForm = () => {
    return(
      <div className='thanks-card-container'>
        <div className='form-title'>감사카드 보내기</div>
        <MakeCardComponent phone={cardPhone} card="감사" disable={true} cardEng="thanks"/>
        <div className='thanks-input'>
            <div className='thanks-form-btn'>감사보내기</div>
        </div>
      </div>
    )
  }
  const ConCardDetail = () =>{
    return(
      <div>
        받은 축하카드 디테일
        <div className="con-card">
          <div className='tofrom'>From {} </div>
          <div className='con-photo'></div>
          <div className='con-text'>{}</div>
          <div className='userName tofrom'>To {} </div>
        </div>
      </div>
    )
  }
    return(
      <div className='thanks-page-con-container'>
        <div className='thanks-page-container'>
          <button className="back-botton" onClick={() =>(navigate(-1))}> 뒤로가기!!</button>
            <div className='con-thanks-container'>
              <div className='con-card-detail'> 
                <button><img src={circleArrowL} alt="원형 화살표 좌" /></button>
                <ConCardDetail />
                <button><img src={circleArrowR} alt="원형 화살표 우" /></button>
              </div>
              
              { replystate?
              <ThanksReply />
              :
              <ThanksForm />
              }
            </div>
        </div>

      </div>
    ) 
  }
  