import '../../css/mypage/phoneBook.styles.css';
import { useEffect } from 'react';
import axios from 'axios';

export function PhoneBook() {
  useEffect(() => {
    // const API_URL = `https://i8e208.p.ssafy.io/api/phonebook/${userId}`;
    // const result: any[] = [];
    // axios
    //   .get(API_URL)
    //   .then((res) => {
    //     console.log(res, '연락처 받아오기 성공');
    //   })
    //   .catch((err) => {
    //     console.log(err, '연락처 받아오기 실패');
    //   });
  }, []);

  return (
    <div>
      <p className="phone-book-title">| PhoneBook</p>
      <div className="friends-div">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth test</li>
        </ul>
      </div>
    </div>
  );
}

const RequestFriend = ({ request }: any) => {
  const FriendAccept = (id: string) => {
    console.log(id);
    const API_URL = `https://i8e208.p.ssafy.io/api/friends/accept`;
    axios
      .post(API_URL, {
        friendId: id,
        accepted: true,
      })
      .then((res: any) => {
        console.log(res, '친구 요규 승락 성공');
        // GetFriendData();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const FriendDeny = (id: string) => {
    console.log(id);
    const API_URL = `https://i8e208.p.ssafy.io/api/friend/reqdelete/${id}`;
    axios
      .delete(API_URL)
      .then((res: any) => {
        console.log(res, '친구 요청 거부 성공');
        // GetFriendData();
      })
      .catch((err: any) => {
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
