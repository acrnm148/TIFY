import iconCategory1Birthday from '../../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../../assets/category/iconCategory7Etc.svg';
import '../../css/Joined.styles.css';

import circleArrowL from '../../assets/iconArrowLeft.svg';
import circleArrowR from '../../assets/iconArrowRight.svg';

import { useEffect, useState, memo } from 'react';
import axios from 'axios';
import { RootState } from '../../store/Auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface CelebData {
  celebContent: string;
  celebFrom: string;
  celebImg: null | string;
  payId: string;
}

interface CelebPayData {
  amount: string;
  giftId: string;
  giftImgUrl: string;
  giftName: string;
  payedDate: string;
}

interface JoinedWish {
  celebCardDtoList: Array<CelebData>;
  joinedWishId: string;
  myCelebDtoList: Array<CelebPayData>;
  userId: string;
  wishCategory: string;
  wishEndDate: string;
  wishFinishYN: string;
  wishId: string;
  wishName: string;
  wishUser: string;
  wishUserId: string;
}

export function Joined() {
  const [refresh, setRefresh] = useState<boolean>(false); //페이지 갱신용
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const [joinedWishList, setJoinedWishList] = useState<Array<JoinedWish>>();
  // 어떤 카드의 보낸 선물/ 축하카드를 보고 있는지
  const [opened, setOpened] = useState('');
  const [giftOrCard, setGiftOrCard] = useState('');

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const API_URL = `https://i8e208.p.ssafy.io/api/account/getPartcpWish`;
      const response = await axios.get(API_URL).then((res) => {
        console.log(res.data, '페이지 찐정보');
        return res.data;
      });
      setJoinedWishList(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  function JoinedWishCardActive(props: { joinedWish: JoinedWish }) {
    const joinedWish = props.joinedWish;
    const navigate = useNavigate();

    let diff =
      new Date(joinedWish.wishEndDate).getTime() - new Date().getTime();
    const restDay = Math.floor(diff / (1000 * 60 * 60 * 24)); // 오늘 날짜랑 계산해서 몇일남았는지
    var RD = '';
    if (restDay > 0) {
      var RD = `- ${restDay}`;
    } else if (restDay == 0) {
      var RD = '- day';
    } else {
      var RD = `+ ${-restDay}`;
    }

    console.log(joinedWish, '조인드위시 내용');

    const OpenCard = (
      event: React.MouseEvent<HTMLButtonElement>,
      wishId: string,
    ) => {
      event.stopPropagation();
      event.preventDefault();
      setOpened(wishId);
      setGiftOrCard('card');
    };

    const OpenGift = (
      event: React.MouseEvent<HTMLButtonElement>,
      wishId: string,
    ) => {
      event.stopPropagation();

      event.preventDefault();
      setOpened(wishId);
      setGiftOrCard('gift');
    };

    const GoToDetailCongrat = () => {
      navigate(`/congrats/${joinedWish.wishId}`);
    };

    return (
      <div
        className={`joined-wish-box
      shadow-xl`}
        // style={{
        //   height: joinedWish.wishId === opened ? '400px' : '250px',
        // }}
      >
        {joinedWish.wishFinishYN == 'Y' ? (
          <>
            <p className="p-date">
              <span style={{ fontWeight: 'bold' }}>D {RD}</span>
            </p>
            <p className="p-done">완료</p>
          </>
        ) : (
          <>
            <p className="p-date">
              <span style={{ fontWeight: 'bold', color: '#fe3360' }}>
                D {RD}
              </span>
            </p>
            <p className="p-proceed">진행중</p>
          </>
        )}
        <div className="category-div">
          <Categorize category={joinedWish.wishCategory}></Categorize>
          <p className="joined-wish-title" onClick={() => GoToDetailCongrat()}>
            {joinedWish.wishName}
          </p>
        </div>
        <div className="button-div">
          <button
            className={
              giftOrCard == 'gift' && joinedWish.wishId == opened
                ? 'active-button-gift'
                : 'button-gift'
            }
            onClick={(e) => OpenGift(e, joinedWish.wishId)}
          >
            보낸 선물
          </button>
          <button
            className={
              giftOrCard == 'card' && joinedWish.wishId == opened
                ? 'active-button-card'
                : 'button-card'
            }
            onClick={(e) => OpenCard(e, joinedWish.wishId)}
          >
            보낸 축하 카드
          </button>
        </div>
        {/* <div style={{ backgroundColor: 'black', height: '200px' }}></div> */}
        {joinedWish.wishId == opened && (
          <OpenedDetails
            giftOrCard={giftOrCard}
            joinedWish={joinedWish}
          ></OpenedDetails>
        )}
      </div>
    );
  }

  const CloseDetail = () => {
    setOpened('');
    setGiftOrCard('');
  };

  return (
    <div>
      <p className="phone-book-title">| Joined Wish</p>
      <div className="joined-wish-div" onClick={() => CloseDetail()}>
        {joinedWishList &&
          joinedWishList.map((joinedWish: JoinedWish) => {
            return (
              <JoinedWishCardActive
                joinedWish={joinedWish}
              ></JoinedWishCardActive>
            );
          })}
      </div>
    </div>
  );
}

function OpenedDetails(props: { joinedWish: JoinedWish; giftOrCard: string }) {
  const joinedWish = props.joinedWish;
  const giftOrCard = props.giftOrCard;
  const cards = joinedWish.celebCardDtoList;
  console.log(cards);

  console.log(joinedWish, '감사카드에는 어떤 게 들어가야 할까??');
  console.log(cards, '얘네가 들어갈 듯');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const card = cards[cardIndex];
  const maxLength = cards.length;

  const MinusIndex = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCardIndex(cardIndex - 1);
  };

  const PlusIndex = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCardIndex(cardIndex + 1);
  };

  const ThanksReply = () => {
    return (
      <div>
        {/* <h1>보낸 감사카드</h1> */}
        <div className="joined-con-card-detail">
          <div className="joined-con-card">
            <div className="joined-tofrom">{card.celebFrom}</div>
            <img
              className="joined-con-photo"
              src={card.celebImg ? card.celebImg : ''}
              alt="축하카드 이미지"
            />
            <div className="joined-con-text">{card.celebContent}</div>
            {/* <div className='userName tofrom'>전송된 연락처 : {card.}</div> */}
          </div>
        </div>
      </div>
    );
  };

  console.log(joinedWish);
  if (giftOrCard == 'gift') {
    return (
      <div className="opened-detail-div">
        {/* 슬라이드바 넣을 부분 */}
        <div className="opend-detail-gift-container">
          {joinedWish.myCelebDtoList.map((gift: CelebPayData) => {
            return (
              <div className="opend-detail-gift-div">
                <img className="opened-detail-gift" src={gift.giftImgUrl}></img>
                <div className="gift-name-div">
                  <div>
                    <p className="gift-name-p">{gift.giftName}</p>
                    <p className="">
                      {gift.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </p>
                    <p className="">({gift.payedDate})</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (giftOrCard == 'card') {
    return (
      <div className="opened-detail-div">
        {/* <div className="arrow" onClick={() => setGetEmit(!getEmit)}>
          {left !== null && (
            <NavLink to={`/thanks/${wishId}/${left}`} state={[...state]}>
              <img src={circleArrowL} alt="원형 화살표 좌" />
              </NavLink>
              )}
            </div> */}
        <div className="joined-arrow">
          {cardIndex !== 0 && (
            <button onClick={(e: any) => MinusIndex(e)}>
              <img src={circleArrowL} alt="원형 화살표 좌" />
            </button>
          )}
        </div>
        <ThanksReply />
        <div className="joined-arrow">
          {cardIndex < maxLength - 1 && (
            <img
              src={circleArrowR}
              alt="원형 화살표 우"
              onClick={(e: any) => PlusIndex(e)}
            />
          )}
        </div>
        {/* <div className="arrow" onClick={() => setGetEmit(!getEmit)}>
          {right !== null && (
            <NavLink to={`/thanks/${wishId}/${right}`} state={[...state]}>
              <img src={circleArrowR} alt="원형 화살표 우" />
            </NavLink>
          )}
        </div> */}
      </div>
    );
  } else {
    return <></>;
  }
}

function Categorize({ category }: { category: string }) {
  if (category == '생일') {
    return <img src={iconCategory1Birthday} alt="" />;
  } else if (category == '결혼') {
    return <img src={iconCategory2Marry} alt="" />;
  } else if (category == '취업') {
    return <img src={iconCategory3Employed} alt="" />;
  } else if (category == '건강') {
    return <img src={iconCategory4Health} alt="" />;
  } else if (category == '출산') {
    return <img src={iconCategory5Childbirth} alt="" />;
  } else if (category == '비혼') {
    return <img src={iconCategory6Unmarried} alt="" />;
  } else {
    return <img src={iconCategory7Etc} alt="" />;
  }
}
