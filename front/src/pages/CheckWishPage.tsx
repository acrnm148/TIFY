// slider
import ReactSlider from 'react-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
// user
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { CheckWish } from '../interface/interface';
//carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ClassAttributes, HTMLAttributes, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/styles.css';
import '../css/checkWishPage.styles.css';
import gift from '../assets/iconGift.svg';
import { Bool, List } from 'reselect/es/types';
import { Player } from '@lottiefiles/react-lottie-player';
import GiftBoxAnimation from '../components/GiftBoxAnimation';
import TapNameKor from '../components/TapNameKor';


export function CheckWishPage() {
  const [userId, setUserId] = useState(
    useSelector((state: RootState) => state.authToken.userId),
  );
  const [isWish, setIsWish] = useState<Boolean>(false);
  const [wishGoing, setWishGoing] = useState<Boolean>(true);
  const [conList, setConList] = useState<Array<CheckWish>>();
  const [goOpenList, setGoOpenList] = useState<Array<CheckWish>>();
  const [showIng, setShowIng] = useState<Boolean>(true);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  
  useEffect(() => {
    const API_URL = `https://i8e208.p.ssafy.io/api/wish/wish/${userId}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios
      .get(API_URL)
      .then((res: { data: any[] }) => {
        console.log('유저의 위시정보 get', res.data);
        if (res.data.length > 0) {
          setIsWish(true);
          // =-====================reduce방식으로 시도===================
          setConList(
            res.data.reduce(function (res: Array<any>, wish: any) {
              console.log('here', wish);
              const result = conList?.some(
                (con: { wishId: any }) => con.wishId === wish.id,
              );
              if (wish.finishYN !== 'Y' && !result) {
                let diff =
                  new Date(wish.endDate).getTime() - new Date().getTime();
                let froms: ({ id: any; from: string } | undefined)[] = [];
                wish.giftItems.map(
                  (
                    gift: { payList: { pay_id: any; celeb_from: string }[] },
                    i: number,
                  ) => {
                    if (gift) {
                      gift.payList.map(
                        (p: { pay_id: any; celeb_from: string }) => {
                          if (p.pay_id) {
                            froms.push({ id: p.pay_id, from: p.celeb_from });
                          }
                        },
                      );
                    }
                  },
                );
                if (froms) {
                }
                console.log('froms다~~~~~~~~~~~~~~~~~', froms);

                const data = {
                  wishId: wish.id,
                  userName: wish.user.username,
                  title: wish.title,
                  category: wish.category,
                  restDay: String(Math.floor(diff / (1000 * 60 * 60 * 24))), // 오늘 날짜랑 계산해서 몇일남았는지
                  percent: (wish.nowPrice / wish.totPrice) * 100,
                  fromList: froms ? froms : '',
                  cardOpen: wish.cardopen,
                };
                res.push(data);
              }
              res = res.sort(function (comp1, comp2) {
                console.log('리스트 정렬');
                return Number(comp1.restDay) - Number(comp2.restDay);
              });
              return res;
            }, []),
          );

          setGoOpenList(
            res.data.reduce(function (res: Array<any>, wish: any) {
              const result = conList?.some(
                (go: { wishId: any }) => go.wishId === wish.id,
              );
              if (wish.finishYN === 'Y' && !result) {
                let diff =
                  new Date(wish.endDate).getTime() - new Date().getTime();
                const froms = wish.giftItems.map(
                  (
                    gift: {
                      payList: {
                        pay_id: any;
                        celeb_from: string;
                        celeb_content: string;
                        celeb_tel: string;
                        celeb_img_url: string;
                      }[];
                    },
                    i: number,
                  ) => {
                    if (gift) {
                      let payids = gift.payList.map(
                        (p: {
                          pay_id: any;
                          celeb_from: string;
                          celeb_content: string;
                          celeb_tel: string;
                          celeb_img_url: string;
                        }) => {
                          return {
                            id: p.pay_id,
                            from: p.celeb_from,
                            content: p.celeb_content,
                            tel: p.celeb_tel,
                            img: p.celeb_img_url,
                          };
                        },
                      );
                      return { data: payids };
                    }
                  },
                );
                const data = {
                  wishId: wish.id,
                  userName: wish.user.username,
                  title: wish.title,
                  category: wish.category,
                  restDay: String(Math.floor(diff / (1000 * 60 * 60 * 24))),
                  percent: (wish.nowPrice / wish.totPrice) * 100,
                  fromList: froms[0].data,
                  cardOpen: wish.cardopen,
                };
                res.push(data);
              }
              return res;
            }, []),
          );
        }
      })
      .then(() => {
        return new Promise(function myo() {
          if (conList) {
            console.log('리스트 정렬');
            // 리스트 restDay가 적은 순서로 정렬
            let newArr = [...conList];
            newArr.sort(function (comp1, comp2) {
              return Number(comp2.restDay) - Number(comp2.restDay);
            });
            setConList(newArr);
          }
        });
      })
      .catch((err: any) => {
        console.log('유저의 위시정보 불러오지못함', err);
      });
  }, []);


  const CongratCard = (props: { from: string; to: string, open: boolean}) => {
    return (
        props.open===true
        ?
        <div className='envelope-con'>
          <div className='envelope-c'>
            <div className="valentines-day">
              <div className="envelope"></div>
              <div className="heart"></div>
              <div className="open-card-txt">from {props.from} </div>
              <div className="front"></div>
              <div className="text2">- hover over the envelope - </div>
            </div>
          </div>
      </div>
        :
        <div className="congrat-card-cover">
          <div className="congrat-card">
            <img src="https://user-images.githubusercontent.com/87971876/218955541-3a060405-5cd3-4b19-a1f9-3496d99b5dba.png" alt="닫힌 편지" />
          </div>
        </div>
    );
  };


// 캐러셀 부분
const CongratsCards = (props: {
  fromList: any[];
  wishId: string;
  userName: string;
}) => {
  // 옵션
  // console.log(friendWishList);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={showIng?'ongoing-wishes':"open-wishes"}>
      <Slider {...settings} className="congrat-card-list">
      {props.fromList &&
          props.fromList.map((from: { id: any; from: string }, i: number) => (
            <NavLink
              to={`/thanks/${props.wishId}/${from.id}`}
              state={props.fromList}
              style={{height:"100%"}}
            >
              <CongratCard key={i} from={from.from} to={props.userName} open={!showIng} />
            </NavLink>
          )
          )}
      </Slider>
    </div>
  );
};

  
  const handleClick = () => {
    setIsPlaying(!isPlaying);
  }

  const handleAnimationComplete = () => {
    setIsPlaying(false);
  };

  const WishOpened = ({
    goOpenList,
  }: {
    goOpenList: CheckWish[] | undefined;
  }) => {
    return (
      <>
        {goOpenList?.map((lst: CheckWish, i: number) => {
          return (
            <div className={showIng?'wish-container':'open-wish-container'}>
              <p className='finished-wish-text'><h1>{lst.userName}님의 완료된 위시 {i+1} </h1><span>"{lst.title}"</span></p>
              <CongratsCards
                fromList={lst.fromList}
                wishId={lst.wishId}
                userName={lst.userName}
              />
    <div onClick={handleClick}>
      <Player
        src={"https://assets9.lottiefiles.com/packages/lf20_0oco6l9x.json"}
        autoplay={isPlaying}
        loop={false}
        style={{ height:'200%', width: '500px'}}
        onEvent={event => {
          if (event === 'complete') handleAnimationComplete(); 
        }}
      />
    </div>
            
                {/* <iframe
                  style={{ height: '200%', width: '500px' }}
                  src="https://embed.lottiefiles.com/animation/64058"
                ></iframe>
                위시 오픈 애니메이션 */}
              </div>
          );
        })}
      </>
    );
  };
  const WishOnGoing = ({ conList }: { conList: CheckWish[] | undefined }) => {
    return (
      <>
        {conList &&
          conList.map((lst: CheckWish, i: number) => {
            return (
              <div className="wish-container">
                <CongratsCards
                  fromList={lst.fromList}
                  wishId={lst.wishId}
                  userName={lst.userName}
                />
                <NavLink
                  to={`/congrats/${lst.wishId}`}
                  className="wish-on-going-background"
                >
                  <div className="wish-on-going-box">
                    <h3 className="font-lg">
                      {lst.userName}님의 {lst.category}위시
                    </h3>
                    <p className="font-xl">"{lst.title}"</p>
                    <p className="font-lg">
                      {lst.restDay}일 뒤 축하편지를 확인하세요
                    </p>
                    <div className="slider-and-label-container">
                      <div className="slider-and-label">
                        <span className='진행도'>{Math.round(lst.percent)}%</span>
                        <ReactSlider
                          className="horizontal-slider"
                          defaultValue={[lst.percent]}
                          disabled={true}
                          thumbClassName="custom-thumb"
                          trackClassName="example-track"
                        />
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
      </>
    );
  };
  const IsWishLayout = () => {
    return (
      <div className="is-wish-layout">
        <div className="show-toggle-btn-con">
          <button
            onClick={() => setShowIng(false)}
            className={`show-toggle-btn ${!showIng && 'show-toggle-selected'}`}
          >
            완료
          </button>
          <button
            onClick={() => setShowIng(true)}
            className={`show-toggle-btn ${showIng && 'show-toggle-selected-pink'}`}
          >
            진행중
          </button>
        </div>
        {showIng ? (
          <WishOnGoing conList={conList && [...conList]} />
        ) : (
          <WishOpened goOpenList={goOpenList && [...goOpenList]} />
        )}
      </div>
    );
  };
  const EmptyWishLayout = () => {
    return (
      // <h1>없다</h1>
      <div className="empty-wish-container">
        <img src={gift} alt="선물아이콘" />
        <h3 className="no-wish">진행중인 위시가 없습니다</h3>
        <NavLink to="/makewish" className="gradient-button make-wish-button">
          위시 만들기
        </NavLink>
      </div>
    );
  };
  return (
    <>
      <TapNameKor
        title="Check Your Wish"
        // content={state.selectGift.name}
        content="만든 위시를 확인해보세요."
      ></TapNameKor>
      <div className="check-wish-container">
        {isWish ? <IsWishLayout /> : <EmptyWishLayout />}
      </div>
    </>
  );
}
// 캐러셀 부분
const Carousel = ({ friendWishList }: any) => {
  // 옵션
  // console.log(friendWishList);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="ongoing-wishes">
      <p className="phone-book-title">| Friends</p>
      <Slider {...settings}></Slider>
    </div>
  );
};
