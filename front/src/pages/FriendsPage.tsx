import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import axios from 'axios';
import '../css/friendspage.styles.css';

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      setUsers([...friends]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestFriend = async (userId: number) => {
    console.log(userPk);
    console.log(userId);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="backcolor">
      <div className="items-center">
        <UserSearchBar
          nickname={nickname}
          onNicknameChange={(event) => setNickname(event.target.value)}
          onSubmit={handleSubmit}
        />
        <div className="flex flex-wrap mx-12">
          {users.map((user) => (
            <div
              className="w-1/5 p-6 mx-6 my-2 cardcolor items-center"
              key={user.id}
            >
              <img className="img-4" src={user.profileImg} />
              <p className="w-96 text-lg text-center">{user.name}</p>
              <p className="w-96 text-xs text-center">{user.nickname}</p>
              <p className="w-96 text-xs text-center">
                {user.state === 'ACCEPTED' ? (
                  '친구'
                ) : user.state === 'RECEIVED' ? (
                  '요청받음'
                ) : user.state === 'REQUESTED' ? (
                  '요청보냄'
                ) : (
                  <button onClick={() => handleRequestFriend(user.id)}>
                    친구요청
                  </button>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface UserSearchBarProps {
  nickname: string;
  onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({
  nickname,
  onNicknameChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <input
      className="searchbar"
      type="text"
      placeholder="Enter nickname"
      value={nickname}
      onChange={onNicknameChange}
    />
    <button className="search-btn" type="submit"></button>
  </form>
);

export default FriendsPage;
