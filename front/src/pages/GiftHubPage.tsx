import SearchBar from '../components/SearchBar';
import GiftHubCategory from '../components/GiftHubCategory';
import '../css/giftHubPage.styles.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import iconFilter from '../assets/iconFilter.svg';
import axios from 'axios';

// mui Slider 사용
import Slider from '@mui/material/Slider';
// import { NavLink } from 'react-router-dom';
import { GiftItem } from '../components/GiftItem';
import { NavLink, Link, MemoryRouter,  Routes, Route, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

// mui option 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { query } from 'firebase/database';
import priceFormat from '../modules/comma';

const CATEGORY_DATA = [
  {id: 0, name : '전체'},
  {id: 1, name : '뷰티'},
  {id: 2, name : '전자기기'},
  {id: 3, name : '키친'},
  {id: 4, name : '식품'},
  {id: 5, name : '출산유아'},
  {id: 6, name : '인테리어'},
  {id: 7, name : '반려동물'},

]

export function GiftHubPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<number | null>();
  let [giftList, setGiftList] = useState<Array<any>>([]);
  const [sortingCode, setSortingCode] = useState<string|number|null>()
  // Slider 설정
  const [min, max] = [0, 10000000];
  const [priceRange, setPriceRange] = useState([min,max]);
  const step = 1000;
  const [value, setValue] = useState<number[]>([min,max]);
  const [searchPrice, setSearchPrice] = useState<number[]>([min,max])
  const [comval, setComval] = useState<string[]>([value[0].toLocaleString('ko-KR'), value[1].toLocaleString('ko-KR')])
  const handleChange = (event: Event, newValue: number[]) => {
    // setValue(newValue as number[]);
    setPriceRange(newValue as number[])
    setValue(newValue as number[])
    setComval([newValue[0].toLocaleString('ko-KR'),newValue[1].toLocaleString('ko-KR')])
  };

  // Pagination
  const [pageNum, setPageNum] = useState(0);

  let max_result = 10; //디폴트
  // 기본값은 상품목록에서 보여주는 Recommend 리스트는 검색어가 없을 때 store에 저장한 리스트 표출
  // (검색어 | 카테고리 선택 | 상품리스트에 변경)이 있을 때 실행되는 함수
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/search/';
      axios
        .get(API_URL, {
          params: {
            minPrice: searchPrice[0],
            maxPrice: searchPrice[1],
            name: searchQuery,
            category: category,
            max_result: max_result,
            page: pageNum,
            sortingCode : sortingCode // sortingCode 0=인기순, 1=가격 오름차 , 2=가격 내림차
          },
        })
        .then((e) => {
          console.log(e.data);
          let copy: Array<any> = [...e.data.content]; // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
          setGiftList([...e.data.content]);
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    fetchData();
  }, [searchQuery, category, pageNum, sortingCode, searchPrice]);

  const getQuery = (q: string) => {
    console.log('쿼리받음')
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

  const handleFilterChange = (e: SelectChangeEvent) => {
    setSortingCode(e.target.value)
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
    let v = e.target.value
    let nv = Number(v.replaceAll(',',''))
    if(isNaN(nv)){
      setComval(['0', comval[1]])
      setValue([0, value[1]])
    } else {
      setComval([nv.toLocaleString('ko-KR'), comval[1]])
      setValue([nv, value[1]])
    }
  }
  const SetRange2 = (e:any) =>{
    let v = e.target.value
    let nv = Number(v.replaceAll(',',''))
    if(isNaN(nv)){
      setComval([comval[0], String(max)])
      setValue([value[0], max])
    } else {
      setComval([comval[0],nv.toLocaleString('ko-KR')])
      setValue([value[0], nv])
    }
    setValue([value[0], e.target.value])
  }
  return (
    <div>
      <GiftHubCategory propFunction={getCategory} goCategory={category}/>
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
                    <input className="range-input" type="text" value={comval[0]} placeholder={comval[0]} onChange={(e)=>SetRange1(e)}/>
                    <p>~</p>
                    <input className="range-input" type="text" value={comval[1]} onChange={(e)=>SetRange2(e)}/>
                  </div>
                </div>
              </div>
              <div className="slider-filter">
                <img
                  onClick={() => {
                    setSearchPrice([priceRange[0],priceRange[1]])
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
        <div className='sorting'>
          <div className='sorting-keyword'>
                {searchQuery && <div className='filter-show'>{searchQuery}<span onClick={()=>setSearchQuery('')}>x</span></div>}
                {searchPrice[0] !== 0 && <div className='filter-show'>최소가격{searchPrice[0]}
                  <span 
                    onClick={()=>{
                      const v = [0, priceRange[1]]
                      setPriceRange(v)
                      setValue(v)
                      setSearchPrice(v)
                      setComval([String(min), v[1].toLocaleString('ko-KR')])
                      }}>x
                  </span></div> }
                {searchPrice[1] !== max && <div className='filter-show'>최대가격{searchPrice[1]}
                  <span 
                    onClick={()=>{
                      const v = [priceRange[0], max]
                      setPriceRange(v)
                      setValue(v)
                      setSearchPrice(v)
                      setComval([v[0].toLocaleString('ko-kr'),String(max)])
                    }}>x
                    </span></div> }
                {category && <div className='filter-show'>{CATEGORY_DATA[category].name}<span onClick={()=>setCategory(null)}>x</span></div>}
            </div>
          <div className='dropdown'>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">정렬방식</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={sortingCode}
                onChange={handleFilterChange}
                label="인기순"
              >
                <MenuItem value="">
                  <em>선택안함</em>
                </MenuItem>
                <MenuItem value={0}>인기순</MenuItem>
                <MenuItem value={1}>낮은가격순</MenuItem>
                <MenuItem value={2}>높은가격순</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="gift-sortig">

            
      </div>
      <div>
        
      </div>

      <div>
        {giftList.length > 0 ? (
          <div className="gift-list-con-container">
          <div className="gift-list-container">
               <div className="gift-list">
               {giftList.map((gift, i:number) => {
                  return(
                    <NavLink to={`/gifthub/${gift.giftId}`} >
                       <GiftItem key={i} gift={gift} />
                   </NavLink>
                     )
                })}
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
*/