import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiftItem } from '../components/GiftItem';
import TapNameEng from '../components/TapNameEng';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import axios from 'axios';
import { Gift } from '../interface/interface';
import "../css/LikePage.styles.css"

export function LikePage() {
  const [cartList, setCartList] = useState<Array<any>>([]);
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  useEffect(()=>{
    const putCart = async() =>{
      const API_URL = `https://i8e208.p.ssafy.io/api/cart/forwish/${userId}`;
        axios({
            method: 'get',
            url: API_URL,
            headers: {"Authorization": `Bearer ${accessToken}`,}, 
        }).then((con) => {
          console.log('카트 리스트불러오기 성공',con.data)
          setCartList([...con.data])
        }).catch((err) => {
            console.log('카트 리스트불러오기 실패', err)
        })
    }
    putCart();
  },[]);
  
  const deleteItem = (id:number) =>{
    let result = confirm('장바구니에서 삭제하시겠습니까?')
    if(result){
      const API_URL = `https://i8e208.p.ssafy.io/api/cart/${userId}/${id}`
      axios.delete(API_URL
        ).then((res)=>{
          console.log('장바구니에서 삭제 완료')
          setCartList(cartList.filter((item)=>item.id != id))
      }).catch((err)=>{
        console.log('장바구니에서 삭제 못함', id)
      })
    }
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
               {cartList.map((gift, i:number) => {
                  return(
                    <div className='like-container'>
                      <div className="delete-like" onClick={()=>deleteItem(gift.id)}>X</div>
                      <NavLink to={`/gifthub/${gift.id}`} >
                        <GiftItem key={i} gift={gift.product} />
                      </NavLink>
                    </div>
                     )
                })}
               </div>
           </div> 
           <div>
               
           </div>
       </div>
        ) : (
          <div className='no-product'>
            <h1>카트에 상품이 없습니다.</h1>
            <NavLink to={'/gifthub'}><button>갖고싶은 선물 담기</button></NavLink>
          </div>
                  )}
    </div>
  );
}
