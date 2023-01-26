import { GiftHubCategory } from "../components/GiftHubCategory";
import { SearchBar } from "../components/SearchBar";
import { GiftHubList } from "../components/GiftHubList";
import "../css/giftHubPage.styles.css";
import { useEffect, useState } from "react";
import iconFilter from "../assets/iconFilter.svg";

// slider
import ReactSlider from "react-slider";
import axios from "axios";


export function GiftHubPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
	const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState<number>();
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

  let max_result = 10//디폴트
  let page = 1
  // 기본값은 상품목록에서 보여주는 Recommend 리스트는 검색어가 없을 때 store에 저장한 리스트 표출
// (검색어 | 카테고리 선택 | 상품리스트에 변경)이 있을 때 실행되는 함수 
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = `http://i8e208.p.ssafy.io/api?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&name=${searchQuery}&category=${category}&max_result=${max_result}&page=${page}",`;
        axios.get(API_URL
          ).then((e)=>{
            console.log('데이터를 받아옴')
            console.log(e.data)
            let copy = [...giftList,e.data];
            // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
            setGiftList(copy)
          }).catch((err) => {
            console.log('error', err)
          });
        }
      fetchData();
    },[searchQuery, priceRange, giftList, category]);

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
      </div>
     

    );
  }

  