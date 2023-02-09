import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import axios from "axios";
import "../css/friendspage.styles.css"
import '../css/giftHubPage.styles.css';
import "../css/searchBar.styles.css"

interface User {
  id: number;
  name: string;
  profileImg: string;
  nickname: string;
  email: string;
  state: string;
}

const FriendsPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const userPk = useSelector((state: RootState) => state.authToken.userId);
  useEffect(() => {
    handleSubmit();
  }, [refresh]);
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`https://i8e208.p.ssafy.io/api/searchuser/${nickname}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        }
      });
      const friends = response.data;

      setUsers([...friends]);
    } catch (error) {}
  };

  const handleRequestFriend = async (userId: number) => {
    try {
      const response = await axios.post(`https://i8e208.p.ssafy.io/api/friends`, {
        userId: userPk ,
        friendId: userId,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        }
      });
      console.log(response.data);
      setUsers([...users]);
      setRefresh(!refresh);
    } catch (error) {}
  };

  const handleAcceptFriend = async (friendId: number) => {
    try {
      const response = await axios.post(`https://i8e208.p.ssafy.io/api/friends/accept`, {
        friendId: friendId ,
        Accepted: true,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        }
      });
      console.log(response.data);
      setRefresh(!refresh);
    } catch (error) {}
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
      <div className="search-bar-container">
        <input
          className="serach-bar"
          type="text"
          placeholder="Enter nickname"
          value={nickname}
          onKeyUp= {(e)=> { if(e.key=="Enter") {handleSubmit()} }}
          onChange={(e) => setNickname(e.target.value)}
    />
      </div>

  
  
<div className="friend-list">
  {users.map(user => (
    <div className="w-1/5 p-6 mx-6 my-2 cardcolor items-center" key={user.id}>
      <img className="img-4" src={user.profileImg}/>
        <p className="w-96 text-lg text-center">{user.name}</p>
        <p className="w-96 text-center">{user.nickname}</p>
        <p className="w-96 text-xs text-center">
        {user.id === userPk ? <p>본인</p> :
        user.state === 'ACCEPTED' ? <button className="rectangle-2-5" onClick={() => {handleDeleteFriend(user.friendshipId);}}>친구삭제</button> : 
         user.state === 'RECEIVED' ? <div><button className="rectangle-2-7" onClick={() => {handleAcceptFriend(user.friendshipId);}}>친구수락</button><button className="rectangle-2-7" onClick={() => handleCancelFriend(user.friendshipId)}>친구거절</button></div> :
         user.state === 'REQUESTED' ? <button className="rectangle-2-7" onClick={() => {handleCancelFriend(user.friendshipId);}}>요청취소</button> : 
         user.state === 'NONE' ?<button className="rectangle-2-6" onClick={() => {handleRequestFriend(user.id);}}>친구요청</button>:null}
        </p>
      </div>
    </div>
  );
};

interface UserSearchBarProps {
  nickname: string;
  onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default FriendsPage;