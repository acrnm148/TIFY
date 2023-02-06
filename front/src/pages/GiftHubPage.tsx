import SearchBar from '../components/SearchBar';
import GiftHubCategory from '../components/GiftHubCategory';
import '../css/giftHubPage.styles.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import iconFilter from '../assets/iconFilter.svg';
import axios from 'axios';

// mui Slider 사용
import Slider from '@mui/material/Slider';
import { NavLink } from 'react-router-dom';
import { GiftItem } from '../components/GiftItem';

export function GiftHubPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<number | null>();
  let [giftList, setGiftList] = useState<Array<any>>([]);

  // Slider 설정
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [min, max] = [0, 1000000];
  const step = 1000;
  const [value, setValue] = useState<number[]>([10000, 1000000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(value);
  };

  // scroll
  const [pageNum, setPageNum] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGiftElement = useCallback(  // (*)
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    []
  );

  let max_result = 100; //디폴트
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
            page: pageNum,
          },
        })
        .then((e) => {
          console.log(e.data);
          let copy: Array<any> = [...e.data.content]; // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
          if (pageNum === 0){
            setGiftList([...e.data.content]);
          } else {
            setGiftList([...giftList,...e.data.content]);
          }
          
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    fetchData();
  }, [searchQuery, priceRange, category, pageNum]);


  const getQuery = (q: string) => {
    setSearchQuery(q);
    setPageNum(0);
  };
  const getCategory = (c: number) => {
    setCategory(c);
    setPageNum(0);
    if (c === 0) {
      setCategory(null);
    }
  };

  const NoResult = () => {
    return (
      <div className="no-result">
        {
          searchQuery 
          ?
          <div>
            <h1>{searchQuery}에 대한 검색 결과가 없습니다.</h1>
            <p>다른 검색어를 입력하시거나 철자나 띄어쓰기를 확인해보세요.</p>
          </div>
          :
          <h1>검색 결과가 없습니다.</h1>
        }
      </div>
    );
  };
  const SetRange1 = (e:any) =>{
    setValue([e.target.value, value[1]])
  }
  const SetRange2 = (e:any) =>{
    setValue([value[0], e.target.value])
  }
  return (
    <div>
      <GiftHubCategory propFunction={getCategory} />
      <SearchBar propFunction={getQuery} initailQuery={searchQuery} />
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
                    min={min}
                    max={max}
                  />
                  <div className="slider-numbers-range">
                    {/* <p>{value[0]}원</p> */}
                    <input className="range-input" type="text" value={value[0]} onChange={(e)=>SetRange1(e)}/>
                    <p>~</p>
                    <input className="range-input" type="text" value={value[1]} onChange={(e)=>SetRange2(e)}/>
                    {/* <p>{value[1]}원</p> */}
                  </div>
                </div>
              </div>
              <div className="slider-filter">
                <img
                  onClick={() => {
                    setPriceRange([value[0], value[1]])
                    setPageNum(0)
                  }}
                  src={iconFilter}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gift-sortig">
        <div>
          {/* <p>인기순</p>
          <p> |</p>
          <p className="sort-btn" onClick={() => ExpensiveList()}>
            높은가격순
          </p>
          <p> |</p>
          <p className="sort-btn" onClick={() => CheapestList()}>
            낮은가격순
          </p> */}
        </div>
      </div>

      <div>
        {giftList.length > 0 ? (
          <div className="gift-list-con-container">
          <div className="gift-list-container">
               <div className="gift-list">
               {giftList.map((gift, i:number) => {
                if(giftList.length === i + 1){
                  return (
                    <div ref={lastGiftElement}>
                      <NavLink to={`/gifthub/${gift.giftId}`} >
                        <GiftItem key={i} gift={gift} />
                    </NavLink>
                    </div>
                  )
                } else {
                  return(
                    <NavLink to={`/gifthub/${gift.giftId}`} >
                       <GiftItem key={i} gift={gift} />
                   </NavLink>
                     )
                }})}
               </div>
           </div> 
           <div>
               
           </div>
       </div>
        ) : (
          <NoResult />
                  )}
                </div>
              </div>
            );
          }

    /* 
  [TODO] 사이트 들어왔을 때 기본 노출 상품들 요청처리 (인기 데이터 요청..)
  [TODO] -인기순- 높은가격순 낮은가격순 선택 시  ( 데이터 요청..)
*/