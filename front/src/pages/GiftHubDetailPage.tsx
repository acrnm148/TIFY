import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { useParams } from 'react-router-dom';
import '../css/giftHubDetail.styles.css';
import { GiftItem } from '../components/GiftItem';
import { useLocation  } from 'react-router-dom';
import Swal from "sweetalert2";
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
type Gift = {
  name: string;
  price: number;
  repImg: string;
  id: number;
  options: any;
  imgList: { url: string }[];
  description: string;
  category: number;
  likeCount: number;
  quantity: number;
};

export function GiftHubDetailPage() {
  const userId = useSelector((state: RootState) => state.authToken.userId);

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const [showMore, setShowMore] = useState<boolean>(false);

  const [data, setData] = useState<Gift>({
    id: 0,
    name: '',
    imgList: [],
    description: '',
    category: 0,
    likeCount: 0,
    options: [],
    price: 0,
    quantity: 0,
    repImg: '',
  });

  let { giftId } = useParams();
  const [heart, setHeart] = useState(false);

  const location = useLocation().pathname

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = `https://i8e208.p.ssafy.io/api/gifthub/product/${giftId}`;
      await axios
        .get(API_URL)
        .then((con) => {
          setData(con.data);
        })
        .catch((err) => {
          console.log('상품 디테일 데이터를 받아오지못함', err);
        });
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    const fetchData2 = async () => {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/search/';
      await axios
        .get(API_URL, {
          params: {
            minPrice: '',
            maxPrice: '',
            name: '',
            category: data.category,
            max_result: 10,
            page: 0,
          },
        })
        .then((e) => {
          let copy: Array<any> = [...e.data.content];
          setGiftList(copy);
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    fetchData2();
  }, [data]);

  const checkHeart = async() => {
    const API_URL = `http://localhost:8081/api/cart/`; //https://i8e208.p.ssafy.io/api/cart/
    const isExist = await axios({
      method: 'post',
      url: API_URL+`check-already`,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        userId: userId,
        productId: data.id, //data.id,
      },
    })
      .then((con) => {
        return con.data
      })
      .catch((err) => {
        console.log('카트에 상품 존재유무 검색 실패', err);
      });

    if (isExist) {
      let r = confirm(
        '이미 장바구니에 존재하는 상품입니다.' + '\n장바구니에서 삭제할까요?',
      );
      if (r) {
        return axios({
          method: 'delete',
          url: API_URL,
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            userId: userId,
            productId: data.id, //data.id,
          },
        }).then(()=>{Swal.fire("장바구니에서 상품을 삭제했습니다.")})
      }

    } else {
      let result = confirm('카트에 담으시겠습니까? ');
      if (result) {
        setHeart(true);
        const putCart = async () => {
          await axios({
            method: 'post',
            url: API_URL,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
              userId: userId,
              productId: data.id, //data.id,
              quantity: 1, // data.quantity
              options: {
                '': '',
              },
            },
          })
            .then((con) => {
              Swal.fire('장바구니에 담기 완료');
            })
            .catch((err) => {
              Swal.fire('장바구니에 이미 담긴 상품입니다.');
              console.log('상품 좋아요 실패', err);
            });
        };
        putCart();
      }
    }
  };

  let [giftList, setGiftList] = useState<Array<any>>([]);

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
  const TO_LAST_PAGE_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/b87f76a0-0e29-45ec-9e43-b7b75743bda2.png';
  const GiftRecommend = (props: { giftList: any }) => {
    useEffect(() => {
      // Add code to run when the giftList state changes
      // ...
    }, [giftList]);

    return (
      <div className="gift-recommend-list" style={{ width: '69%' }}>
        <p>{CATEGORY_DATA[data.category]?.name} 카테고리 BEST</p>
        <div className="gift-only-list" style={{ display: 'flex' }}>
          {props.giftList.slice(0, 4).map((gift: any, i: number) => (
            <GiftItem key={i} gift={gift} />
          ))}
        </div>
      </div>
    );
  };
  const HEART_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/ebf41667-027a-4c7a-98b9-556c7bdf9d6e.png';

  const LAST_PAGE_IMG = '';

  return (
    <div className="concon">
      <div className="gift-item-detail-container">
        <div
          className="go-back"
          onClick={() => (window.location.href = '/gifthub')}
        >
          <p>
            <img src={TO_LAST_PAGE_IMG} className="toLastPage" />
          </p>
        </div>
        <div className="gift-noti">
          <div>
            <div className="gift-noti-img">
              <img src="https://tifyimage.s3.ap-northeast-2.amazonaws.com/794dcba2-7048-43c6-ac5a-57412270c175.PNG" />
            </div>
            <div className="gift-noti-con">
              갖고 싶은 선물을 골라
              <br />
              위시를 생성해보세요 :)
            </div>
          </div>
        </div>
        <div className="product-info">
          <img className="product-img" src={data.repImg} alt="" />
          <div className="product-info-right">
            <div className="product-cate-like">
              <p>{CATEGORY_DATA[data.category].name}</p>
              {data.likeCount !== 0 && (
                <h3 className="gift-detail-likes">
                  <img src={HEART_IMG} className="likeImg" />
                  {data.likeCount}
                </h3>
              )}
            </div>
            <div className="product-name-like">
              <p>{data.name}</p>
            </div>
            <div className="product-price-option">
              <p className="product-price">
                {data.price.toLocaleString('ko-KR')} 원
              </p>
            </div>
            <div>
              {data.options.length > 0 && (
                <div className="product-option">
                  <div>{data.options[0].title}</div>
                </div>
              )}
              <div
                className="make-wish"
                onClick={() => {
                  checkHeart();
                }}
              >
                장바구니에 담기
              </div>
            </div>
          </div>
        </div>
        <GiftRecommend giftList={giftList} />
        <div className="product-image">
          {data.imgList.map((img: { url: string }, i: number) => {
            if (i === 0) {
              return <img src={img.url} alt="" key={`${i}-${img.url}`}/>;
            } else if (i !== 0 && showMore) {
              return <img src={img.url} key={`${i}-${img.url}`}alt="" />;
            }
          })}
          {data.imgList.length > 1 && (
            <div className="more-img">
              <button
                className="more-img-btn"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? '상세이미지 닫기' : '상세이미지 더보기'}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="to-top">
        <img src={TO_TOP_IMG} onClick={MoveToTop} />
      </div>
    </div>
  );
}
