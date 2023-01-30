import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../css/CongratsPage.styles.css"

export function CongratsPage() {
    
    let {wishId} = useParams();
// [TODO] wishId로 위시 디테일 정보 요청
// [ TODO] 유저 이름은 어디서 가져와?!?! store에서!??!?
    const username = '김싸피'
    const [selectGift, setSelectGift] = useState({})
    const [clickedGift, setClickedGift] = useState<number>()
    const [wishDetail, setWishDetail] = useState(
        {
            category : 'temp',
            title : 'temp title',
            content: 'temp content',
            card : '',
        }
    )
    const [wishGiftList, setWishGiftList] = useState([
        {
            id : 1,
            img : 'https://user-images.githubusercontent.com/87971876/215254369-d144dcd7-00ae-4f1c-b740-c219c6e30821.png',
            name : '임시선물1',
            achieved81 : 81 *0.2,
            achieved : 20,
            price: '400,000',
        },
        {
            id : 2,
            img : 'https://user-images.githubusercontent.com/87971876/215254369-d144dcd7-00ae-4f1c-b740-c219c6e30821.png',
            name : '임시선물2',
            achieved81 : 81 *0.8,
            achieved : 80,
            price: '100,000,000',
        },
    ])
    // wishGift 정보 딕셔너리로 받아서 wishGiftList에 [...wishGiftList...wishGift]
    //     {
    //         image : '',
    //         name : '',
    //         achived : (20/81) *100, // 81px 고정 회색바의 퍼센트
    //     }


    const WishCardCover = () =>{
        return(
            <div className="wish-card wish-card-cover">
            {/* // [TODO] 숫자로 받은 카드정보로 카드이미지 불러오기 */}
                카드다
            </div>
        )
    }
    const WishCardContent = () =>{
        return(
            <div className="wish-card wish-card-content">
                <h1>{wishDetail.title}</h1>
                <p>{wishDetail.content}</p>
            </div>
        )
    }
    const giftClicked = (i:number) =>{
        setSelectGift({...selectGift,...wishGiftList[i]});
        setClickedGift(i);
        console.log(clickedGift+'clicked')
    }
 
    const WishGiftListCompo = () =>{
        return(
            <div className="wish-gift-list">
                {
                wishGiftList.map((wishGift, i:number) => (
                        <div className={`wish-gift ${clickedGift === i ? 'selected' : ''}`} id={String(i)} onClick={()=>{giftClicked(i)}} >
                            {/* 위시 상세페이지에서 요청받은 데이터로 style 적용이 필요해서 inline style 사용했습니다 */}
                            <div className='gift-img' style={{backgroundImage:`url(${wishGift.img})`}}>
                                <div className="gift-bar-gray">
                                    <div style={{width:wishGift.achieved81, backgroundColor:'#FE3360', height:'inherit', borderRadius:'5px'}}></div>
                                </div>
                            </div>
                            <p>{wishGift.name}</p>
                        </div>
                ))}
            </div>
        )
    }

    const WishCongratsBtns = () => {
        return(
            <div className="wish-congrats-btns">
                <NavLink className="button color" to={`/congrats/${wishId}/giftcard`} state={{selectGift: selectGift}}>선택한 선물로 축하하기 →</NavLink>
                <NavLink className="button gray" to={`/congrats/${wishId}/giftpay`}>축하금으로 보내기 →</NavLink>
            </div>
        )
    }
    return(
        <div className="congrats-page-container">
            <div className="wish-components">
                <div className="wish-components-title">
                    <h1>{username}님의 {wishDetail.category}를 축하해주세요!</h1>
                </div>
                <div className="wish-card-box">
                    <WishCardCover />
                    <WishCardContent />
                </div>
                <WishGiftListCompo />
                <WishCongratsBtns />
            </div>
        </div>
    )
}

