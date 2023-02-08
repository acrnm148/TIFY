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
import { RootState } from '../../store/Auth';
import { CheckWish } from '../../interface/interface';

export function MyWish() {
  const userId = 133;
  const [isWish, setIsWish] = useState<Boolean>(false);
  const [wishGoing, setWishGoing] = useState<Boolean>(true);
  const [conList, setConList] = useState<Array<CheckWish>>([]);
  const [goOpenList, setGoOpenList] = useState<Array<CheckWish>>([]);
  const [setLsts, setSetLsts] = useState<Boolean>(false);
  const [showIng, setShowIng] = useState<Boolean>(false);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
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
                  fromList: froms[0].data,
                  cardOpen: wish.cardopen,
                };
                res.push(data);
              }
              return res;
            }, []),
          );

          setGoOpenList(
            res.data.reduce(function (res: Array<any>, wish: any) {
              const result = goOpenList.some(
                (go: { wishId: any }) => go.wishId === wish.id,
              );
              if (wish.finishYN === 'y') {
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
      .catch((err) => {
        console.log('유저의 위시정보 불러오지못함');
      });
  }, []);
  console.log(conList);

  const WishCard = ({ conList }: { conList: CheckWish[] }) => {
    return (
      <>
        {conList.map((con: CheckWish) => {
          return (
            <div className="wish-box shadow-xl">
              <p className="p-date">완료까지 {con.restDay}일</p>
              <p className="p-proceed">진행중</p>
              <div className="category-div">
                <img src={iconCategory1Birthday} alt="" />
                <p className="wish-title">"{con.title}"</p>
              </div>
              <Donator />
            </div>
            // <div>
            //   <h1>{con.title}</h1>
            // </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="my-wish-div">
      <WishCard conList={[...conList]}></WishCard>
      {/* <WishCardActive title={'안녕안녕'}></WishCardActive>
      <WishCardActive title={'안녕안녕'}></WishCardActive>
      <WishCardActive title={'안녕안녕'}></WishCardActive>
      <WishCardActive title={'안녕안녕'}></WishCardActive> */}

      <WishCardDeactive title={'안녕안녕'}></WishCardDeactive>
      <WishCardDeactive title={'안녕안녕'}></WishCardDeactive>
      <div style={{ width: '200px' }}>
        <img src={iconCategory2Marry} alt="" />
        <img src={iconCategory3Employed} alt="" />
        <img src={iconCategory4Health} alt="" />
        <img src={iconCategory5Childbirth} alt="" />
        <img src={iconCategory6Unmarried} alt="" />
        <img src={iconCategory7Etc} alt="" />
      </div>
    </div>
  );
}

function Donator() {
  return (
    <div className="donator-div">
      <div className="flex items-center space-x-2 text-base">
        <p className="text-xs ">축하해주신 분</p>
      </div>
      <div className="mt-1 flex -space-x-2 overflow-hidden">
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="mt-1 text-xs">
        <a className="text-blue-500">+ 198 others</a>
      </div>
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
      <Donator />
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
      <Donator />
    </div>
  );
}
