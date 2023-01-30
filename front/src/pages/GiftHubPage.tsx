import GiftHubCategory from "../components/GiftHubCategory";
import SearchBar from "../components/SearchBar";
import { GiftHubList } from "../components/GiftHubList";
import "../css/giftHubPage.styles.css";
import { useEffect, useState } from "react";
import iconFilter from "../assets/iconFilter.svg";

// slider
import ReactSlider from "react-slider";
import axios from "axios";


export function GiftHubPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
	const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [category, setCategory] = useState<number|null>();
  let [giftList, setGiftList] =useState<Array<any>>([]);

  let max_result = 10//디폴트
  let page = 0
  // 기본값은 상품목록에서 보여주는 Recommend 리스트는 검색어가 없을 때 store에 저장한 리스트 표출
// (검색어 | 카테고리 선택 | 상품리스트에 변경)이 있을 때 실행되는 함수 
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/search/';
        axios.get(API_URL, {
          params: {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            name: searchQuery,
            category:category,
            max_result:max_result,
            page:page,
          }
        }

          ).then((e)=>{
            console.log('데이터를 받아옴')
            console.log(e.data)
            console.log(e)
            let copy:Array<any> = [...e.data.content]; // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
            setGiftList(copy)
            console.log('giftList', giftList);
          }).catch((err) => {
            console.log('error', err)
          });
        }
      fetchData();
      
    },[searchQuery, priceRange, category]);

    const ParentComponent = () => {
      const getQuery = (q:string) => {
        console.log(q+'쿼리를 받았습니다');
        setSearchQuery(q);
      }
      const getCategory = (c:number) => {
        // console.log(c+'카테고리를 받았습니다');4
        setCategory(c) 
        if (c===0){
          setCategory(null) 
        }
        console.log(category, '카테고리임')
      }
      return (
        <>
          <GiftHubCategory propFunction={getCategory}/>
          <SearchBar propFunction={getQuery}/>
        </>
      )
    }
    {/* 
  [TODO] 전체카테고리 옵션 생성하기 V
  [TODO] 카테고리 선택 시 giftList 요청 V
  [TODO] 가격범위 필터 선택시 giftList 요청
  [TODO] 인기순 높은가격순 낮은가격순 선택 시 현재의 giftList에서 sorting front에서 처리해야함
  [TODO] 검색 결과가 없을 때 '검색 결과가 없습니다' 표출
  [TODO] 이미지가 없을 때 기본이미지 표출
  [TODO] 검색어 유지..
*/}
    return (
      <div>        
        {/* <GiftHubCategory /> */}
        <ParentComponent/>
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

  