import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import '../css/thanksPage.styles.css';

import circleArrowL from '../assets/iconArrowLeft.svg';
import circleArrowR from '../assets/iconArrowRight.svg';
import iconPlus from '../assets/iconPlus.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import MakeCardComponent from '../components/MakeCardComponent';

export function ThanksPage() {
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const location = useLocation();
  let { state } = location;
  let navigate = useNavigate();
  let { conId, wishId } = useParams();
  let conInfo = {
    id: '',
    content: '',
    from: '',
    tel: '',
    img: '',
  };

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [getImg, setGetImg] = useState<string | null>();
  const [title, setTitle] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  // let isThanksCard:boolean = true;
  const [isThanksCard, setIsThanksCard] = useState<boolean>();
  const [getEmit, setGetEmit] = useState<boolean>();
  // 좌우 축하카드 조회 버튼
  let left = null;
  let right = null;

  let fromList;

  const TO_LAST_PAGE_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/b87f76a0-0e29-45ec-9e43-b7b75743bda2.png';
    
  // 사진 업로드하는 html 버튼에 직접 접근해서 값을 가져오는 inputRef
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  // state => props로 위시의 축하카드 리스트 전달받음
  if (state) {
    let nowcard;
    // 1. state로 받은 해당 위시의 축하카드 정보조회
    state.map((s: { id: string | number }, i: number) => {
      if (s.id == Number(conId)) {
        conInfo = state[i];
        nowcard = String(i);
      }
    });
    if (nowcard) {
      nowcard = Number(nowcard);
      if (nowcard > 0) {
        left = state[nowcard - 1].id;
      }
      if (nowcard < state.length - 1) {
        right = state[nowcard + 1].id;
      }
    }
  }

  useEffect(() => {
    const API_URL = `https://i8e208.p.ssafy.io/api/thkcards/match/${conId}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // userId로 작성한 감사카드, payid와 같이 조회
    axios
      .get(API_URL)
      .then((res: any) => {
        res.data ? setIsThanksCard(true) : setIsThanksCard(false);
        console.log(res.data);
        setGetImg(res.data.imageUrl);
        setTitle(res.data.title);
        // setFrom(res.data.from)
        setMessage(res.data.content);
        setPhone(res.data.phoneNumber);
      })
      .catch((err: any) => {
        console.log('유저의 감사카드를 불러오지 못함', err);
      });
  }, [getEmit]);

  const isThkCard = (i: boolean) => {
    if (i) {
      // 감사카드 조회 요청보내고 데이터 바꿔주기
      setIsThanksCard(true);
      setGetEmit(true);
    }
  };
  const ThanksForm = memo(function ThanksForm() {
    return (
      <div className="thanks-card-con-container">
        <div className="form-title">감사카드 보내기</div>
        <MakeCardComponent
          payId={conId}
          userId={userId}
          phone={conInfo.tel}
          propFunction={isThkCard}
          from={conInfo.from}
        />
      </div>
    );
  });
  // 카드 하나의 정보 useState로 관리
  const ThanksReply = () => {
    return (
      <div className='sent-card-con'>
        <div className='sent-card'>
          <h1>보낸 감사카드</h1>
        </div>
        <div className="con-card-detail">
          <div className="con-card">
            <div className="tofrom">{from}</div>
            <div
              className="con-photo"
              style={{ backgroundImage: `url(${getImg !==null? getImg : ''})` }}
            ></div>
            <div className="con-text">{message}</div>
            <div className="userName tofrom">전송된 연락처 : {phone}</div>
          </div>
        </div>
      </div>
    );
  };
  const ConCardDetail = memo(function ConCardDetail() {
    return (
      <div className="disp-flex align-center wid-100">
        <div className="disp-flex align-center flex-col wid-100">
        <div className='sent-card'>
          <h1>받은 축하카드</h1>
        </div>
          <div className="con-card">
            <div className="tofrom">From {conInfo.from} </div>
            <div
              className="con-photo"
              style={{ backgroundImage: `url(${conInfo.img})` }}
            ></div>
            <div className="con-text">{conInfo.content}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="thanks-page-con-container">
      <div className="thanks-page-container">
        {/* <button className="back-botton" onClick={() => navigate(-1)}>
          {' '}
          뒤로가기!!
        </button> */}
        <div
          className="go-back"
          onClick={() => (window.location.href = '/checkwish')}
        >
          <p>
            <img src={TO_LAST_PAGE_IMG} className="toLastPage" />
          </p>
        </div>
        <div className="con-thanks-container">
          <div className="con-card-detail">
            <div className="arrow" onClick={() => setGetEmit(!getEmit)}>
              {left !== null && (
                <NavLink to={`/thanks/${wishId}/${left}`} state={[...state]}>
                  <img src={circleArrowL} alt="원형 화살표 좌" />
                </NavLink>
              )}
            </div>
            <ConCardDetail />
            <div className="arrow" onClick={() => setGetEmit(!getEmit)}>
              {right !== null && (
                <NavLink to={`/thanks/${wishId}/${right}`} state={[...state]}>
                  <img src={circleArrowR} alt="원형 화살표 우" />
                </NavLink>
              )}
            </div>
          </div>

          {isThanksCard ? <ThanksReply /> : <ThanksForm />}
        </div>
      </div>
    </div>
  );
}
