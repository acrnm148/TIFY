import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiftItem } from '../components/GiftItem';
import TapNameEng from '../components/TapNameEng';

export function LikePage() {
  const [cartList, setCartList] = useState<Array<any>>([]);
  
  // useEffect(()=>{
  //   const putCart = async() =>{
  //     const API_URL = `https://i8e208.p.ssafy.io/api/cart/forwish/${userId}`;
  //       axios({
  //           method: 'get',
  //           url: API_URL,
  //           headers: {"Authorization": `Bearer ${accessToken}`,}, 
  //       }).then((con) => {
  //         const lst = con.data
  //         const conlst:Gift[] = []
          
  //         lst.map((d:any) => {
  //           conlst.push(d.product)
  //         })
  //         console.log('카트 리스트불러오기 성공', conlst)
  //         setCartList(conlst)
  //       }).catch((err) => {
  //           console.log('카트 리스트불러오기 실패', err)
  //       })
  //   }
  //   putCart();
  // },[]);
  
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
                if(cartList.length === i + 1){
                  return (
                      <NavLink to={`/gifthub/${gift.giftId}`} >
                        <GiftItem key={i} gift={gift} />
                    </NavLink>
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
          <>
            <h1>카트에 상품이 없습니다.</h1>
            <button>갖고싶은 선물 담기</button>
          </>
                  )}
    </div>
  );
}
