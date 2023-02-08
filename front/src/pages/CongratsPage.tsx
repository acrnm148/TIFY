import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../css/congratsPage.styles.css"

export function CongratsPage() {
    
    let {wishId} = useParams();
// [TODO] wishId로 위시 디테일 정보 요청 => 여기서 유저id, 유저name도 받아오기
// [ TODO] 유저 이름은 어디서 가져와?!?! store에서!??!?
    const [userName , setUserName] = useState('티피')
    const [category, setCategory] = useState('')
    const [selectGift, setSelectGift] = useState({})
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [card, setCard] = useState('')

    const [clickedGift, setClickedGift] = useState<number>()
    const [wishGiftList, setWishGiftList] = useState([
        {
            id : 1,
            img : 'https://user-images.githubusercontent.com/87971876/216546104-5294c903-7f29-4483-b58a-855cc2fe4715.png',
            name : '임시선물1',
            achieved81 : 81 *0.2,
            achieved : 20,
            price: '400,000',
        },
    ])

    useEffect(()=>{
        const API_URL='https://i8e208.p.ssafy.io/api/wish/detail/'
        axios.get(API_URL,{
            params: {
                wishId : wishId
            }
        })
        .then((res)=>{
            console.log('위시 상세 정보', res.data)
            setUserName(res.data.user.username)
            setCategory(res.data.category)
            setTitle(res.data.title)
            setContent(res.data.content)
            setCard(res.data.cardImageCode)
            
            setWishGiftList(res.data.giftItems.map((item: { giftname:string,giftImgUrl: any; productNum: number; gathered: number; purePrice: number; id:number }, i:number) => {
                const pricevat = Number(item.purePrice) + (Number(item.purePrice)*0.05)
                const achieved = (Number(item.gathered) / pricevat)*100
                // console.log((Number(item.gathered) / pricevat)*100)
                return(
                {
                    id : i,
                    img : item.giftImgUrl,
                    productNum : item.productNum,
                    name : item.giftname, // 추가해야함
                    achieved : Math.round(achieved),
                    achieved81 : Math.round(achieved*0.81),
                    price : Math.round(pricevat),
                    giftId : item.id,
                }
                )
            }))
        }).catch((err) =>{
            console.log('위시 상세정보 어디감', err)
        })
    }, [])



    const WishCardCover = () =>{
        return(
            <div className="wish-card wish-card-cover" style={{"backgroundImage" :`url(${card})`, "marginBottom":"10px"}} />
        )
    }
    const WishCardContent = () =>{
        return(
            <div className="wish-card wish-card-content">
                <h1 className="wish-title">{title}</h1>
                <p>{content}</p>
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
                <div className="wish-components-title" style={{"padding":"0 10px"}}>
                    {
                        category?
                        <h1>{userName}님의 {category}를 축하해주세요!</h1>
                        :
                        <h1>{userName}님을 축하해주세요!</h1>
                    }
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

