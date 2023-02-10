import {
  ClassAttributes,
  HTMLAttributes,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/styles.css';
import '../css/checkWishPage.styles.css';
import gift from '../assets/iconGift.svg';
import { Bool, List } from 'reselect/es/types';

// slider
import ReactSlider from 'react-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
// user
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { CheckWish } from '../interface/interface';

export function CheckWishPage() {
  const [userId, setUserId] = useState(useSelector((state: RootState) => state.authToken.userId))
  const [isWish, setIsWish] = useState<Boolean>(false);
  const [wishGoing, setWishGoing] = useState<Boolean>(true);
  const [conList, setConList] = useState<Array<CheckWish>>();
  const [goOpenList, setGoOpenList] = useState<Array<CheckWish>>();
  const [setLsts, setSetLsts] = useState<Boolean>(false);
  const [showIng, setShowIng] = useState<Boolean>(false);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  useEffect(() => {
    const API_URL = `https://i8e208.p.ssafy.io/api/wish/wish/${userId}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // axios.defaults.headers.common['withCredentials'] = true;
    axios
      .get(API_URL)
      .then((res: { data: any[]; }) => {
        console.log('유저의 위시정보 get', res.data)
        // nList = res.data.finishYN이 ㅛ위시리스트
        // 1. nList가 빈값일 때 진행중인 위시가 없습니다
        // 2. nList를 checkWishPage 에 표출
        // 2-1. nList 진행중인 위시
        // 2-2. nList 완료되었고 축하카드를 확인하지 않은 위시
        if (res.data.length > 0) {
          setIsWish(true);
          // =-====================reduce방식으로 시도===================
          setConList(
            res.data.reduce(function (res: Array<any>, wish: any) {
              const result = conList?.some(
                (con: { wishId: any }) => con.wishId === wish.id,
              );
              if (wish.finishYN !== 'y' && !result) {
                let diff =
                  new Date(wish.endDate).getTime() - new Date().getTime();
                const froms = wish.giftItems.map(
                  (
                    gift: { payList: { pay_id: any; celeb_from: string }[] },
                    i: number,
                  ) => {
                    if (gift) {
                      let payids = gift.payList.map(
                        (p: { pay_id: any; celeb_from: string }) => {
                          return { id: p.pay_id, from: p.celeb_from };
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
                  restDay: String(Math.floor(diff / (1000 * 60 * 60 * 24))), // 오늘 날짜랑 계산해서 몇일남았는지
                  percent: (wish.nowPrice / wish.totPrice) * 100,
                  fromList: froms[0]?.data,
                  cardOpen: wish.cardopen,
                };
                res.push(data);
              }
              return res;
            }, []),
          );

          setGoOpenList(
            res.data.reduce(function (res: Array<any>, wish: any) {
              const result = goOpenList?.some(
                (go: { wishId: any }) => go.wishId === wish.id,
              );
              if (wish.finishYN === 'y') {
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
        // }).then(()=>{
        // console.log(goOpenList, 'goOpenList')
        //   return new Promise (function myo(){
        //     console.log(conList, 'here is myo')
        //     // 리스트 restDay가 적은 순서로 정렬
        //     let newArr = [...conList]
        //     newArr.sort(function (comp1, comp2){
        //       return Number(comp1.restDay) - Number(comp2.restDay)
        //     })
        //     setConList(newArr)

        //     // let newArr2 = [...goOpenList]
        //     // newArr2.sort(function (comp1, comp2){
        //     //   return Number(comp1.restDay) - Number(comp2.restDay)
        //     // })
        //     // setGoOpenList(newArr2)
        //   })
      })
      .catch((err:any) => {
        console.log('유저의 위시정보 불러오지못함', err);
      });
  }, []);

  const CongratCard = (props: { from: string; to: string }) => {
    return (
      <div className="congrat-card-cover">
        <div className="congrat-card">
          <div className="congrat-card-from">
            <p>from : {props.from}</p>
          </div>
          <div className="congrat-card-to">
            <p>to : {props.to}</p>
          </div>
        </div>
      </div>
    );
  };
  const CongratsCards = (props: {
    fromList: any[];
    wishId: string;
    userName: string;
  }) => {
    console.log(props.fromList, 'props.fromList');
    return (
      <div className="congrat-card-list">
        {props.fromList &&
          props.fromList.map((from: { id: any; from: string }, i: number) => (
            <NavLink
              to={`/thanks/${props.wishId}/${from.id}`}
              state={props.fromList}
            >
              <CongratCard key={i} from={from.from} to={props.userName} />
            </NavLink>
          ))}
      </div>
    );
  };
  const WishOpened = ({ goOpenList }: { goOpenList: CheckWish[] | undefined}) => {
    return (
      <>
        {goOpenList?.map((lst: CheckWish, i: number) => {
          return (
            <div className="wish-container">
              <CongratsCards
                fromList={lst.fromList}
                wishId={lst.wishId}
                userName={lst.userName}
              />
              <NavLink to={`/congrats/${lst.wishId}`}>
                <h1>
                  {lst.userName}님의 {lst.category}위시
                </h1>
                <h1>"{lst.title}"</h1>
              </NavLink>
              {/* <div className="wish-open wish-on-going-background">
                  
                  위시 오픈 애니메이션
                </div> */}
            </div>
          );
        })}
      </>
    );
  };
  const CheckConList = () => {
    console.log(conList, 'conListconListconList');
    console.log(
      goOpenList,
      'goOpenListgoOpenListgoOpenListgoOpenListgoOpenList',
    );
  };
  const WishOnGoing = ({ conList }: { conList: CheckWish[] | undefined}) => {
    return (
      <>
        {/* <button onClick={CheckConList}>list확인용</button> */}
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
                        <span>진행도</span>
                        <ReactSlider
                          className="horizontal-slider"
                          defaultValue={[lst.percent]}
                          disabled={true}
                          thumbClassName="example-thumb"
                          trackClassName="example-track"
                          renderTrack={(
                            props: JSX.IntrinsicAttributes &
                              ClassAttributes<HTMLDivElement> &
                              HTMLAttributes<HTMLDivElement>,
                            state: any,
                          ) => <div {...props} />} //custom track
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
            className={`show-toggle-btn ${showIng && 'show-toggle-selected'}`}
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
      <div className="page-name-block">
        {/* <h1>userid:{userId}</h1>
          <button className="temp-button" onClick={()=>(setIsWish(!isWish))}>{isWish?'위시있음':'위시없음'}</button> */}
        <div className={isWish ? 'page-name check-wish' : ''} />
      </div>
      <div className="check-wish-container">
        {isWish ? <IsWishLayout /> : <EmptyWishLayout />}
      </div>
    </>
  );
}
