import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { NavLink, useParams } from 'react-router-dom';
import '../css/congratsPage.styles.css';

const WISH_CATEGORY_DATA = ['생일', '취업', '결혼', '건강', '출산', '비혼'];
type Gift = {
  id: number;
  img: string;
  name: string;
  achieved81: number;
  achieved: number;
  price: number;
  finished: boolean;
};
export function CongratsPage() {
  let { wishId } = useParams();
  const [userName, setUserName] = useState('');
  const [ userPhone, setUserPhone] = useState()
  const [category, setCategory] = useState('');
  const [selectGift, setSelectGift] = useState<Gift | null>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [card, setCard] = useState('');

  const [clickedGift, setClickedGift] = useState<number | null>();
  const [wishGiftList, setWishGiftList] = useState<Gift[]>();
  const [wishUserId, setWishUserId] = useState<number>();

  // 현금축하 giftId
  const [cashId, setCashId] = useState<number>(-1);

  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  // acc token
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  
  useEffect(() => {
    const API_URL = 'https://i8e208.p.ssafy.io/api/wish/detail/';
    axios
      .get(API_URL, {
        params: {
          wishId: wishId,
        },
      })
      .then(
        (res: {
          data: {
            giftItems: any;
            user: { username: SetStateAction<string>; id: number };
            category: SetStateAction<string>;
            title: SetStateAction<string>;
            content: SetStateAction<string>;
            cardImageCode: SetStateAction<string>;
            userId: number;
          };
        }) => {
          console.log('위시 상세 정보', res.data);
          setUserName(res.data.user.username);
          setCategory(res.data.category);
          setTitle(res.data.title);
          setContent(res.data.content);
          setCard(res.data.cardImageCode);
          setWishUserId(res.data.user.id);

          setWishGiftList(
            res.data.giftItems.reduce(
              (
                acc: {
                  id: number;
                  img: any;
                  productNum: number;
                  name: string;
                  achieved: number;
                  achieved81: number;
                  price: number;
                  giftId: number;
                  finished: boolean;
                }[],
                item: {
                  successYN: string;
                  giftname: string;
                  giftImgUrl: any;
                  productNum: number;
                  gathered: number;
                  purePrice: number;
                  id: number;
                  finished: boolean;
                },
                i: number,
              ) => {
                if (item.giftname == '현금') {
                  setCashId(item.id);
                  console.log('현금id', cashId);
                } else {
                  const pricevat =
                    Number(item.purePrice) + Number(item.purePrice) * 0.05;
                  const achieved = (Number(item.gathered) / pricevat) * 100;
                  // successYN 이 Y이면 종료
                  let fin = item.successYN === 'Y' ? true : false;
                  acc.push({
                    id: i,
                    img: item.giftImgUrl,
                    productNum: item.productNum,
                    name: item.giftname,
                    achieved: Math.round(achieved),
                    achieved81: Math.round(achieved * 0.81),
                    price: Math.round(pricevat),
                    giftId: item.id,
                    finished: fin,
                  });
                }
                return acc;
              },
              [],
            ),
          );
        },
      )
      .catch((err: any) => {
        console.log('위시 상세정보 어디감', err);
      });
      // 로그인한 유저정보 받기
      const getUser = async () => {
        const API_URL = `https://i8e208.p.ssafy.io/api/account/userInfo`;
        axios({
          method: 'get',
          url: API_URL,
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then(
            (con) => {
              console.log('유저정보 불러오기 성공', con.data);
              setFriendName(con.data.username);
              setFriendPhone(con.data.tel)
            },
          )
          .catch((err: any) => {
            console.log('유저정보 불러오기 실패', err);
          });
      };
      getUser()
  }, []);

  const WishCardCover = () => {
    return (
      <div
        className="wish-card wish-card-cover"
        style={{
          backgroundImage: `url(${card})`,
          marginBottom: '10px',
          backgroundSize: 'cover',
        }}
      />
    );
  };
  const WishCardContent = () => {
    return (
      <div className="wish-card wish-card-content">
        <h1 className="wish-title">{title}</h1>
        <pre>{content?.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</pre>
      </div>
    );
  };
  const giftClicked = (i: number) => {
    if (clickedGift == i) {
      setClickedGift(null);
      setSelectGift(null);
    } else if (wishGiftList) {
      setSelectGift({ ...wishGiftList[i] });
      setClickedGift(i);
    }
  };
  const WishGiftListCompo = () => {
    return (
      <div className="wish-gift-list">
        {wishGiftList?.map((wishGift, i: number) => (
          <div
            className={`wish-gift ${clickedGift === i ? 'selected' : ''}`}
            id={String(i)}
            onClick={() => {
              !wishGift.finished && giftClicked(i);
            }}
          >
            <div className="gift-img-box">
              <div className="wish-gift-going">
                <div
                  className="gift-img"
                  style={{ backgroundImage: `url(${wishGift.img})` }}
                ></div>
                <div className="gift-bar-gray">
                  <div
                    style={{
                      width: wishGift.achieved81,
                      backgroundColor: '#FE3360',
                      height: 'inherit',
                      borderRadius: '5px',
                    }}
                  ></div>
                </div>
                <p>{wishGift.name}</p>
              </div>
              {wishGift.finished && (
                <div className="finished-product">
                  축하가 종료된 상품입니다!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  function NoPresent() {
    alert('상품을 선택해주세요.');
  }
  const WishCongratsBtns = () => {
    const wishInfo = {
      WishCardCover: card,
      WishCardContent: content,
      WishCardTitle: title,
    };
    return (
      <div className="wish-congrats-btns">
        {selectGift ? (
          <NavLink
            className="button color"
            to={`/congrats/${wishId}/giftcard`}
            state={{
              selectGift: selectGift,
              wishUserId: wishUserId,
              userName: friendName,
              userPhone:friendPhone,
            }}
          >
            선택한 선물로 축하하기 →
          </NavLink>
        ) : (
          <div className="button color" onClick={NoPresent}>
            선택한 선물로 축하하기 →
          </div>
        )}
        <NavLink
          className="button gray"
          to={`/congrats/${wishId}/giftpay`}
          state={{
            wishInfo: wishInfo,
            wishUserId: wishUserId,
            userName: userName,
            cashId: cashId,
          }}
        >
          축하금으로 보내기 →
        </NavLink>
      </div>
    );
  };
  return (
    <div className="congrats-page-container">
      <div className="wish-components">
        <div className="wish-compo-title" style={{ padding: '0 10px' }}>
          {category ? (
            WISH_CATEGORY_DATA.indexOf(category) !== -1 ? (
              <div>
                <h1>
                  {userName}님의 {category}을 축하해주세요!
                </h1>
              </div>
            ) : (
              <div>
                <h1>
                  {userName}님의 {category} 축하해주세요!
                </h1>
              </div>
            )
          ) : (
            <h1>{userName}님을 축하해주세요!</h1>
          )}
        </div>
        <div className="wish-card-box">
          <WishCardCover />
          <WishCardContent />
        </div>
        <WishGiftListCompo />
        <WishCongratsBtns />
      </div>
    </div>
  );
}
