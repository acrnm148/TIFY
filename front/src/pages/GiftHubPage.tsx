import { GiftHubCategory } from "../components/GiftHubCategory";
import { SearchBar } from "../components/SearchBar";
import { GiftHubList } from "../components/GiftHubList";
import "../css/giftHubPage.styles.css";
import { useEffect, useRef, useState } from "react";
import iconFilter from "../assets/iconFilter.svg";
import axios from 'axios';
// redux
import { configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch, useSelector, Provider } from 'react-redux';
// import {RootState, changeNickName, store} from './MainPage';
import {Dispatch} from 'redux';
// slider
import ReactSlider from "react-slider";
// redux test------------------------------------------------------------------
let [giftList, setGiftList] =useState([
  {
    name : "삼성비스포크1",
    price : 100000,
    giftId : 1,
  },
  {
    name : "삼성비스포크2",
    price : 200000,
    giftId : 2,
  },
  {
    name : "삼성비스포크3",
    price : 300000,
    giftId : 3,
  },
]);
let giftSlice = createSlice({
  name : 'giftHubList',
  initialState : giftList,
  reducers:{}
})

export function GiftHubPage() {

  
  let [categoryId, setCategoryId] = useState()
  useEffect(() => {
    const url = '/gifthub';
    axios.get(url,{
        // params : {
          // categoryId : {categoryId},
        // },
      }
    ).then((e)=>{
      console.log(e.data)
    }).catch();
  },[]);

  // [TODOS]|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  // 검색어 입력 시 axios요청, giftHubList 갱신
  // 카테고리 선택 시 axios 요청, giftHubList 갱신
  // 필터 선택 시 현재 giftHubList에서 필터 적용 후 표출(기존 리스트는 store에, 요청한 필터 리스트로 state 변경)
  // 검색어나 카테고리 선택 없이 필터 선택 시 alert



// redux test------------------------------------------------------------------
    // const state = useSelector((state:RootState) =>state);
    // const dispatch :Dispatch = useDispatch();

    return (
      <div>        
        <GiftHubCategory />
        <SearchBar />
        <div className="filter-bar-container">
          <div className="filter-bar">
            <div className="slider-container">
              <div className="slider-numbers">
                <div className="slider-con-numbers-range">
                  <p>가격범위설정</p>
                  <div className="slider-numbers-range">
                    <p>min</p>
                    <p>max</p>
                  </div>
                </div>
                <div className="slider-filter">
                  <img src={iconFilter} alt="" />
                </div>
              </div>
              <ReactSlider
                  className="price-slider"
                  thumbClassName="price-thumb"
                  trackClassName="price-track"
              />
              </div>

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
        
        {/* <div>
          <h1>User Redux Test</h1>
          <h1>{state.user.nickName}</h1>
          <button onClick={()=>{dispatch(changeNickName('새로운닉네임'))}}>버튼</button>
        </div> */}
      </div>
     

    );
  }

// export default giftSlice;