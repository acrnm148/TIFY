import axios, { AxiosPromise } from 'axios';
import { useEffect, useState } from 'react';
import phone from '../assets/phone.svg';
import { GiftHubCategory } from '../components/GiftHubCategory';
import { GiftRecommendList } from '../components/GiftRecommendList';
import { SearchBar } from '../components/SearchBar';
import '../css/mainPage.styles.css';
import '../css/styles.css';
import {GiftList } from '../interface/interface';


export function MainPage() {
  // let [giftList, setGiftList] = useState<GiftList[]>([]);
  
  // useEffect(() => {
  //   async function fetchdata() {
  //     const API_URL = '/gifthub/main/';
  //     // http://i8e208.p.ssafy.io/gifthub/main 
  //     const {data} = await axios.get(API_URL);
  //     console.log(data);
  //   }
  //   fetchdata()
  // });

  let [giftList, giftListChange] = useState([
    {
      name: '삼성비스포크1',
      price: 100000,
      giftId: 1,
    },
    {
      name: '삼성비스포크2',
      price: 200000,
      giftId: 2,
    },
    {
      name: '삼성비스포크3',
      price: 300000,
      giftId: 3,
    },
  ]);
  return (
    <div className="main-container">
      <div className="main-components">
        <CatchPrase />
        <div className="phone-video">
          <img src={phone} className="phone-image" alt="phone image" />
        </div>
      </div>
      <div>
        <GiftHubCategory />
        <SearchBar />
        <GiftRecommendList giftList={giftList} />
      </div>
    </div>
  );
}

function CatchPrase() {
  return (
    <div className="catch-prase">
      <h1>티피에서</h1>
      <h1>원하는 선물로</h1>
      <h1>축하를 주고받아 보세요!</h1>
      <div>
        <button className="gradient-button">위시만들기</button>
      </div>
    </div>
  );
}
