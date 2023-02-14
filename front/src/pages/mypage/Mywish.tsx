import iconCategory1Birthday from '../../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../../assets/category/iconCategory7Etc.svg';
import '../../css/myPage.styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
// user
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../store/Auth';
import { MyWishType } from '../../interface/interface';

export function MyWish() {
  const [isWish, setIsWish] = useState<Boolean>(false);
  const [wishGoing, setWishGoing] = useState<Boolean>(true);
  const [conList, setConList] = useState<Array<MyWishType>>([]);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const userId = useSelector((state: RootState) => state.authToken.userId);

  const navigate = useNavigate();
  useEffect(() => {
    const API_URL = `https://i8e208.p.ssafy.io/api/wish/wish/${userId}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios
      .get(API_URL)
      .then((res) => {
        // console.log('유저의 위시정보 get', res.data)
        // nList = res.data.finishYN이 ㅛ위시리스트
        // 1. nList가 빈값일 때 진행중인 위시가 없습니다
        // 2. nList를 checkWishPage 에 표출
        // 2-1. nList 진행중인 위시
        // 2-2. nList 완료되었고 축하카드를 확인하지 않은 위시
        console.log(res, '이게 내 위시들이야!!!');
        if (res.data.length > 0) {
          setIsWish(true);
          // =-====================reduce방식으로 시도===================
          setConList(
            res.data.reduce(function (res: Array<any>, wish: any) {
              const result = conList.some(
                (con: { wishId: any }) => con.wishId === wish.id,
              );
              if (wish.finishYN !== 'y' && !result) {
                let diff =
                  new Date(wish.endDate).getTime() - new Date().getTime();
                // console.log(wish, '하나의 위시 입니다.');
                const payImgs: string[] = [];
                const froms = wish.giftItems.map(
                  (
                    gift: {
                      payList: {
                        pay_id: any;
                        celeb_from: string;
                        profImgUrl: string;
                      }[];
                    },
                    i: number,
                  ) => {
                    if (gift) {
                      let payids = gift.payList.map(
                        (p: {
                          pay_id: any;
                          celeb_from: string;
                          profImgUrl: string;
                        }) => {
                          payImgs.push(p.profImgUrl);
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
                  restDay: Math.floor(diff / (1000 * 60 * 60 * 24)), // 오늘 날짜랑 계산해서 몇일남았는지
                  percent: (wish.nowPrice / wish.totPrice) * 100,
                  fromList: froms[0].data,
                  cardOpen: wish.cardopen,
                  payImgs,
                };
                res.push(data);
              }
              // console.log(payImgs, 'payImgs 여기 있습니다!!!!');
              return res;
            }, []),
          );
        }
      })
      .catch((err) => {
        console.log('유저의 위시정보 불러오지못함');
      });
  }, []);

  const GoToWish = (wishId: string): any => {
    console.log(wishId);
    navigate(`/congrats/${wishId}`);
  };

  function Categorize(category: any) {
    const RC = category.category;
    if (RC == '생일') {
      return <img src={iconCategory1Birthday} alt="" />;
    } else if (RC == '결혼') {
      return <img src={iconCategory2Marry} alt="" />;
    } else if (RC == '취업') {
      return <img src={iconCategory3Employed} alt="" />;
    } else if (RC == '건강') {
      return <img src={iconCategory4Health} alt="" />;
    } else if (RC == '출산') {
      return <img src={iconCategory5Childbirth} alt="" />;
    } else if (RC == '비혼') {
      return <img src={iconCategory6Unmarried} alt="" />;
    } else {
      return <img src={iconCategory7Etc} alt="" />;
    }
  }

  type ConProps = {
    conList: MyWishType[];
  };
  const WishCard = ({ conList }: ConProps) => {
    // 축하해준 사람 수
    console.log(conList, 'conList가 요것입니다.');
    console.log(typeof conList, 'conList의 타입은 요것입니다.');

    return (
      <>
        {conList.map((con: MyWishType) => {
          // 완료된 위시
          const conCount = con.payImgs.length;
          const restDay = con.restDay;
          var RD = '';
          if (restDay > 0) {
            var RD = `- ${restDay}`;
          } else if (restDay == 0) {
            var RD = '- day';
          } else {
            var RD = `+ ${-restDay}`;
          }

          if (Number(con.restDay) < 1) {
            return (
              <div
                className="wish-box shadow-xl"
                onClick={() => GoToWish(con.wishId)}
              >
                <p className="p-date" style={{ fontWeight: 'bold' }}>
                  D {RD}
                </p>
                <p className="p-done" style={{ fontWeight: 'bold' }}>
                  완료
                </p>
                <div className="category-div">
                  <Categorize category={con.category}></Categorize>
                  <p className="wish-title">"{con.title}"</p>
                </div>
                {conCount > 0 ? (
                  <Donator payImgs={con.payImgs} />
                ) : (
                  <button>공유해보세요.</button>
                )}
              </div>
            );
          } else {
            return (
              <div
                className="wish-box shadow-xl"
                onClick={() => GoToWish(con.wishId)}
              >
                <p className="p-date"> D {RD}</p>
                <p className="p-proceed">진행중</p>
                <div className="category-div">
                  <Categorize category={con.category}></Categorize>
                  <p className="wish-title">"{con.title}"</p>
                </div>
                {conCount > 0 ? (
                  <Donator payImgs={con.payImgs} />
                ) : (
                  <div className="donator-div">
                    <p className="no-donate">
                      아직 축하해주신 분이 없어요😢
                      <br></br>
                      당신의 위시를 공유해보세요.
                    </p>
                  </div>
                )}{' '}
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <div>
      <p className="phone-book-title">| My Wish</p>
      <div className="my-wish-div">
        <WishCard conList={[...conList]}></WishCard>
      </div>
    </div>
  );
}

interface PayImgs {
  payImgs: string[];
}

function Donator({ payImgs }: PayImgs) {
  console.log(payImgs, 'Donater에서 나오는 pay');
  console.log(payImgs.slice(-5), 'Donater에서 나오는 pay를 슬라이스 한 것');
  const imgCount = payImgs.length;

  return (
    <div className="donator-div">
      <div className="flex items-center space-x-2 text-base">
        <p className="text-xs ">축하해주신 분</p>
      </div>
      <div className="mt-1 flex -space-x-2 overflow-hidden">
        {payImgs &&
          payImgs.slice(-5).map((payImg) => {
            return (
              <img
                className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
                src={payImg}
                alt=""
              />
            );
          })}
      </div>
      {imgCount > 5 ? (
        <div className="mt-1 text-xs">
          <a className="text-blue-500">+ {imgCount - 5} others</a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function WishCardActive(props: { title: string }) {
  return (
    <div className="wish-box shadow-xl">
      <p className="p-date">완료까지 7일</p>
      <p className="p-proceed">진행중</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="wish-title">"{props.title}"</p>
      </div>
      {/* <Donator /> */}
    </div>
  );
}

function WishCardDeactive(props: { title: string }) {
  return (
    <div className="wish-box shadow-xl">
      <p className="p-date">완료까지 7일</p>
      <p className="p-done">진행중</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="wish-title">"{props.title}"</p>
      </div>
      {/* <Donator /> */}
    </div>
  );
}
