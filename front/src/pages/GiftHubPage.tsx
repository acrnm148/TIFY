import GiftHubCategory from "../components/GiftHubCategory";
import SearchBar from "../components/SearchBar";
import { GiftHubList } from "../components/GiftHubList";
import "../css/giftHubPage.styles.css";
import { useEffect, useState } from "react";
import iconFilter from "../assets/iconFilter.svg";
import axios from "axios";

// mui Slider 사용
import Slider from "@mui/material/Slider";


export function GiftHubPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<number|null>();
  let [giftList, setGiftList] =useState<Array<any>>([]);
  
  // Slider 설정
	const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [min, max] = [0, 1000000]
  const step = 1000
  const [value, setValue] = useState<number[]>([10000, 1000000]);
  
  const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
      console.log(value)
  };

  let max_result = 100//디폴트
  let page = 0
  // 기본값은 상품목록에서 보여주는 Recommend 리스트는 검색어가 없을 때 store에 저장한 리스트 표출
  // (검색어 | 카테고리 선택 | 상품리스트에 변경)이 있을 때 실행되는 함수
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/search/';
      axios
        .get(API_URL, {
          params: {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            name: searchQuery,
            category: category,
            max_result: max_result,
            page: page,
          },
        })
        .then((e) => {
          console.log('데이터를 받아옴');
          console.log(e.data);
          console.log(e);
          let copy: Array<any> = [...e.data.content]; // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
          setGiftList(copy);
          console.log('giftList', giftList);
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    fetchData();
  }, [searchQuery, priceRange, category]);

<<<<<<< HEAD
          ).then((e)=>{
            // console.log('데이터를 받아옴')
            console.log(e.data)
            // console.log(e)
            let copy:Array<any> = [...e.data.content]; // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
            setGiftList(copy)
            // console.log('giftList', giftList);
          }).catch((err) => {
            console.log('error', err)
          });
        }
      fetchData();
      
    },[searchQuery, priceRange, category]);

    const ParentComponent = () => {
      const getQuery = (q:string) => {
        setSearchQuery(q);
      }
      const getCategory = (c:number) => {
        setCategory(c) 
        if (c===0){
          setCategory(null) 
        }
      }
      return (
        <>
          <GiftHubCategory propFunction={getCategory}/>
          <SearchBar propFunction={getQuery} initailQuery={searchQuery}/>
        </>
      )
    }
    {/* 
  [TODO] 전체카테고리 옵션 생성하기 V
  [TODO] 카테고리 선택 시 giftList 요청 V
  [TODO] 가격범위 필터 선택시 giftList 요청 V
  [TODO] 검색 결과가 없을 때 '검색 결과가 없습니다' 표출 V
  [TODO] 검색어 유지.. V
  [TODO] 이미지가 없을 때 기본이미지 표출 V
  [TODO] 페이징
  [TODO] 사이트 들어왔을 때 기본 노출 상품들 요청처리 (인기 데이터 요청..)
  [TODO] -인기순- 높은가격순 낮은가격순 선택 시  ( 데이터 요청..)
*/}
  const NoResult = ()=>{
    return(
      <div className="no-result">
        <h1>{searchQuery}에 대한 검색 결과가 없습니다.</h1>
        <p>다른 검색어를 입력하시거나 철자나 띄어쓰기를 확인해보세요.</p>

      </div>
    )
  }
  function CheapestList(): void {
    let cheapest = giftList.sort((a,b) => (a.price - b.price));
    setGiftList(cheapest)
    console.log(cheapest)
  }
  function ExpensiveList(){
    let expensive = giftList.sort((a,b) => (b.price - a.price));
    setGiftList(expensive)
  }

    return (
      <div>        
        <ParentComponent/>
        <div className="filter-bar-container">
          <div className="filter-bar">
            <div className="slider-container">
              <div className="slider-numbers">
                <div className="slider-con-numbers-range">
                  <p>가격범위설정</p>
                  <div className="slider">
                  <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={value}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      step={step}
                      min = {min}
                      max = {max}
                      />
                  <div className="slider-numbers-range">
                    <p>{value[0]}원</p>
                    <p>~</p>
                    <p>{value[1]}원</p>
                  </div>
                </div>
                </div>
                <div className="slider-filter">
                  <img onClick={()=> setPriceRange([value[0], value[1]])} src={iconFilter} alt="" />
                </div>
              </div>
              
=======
  const ParentComponent = () => {
    const getQuery = (q: string) => {
      console.log(q + '쿼리를 받았습니다');
      setSearchQuery(q);
    };
    const getCategory = (c: number) => {
      // console.log(c+'카테고리를 받았습니다');4
      setCategory(c);
      if (c === 0) {
        setCategory(null);
      }
      console.log(category, '카테고리임');
    };
    return (
      <>
        <GiftHubCategory propFunction={getCategory} />
        <SearchBar propFunction={getQuery} />
      </>
    );
  };
  {
    /* 
  [TODO] 전체카테고리 옵션 생성하기 V
  [TODO] 카테고리 선택 시 giftList 요청 V
  [TODO] 가격범위 필터 선택시 giftList 요청
  [TODO] 인기순 높은가격순 낮은가격순 선택 시 현재의 giftList에서 sorting front에서 처리해야함
  [TODO] 검색 결과가 없을 때 '검색 결과가 없습니다' 표출
  [TODO] 이미지가 없을 때 기본이미지 표출
  [TODO] 검색어 유지..
*/
  }
  return (
    <div>
      {/* <GiftHubCategory /> */}
      <ParentComponent />
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
>>>>>>> B1-Signup
              </div>
            </div>
            <ReactSlider
              className="price-slider"
              thumbClassName="price-thumb"
              trackClassName="price-track"
            />
          </div>
        </div>
<<<<<<< HEAD

        <div className="gift-sortig" >
          <div>
            <p>인기순</p>
            <p> |</p>
            <p className="sort-btn" onClick={()=> (ExpensiveList())}>높은가격순</p>
            <p> |</p>
            <p className="sort-btn" onClick={()=> (CheapestList())}>낮은가격순</p>
          </div>
        </div>
        

        <div>
          {giftList.length > 0? <GiftHubList giftList={giftList} /> : <NoResult />}
          
        </div>
=======
>>>>>>> B1-Signup
      </div>

      <div className="gift-sortig">
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
