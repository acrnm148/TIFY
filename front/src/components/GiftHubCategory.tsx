import home from '../assets/category/iconHome.svg';
import beauty from '../assets/category/iconBeauty.svg';
import device from '../assets/category/iconDevice.svg';
import kitchen from '../assets/category/iconKitchen.svg';
import drink from '../assets/category/iconFood.svg';
import baby from '../assets/category/iconBaby.svg';
import interior from '../assets/category/iconInterior.svg';
import dogcat from '../assets/category/iconDogcat.svg';
import fashion from '../assets/category/iconFashion.svg';

import '../css/giftHubCategory.styles.css';
import {
  createRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

const CATEGORY_DATA = [
  { id: 0, name: 'all', ko: '전체', src: home },
  { id: 1, name: 'beauty', ko: '뷰티', src: beauty },
  { id: 2, name: 'device', ko: '전자기기', src: device },
  { id: 3, name: 'kitchen', ko: '키친', src: kitchen },
  { id: 4, name: 'food', ko: '식품', src: drink },
  { id: 5, name: 'birthbaby', ko: '출산유아', src: baby },
  { id: 6, name: 'interior', ko: '인테리어', src: interior },
  { id: 7, name: 'dogcat', ko: '반려동물', src: dogcat },
  { id: 8, name: 'fashion', ko: '의류', src: fashion },
];
const GiftHubCategory = (props: {
  propFunction: (arg0: number) => void;
  goCategory: number | null | undefined;
}) => {
  const [selectCategory, setSelectCategory] = useState<
    number | null | undefined
  >(props.goCategory);
  useEffect(() => {
    if (!props.goCategory) {
      setSelectCategory(0);
    }
  }, [props.goCategory]);
  const cateChangeHandler = async (i: number) => {
    props.propFunction(i);
    // 현재 선택한 카테고리의 색 변경
    setSelectCategory(i);
    console.log(i, selectCategory);
  };

  const checkCategory = (i: number) => {
    if (selectCategory === i) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="gift-category-icon">
      {CATEGORY_DATA.map((data, i: number) => {
        return (
          <div>
            <div
              onClick={() => cateChangeHandler(i)}
              className={`gh-icon ${
                checkCategory(i) ? 'selectedCategory' : ''
              }`}
            >
              <img src={data.src} alt={data.name} key={i} />
            </div>
            <p className="gift-category-name">{data.ko}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GiftHubCategory;
