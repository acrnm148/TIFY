import { GiftHubCategory } from "../components/GiftHubCategory";
import { SearchBar } from "../components/SearchBar";
import search from "../assets/iconSearch.svg";
import { GiftHubList } from "../components/GiftHubList";
import "../css/giftHubPage.styles.css"
import { useRef, useState } from "react";
import {useDispatch, useSelector, Provider } from 'react-redux'
import {RootState, changeNickName, store} from './MainPage'
import {Dispatch} from 'redux'
import { configureStore} from '@reduxjs/toolkit'


export function GiftHubPage() {
  let [giftList, setGiftList] =useState([
    {
      name : "삼성비스포크1",
      price : 100000 
    },
    {
      name : "삼성비스포크2",
      price : 200000 
    },
    {
      name : "삼성비스포크3",
      price : 300000 
    },
  ]);

// redux test------------------------------------------------------------------
    const state = useSelector((state:RootState) =>state);
    const dispatch :Dispatch = useDispatch();


    return (
      <div>        
        <GiftHubCategory />
        <SearchBar />
        <div className="filter-bar-container">
          <div className="filter-bar">
            <input type="text" placeholder="가격범위설정"/>
            {/* <img src={} alt="filter icon" /> */}

          </div>
        </div>

        <div className="gift-sortig" >
          <div>
            <p>인기순</p>
            <p> |</p>
            <p>높은가격순</p>
            <p> |</p>
            <p>낮은가격순</p>
          </div>
        </div>

        <div>
          <GiftHubList giftList={giftList} />
        </div>
        
        <div>
          <h1>User Redux Test</h1>
          <h1>{state.user.nickName}</h1>
          <button onClick={()=>{dispatch(changeNickName('새로운닉네임'))}}>버튼</button>
        </div>
      </div>
     

    );
  }

  