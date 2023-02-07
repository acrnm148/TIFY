import axios, { AxiosPromise } from 'axios';
import { useEffect, useState } from 'react';
import phone from '../assets/phone.svg';
import GiftHubCategory from '../components/GiftHubCategory';
import { GiftRecommendList } from '../components/GiftRecommendList';
import  SearchBar  from '../components/SearchBar';
import '../css/mainPage.styles.css';
import '../css/styles.css';


export function MainPage() {
  let [giftList, setGiftList] = useState<Array<any>>([]);
  
  useEffect(() => {
    async function fetchdata() {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/main';
      axios.get(API_URL
        ).then((r) => { 
          console.log(r)
          let copy:Array<any> = [...r.data];
          setGiftList(copy)
        }).catch((r) => { console.log(r)}
        )}
    fetchdata();
  },[]);

  const propFunction = (x:number) =>{
    console.log('부모컴포넌트에서받음', x)
  }
  function getQuery(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="main-container">
      <div className="main-components">
        <CatchPrase />
        <div className="phone-video">
          <img src={phone} className="phone-image" alt="phone image" />
        </div>
      </div>
      <div>
        <GiftHubCategory propFunction={propFunction} goCategory={undefined}/>
        <SearchBar propFunction={getQuery} initailQuery={''}/>
        {/* <GiftRecommendList giftList={giftList} /> */}
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
