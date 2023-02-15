import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import axios from 'axios';
import '../css/friendspage.styles.css';
import '../css/giftHubPage.styles.css';
import GiftBoxAnimation from '../components/GiftBoxAnimation';
import TapNameEng from '../components/TapNameEng';

// alarm
import { push, ref } from "firebase/database";
import { db } from '../components/firebase';

interface User {
  id: number;
  name: string;
  profileImg: string;
  nickname: string;
  email: string;
  state: string;
  friendshipId: number;
}

const FriendsPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [totalSearched, setTotalSearched] = useState(0);


     
  // 친구요청알림부분
  // 알림보낼 유저정보 받아오는부분
  const [userProfile, setUserProfile] = useState<string>()
  const [username ,setUserName] = useState<string>()
  const pushData = (friendId:number, userId:number, friendName:string) => {
		let base = "/test/tify/"; 
    push(ref(db, base + friendId), {
      text: username+'님이 친구요청을 보냈습니다.',
      profile : userProfile,
      interval: "Daily",
      friend: 'req',
      friendName : friendName,
      friendId : userId,
      time : Date.now()
    });
    console.log('친구요청보냄')
  };
// 알림보낼 때 필요한 프로필 사진 받는 부분
 useEffect(()=>{
    const getUser = async () =>{
      const API_URL = `https://i8e208.p.ssafy.io/api/account/userInfo`
      axios({
        method: 'get',
        url: API_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((con: { data: { profileImg: React.SetStateAction<string | undefined>; addr1: React.SetStateAction<string | undefined>; addr2: React.SetStateAction<string | undefined>; zipcode: React.SetStateAction<number | undefined>; username: React.SetStateAction<string | undefined>; }; }) => {
          console.log('유저프로필 불러오기 성공',con.data);
          setUserProfile(con.data.profileImg)
          setUserName(con.data.username)
        })
        .catch((err: any) => {
          console.log('유저프로필 불러오기 실패', err);
        });
    }
    getUser();
 },[])


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  
  
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const userPk = useSelector((state: RootState) => state.authToken.userId);
  useEffect(() => {
    handleSubmit();
  }, [refresh]);


  const handleSubmit = async () => {
    if (!nickname.trim().length) {
      return;
    }
    setSearchPerformed(true);
    try {
      const response = await axios.get(
        `https://i8e208.p.ssafy.io/api/searchuser/${nickname}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      const friends = response.data;

      setTotalSearched(friends.length);
      setUsers([...friends]);
    } catch (error) {}
  };

  const handleRequestFriend = async (userId: number, friendName:string) => {
    try {
      const response = await axios.post(
        `https://i8e208.p.ssafy.io/api/friends`,
        {
          userId: userPk,
          friendId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setUsers([...users]);
      setRefresh(!refresh);
      // 친구수락 받는 사람한테 알림
      pushData(userId, userPk, friendName)
    } catch (error) {}
  };
 
  const handleAcceptFriend = async (friendId: number, userName : string) => {
    try {
      const response = await axios.post(
        `https://i8e208.p.ssafy.io/api/friends/accept`,
        {
          friendId: friendId,
          accepted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setRefresh(!refresh);

      // 친구요청 받는 사람한테 알림
      pushData(friendId, userPk, userName)
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelFriend = async (friendId: number) => {
    try {
      const response = await axios.delete(
        `https://i8e208.p.ssafy.io/api/friend/reqdelete/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setRefresh(!refresh);
    } catch (error) {}
  };

  const handleDeleteFriend = async (friendId: number) => {
    try {
      const response = await axios.delete(
        `https://i8e208.p.ssafy.io/api/friend/delete/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setRefresh(!refresh);
    } catch (error) {}
  };

  
  

  return (
    <div className="backcolor">
      <div className="items-center justify-center">
        <TapNameEng
          title="Find Friends"
          content="닉네임을 검색하여 당신의 친구를 찾아보세요."
        ></TapNameEng>
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onKeyUp={(e) => {
              if (e.key == 'Enter') {
                handleSubmit();
              }
            }}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

      {searchPerformed && !users.length && (
        <p className="text-center text-xl text-2">일치하는 사용자가 없습니다 다시 검색해주세요</p>
      )}
      {searchPerformed && users.length > 0 && (
  <b><p className="text-center text-xl text-2">일치하는 사용자: {totalSearched}명</p></b>
      )}
      {users.length > 0 &&
        <div className="friend-list">
          {users.slice((currentPage - 1) * 8, currentPage * 8).map((user) => (
            <div
              className="w-1/5 p-6 mx-3 my-2 items-center justify-center flex flex-col cardcolor cardsize"
              key={user.id}
            >
              <img className="img-4" src={user.profileImg} />
              <b><p className="w-96 text-xl text-center text-1">{user.name}</p></b>
              <p className="w-96 text-center text-2">{user.nickname}</p>
              <p className="w-96 text-xs text-center text 2">
                {user.id === userPk ? (
                  <p>본인</p>
                ) : user.state === 'ACCEPTED' ? (
                  <button
                    className="rectangle-2-5"
                    onClick={() => {
                      handleDeleteFriend(user.friendshipId);
                    }}
                  >
                    친구삭제
                  </button>
                ) : user.state === 'RECEIVED' ? (
                  <div>
                    <button
                      className="rectangle-2-7"
                      onClick={() => {
                        handleAcceptFriend(user.friendshipId, user.name);
                      }}
                    >
                      친구수락
                    </button>
                    <button
                      className="rectangle-2-7"
                      onClick={() => handleCancelFriend(user.friendshipId)}
                    >
                      친구거절
                    </button>
                  </div>
                ) : user.state === 'REQUESTED' ? (
                  <button
                    className="rectangle-2-7"
                    onClick={() => {
                      handleCancelFriend(user.friendshipId);
                    }}
                  >
                    요청취소
                  </button>
                ) : user.state === 'NONE' ? (
                  <button
                    className="rectangle-2-6"
                    onClick={() => {
                      handleRequestFriend(user.id, user.name);
                    }}
                  >
                    친구요청
                  </button>
                ) : null}
              </p>
            </div>
          ))}
        </div>}
      </div>
      {users.length > 0 &&
      <div className="pagination-container">
        <button
          className="pagination-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="pagination-text bg-gray-500 font-bold py-2 px-3 rounded-full">
          {currentPage} / {Math.ceil(users.length / 8)}
        </span>
        <button
          className="pagination-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(users.length / 8)}
        >
          Next
        </button>
      </div>}
    </div>
    );
};

interface UserSearchBarProps {
  nickname: string;
  onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default FriendsPage;
