import { useState } from "react";
import ReactSlider from "react-slider";
import TapNameKor from "../components/TapNameKor";
import "../css/congratsCardPage.styles.css"
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import loading7 from "../assets/loading7.svg"
import { Dictionary } from "@reduxjs/toolkit";
import axios from "axios";
import { useCallback, useRef } from "react";


export function CongratsCardPage(){
    const params = useParams();
    const wishId = params.wishId
    const payAmount = ['5,000', '10,000', '50,000', '100,000']
    const payAmountNum = [5000, 10000, 50000, 100000]
    const [amount, setAmount] = useState<any>()

    // 결제수단 선택
    const [payment, setPayment] = useState<string>()

    // 선택한 선물 정보 prop으로 받음
    const location = useLocation();
    const { state } = location;
    const [wishDetail, setWishDetail] = useState()

    // makeCard form 데이터
    const [cardFrom, setCardFrom] = useState<string>()
    const [cardPhone, setCardPhone] = useState()
    const [cardContents, setCardContents] = useState()
    // makeCard form 유효성확인
    const [validCard, setValidCard] = useState<boolean>()

    //이용약관동의 선택여부
    const [isChecked, setIsChecked] = useState(false)

// file upload----------------------------------------------------------------
    const [imgUrl, setImgUrl] = useState<string>('')
    // div 박스 클릭하면 이미지 input이 클릭되도록 useRef사용
    const inputRef = useRef<HTMLInputElement | null>(null);
    const API_HOST = ''
    const onUploadImageButtonClick = useCallback(() => {
        if (!inputRef.current) {
        return;
        } 
        inputRef.current.click();
    }, []);
    // 이미지 업로드 버튼 클릭시 발생하는 이벤트
    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
        return;
    }

    // 파일을 formData로 만들어주기
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    // 3. imgFile 을 보내서 S3에 저장된 url받기 
    const getImgUrl = async() =>{
        const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
        await axios.post(API_URL, formData, {
          headers: {'Content-Type' : 'multipart/form-data'},
        }).then((con) => {
          console.log('이미지주소불러오기 성공', con.data)
          setImgUrl(con.data)
        }).catch((err) => {
            console.log('이미지주소불러오기 실패', err)
        })
      }
      getImgUrl();
    }, []);
// end file upload----------------------------------------------------------------

    const amountSelected =(i:any) =>{
        console.log(payAmount[i])
        setAmount(payAmountNum[i])
    }
    const getAmount = (e:any) =>{
        e.preventDefault();
        console.log(e.target.value);
        const neww = e.target.value
        setAmount(neww)
    }
    function checkPay(p:string){
        if(payment === p){
            return true
        }
        else{
            return false
        }
    }

    const GiftLoadingIcon = () =>{
        return (
            <div className="gift-loading">
                <img src={loading7} alt="" />
                <p>선물이 {state.selectGift.achieved}% 채워지고있어요!</p>
            </div>
        )
    }

    function checkValidate(e:any){
        // e.preventDefault()

        // amount 숫자이고 공백아닌지 확인
        if(Number.isNaN(amount)){
            e.preventDefault()
            alert('축하금액에 숫자를 입력하세요!')
            return
        }
        // 결제수단 선택했는지 확인
        if (!payment){
            e.preventDefault()
            alert('결제수단을 선택해주세요!')
            return
        }
        // card from 입력 확인 =>>> 자동완성에 카드문구들어가도록
        // console.log(cardFrom, cardContents, cardPhone)
        //if(cardData.title && cardData.phone && cardData.content)
        // 이용약관 동의 확인
        if(!isChecked){
            e.preventDefault()
            alert('이용약관에 동의해주세요!')
            return
        }

    }
    function ifisChecked(){
        return isChecked? true: false
    }
    

    const onChangeFrom = (e:any) => {
        setCardFrom(e.target.value);
        };
    const onChangePhone = (e:any) => {
        setCardPhone(e.target.value);
    }
    const onChangeContents = (e:any) => {
        setCardContents(e.target.value);
    }

    function setCheckbox(){
        setIsChecked(!isChecked)
        console.log('이용약관..', isChecked);
    }

    return (
        <>
            <TapNameKor
                title="축하하기"
                // content={state.selectGift.name}
                content="ㅊㅋㅊㅋ"
            ></TapNameKor>
            <div className="congrats-card-page-containger">
                <div className="congrats-card-page-containger-border">
                    <div className="congrats-card-page-left">
                    <GiftLoadingIcon />
                    <div className="gift-info">
                        <div className="gift-img-box-con">
                            <img className="gift-img-box" src={state.selectGift.img} alt="" />
                        </div>
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
                                <input className="" type="text" placeholder='축하금액' value={amount} onChange={getAmount}/>
                            </div>
                        </div>
                    </div>
                    <div className="middle-line-vertical"></div>
                    <div className="congrats-card-page-right">
                        <div className='thanks-card-container'>
                            <div className='thanks-card'>
                            <div className='thanks-input'>
                                <label htmlFor="제목">보내는 사람</label>
                                <input className='input-small'type="text" name='제목' value={cardFrom} onChange={onChangeFrom} placeholder="받는 사람이 알 수 있도록 이름을 입력해주세요!"/>
                            </div>
                            <div  className='thanks-input'>
                                <label htmlFor="내용">축하메세지</label>
                                <textarea name="내용" placeholder='카드 내용을 입력하세요' value={cardContents} onChange={onChangeContents}></textarea>
                            </div>
                            <div className='thanks-input'>
                                <label htmlFor="">사진</label>
                                <input className='img-input' type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} name="thumbnail"/>
                                <div className={`thanks-photo-btn`} onClick={onUploadImageButtonClick} style={{"backgroundImage":`url(${imgUrl})`,"backgroundSize":"contain", "backgroundRepeat":"no-repeat", "backgroundPosition":"center"}}>
                                {!imgUrl && <h1>+</h1>}
                                </div>
                            </div>
                            <div className='thanks-input'>
                                <label htmlFor="연락처">연락처</label>
                                <input className='input-small'type="text" name='연락처' value={cardPhone} onChange={onChangePhone} placeholder="000-0000-0000"/>
                            </div>
                            </div>
                            
                        </div>
                        <div className="policy">
                            <input type="checkbox" defaultChecked={false} onChange={setCheckbox}/>
                            이용약관동의
                           
                        </div>
                        
                        <div className='congrats-input'>
                            {
                                checkPay('kakao')
                                ? 
                                <Link 
                                    onClick={checkValidate} 
                                    className='congrats-form-btn' 
                                    to={'/congrats/kakaopay'} 
                                    state={{ giftName: state.selectGift.name, giftPrice: state.selectGift.price, }} >
                                    축하보내기
                                </Link>
                                : <div onClick={checkValidate} className='congrats-form-btn'>축하보내기</div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}