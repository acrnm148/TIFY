import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import clicked1 from '../../assets/category/iconCategory1Birthday copy.svg';
import clicked2 from '../../assets/category/iconCategory2Marry copy.svg';
import clicked3 from '../../assets/category/iconCategory3Employed copy.svg';
import clicked4 from '../../assets/category/iconCategory4Health copy.svg';
import clicked5 from '../../assets/category/iconCategory5Childbirth copy.svg';
import clicked6 from '../../assets/category/iconCategory6Unmarried copy.svg';
import clicked7 from '../../assets/category/iconCategory7Etc copy.svg';
import iconCategory1Birthday from '../../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../../assets/category/iconCategory7Etc.svg';
import { RootState } from '../../store/Auth';
import '../../css/mypage/archive.styles.css';

interface Pay {
  celeb_from: string;
  pay_id: number;
  amount: string;
  celeb_img_url: string;
  celeb_tel: string;
  celeb_content: string;
}

interface Gift {
  giftname: string;
  payList: Pay[];
}

interface User {
  id: number;
  title: string;
  category: string;
  endDate: string;
  giftItems: Gift[];
}

interface Category {
  name: string;
  icon: string;
  clickedIcon: string;
}

const categories: Category[] = [
  { name: '생일', icon: iconCategory1Birthday, clickedIcon: clicked1 },
  { name: '결혼', icon: iconCategory2Marry, clickedIcon: clicked2 },
  { name: '취업', icon: iconCategory3Employed, clickedIcon: clicked3 },
  { name: '건강', icon: iconCategory4Health, clickedIcon: clicked4 },
  { name: '출산', icon: iconCategory5Childbirth, clickedIcon: clicked5 },
  { name: '비혼', icon: iconCategory6Unmarried, clickedIcon: clicked6 },
  { name: '기타', icon: iconCategory7Etc, clickedIcon: clicked7 },
];

const Archive: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryUsers, setCategoryUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGift, setSelectedGift] = useState<string>('');
  const [selectedPay, setSelectedPay] = useState<Pay | null>(null);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const userPk = useSelector((state: RootState) => state.authToken.userId);
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(
    null,
  );
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setSelectedGift('');
  };

  const handleGiftClick = async (gift: Gift, payIndex: number) => {
    setSelectedGift(gift.giftname);
    setClickedButtonIndex(payIndex);
    setSelectedPay(gift.payList[payIndex]);
    try {
      const response = await axios.get(
        `https://i8e208.p.ssafy.io/api/thkcards/match/${gift.payList[payIndex].pay_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        },
      );
      const data = response.data;
      setThkcard(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [thkcard, setThkcard] = useState<{
    id: number;
    title: string;
    phoneNumber: string;
    content: string;
    imageUrl: string;
    userId: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://i8e208.p.ssafy.io/api/wish/wish/${userPk}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-type': 'application/json',
            },
          },
        );
        const data = response.data;
        setUsers(data);
        setCategoryUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [accessToken, userPk]);

  useEffect(() => {
    const filteredUsers = selectedCategory
      ? users.filter((user) => user.category === selectedCategory)
      : users;
    setCategoryUsers(filteredUsers);
    setSelectedUser(null);
    setSelectedGift('');
  }, [users, selectedCategory]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-left mt-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className="p-2 focus:outline-none"
          >
            <img
              src={
                selectedCategory === category.name
                  ? category.clickedIcon
                  : category.icon
              }
              alt={category.name}
              className="category-icon"
            />
          </button>
        ))}
      </div>
      <div className="flex gap-4 mt-4 justyfy-start">
        {categoryUsers.map((user) => (
          <div key={user.id}>
            <button
              onClick={() => handleUserClick(user)}
              className="bg-white rounded-md shadow-md w-full h-full p-4 flex flex-col flex-shrink-0"
              style={{ width: '250px' }} // set fixed width here
            >
              <p className="text-gray-500 text-sm mb-2">{user.endDate}</p>
              <p className="text-gray-800 text-lg">{user.title}</p>
            </button>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="mt-4">
          <div className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {selectedUser.title}
            </h2>
            <div className="flex flex-wrap -mx-2">
              {selectedUser.giftItems.map((gift) => (
                <div
                  key={gift.giftname}
                  className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 justify-start"
                >
                  <button
                    onClick={() => handleGiftClick(gift, 0)}
                    className="button"
                  >
                    {gift.giftname}
                  </button>
                  {selectedGift === gift.giftname && (
                    <div className="pl-4 mt-2 botton">
                      <div className="flex">
                        {gift.payList.map((pay, index) => (
                          <button
                            className={`w-full p-4 text-left font-medium ${
                              selectedGift === gift.giftname &&
                              clickedButtonIndex === index
                                ? 'bg-gray-400 text-black'
                                : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-black'
                            }`}
                            onClick={() => handleGiftClick(gift, index)}
                            key={pay.pay_id}
                          >
                            {pay.celeb_from}
                          </button>
                        ))}
                      </div>
                      <div className="card-case">
                        {thkcard && (
                          <div className="flex flex-row">
                            <div>
                              <div>
                                <div className="con-card-detail">
                                  <div className="con-card">
                                    <img
                                      className="photo-size"
                                      src={
                                        selectedPay?.celeb_img_url
                                          ? selectedPay?.celeb_img_url
                                          : ''
                                      }
                                      alt="감사카드 이미지"
                                    />
                                    <div className="con-text">
                                      {selectedPay?.celeb_content}
                                    </div>
                                    <div className="userName tofrom">
                                      전송된 연락처 : {selectedPay?.celeb_tel}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div>
                                <div className="con-card-detail">
                                  <div className="con-card">
                                    <img
                                      className="photo-size"
                                      src={
                                        thkcard.imageUrl ? thkcard.imageUrl : ''
                                      }
                                      alt="감사카드 이미지"
                                    />
                                    <div className="con-text">
                                      {thkcard.content}
                                    </div>
                                    <div className="userName tofrom">
                                      전송된 연락처 : {thkcard.phoneNumber}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;
