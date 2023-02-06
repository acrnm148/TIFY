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
  const [imgUrl, setImgUrl] = useState<string>()
  const [cartData, setCardData] = useState<string>()
  const [title, setTitle]  = useState<string>()
  const [message, setMessage ] = useState<string>()
  const [phone, setPhone] = useState<string>()

  // 사진 업로드하는 html 버튼에 직접 접근해서 값을 가져오는 inputRef
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  let cardPhone = '010-0151-4796';
// 사진 등록
const onUploadImage = (event: any) => {
  const formData = new FormData();
  const sizeLimit = 300*10000
  // 300만 byte 넘으면 경고문구 출력
  if (event.target.files[0].size > sizeLimit){
    alert('사진 크기가 3MB를 넘을 수 없습니다.')
  } else{
    if (event.target.files[0]) {
      formData.append('file', event.target.files[0] ); // 파일 상태 업데이트
    }
    // imgFile 을 보내서 S3에 저장된 url받기
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
};

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
  const MakeCardComponent = () =>{
  return (
    <div className="thanks-card-container">
      <div className="thanks-card">
        <div className="thanks-input">
          <label htmlFor="제목">제목</label>
          <input
            className="input-small"
            type="text"
            name="제목"
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="thanks-input">
          <label htmlFor="연락처">연락처</label>
          <input
            className="input-small"
            type="text"
            name="연락처"
            onChange={(e)=>setPhone(e.target.value)}
            disabled
          />
        </div>
        <div className="thanks-input">
          <label htmlFor="내용">감사메세지</label>
          <textarea
            name="내용"
            id=""
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="카드 내용을 입력하세요"
          ></textarea>
        </div>
        <div className="thanks-input" style={{"backgroundImage" : `url(${imgUrl})`, "backgroundSize":"contain", "backgroundRepeat":"no-repeat", "backgroundPosition":"center"}}>
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
          >
          </div>
        </div>
      </div>
    </div>
  );
  }
  const ThanksForm = () => {
    return(
      <div className='thanks-card-con-container'>
        <div className='form-title'>감사카드 보내기</div>
        <MakeCardComponent />
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
  