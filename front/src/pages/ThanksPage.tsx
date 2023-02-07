import { NavLink, useLocation, useNavigate,useParams} from 'react-router-dom';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
import "../css/thanksPage.styles.css"

import circleArrowL from "../assets/iconArrowLeft.svg";
import circleArrowR from "../assets/iconArrowRight.svg";
import iconPlus from "../assets/iconPlus.svg";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import MakeCardComponent from '../components/MakeCardComponent';

export function ThanksPage() {
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
    );
    const location = useLocation()
    let {state} = location
    let navigate = useNavigate();
    let {conId, wishId} = useParams()
    let conInfo = {
      id:"",content : "", from :"", tel:"", img:""
    }

  
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [cartData, setCardData] = useState<string | null>()
  const [title, setTitle]  = useState<string | null>(null)
  const [message, setMessage ] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)

  // let isThanksCard:boolean = true;
  const [isThanksCard, setIsThanksCard] = useState<boolean>()
  // 좌우 축하카드 조회 버튼
  let left = null
  let right = null

  let fromList;

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
  
  // state => props로 위시의 축하카드 리스트 전달받음
    if (state){
      let nowcard;
      console.log(state, 'state state state state state state state state')
      // 1. state로 받은 해당 위시의 축하카드 정보조회
      state.map((s: { id: string | number; }, i:number)=>{
        if(s.id == Number(conId)){
          conInfo = state[i]
          nowcard = String(i)
        }
      })
      if(nowcard){
        nowcard = Number(nowcard)
        console.log(nowcard, 'nowcard', conInfo, 'conInfo')
        if(nowcard>0){
          left = state[nowcard-1].id
        }
        if(nowcard<state.length -1){
          right = state[nowcard+1].id
        }

      }
    }
    useEffect(()=>{
      
      const API_URL = `https://i8e208.p.ssafy.io/api/thkcards/${userId}`
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // 2. userId로 작성한 감사카드, payid와 같이 조회
      axios.get(API_URL
        ).then((res)=>{
          console.log(`${userId}의 감사카드`, res.data)
          res.data? setIsThanksCard(true):setIsThanksCard(false)
          console.log(isThanksCard)
        }).catch((err)=>{
          console.log('유저의 감사카드를 불러오지 못함', err)
        })
    },[])

    // 카드 하나의 정보 useState로 관리
  const ThanksReply = () => {
    return(
      <div>
        <div className="con-card">
          <div className='tofrom'>From </div>
          <div className='con-photo' style={{"backgroundImage":`url(${conInfo.img})`}}></div>
          <div className='con-text'></div>
          <div className='userName tofrom'>To </div>
        </div>
      </div>

    )
  }
  const isThkCard = (i : boolean) => {
    if(i){
      // 감사카드 조회 요청보내고 데이터 바꿔주기
      setIsThanksCard(true)
    }
  }
  const ThanksForm = memo(function ThanksForm(){
    return(
      <div className='thanks-card-con-container'>
        <div className='form-title'>감사카드 보내기</div>
        <MakeCardComponent 
          payId={conId}
          userId={userId}
          phone={conInfo.tel}
          propFunction={isThkCard}
          />
        
      </div>
    )
  })
  const ConCardDetail = memo(function ConCardDetail(){
    return(
      <div>
        받은 축하카드
        <div className="con-card">
          <div className='tofrom'>From {conInfo.from} </div>
          <div className='con-photo' style={{"backgroundImage":`url(${conInfo.img})`}}></div>
          <div className='con-text'>{conInfo.content}</div>
          <div className='userName tofrom'>To </div>
        </div>
      </div>
    )
  })

    return(
      <div className='thanks-page-con-container'>
        <div className='thanks-page-container'>
          <button className="back-botton" onClick={() =>(navigate(-1))}> 뒤로가기!!</button>
            <div className='con-thanks-container'>
              <div className='con-card-detail'>
                <div className="arrow">{left !== null && <NavLink to={`/thanks/${wishId}/${left}`} state={[...state]}><img src={circleArrowL} alt="원형 화살표 좌" /></NavLink>}</div>
                  <ConCardDetail />
                <div className='arrow'>{right !== null && <NavLink  to={`/thanks/${wishId}/${right}`} state={[...state]}><img src={circleArrowR} alt="원형 화살표 우" /></NavLink>}</div>
              </div>
              
              { isThanksCard?
              <ThanksReply />
              :
              <ThanksForm />
              }
            </div>
        </div>

      </div>
    ) 
  }
  