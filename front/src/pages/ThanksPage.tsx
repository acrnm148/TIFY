import { useNavigate,useParams} from 'react-router-dom';
import {useCallback, useRef, useState} from 'react';
import "../css/thanksPage.styles.css"

import circleArrowL from "../assets/iconArrowLeft.svg";
import circleArrowR from "../assets/iconArrowRight.svg";
import iconPlus from "../assets/iconPlus.svg";
import axios from 'axios';

export function ThanksPage() {
  let navigate = useNavigate();
  let {wishId, conId} = useParams()

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
        <div className='thanks-card'>
          <div className='thanks-input'>
            <label htmlFor="제목">제목</label>
            <input className='input-small'type="text" name='제목'/>
          </div>
          <div className='thanks-input'>
            <label htmlFor="연락처">연락처</label>
            <input className='input-small'type="text" name='연락처' placeholder='010-1010-1010' disabled/>
          </div>
          <div  className='thanks-input'>
            <label htmlFor="내용">내용</label>
            <textarea name="내용" id="" placeholder='카드 내용을 입력하세요'></textarea>
          </div>
          <div className='thanks-input'>
            <label htmlFor="">사진</label>
            <input className='img-input' type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} name="thumbnail"/>
            <div className='photo-btn' onClick={onUploadImageButtonClick}>
              <img src={iconPlus} alt="사진추가하기" />
            </div>
          </div>
          <div className='thanks-input'>
            <div className='thanks-form-btn'>감사카드 전송</div>
          </div>
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
  