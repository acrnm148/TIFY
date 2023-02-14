import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import clicked1 from '../../assets/category/iconCategory1Birthday copy.svg'
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
import "../../css/mypage/archive.styles.css"

interface Wish {
  category: string;
  enddate: string;
  title: string;
}

interface Gift {
  giftname: string | string[];
}

interface Pay {
  celeb_from: string | string[][];
}

interface User {
  id: number;
  nickname: string;
  wishes: Wish[];
  gifts: Gift[];
  pays: Pay[];
}

interface Category {
  name: string;
  icon: string;
  clickedIcon: string;
}

const categories: Category[] = [
  { name: 'birthday', icon: iconCategory1Birthday, clickedIcon: clicked1 },
  { name: 'marriage', icon: iconCategory2Marry, clickedIcon: clicked2 },
  { name: 'employment', icon: iconCategory3Employed, clickedIcon: clicked3 },
  { name: 'health', icon: iconCategory4Health, clickedIcon: clicked4 },
  { name: 'childbirth', icon: iconCategory5Childbirth, clickedIcon: clicked5 },
  { name: 'non-marriage', icon: iconCategory6Unmarried, clickedIcon: clicked6 },
  { name: 'others', icon: iconCategory7Etc, clickedIcon: clicked7 },
];

const Archive: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [totalSearched, setTotalSearched] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  const [data, setData] = useState(null);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken
  );
  
  const userPk = useSelector((state: RootState) => state.authToken.userId);

  useEffect(() => {
    handleSubmit();
  }, [refresh]);

  const mapWishes = (data: any): Wish[] =>
    data.map((wish: any) => ({
      category: wish.category,
      enddate: wish.endDate,
      title: wish.title,
    }));

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://i8e208.p.ssafy.io/api/wish/wish/${userPk}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  const mapGifts = (data: any): Gift[] =>
    data.map((wish: any) => ({
      giftname: wish.giftItems.map((gift: any) => gift.giftname),
    }));

  const mapPays = (data: any): Pay[] =>
    data.map((wish: any) => ({
      celeb_from: wish.giftItems.map((gift: any) =>
        gift.payList.map((pay: any) => pay.celeb_from)
      ),
    }));

  const handleSubmit = async () => {
    if (!nickname.trim().length) {
      return;
    }
    setSearchPerformed(true);
    try {
      const response = await axios.get(
        `https://i8e208.p.ssafy.io/api/wish/wish/${userPk}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        }
      );
      const data = response.data;
      const users: User[] = data.map((item: any) => ({
        id: item.id,
        nickname: item.nickname,
        wishes: mapWishes(item.wishList),
        gifts: mapGifts(item.wishList),
        pays: mapPays(item.wishList),
      }));
      setTotalSearched(users.length);
      setUsers([...users]);
    } catch (error) {}
  };
  const sortWishes = (wishes: Wish[]) =>
  wishes.sort((a, b) => {
    if (a.enddate < b.enddate) {
      return -1;
    } else if (a.enddate > b.enddate) {
      return 1;
    } else {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  

  return (
    <div>
      {categories.map((category) => (
        <button
  key={category.name}
  onClick={() => handleCategoryClick(category.name)}
>
  <img
    src={selectedCategory === category.name ? category.clickedIcon : category.icon}
    alt={category.name}
    className="category-icon"
  />
</button>
      ))}
    </div>
  );
};
export default Archive;
