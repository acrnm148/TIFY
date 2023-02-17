import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiftItem } from '../components/GiftItem';
import TapNameEng from '../components/TapNameEng';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import axios from 'axios';
import { Gift } from '../interface/interface';
import "../css/LikePage.styles.css"
import Swal from 'sweetalert2';

export function LikePage() {
  const [cartList, setCartList] = useState<Array<any>>([]);
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );

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
              // getData(i),
              setNowPage(i);
            }}
          >
            {i}
          </button>
        </li>,
      );
    }
    return <>{buttons}</>;
  };

  // Pagination
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [nowPage, setNowPage] = useState<number>(1);
  const pamount = 5;
  const [nowStartNum, setNowStartNum] = useState<number>(1);
  const [nowLastNum, setNowLastNum] = useState<number>(pamount);

  const GoToNextPage = () => {
    let target = nowLastNum + 1;
    // if(target)
    setNowPage(target);
    // getData(target);
    setNowStartNum(target);
    setNowLastNum(nowLastNum + pamount);
  };
  const GoToBeforePage = () => {
    let target = nowStartNum - pamount;
    if (target < 1) {
      return;
    }
    setNowPage(target);
    // getData(target);
    setNowLastNum(nowStartNum - 1);
    setNowStartNum(target);
  };
  const LEFT_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/c24b625a-30cd-4b39-ad0a-0d7ffddf64c3.png';
  const RIGHT_IMG =
    'https://tifyimage.s3.ap-northeast-2.amazonaws.com/a213c7ad-2bc9-489c-87f1-3be671f007f4.png';

  useEffect(() => {
    const putCart = async () => {
      const API_URL = `https://i8e208.p.ssafy.io/api/cart/forwish/${userId}`;
      axios({
        method: 'get',
        url: API_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((con) => {
          console.log('카트 리스트불러오기 성공', con.data);
          setCartList([...con.data]);
        })
        .catch((err) => {
          console.log('카트 리스트불러오기 실패', err);
        });
    };
    putCart();
  },[]);
  
  const deleteItem = (id:number) =>{
    let result = Swal.fire({
      text: '장바구니에서 삭제하시겠습니까?',
      icon: 'question',
      
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      
      reverseButtons: true, // 버튼 순서 거꾸로
      
   }).then(result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {       
        const API_URL = `https://i8e208.p.ssafy.io/api/cart/${userId}/${id}`
      axios.delete(API_URL
        ).then((res)=>{
          console.log('장바구니에서 삭제 완료')
          setCartList(cartList.filter((item)=>item.id != id))
      }).catch((err)=>{
        console.log('장바구니에서 삭제 못함', id)
      })
      }
   });
  }
  return (
    <div>
      <TapNameEng
        title="Cart"
        content="갖고 싶은 물품을 확인하세요."
      ></TapNameEng>
      {cartList.length > 0 ? (
        <div className="gift-list-con-container">
          <div className="gift-list-container">
            <div className="gift-list">
              {cartList.map((gift, i: number) => {
                return (
                  <div className="like-container">
                    <div
                      className="delete-like"
                      onClick={() => deleteItem(gift.id)}
                    >
                      ❤
                    </div>
                    <NavLink to={`/gifthub/${gift.id}`}>
                      <GiftItem key={i} gift={gift.product} />
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-product">
          <h1>카트에 상품이 없습니다.</h1>
          <NavLink to={'/gifthub'}>
            <button>갖고싶은 선물 담기</button>
          </NavLink>
        </div>
      )}
      <div className="friends-paging-wrap">
        <ul className="page-btns ">
          <div onClick={() => GoToBeforePage()}>
            <img src={LEFT_IMG} className="leftPage" />
          </div>
          <PageButtons totalPages={totalPages} />
          <button onClick={() => GoToNextPage()}>
            <img src={RIGHT_IMG} className="rightPage" />
          </button>
        </ul>
      </div>
    </div>
  );
}
