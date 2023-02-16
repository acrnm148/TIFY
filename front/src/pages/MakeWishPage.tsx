import '../css/congratsPage.styles.css';
import '../css/giftHubList.styles.css';
import '../css/makeWishPage.styles.css';
import '../css/styles.css';
import addHeart from '../assets/addHeart.svg';
import hands from '../assets/miri/miri-5.png';
import { Player } from '@lottiefiles/react-lottie-player';
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import moment from 'moment'; //현재(한국)시간 불러오기
import { ko } from 'date-fns/esm/locale'; // 한국어 불러오기

import Postcode from '../components/Post';

// 선물 불러오기 모달
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { GiftItem } from '../components/GiftItem';
import { GiftHubList } from '../components/GiftHubList';
import { Gift } from '../interface/interface';
import { CongratsPage } from './CongratsPage';
import BlueLogoTify from '../assets/BlueLogoTify.svg';

// user
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { NavLink } from 'react-router-dom';
import ConfirmationDialog from '../components/WishCategoryOption';
import CarouselComponent from '../components/ResponsiveCarousel';
import { async } from '@firebase/util';
import { positions } from '@mui/system';
import { RootStateFriends } from '../store/Friends';

// alarm
import { push, ref } from 'firebase/database';
import { db } from '../components/firebase';
import TapNameKor from '../components/TapNameKor';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  minHeight: '200px',
  width: 'auto',
  minWidth: '400px',
  borderRadius: '8px',
  p: 4,
};

export function MakeWishPage() {
  // const [userId , setUserId] = useState(104);
  const [userId, setUserId] = useState(
    useSelector((state: RootState) => state.authToken.userId),
  );

  // 유저 친구정보
  const user_friends = useSelector(
    (state: RootState) => state.friendsIds.friendsIds,
  );

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );

  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [addr1, setAddr1] = useState<string>();
  const [addr2, setAddr2] = useState<string>();
  const [zipCode, setZipCode] = useState<number>();
  const [tooMany, setToomany] = useState<boolean>();
  const [cateForm, setCateForm] = useState<boolean>(false);
  // calendar
  const [range, setRange] = useState<any[]>([
    {
      endDate: addDays(new Date(), 0),
      key: 'selection',
      startDate: new Date(),
    },
  ]);
  const now = new Date();
  const disableDates = new Date(now.setMonth(now.getMonth() + 3)); //위시 기간 최대 3개월
  const duration =
    Math.abs((range[0].endDate - range[0].startDate) / (1000 * 60 * 60 * 24)) +
    1;

  const zero = (num: string | number) =>
    num < 10 && num >= 0 ? '0' + num : num;
  const dateFomat = (date: {
    getFullYear: () => any;
    getMonth: () => number;
    getDate: () => any;
  }) =>
    `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(
      date.getDate(),
    )}`;
  // const startDate = dateFomat(range[0].startDate);
  const date = new Date();
  const hours = String(date.getFullYear()).padStart(2, '0');
  const minutes = String(date.getMonth()).padStart(2, '0');
  const seconds = String(date.getDay()).padStart(2, '0');
  const startDate = dateFomat(range[0].startDate);
  const endDate = dateFomat(range[0].endDate);

  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  const [imgUrlS3, setImgUrlS3] = useState<string>('');
  const [imgFile, setImgFile] = useState(null); //파일
  // photo
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [cateKorean, setCateKorean] = useState<string>();

  // 가져온 유저정보
  const [userProfile, setUserProfile] = useState<string>();
  const [userAddr1, setUserAddr1] = useState<string>();
  const [userAddr2, setUserAddr2] = useState<string>();
  const [userZipCode, setUserZipCode] = useState<any>();
  const [userName, setUserName] = useState<string>();

  const [userOptions, setUserOptions] = useState<any>();

  const [callMyAddr, setCallMyAddr] = useState<boolean>();

  // address
  const [enroll_company, setEnroll_company] = useState({
    address: '',
    zonecode: '',
  });
  const [popup, setPopup] = useState(false);
  // gift cart
  const [cartList, setCartList] = useState<Gift[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 유저 폼 유효성 검사
  const [wishValidated, setWishValidated] = useState<boolean>();
  const wishData = { title: '', content: '', wishCard: '', giftItem: [] };
  const [goCategory, setGoCategory] = useState<boolean>();
  const [goTitle, setGoTitle] = useState<boolean>();
  const [goContent, setGoContent] = useState<boolean>();
  const [goImgUrl, setGoImgUrl] = useState<boolean>();
  const [goAddr1, setGoAddr1] = useState<boolean>();
  const [goAddr2, setGoAddr2] = useState<boolean>();

  // 위시생성페이지 mount시 유저의 id를 담아서 cart정보 요청
  useEffect(() => {
    const putCart = async () => {
      const API_URL = `https://i8e208.p.ssafy.io/api/cart/list/${userId}`;
      axios({
        method: 'get',
        url: API_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          max_result: 100,
        },
      })
        .then((con: { data: { content: any } }) => {
          const lst = con.data.content;
          const conlst: Gift[] = [];

          lst.map((d: any) => {
            conlst.push({
              giftId: 0,
              id: d.product.id,
              name: d.product.name,
              price: d.product.price,
              repImg: d.product.repImg,
              optionTitle: d.product.options[0]
                ? d.product.options[0].title
                : '',
              // options : [],
              options: d.product.options[0]
                ? d.product.options[0].details.map(
                    (opt: { content: string; value: number }) => {
                      return opt.content + '-' + opt.value;
                    },
                  )
                : [],
            });
          });
          setCartList(conlst);
          console.log('카트 리스트불러오기 성공', conlst);
        })
        .catch((err) => {
          console.log('카트 리스트불러오기 실패', err);
        });
    };
    putCart();

    const getUser = async () => {
      const API_URL = `https://i8e208.p.ssafy.io/api/account/userInfo`;
      axios({
        method: 'get',
        url: API_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(
          (con: {
            data: {
              profileImg: React.SetStateAction<string | undefined>;
              addr1: React.SetStateAction<string | undefined>;
              addr2: React.SetStateAction<string | undefined>;
              zipcode: React.SetStateAction<number | undefined>;
              username: React.SetStateAction<string | undefined>;
            };
          }) => {
            console.log('유저정보 불러오기 성공', con.data);
            setUserProfile(con.data.profileImg);
            setUserAddr1(con.data.addr1);
            setUserAddr2(con.data.addr2);
            setUserZipCode(con.data.zipcode);
            setUserName(con.data.username);
          },
        )
        .catch((err: any) => {
          console.log('유저정보 불러오기 실패', err);
        });
    };
    getUser();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [wishCart, setWishCart] = useState<Gift[]>([]);

  const pushItem = (i: number) => {
    if (wishCart) {
      if (wishCart.length == 6) {
        setToomany(true);
        return;
      }
      setWishCart([...wishCart, cartList[i]]);
    } else {
      setWishCart([cartList[i]]);
    }
    setTotalPrice(totalPrice + cartList[i].price);
  };

  function checkItemAmount(i: number) {
    //cartList[i]가 wishList에 몇개 담겼는지 확인
    let num = 0;
    if (wishCart) {
      wishCart.map((item) => {
        if (item.id === i) {
          num += 1;
        }
      });
    }
    return num;
  }
  const CartList = () => {
    return (
      <>
        <div>
          <h1 className="cart-list">카트상품목록</h1>
          {/* <button>카트관리</button> */}
        </div>
        {tooMany && <span>선물은 최대 6개까지 선택 가능합니다!</span>}
        {cartList.length > 0 ? (
          <div>
            <div className="like-list">
              {cartList.map((gift, i: number) => (
                <div className="like-item-card-container">
                  <div className="like-item-card">
                    <div className="like-gift-image">
                      {gift.repImg ? (
                        <img src={gift.repImg} alt="" />
                      ) : (
                        <img
                          src="https://user-images.githubusercontent.com/87971876/215664788-d0359920-497d-4b2a-86db-6381254637d6.jpg"
                          alt="이미지가 없습니다"
                        />
                      )}
                    </div>
                    <div className="gift-text">
                      <p>{gift.name}</p>
                      <p className="gift-price">
                        {gift.price.toLocaleString('ko-KR')}원
                      </p>
                    </div>
                    <div className="pm-btn">
                      <button onClick={() => delWishGift(gift.id, i)}>-</button>
                      <p>{checkItemAmount(gift.id)}</p>
                      <button onClick={() => pushItem(i)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>카드에 상품이 없습니다.</p>
        )}
        <div className="total-price-div">
          <h1>총 가격 {totalPrice.toLocaleString('ko-KR')}원</h1>
        </div>
      </>
    );
  };
  const pushData = (friendsId: number) => {
    let base = '/test/tify/'; // 우리 db 기본 주소입니다.
    // email에서 사용가능한 특수문자로 변경한형태로 유저 개인 db table 이름이 설정되어 있습니다.
    // let userCollection = friendsId.replace("@","-").replace(".","-") // ex) rkdrlgks321-naver-com
    push(ref(db, base + friendsId), {
      text: userName + '님의 위시가 생성되었습니다!', // 필드는 자유롭게 추가 하셔도 됩니다.
      profile: userProfile,
      interval: 'Daily', // nonSql db라서 확장/수정이 자유롭습니다.
      time: Date.now(),
    });
  };
  const [finished, setFinished] = useState(false);
  const MakeWish = () => {
    const makeWish = async () => {
      const API_URL = 'https://i8e208.p.ssafy.io/api/wish/add/';
      const gift: {
        giftUrl: string; // test를 위해 추가했습니다.
        productId: number;
        purePrice: number;
        userOption: string;
        giftImgUrl: string;
        giftname: string;
        maxAmount: number;
        quantity: number;
        giftOptionList: never[];
      }[] = wishCart
        .map((item) => {
          return {
            giftUrl: '', // test를 위해 추가했습니다.
            productId: item.id,
            purePrice: item.price,
            userOption: item.optionTitle + '-' + userOptions,
            giftImgUrl: item.repImg,
            giftname: item.name,
            maxAmount: item.price + Math.round(item.price * 0.05),
            quantity: 1,
            giftOptionList: [],
          };
        })
        .concat([
          {
            giftUrl: '',
            productId: -1, // 현금: -1, 링크입력선물 : 0, ,
            purePrice: 9999999,
            userOption: '',
            giftImgUrl: '',
            giftname: '현금',
            maxAmount: 9999999,
            quantity: 1,
            giftOptionList: [],
          },
        ]); // 현금축하를 위한 gift데이터
      const data = {
        userId: userId,
        giftItems: gift,
        finishYN: 'N',
        totalPrice: totalPrice,
        wishTitle: title,
        wishContent: content,
        category: category,
        startDate: startDate,
        endDate: endDate,
        wishCard: imgUrlS3,
        zipCode: userZipCode ? userZipCode : enroll_company.zonecode,
        addr1: userAddr1 ? userAddr1 : enroll_company.address,
        addr2: addr2,
      };
      console.log('data', data);
      axios({
        url: API_URL,
        method: 'POST',
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      })
        .then((con: any) => {
          console.log('위시생성 성공', con, userId);
          setFinished(true);
          // user_friends에 알림보내기
          user_friends.forEach((fri: number) => {
            pushData(fri);
            console.log('친구에게 위시생성 알림보냄' + fri);
          });
        })
        .catch((err: any) => {
          console.log('위시생성 실패', err);
        })
        .catch((err: any) => {
          console.log('위시생성 실패', err);
        });
    };
    makeWish();
  };

  const CardClicked = (e: string) => {
    // console.log('자식 컴포넌트에서 선택한 카드의 url', e)
    setImgUrlS3(e);
  };

  const delWishGift = (id: number, i: number) => {
    // id : 상품 id
    // i : 위시카트의 인덱스번호

    // 1개 남았을 떄 다지워
    if (wishCart?.length === 1) {
      setWishCart([]);
      // setTotalProduct([])
      setTotalPrice(0);
      setUserOptions(null);
      return;
    }

    // option정보 지우기
    let delOp;
    if (userOptions && i in userOptions) {
      let delo: string = userOptions[i];
      delOp = delo.split('-')[1];
      console.log('delOp', delOp);
      // 최종 가격에서 option정보 빼기
    }
    // [i] // 'optionname-optionvalue'
    // console.log('delOp',delOp, 'typeof(delOp)', typeof(delOp) )

    if (wishCart) {
      setTotalPrice(totalPrice - wishCart[i].price - Number(delOp));
      wishCart.forEach((prod) => {
        if (prod.id === id) {
          wishCart.splice(i, 1);
          return;
        }
      });
      if (wishCart.length < 7) {
        setToomany(false);
      }
    }
  };

  const pannel = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const FinishedWishComponent = () => {
    return (
      <div className="finish-wish-con">
        <div
          className="finish-congrats congrats-page-container"
          ref={pannel}
          style={{ top: `${positions}` }}
        >
          <div className="wish-components">
            <div className="wish-components-title">
              <h1>
                {category && userName
                  ? userName + '의 ' + category + cateKorean + ' '
                  : ''}
                <br />
                축하해주세요!
              </h1>
            </div>
            <div className="wish-card-box">
              <div
                className="wish-card fin-wcd wish-card-cover"
                style={{ backgroundImage: `url(${imgUrlS3 ? imgUrlS3 : ''})` }}
              />
              <div className="wish-card fin-wcd wish-card-content">
                <h1>{title}</h1>
                <div>{content?.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</div>
              </div>
              <div
                className="wish-congrats-btns"
                style={{ justifyContent: 'center' }}
              >
                <div className="button color">선택한 선물로 축하하기 →</div>
                <div className="button gray">축하금으로 보내기 →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const getCategory = (e: string) => {
    if (e === '직접입력') {
      setCateForm(true);
      setCateKorean('');
    } else {
      setCategory(e);
      setCateForm(false);
      setCateKorean('을');
    }
  };
  const CallMyAddr = () => {
    if (!userAddr1 && !userAddr2) {
      alert('저장된 주소가 없습니다');
      setCallMyAddr(false);
    } else {
      setCallMyAddr(true);
      setAddr1(userAddr1);
      setAddr2(userAddr2);
      setZipCode(userZipCode);
    }
  };
  useEffect(() => {
    if (
      wishCart &&
      title &&
      content &&
      category &&
      startDate &&
      endDate &&
      imgUrlS3 &&
      addr1 &&
      addr2
    ) {
      setWishValidated(true);
    }
  }, [
    wishCart,
    title,
    content,
    category,
    startDate,
    endDate,
    imgUrlS3,
    addr1,
    addr2,
  ]);
  useEffect(() => {
    setCallMyAddr(false);
    setGoAddr1(true);
    setGoAddr2(true);
    setAddr1(enroll_company.address);
    console.log('주소지 찾기로 입력한 주소', enroll_company.address);
  }, [enroll_company]);

  const notValid = () => {
    category ? setGoCategory(true) : setGoCategory(false);
    title ? setGoTitle(true) : setGoTitle(false);
    content ? setGoContent(true) : setGoContent(false);
    // !startDate?setGoContent(true):setGocontent(false)
    imgUrlS3 ? setGoImgUrl(true) : setGoImgUrl(false);
    addr1 ? setGoAddr1(true) : setGoAddr1(false);
    addr2 ? setGoAddr2(true) : setGoAddr2(false);
  };
  const ChangeOption = (e: any, i: number) => {
    if (e.target.value) {
      console.log('ininini', e.target.value);
      setUserOptions({ ...userOptions, [i]: e.target.value });
      const val = e.target.value.split('-');
      setTotalPrice(totalPrice + Number(val[1]));
    }
  };
  return (
    <>
      <TapNameKor
        title="Make A Wish"
        // content={state.selectGift.name}
        content="당신의 특별한 날을 위한 위시를 생성해보세요."
      ></TapNameKor>
      {finished ? (
        <div className="wish-page-container">
          <div className="make-wish-container wid-50">
            <div>
              <div className="finish-wish-comment">
                <h1>위시 생성이 완료되었습니다!</h1>
                <NavLink to={'/checkwish'}>
                  <p>위시목록으로 고고고</p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="wid-50">
            <FinishedWishComponent />
          </div>
        </div>
      ) : (
        <div className="wish-page-container">
          <div className="make-wish-container wid-50">
            <div className="make-wish-form">
              <div className="make-wish-part">
                <div className="make-wish-category-box">
                  <label>
                    {/* <Player
                      autoplay
                      loop
                      src="https://assets7.lottiefiles.com/packages/lf20_5JBjfrVjZH.json"
                      style={{ height: '100px', width: '100px' }}
                    ></Player> */}
                    <img src={hands} />
                  </label>
                  <div className="wish-personal-box wid-100 flex-between">
                    <div className="wish-personal-box-left">
                      <ConfirmationDialog propFunction={getCategory} />
                    </div>
                    {cateForm && (
                      <div className="wish-personal-box-right">
                        {!goCategory && (
                          <span className="make-wish-warning warning">
                            축하 카테고리를 입력해주세요!
                          </span>
                        )}
                        <input
                          onChange={(e) => setCategory(e.target.value)}
                          className="wid-100 cate-input"
                          placeholder="축하 카테고리를 입력해주세요!"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="padd"></div> */}
              <div className="make-wish-part">
                <div className="input-form">
                  <label htmlFor="태그">위시 이름</label>
                  <input
                    type="text"
                    name="태그"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {goTitle === false && (
                    <span className="warning">위시 이름을 입력해주세요!</span>
                  )}
                </div>

                <div className="input-form input-wide">
                  <label htmlFor="태그">내용</label>
                  <textarea
                    name="태그"
                    onChange={(e) =>
                      setContent(
                        e.target.value.replaceAll(/(\n|\r\n)/g, '<br>'),
                      )
                    }
                  ></textarea>
                  {goContent === false && (
                    <span className="warning">내용을 입력해주세요!</span>
                  )}
                </div>
              </div>
              {/* <div className="brbr padd"></div> */}
              <div className="duration-container wid-100">
                <div className="make-wish-part">
                  <label htmlFor="">기간</label>
                  <div className="make-wish-period-part make-wish-period-box wid-100 padding-10 disp-flex just-btwn bg-gray align-center">
                    <p className="totalDays font-lrg">
                      총 <span>{duration.toFixed(0)}</span>일
                    </p>
                    <p className="totalDays-right">
                      위시 진행 기간 :
                      <span className="padding-10">{startDate}</span>~
                      <span className="padding-10">{endDate}</span>
                    </p>
                  </div>

                  <div className="duration-from calendar-container">
                    <DateRange
                      editableDateInputs={false}
                      onChange={(item) => setRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      retainEndDateOnFirstSelection={true}
                      ranges={range}
                      months={2}
                      direction="horizontal"
                      minDate={moment().add(1, 'days').toDate()}
                      maxDate={disableDates}
                      locale={ko}
                      dateDisplayFormat="yyyy년 MM월 dd일"
                    />
                  </div>
                  {/* {
                    !go&&
                    <span className='warning'>기간을 선택해주세요</span>
                  } */}
                </div>
              </div>
              {/* <div className="brbr padd"></div> */}
              <div className="card-container wid-100">
                <div className="make-wish-part">
                  <div className="card-imgs-div">
                    <label className="card-label" htmlFor="">
                      카드
                    </label>
                    <CarouselComponent propFunction={CardClicked} />
                    {goImgUrl === false && (
                      <span className="warning">카드를 선택해주세요</span>
                    )}
                  </div>
                </div>
                {/* <div className="brbr padd"></div> */}
                <div className="make-wish-part">
                  <div className="wid-100">
                    <label className="card-label" htmlFor="">
                      선물
                    </label>
                    <div className="wish-card-container gift-container w-100">
                      <div className=" modal-con">
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
                              <CartList />
                            </Box>
                          </Fade>
                        </Modal>
                      </div>
                      <div className="wid-100 back-white">
                        <div
                          className="wish-card-gift-select add-gift-icon-con"
                          onClick={handleOpen}
                        >
                          <img
                            className="add-gift-icon"
                            src={addHeart}
                            alt=""
                          />
                        </div>
                        {wishCart?.map((e, i: number) => {
                          return (
                            <div className="wish-card-gift wid-100">
                              <div className="wid-50 align-center">
                                <div className="disp-flex align-center">
                                  <img className="wid-38" src={e.repImg}></img>
                                  <p className="padding-10">{e.name}</p>
                                </div>
                              </div>
                              <div className="wid-50 disp-flex flex-end">
                                {e.optionTitle && (
                                  <div className="padding-r-20">
                                    <select
                                      name={e.optionTitle}
                                      onChange={(e) => ChangeOption(e, i)}
                                    >
                                      <option value="" selected>
                                        {e.optionTitle}
                                      </option>
                                      {e.options.map((opt) => {
                                        let res = opt.split('-');
                                        return (
                                          <option value={opt}>
                                            <span className="font-bold">
                                              {res[0]}
                                            </span>{' '}
                                            + {res[1]}원
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                )}
                                <p className="font-lrg font-bold">
                                  {e.price.toLocaleString('ko-KR')}
                                </p>
                              </div>
                              <div
                                className="delete-gift-btn"
                                onClick={() => delWishGift(e.id, i)}
                              >
                                삭제
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="font-bold padding-10 font-lrg  tot-price">
                        <p>
                          총 위시금액 : {totalPrice.toLocaleString('ko-KR')}원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="brbr padd"></div> */}
              <div className="make-wish-part">
                <div className="address-form-container wid-100">
                  <label htmlFor="태그">주소</label>
                  <div className="postcode-myaddr">
                    <input
                      className="address-form postcode wid-50"
                      type="text"
                      value={callMyAddr ? userZipCode : enroll_company.zonecode}
                      placeholder="우편번호"
                      disabled
                    />
                    <div
                      className="my-addr wid-20 my-addr"
                      onClick={CallMyAddr}
                    >
                      내 주소 불러오기
                    </div>
                  </div>
                  <div className="address-form wid-100">
                    <input
                      type="text"
                      placeholder="주소"
                      required={true}
                      name="address"
                      value={callMyAddr ? userAddr1 : enroll_company.address}
                      disabled
                    />
                    <Postcode
                      company={enroll_company}
                      setcompany={setEnroll_company}
                    />
                  </div>
                  {!addr1 ? (
                    <span className="warning">주소지를 작성해주세요</span>
                  ) : (
                    ''
                  )}
                </div>
                <div className="address-form-bottom wid-100">
                  <label htmlFor="상세주소">상세주소</label>
                  <div className="input-form">
                    <input
                      type="text"
                      name="상세주소"
                      onChange={(e) => setAddr2(e.target.value)}
                      value={callMyAddr ? userAddr2 : addr2}
                    />
                  </div>
                  {goAddr2 === false && (
                    <span className="warning">상세주소지를 작성해주세요</span>
                  )}
                </div>
              </div>
              {/* <div className="brbr padd"></div> */}
              {/* 위시 폼 유효하면 위시만들기 버튼 활성화 */}
              {wishValidated ? (
                <div className="make-wish-btn-con wid-100">
                  <div className="make-wish-btn grd-btn" onClick={MakeWish}>
                    위시만들기
                  </div>
                </div>
              ) : (
                <div className="make-wish-btn-con-mw wid-100">
                  <div
                    className="make-wish-btn wid-100 disable-btn"
                    onClick={notValid}
                  >
                    위시만들기
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="wid-50">
            <FinishedWishComponent />
          </div>
        </div>
      )}
    </>
  );
}
