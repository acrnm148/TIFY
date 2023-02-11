// import type { WishProps } from '../interface/interface';
import { ClassAttributes, HTMLAttributes, useState, useEffect } from 'react';
import '../../css/mypage/myFriend.styles.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// slider
import ReactSlider from 'react-slider';
import 'rc-slider/assets/index.css';

// scrollBar
import { Scrollbar } from 'react-scrollbars-custom';

// 일촌 위시들 보기
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

// 일촌 관리 부분
const FriendsList = () => {
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const [friendList, setFriendList] = useState<Array<any>>();
  const [requestsList, setRequestsList] = useState<Array<any>>();
  const [requestListBool, setrequestListBool] = useState<boolean>(false);
  // const [lastRequestImg, setLastRequestImg] = useState<string>();
  const lastRequestData = {
    requestImg: '',
    requestCount: 0,
    requestUsername: '',
  };
  // var requestImg = '';
  // var requestCount = 0;

  // 친구 목록 불러오기
  const GetFriendData = () => {
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
            // setLastRequestImg(value.user.profileImg);
          }

          // 테스트용!!!!!!
          // console.log(lastRequestImg, 'lastRequestImg는 이것입니다.');
        }
        const sortedFriendsResult: any = friendsResult.sort(function (a, b) {
          return b.id - a.id;
        });
        setFriendList(sortedFriendsResult);
        console.log(friendList, 'friendList');

        // 친구 요청 받은 목록을 받아옴.
        if (res.data.receivedRequests.length > 0) {
          // console.log(res.data.receivedRequests);
          // console.log(typeof res.data.receivedRequests);
          const requestsList = Object.values(res.data.receivedRequests);

          lastRequestData.requestCount = requestsList.length;

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
            console.log(value.user.profileImg, '요청한 유저들 프로필 사진');
            requetsResult.push(data);
            // setLastRequestImg(value.user.profileImg);
            lastRequestData.requestImg = value.user.profileImg;
            lastRequestData.requestUsername = value.user.username;
          }
        }
        const sortedRequestsResult: any = requetsResult.sort(function (a, b) {
          return b.id - a.id;
        });
        setRequestsList(sortedRequestsResult);
        // console.log(requestImg, 'requestImg는 이것입니다.');
        console.log(lastRequestData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetFriendData();
  }, []);

  // 친구 삭제
  const FriendDelete = (id: string) => {
    console.log(id);
    const API_URL = `https://i8e208.p.ssafy.io/api/friend/delete/${id}`;
    axios
      .delete(API_URL)
      .then((res) => {
        console.log(res, '친구 삭제 성공');
        GetFriendData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RequestFriend = ({ request }: any) => {
    const FriendAccept = (id: string) => {
      console.log(id);
      const API_URL = `https://i8e208.p.ssafy.io/api/friends/accept`;
      axios
        .post(API_URL, {
          friendId: id,
          accepted: true,
        })
        .then((res) => {
          console.log(res, '친구 요청 승락 성공');
          GetFriendData();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const FriendDeny = (id: string) => {
      console.log(id);
      const API_URL = `https://i8e208.p.ssafy.io/api/friend/reqdelete/${id}`;
      axios
        .delete(API_URL)
        .then((res) => {
          console.log(res, '친구 요청 거부 성공');
          GetFriendData();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <li className="list-group-item">
        <img src={request.profileImg} className="friend-profile"></img>
        <p className="friend-nickname">{request.nickname}</p>
        <p className="friend-username">{request.username}</p>
        <div className="">
          <button
            className="friend-agree-button"
            onClick={() => FriendAccept(request.id)}
          >
            승락
          </button>
          <button
            className="friend-deny-button"
            onClick={() => FriendDeny(request.id)}
          >
            거부
          </button>
        </div>
      </li>
    );
  };

  // 친구 항목 하나
  const SingleFriend = ({ friend }: any) => {
    return (
      <li className="list-group-item" key={friend.id}>
        <img src={friend.profileImg} className="friend-profile"></img>
        <p className="friend-nickname">{friend.nickname}</p>
        <p className="friend-username">{friend.username}</p>
        <button
          className="friend-delete-button"
          onClick={() => FriendDelete(friend.id)}
        >
          삭제
        </button>
      </li>
    );
  };

  const GoRequest = ({ lastRequestData }: any) => {
    console.log(lastRequestData, 'GoRequest에 있는 애들');
    return (
      <li className="list-group-item">
        <img src={lastRequestData.requestImg} className="friend-profile"></img>
        <p className="friend-nickname">일촌 신청</p>
        <p className="friend-username">{lastRequestData.requestUsername}</p>

        <button
          onClick={() =>
            setrequestListBool((requestListBool: boolean) => !requestListBool)
          }
        >
          현재 / 요청
        </button>
      </li>
    );
  };

  return (
    <div>
      <div className="friends-div">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth test</li>

          {requestListBool === false
            ? friendList &&
              friendList.map((friend: object) => {
                // console.log(friend);
                return <SingleFriend friend={friend}></SingleFriend>;
              })
            : requestsList &&
              requestsList.map((request: object) => {
                // console.log(request);
                return <RequestFriend request={request}></RequestFriend>;
              })}
        </ul>
      </div>
      <button
        onClick={() =>
          setrequestListBool((requestListBool: boolean) => !requestListBool)
        }
      >
        현재 / 요청
      </button>
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

  interface friendWish {
    wishId: string;
    totPrice: number;
    nowPrice: number;
    endDate: string;
    title: string;
    percent: number;
    userName: string;
    nickName: string;
    userImg: string;
  }

  return (
    <div className="ongoing-wishes">
      <p className="phone-book-title">| Friends</p>
      <Slider {...settings}>
        {friendWishList &&
          friendWishList.map((friendWish: friendWish) => {
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
  const navigate = useNavigate();
  // console.log(friendWish);

  const GoToFriendWish = (event: React.MouseEvent, wishId: string) => {
    console.log(event.type);
    if (event.type === 'dragstart') {
      event.preventDefault();
      return;
    } else {
      navigate(`/congrats/${wishId}`);
    }
  };

  console.log(friendWish.percent);
  return (
    <div
      className="ongoing-wish"
      onClick={(e) => GoToFriendWish(e, friendWish.wishId)}
      onDragStart={(e) => GoToFriendWish(e, friendWish.wishId)}
    >
      <div className="wish-profile-div">
        <img src={friendWish.userImg} alt="" className="wish-profile-img" />
        <div className="name-div">
          <p className="friend-wish-username">{friendWish.userName}</p>
          <p className="friend-wish-nickname">{friendWish.nickName}</p>
        </div>
      </div>
      <p className="friend-wish-title">"{friendWish.title}"</p>
      <div className="wish-slider-and-label-container">
        <div className="wish-slider-and-label">
          <span className="progress-span">진행도</span>
          <div className="gift-bar-gray" style={{ width: 'auto' }}>
            <div
              style={{
                width: friendWish.percent,
                backgroundColor: '#FE3360',
                height: 'inherit',
                borderRadius: '5px',
              }}
            ></div>
          </div>
          {/* <ReactSlider
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
          /> */}
        </div>
      </div>
    </div>
  );
}
