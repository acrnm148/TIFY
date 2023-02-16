import SearchBar from '../components/SearchBar';
import GiftHubCategory from '../components/GiftHubCategory';
import '../css/giftHubPage.styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// mui Slider 사용
import Slider from '@mui/material/Slider';
// import { NavLink } from 'react-router-dom';
import { GiftItem } from '../components/GiftItem';
import {
  NavLink,
} from 'react-router-dom';

// mui option
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CATEGORY_DATA = [
  { id: 0, name: '전체' },
  { id: 1, name: '뷰티' },
  { id: 2, name: '전자기기' },
  { id: 3, name: '키친' },
  { id: 4, name: '식품' },
  { id: 5, name: '출산유아' },
  { id: 6, name: '인테리어' },
  { id: 7, name: '반려동물' },
  { id: 8, name: '의류' },
];

export function GiftHubPage() {
  const [filterState, setFilterState] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<number | null>();
  let [giftList, setGiftList] = useState<Array<any>>([]);
  const [sortingCode, setSortingCode] = useState<string | number | null>();
  // Slider 설정
  const [min, max] = [0, 2000000];
  const [priceRange, setPriceRange] = useState([min, max]);
  const step = 1000;
  const [value, setValue] = useState<number[]>([min, max]);
  const [searchPrice, setSearchPrice] = useState<number[]>([min, max]);
  const [comval, setComval] = useState<string[]>([
    value[0].toLocaleString('ko-KR'),
    value[1].toLocaleString('ko-KR'),
  ]);

  const handleChange = async (event: Event, newValue: number | number[]) => {
    // setValue(newValue as number[]);
    await setPriceRange(newValue as number[]);
    await setValue(newValue as number[]);
    await setComval([
      value[0].toLocaleString('ko-KR'),
      value[1].toLocaleString('ko-KR'),
    ]);
  };

  // Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [nowPage, setNowPage] = useState<number>(1);
  const pamount = 5;
  const [nowStartNum, setNowStartNum] = useState<number>(1);
  const [nowLastNum, setNowLastNum] = useState<number>(pamount);

  let max_result = 30; //디폴트
  // 기본값은 상품목록에서 보여주는 Recommend 리스트는 검색어가 없을 때 store에 저장한 리스트 표출
  // (검색어 | 카테고리 선택 | 상품리스트에 변경)이 있을 때 실행되는 함수
  const getData = async (page: number) => {
    const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/search/';
    axios
      .get(API_URL, {
        params: {
          minPrice: searchPrice[0],
          maxPrice: searchPrice[1],
          name: searchQuery,
          category: category,
          max_result: max_result,
          page: page - 1,
          sortingCode: sortingCode, // sortingCode 0=인기순, 1=가격 오름차 , 2=가격 내림차
        },
      })
      .then((e) => {
        let copy: Array<any> = [...e.data.content]; // let copy = [...giftList,{name:'new', price:9999, gitId:4}];
        setGiftList([...e.data.content]);
        setTotalPages(e.data.totalPages);
        // setNowPage(1);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  useEffect(() => {
    getData(1);
  }, [searchQuery, category, sortingCode, searchPrice]);

  const getQuery = (q: string) => {
    setSearchQuery(q);
    setPage(0);
  };
  const getCategory = (c: number) => {
    setCategory(c);
    setPage(0);
    if (c === 0) {
      setCategory(null);
    }
  };

  const handleFilterChange = (e: SelectChangeEvent) => {
    setSortingCode(e.target.value);
  };

  const NoResult = () => {
    return (
      <div className="no-result">
        {searchQuery ? (
          <div>
            <h1>{searchQuery}에 대한 검색 결과가 없습니다.</h1>
            <p>다른 검색어를 입력하시거나 철자나 띄어쓰기를 확인해보세요.</p>
          </div>
        ) : (
          <h1>검색 결과가 없습니다.</h1>
        )}
      </div>
    );
  };
  const SetRange1 = (e: any) => {
    let v = e.target.value;
    let nv = Number(v.replaceAll(',', ''));
    if (isNaN(nv)) {
      setComval(['0', comval[1]]);
      setValue([0, value[1]]);
    } else {
      setComval([nv.toLocaleString('ko-KR'), comval[1]]);
      setValue([nv, value[1]]);
    }
  };
  const SetRange2 = (e: any) => {
    let v = e.target.value;
    let nv = Number(v.replaceAll(',', ''));
    if (isNaN(nv)) {
      setComval([comval[0], String(max)]);
      setValue([value[0], max]);
    } else {
      setComval([comval[0], nv.toLocaleString('ko-KR')]);
      setValue([value[0], nv]);
    }
    setValue([value[0], e.target.value]);
  };
  const PageButtons = ({ totalPages }: { totalPages: number }) => {
    let buttons = [];
    if (nowLastNum > totalPages) {
      setNowLastNum(totalPages);
    }
    for (let i = nowStartNum; i <= nowLastNum; i++) {
      buttons.push(
        <li className={`page-item ${nowPage == i && 'isNowPage'}`} key={i}>
          <button
            className="page-link"
            onClick={() => {
              getData(i), setNowPage(i);
            }}
          >
            {i}
          </button>
        </li>,
      );
    }
    return <>{buttons}</>;
  };
  const GoToNextPage = () => {
    let target = nowLastNum + 1;
    // if(target)
    setNowPage(target);
    getData(target);
    setNowStartNum(target);
    setNowLastNum(nowLastNum + pamount);
  };
  const GoToBeforePage = () => {
    let target = nowStartNum - pamount;
    if (target < 1) {
      return;
    }
    setNowPage(target);
    getData(target);
    setNowLastNum(nowStartNum - 1);
    setNowStartNum(target);
  };
  const [toggleBtn, setToggleBtn] = useState(true);
  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const TO_TOP_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/31163872-7117-4801-b62a-4d4dffa3097e.png';
  const X_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/c3753f08-9751-457b-be37-cd7ff1e73a2d.png';
  const FILTER_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/8969870e-4294-4e69-85c4-b915eab2025a.png';
  const LEFT_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/c24b625a-30cd-4b39-ad0a-0d7ffddf64c3.png';
  const RIGHT_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/a213c7ad-2bc9-489c-87f1-3be671f007f4.png';
  return (
    <div className="gifthub-page-con-continer">
      {/* Scroll */}
      <div className="gifthub-page-continer">
        <SearchBar propFunction={getQuery} initailQuery={searchQuery} />
        <div className="filter-bar-container">
          <div className="filter-bar">
            <div className="slider-container">
              <div className="slider-numbers">
                <div className="slider-con-numbers-range">
                  <p className="p-slider-con-price">가격</p>
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
                      <input
                        className="range-input"
                        type="text"
                        value={comval[0]}
                        placeholder={comval[0]}
                        onChange={(e) => SetRange1(e)}
                      />
                      <p>~</p>
                      <input
                        className="range-input"
                        type="text"
                        value={comval[1]}
                        onChange={(e) => SetRange2(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="slider-filter">
                  <div
                    onClick={() => {
                      setSearchPrice([priceRange[0], priceRange[1]]);
                      setPage(0);
                      setFilterState(true);
                    }}
                  >
                    <img
                      className={filterState === true ? 'selectedFilter' : ''}
                      src={FILTER_IMG}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <GiftHubCategory propFunction={getCategory} goCategory={category} />
        </div>

        <div className="gift-sortig">
          <div className="sorting">
            <div className="sorting-keyword">
              {giftList.length > 0 && searchQuery && (
                <div className="filter-show">
                  {searchQuery}
                  <span onClick={() => setSearchQuery('')}>
                    <img src={X_IMG} className="xImg" />
                  </span>
                </div>
              )}
              {giftList.length > 0 && searchPrice[0] !== 0 && (
                <div className="filter-show">
                  최소가격{searchPrice[0]}
                  <span
                    onClick={() => {
                      const v = [0, priceRange[1]];
                      setPriceRange(v);
                      setValue(v);
                      setSearchPrice(v);
                      setComval([String(min), v[1].toLocaleString('ko-KR')]);
                    }}
                  >
                    원
                    <img src={X_IMG} className="xImg" />
                  </span>
                </div>
              )}
              {giftList.length > 0 && searchPrice[1] !== max && (
                <div className="filter-show">
                  최대 {searchPrice[1]}
                  <span
                    onClick={() => {
                      const v = [priceRange[0], max];
                      setPriceRange(v);
                      setValue(v);
                      setSearchPrice(v);
                      setComval([v[0].toLocaleString('ko-kr'), String(max)]);
                    }}
                  >
                    원
                    <img src={X_IMG} className="xImg" />
                  </span>
                </div>
              )}
              {giftList.length > 0 && category && (
                <div className="filter-show">
                  {CATEGORY_DATA[category].name}
                  <span onClick={() => setCategory(null)}>
                    <img src={X_IMG} className="xImg" />
                  </span>
                </div>
              )}
            </div>
            <div className="dropdown">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  정렬방식
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={sortingCode}
                  onChange={handleFilterChange}
                  label="인기순"
                  className="gift-select-sort"
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
        <div className="gift-sortig"></div>
        <div></div>

        <div className="gift-wrap-box">
          {giftList.length > 0 ? (
            <div className="gift-list-con-container">
              <div className="gift-list-container">
                <div className="gift-list">
                  {giftList.map((gift, i: number) => {
                    return (
                      <NavLink to={`/gifthub/${gift.giftId}`}>
                        <GiftItem key={i} gift={gift} />
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div></div>
            </div>
          ) : (
            <NoResult />
          )}
          {giftList.length > 0 && (
            <ul className="page-btns">
              <div onClick={() => GoToBeforePage()}>
                <img src={LEFT_IMG} className="leftPage" />
              </div>
              <PageButtons totalPages={totalPages} />
              <button onClick={() => GoToNextPage()}>
                <img src={RIGHT_IMG} className="rightPage" />
              </button>
            </ul>
          )}
        </div>
      </div>
      <div className="to-top">
        <img src={TO_TOP_IMG} onClick={MoveToTop} />
      </div>
    </div>
  );
}

/* 
  [TODO] 사이트 들어왔을 때 기본 노출 상품들 요청처리 (인기 데이터 요청..)
*/
