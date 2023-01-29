import { useState } from "react";
import ReactSlider from "react-slider";
import TapNameKor from "../components/TapNameKor";
import "../css/congratsCardPage.styles.css"
import { MakeCardComponent } from '../components/MakeCardComponent';
import { useLocation } from "react-router-dom";
import loading7 from "../assets/loading7.svg"

const Payment = () =>{
    return(
        <div className="payment-selection">
            <p className="selection-label">결제수단 선택</p>
            <div className="payment-selection-buttons">
                <div className="patment-btn kakao">카카오페이</div>
                <div className="patment-btn card-pay">카드 결제</div>
            </div>
        </div>
    )
}
export function CongratsCardPage(){
    const payAmount = ['5,000', '10,000', '50,000', '100,000']
    const payAmountNum = [5000, 10000, 50000, 100000]
    const [amount, setAmount] = useState<number>()

    // 선택한 선물 정보 prop으로 받음
    const location = useLocation();
    const { state } = location;
    console.log('thisismyprosp ~~~' + state.selectGift);
    const [wishDetail, setWishDetail] = useState()
    const amountSelected =(i:number) =>{
        console.log(payAmount[i])
        setAmount(payAmountNum[i])
    }
    
    const GiftInfo = () => {
        const handleChange = ((e) =>{
            // console.log(e.target.value);
            const a = Number(e.target.value);
            setAmount(a);
            // if (Number.isNaN(a)){
            //     setAmount(0);
            //     return(
            //         alert('숫자를 입력하세요')
            //     );
            // }
            
        })
        return(
            <div className="gift-info">
                <img src={state.selectGift.img} alt="" />
                <div className="name_and_price">
                    <h1>{state.selectGift.name}</h1>
                    <p>{state.selectGift.price}</p>
                </div>
                <div className="underline"></div>
                <div className="pay-amount-selection">
                    <p className="selection-label">축하 금액 선택</p>
                    <div className="pay-amount-selection-btns">
                        {
                            payAmount.map((amt, i:number) => (
                                <button onClick={()=>{amountSelected(i)}}>{amt}</button>
                            ))
                        }
                    </div>
                </div>
                <div className="pay-amount-selected">
                    <label htmlFor=""></label>
                    <input className="" type="text" placeholder='축하금액' defaultValue={amount} onChange={handleChange}/>
                </div>
            </div>
        )
    }

    const GiftLoadingIcon = () =>{
        return (
            <div className="gift-loading">
                <img src={loading7} alt="" />
                <p>선물이 {state.selectGift.achieved}% 채워지고있어요!</p>
            </div>
        )
    }
    return (
        <>
            <TapNameKor
                title="축하하기"
                content={state.selectGift.name}
            ></TapNameKor>
            <div className="congrats-card-page-containger">
                <div className="congrats-card-page-containger-border">
                    <div className="congrats-card-page-left">
                        <GiftInfo />
                        <Payment />
                    </div>
                    <div className="middle-line-vertical"></div>
                    <div className="congrats-card-page-right">
                        <GiftLoadingIcon />
                        <MakeCardComponent phone="010-0000-0000" card="축하" disable={false} cardEng='congrats'/>
                        <div className="policy">
                            <input type="checkbox" />
                            이용약관동의
                        </div>
                        <div className='congrats-input'>
                            <div className='congrats-form-btn'>축하보내기</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}