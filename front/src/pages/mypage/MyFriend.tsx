// import type { WishProps } from '../interface/interface';
import { ClassAttributes, HTMLAttributes, useState, useEffect } from 'react';
import '../../css/mypage/myFriend.styles.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import axios from 'axios';

// slider
import ReactSlider from 'react-slider';
import 'rc-slider/assets/index.css';

// scrollBar
import { Scrollbar } from 'react-scrollbars-custom';

export function Friend() {
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const [friendWishList, setFriendWishList] = useState<Array<any>>();

  useEffect(() => {
    const API_URL = `https://i8e208.p.ssafy.io/api/wishfriend/${userId}`;
    // const API_URL = `https://i8e208.p.ssafy.io/api/friendsinfo/119`;
    const result: any[] = [];
    axios
      .get(API_URL)
      .then((res) => {
        console.log('일촌 위시 받아오기 성공');
        // console.log(res.data, '내가 바로 친구놈들의 wish 입니다!!!!');
        // console.log(typeof res.data, '내가 바로 친구놈들의 wish type 입니다!!!!');
        if (res.data.length > 0) {
          const wishFriendObj = Object.values(res.data);
          // console.log(wishFriendObj, 'wishFriendObj입니다.');
          for (let key in wishFriendObj) {
            const value: any = wishFriendObj[key];
            // console.log(value, 'value는 이거야.');
            // console.log(
            //   Object.values(value),
            //   'wishFriendObj 순회 돌린 결과의 밸류',
            // );
            const friendWishes = Object.values(value);
            // console.log(typeof friendWishes);
            for (let key in value) {
              const friendWishes = value[key];
              for (let key in friendWishes) {
                const friendWish = friendWishes[key];
                // console.log(friendWish);
                if (friendWish.finishYN !== 'Y') {
                  // console.log(friendWish, '안 끝난 frinedWish');
                  const data = {
                    wishId: friendWish.id,
                    totPrice: friendWish.totPrice,
                    nowPrice: friendWish.nowPrice,
                    endDate: friendWish.endDate,
                    title: friendWish.title,
                    percent: (friendWish.nowPrice / friendWish.totPrice) * 100,
                    userName: friendWish.user.username,
                    nickName: friendWish.user.nickname,
                    userImg: friendWish.user.profileImg,
                  };
                  // console.log(data, 'data는 요것!!!!!!!!!!!!!!!!!');
                  result.push(data);
                }
              }
            }
          }
        }
        // console.log(result, 'result는 이것입니다~~~');
        const sortedResult: any = result.sort(function (a, b) {
          if (a.endDate < b.endDate) {
            return -1;
          } else if (a.endDate > b.endDate) {
            return 1;
          } else {
            return 0;
          }
        });
        // console.log(sortedResult);
        setFriendWishList(sortedResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="base-div">
      {/* <div className="ongoing-wishes">
        {wishes.map(function (wish) {
          return <WishCard wish={wish} />;
        })}
      </div> */}
      <div className="carousel-div">
        {/* <Carousel></Carousel> */}
        <Carousel friendWishList={friendWishList}></Carousel>
        <FriendsList></FriendsList>
      </div>
    </div>
  );
}

const FriendsList = () => {
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const [friendList, setFriendList] = useState<Array<any>>();
  const [requestsList, setRequestsList] = useState<Array<any>>();

  useEffect(() => {
    const API_URL = `https://i8e208.p.ssafy.io/api/friendsinfo/${userId}`;
    axios
      .get(API_URL)
      .then((res) => {
        const friendsResult: any[] = [];
        const requetsResult: any[] = [];
        console.log('친구 목록 받아오기 성공!');
        // console.log(res.data);

        // 친구인 놈들 데이터 받아옴
        if (res.data.friends.length > 0) {
          // console.log(res.data.friends);
          // console.log(typeof res.data.friends);
          const friendsList = Object.values(res.data.friends);

          for (let key in friendsList) {
            const value: any = friendsList[key];
            // console.log(value);
            const data = {
              profileImg: value.user.profileImg,
              nickname: value.user.nickname,
              username: value.user.username,
              id: value.id,
            };
            // console.log(data);
            friendsResult.push(data);
          }
        }
        const sortedFriendsResult: any = friendsResult.sort(function (a, b) {
          return b.id - a.id;
        });
        setFriendList(sortedFriendsResult);

        // 친구 요청 받은 목록을 받아옴.
        if (res.data.receivedRequests.length > 0) {
          // console.log(res.data.receivedRequests);
          // console.log(typeof res.data.receivedRequests);
          const requestsList = Object.values(res.data.receivedRequests);

          for (let key in requestsList) {
            const value: any = requestsList[key];
            // console.log(value);
            const data = {
              profileImg: value.user.profileImg,
              nickname: value.user.nickname,
              username: value.user.username,
              friendId: value.friendId,
              // 순서 조정을 위한
              id: value.id,
            };
            // console.log(data);
            requetsResult.push(data);
          }
        }
        const sortedRequestsResult: any = requetsResult.sort(function (a, b) {
          return b.id - a.id;
        });
        setRequestsList(sortedRequestsResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="friends-div">
      친구 목록들
      <div className="test-div">안녕</div>
      <div className="test-div">안녕</div>
      <div className="test-div">안녕</div>
      <div className="test-div">안녕</div>
      <div className="test-div">안녕</div>
      <div className="test-div">안녕</div>
    </div>
  );
};

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
      <Slider {...settings}>
        {friendWishList &&
          friendWishList.map((friendWish: object) => {
            return <WishCard friendWish={friendWish}></WishCard>;
          })}
        {/* {items.map((item: any) => {
          return <WishCard item={item}></WishCard>;
        })} */}
        <div className="ongoing-wish">
          <h3>1</h3>
        </div>
        <div className="ongoing-wish">
          <h3>2</h3>
        </div>
        <div className="ongoing-wish">
          <h3>3</h3>
        </div>
        <div className="ongoing-wish">
          <h3>4</h3>
        </div>
        <div className="ongoing-wish">
          <h3>5</h3>
        </div>
        <div className="ongoing-wish">
          <h3>6</h3>
        </div>
        <div className="ongoing-wish">
          <h3>7</h3>
        </div>
        <div className="ongoing-wish">
          <h3>8</h3>
        </div>
      </Slider>
    </div>
  );
};

// 진행 중인 위시 부분
function WishCard({ friendWish }: any) {
  // console.log(friendWish);
  return (
    <div className="ongoing-wish">
      <div className="wish-profile-div">
        <img src={friendWish.userImg} alt="" className="wish-profile-img" />
        <div className="name-div">
          <p className="friend-wish-username">{friendWish.userName}</p>
          <p className="friend-wish-nickname">{friendWish.nickName}</p>
        </div>
      </div>
      <p className="friend-wish-title">"{friendWish.title}"</p>
      <div className="wish-slider-and-label-container">
        <div className="slider-and-label">
          <span>진행도</span>
          <ReactSlider
            className="horizontal-slider-myfriend"
            defaultValue={[friendWish.percent]}
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
  );
}
