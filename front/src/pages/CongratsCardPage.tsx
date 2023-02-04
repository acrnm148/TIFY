import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import TapNameKor from "../components/TapNameKor";
import "../css/congratsCardPage.styles.css"
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import loading7 from "../assets/loading7.svg"
import loading2 from "../assets/loading2.svg"
import { Dictionary } from "@reduxjs/toolkit";
import axios from "axios";
import { useCallback, useRef } from "react";
import * as PayingPort from "../components/PayingPort";
import { Paying } from "../interface/interface"

export function CongratsCardPage(){
    const params = useParams();
    const wishId = params.wishId
    const payAmount = ['5,000', '10,000', '50,000', '100,000']
    const payAmountNum = [5000, 10000, 50000, 100000]
    const [amount, setAmount] = useState<any>()

    // 선택한 선물 정보 prop으로 받음
    const location = useLocation();
    const { state } = location;
    const [wishDetail, setWishDetail] = useState()

    // makeCard form 데이터
    const [cardFrom, setCardFrom] = useState<string>("")
    const [cardPhone, setCardPhone] = useState("")
    const [cardContents, setCardContents] = useState("")
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
    const donut = useRef<HTMLDivElement>(null);
    useEffect(() =>{
        donut.current && donut.current.focus();
    })
    let totalMinwon = state.selectGift.achieved
    let t4 = 0
    const GiftLoadingIcon = () =>{
        return (
            <div className="gift-loading">
                {/* <img src={loading7} alt="" /> */}
{/* ------------------------------------------------------------------------------------------ */}
                <div className="donut" ref={donut} >
                <svg viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M93.4773 133.323C93.612 119.556 90.1215 108.36 85.6815 108.316C81.2412 108.273 77.5326 119.399 77.3982 133.166C77.2635 146.934 80.754 158.13 85.194 158.174C89.6343 158.217 93.3429 147.091 93.4773 133.323Z" fill="white" fillOpacity="0.01"/>
                    <path d="M67.7257 130.196C75.283 118.687 78.4003 107.381 74.6887 104.944C70.9768 102.507 61.8415 109.861 54.2845 121.37C46.7272 132.879 43.6099 144.185 47.3215 146.622C51.0334 149.06 60.1684 141.705 67.7257 130.196Z" fill="white" fillOpacity="0.01"/>
                    <path d="M47.7224 113.684C60.3026 108.088 69.0377 100.263 67.2329 96.2057C65.4284 92.1485 53.7674 93.3959 41.1872 98.9918C28.6071 104.587 19.8719 112.413 21.6765 116.47C23.4812 120.527 35.1423 119.28 47.7224 113.684Z" fill="white" fillOpacity="0.01"/>
                    <path d="M106.76 46.8764C110.77 33.7046 110.576 21.9786 106.328 20.6855C102.08 19.3925 95.3866 29.0221 91.3771 42.1938C87.3679 55.3655 87.5611 67.0916 91.8091 68.3846C96.0571 69.6776 102.751 60.0482 106.76 46.8764Z" fill="white" fillOpacity="0.01"/>
                    <path d="M125.639 64.6743C136.132 55.7598 142.308 45.7899 139.433 42.406C136.558 39.022 125.721 43.5054 115.228 52.4196C104.735 61.3341 98.5598 71.304 101.435 74.688C104.31 78.072 115.146 73.5888 125.639 64.6743Z" fill="white" fillOpacity="0.01"/>
                    <path d="M131.881 89.8603C145.528 88.0345 156.113 82.9867 155.524 78.5854C154.936 74.1844 143.395 72.0967 129.748 73.9222C116.102 75.748 105.516 80.7958 106.105 85.1971C106.694 89.5981 118.234 91.6861 131.881 89.8603Z" fill="white" fillOpacity="0.01"/>
                    <path d="M149.487 117.728C151.371 113.707 142.792 105.711 130.324 99.8683C117.857 94.0255 106.223 92.5486 104.339 96.5692C102.454 100.59 111.033 108.586 123.501 114.429C135.968 120.271 147.602 121.749 149.487 117.728Z" fill="white" fillOpacity="0.01"/>
                    <path d="M123.261 147.395C127.02 145.031 124.126 133.666 116.797 122.01C109.469 110.354 100.48 102.822 96.7211 105.185C92.9621 107.548 95.8559 118.914 103.185 130.569C110.513 142.225 119.502 149.758 123.261 147.395Z" fill="white" fillOpacity="0.01"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M169 85C169 131.392 131.392 169 85 169C38.6081 169 1 131.392 1 85C1 38.6081 38.6081 1 85 1C131.392 1 169 38.6081 169 85ZM85.6815 108.316C90.1215 108.36 93.612 119.556 93.4773 133.323C93.3429 147.091 89.6343 158.217 85.194 158.174C80.754 158.13 77.2635 146.934 77.3982 133.166C77.5326 119.399 81.2412 108.273 85.6815 108.316ZM74.6887 104.944C78.4003 107.381 75.283 118.687 67.7257 130.196C60.1684 141.705 51.0334 149.06 47.3215 146.622C43.6099 144.185 46.7272 132.879 54.2845 121.37C61.8415 109.861 70.9768 102.507 74.6887 104.944ZM67.2329 96.2057C69.0377 100.263 60.3026 108.088 47.7224 113.684C35.1423 119.28 23.4812 120.527 21.6765 116.47C19.8719 112.413 28.6071 104.587 41.1872 98.9918C53.7674 93.3959 65.4284 92.1485 67.2329 96.2057ZM42.3061 73.0893C55.9141 75.1839 66.3982 80.4396 65.7226 84.8283C65.0473 89.2167 53.4679 91.0767 39.8598 88.9821C26.2516 86.8875 15.7675 81.6321 16.443 77.2434C17.1185 72.8547 28.6977 70.9947 42.3061 73.0893ZM57.2526 51.8398C67.5693 60.9577 73.5489 71.0464 70.6083 74.3734C67.668 77.7007 56.9208 73.0066 46.6041 63.8887C36.2873 54.7708 30.3077 44.6821 33.2482 41.3549C36.1887 38.0277 46.9359 42.722 57.2526 51.8398ZM81.2871 42.0858C85.0359 55.334 84.6113 67.0541 80.3387 68.2631C76.0661 69.4721 69.5634 59.7121 65.8146 46.4641C62.0658 33.2158 62.4903 21.4958 66.7629 20.2868C71.0355 19.0778 77.5383 28.8375 81.2871 42.0858ZM106.328 20.6855C110.576 21.9786 110.77 33.7046 106.76 46.8764C102.751 60.0482 96.0571 69.6776 91.8091 68.3846C87.5611 67.0916 87.3679 55.3655 91.3771 42.1938C95.3866 29.0221 102.08 19.3925 106.328 20.6855ZM139.433 42.406C142.308 45.7899 136.132 55.7598 125.639 64.6743C115.146 73.5888 104.31 78.072 101.435 74.688C98.5598 71.304 104.735 61.3341 115.228 52.4196C125.721 43.5054 136.558 39.022 139.433 42.406ZM155.524 78.5854C156.113 82.9867 145.528 88.0345 131.881 89.8603C118.234 91.6861 106.694 89.5981 106.105 85.1971C105.516 80.7958 116.102 75.748 129.748 73.9222C143.395 72.0967 154.936 74.1844 155.524 78.5854ZM130.324 99.8683C142.792 105.711 151.371 113.707 149.487 117.728C147.602 121.749 135.968 120.271 123.501 114.429C111.033 108.586 102.454 100.59 104.339 96.5692C106.223 92.5486 117.857 94.0255 130.324 99.8683ZM116.797 122.01C124.126 133.666 127.02 145.031 123.261 147.395C119.502 149.758 110.513 142.225 103.185 130.569C95.8559 118.914 92.9621 107.548 96.7211 105.185C100.48 102.822 109.469 110.354 116.797 122.01Z" fill="white"/>
                    <path d="M93.4773 133.323C93.612 119.556 90.1215 108.36 85.6815 108.316C81.2412 108.273 77.5326 119.399 77.3982 133.166C77.2635 146.934 80.754 158.13 85.194 158.174C89.6343 158.217 93.3429 147.091 93.4773 133.323Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M67.7257 130.196C75.283 118.687 78.4003 107.381 74.6887 104.944C70.9768 102.507 61.8415 109.861 54.2845 121.37C46.7272 132.879 43.6099 144.185 47.3215 146.622C51.0334 149.06 60.1684 141.705 67.7257 130.196Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M47.7224 113.684C60.3026 108.088 69.0377 100.263 67.2329 96.2057C65.4284 92.1485 53.7674 93.3959 41.1872 98.9918C28.6071 104.587 19.8719 112.413 21.6765 116.47C23.4812 120.527 35.1423 119.28 47.7224 113.684Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M65.7226 84.8283C66.3982 80.4396 55.9141 75.1839 42.3061 73.0893C28.6977 70.9947 17.1185 72.8547 16.443 77.2434C15.7675 81.6321 26.2516 86.8875 39.8598 88.9821C53.4679 91.0767 65.0473 89.2167 65.7226 84.8283Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M70.6083 74.3734C73.5489 71.0464 67.5693 60.9577 57.2526 51.8398C46.9359 42.722 36.1887 38.0277 33.2482 41.3549C30.3077 44.6821 36.2873 54.7708 46.6041 63.8887C56.9208 73.0066 67.668 77.7007 70.6083 74.3734Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M80.3387 68.2631C84.6113 67.0541 85.0359 55.334 81.2871 42.0858C77.5383 28.8375 71.0355 19.0778 66.7629 20.2868C62.4903 21.4958 62.0658 33.2158 65.8146 46.4641C69.5634 59.7121 76.0661 69.4721 80.3387 68.2631Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M106.76 46.8764C110.77 33.7046 110.576 21.9786 106.328 20.6855C102.08 19.3925 95.3866 29.0221 91.3771 42.1938C87.3679 55.3655 87.5611 67.0916 91.8091 68.3846C96.0571 69.6776 102.751 60.0482 106.76 46.8764Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M125.639 64.6743C136.132 55.7598 142.308 45.7899 139.433 42.406C136.558 39.022 125.721 43.5054 115.228 52.4196C104.735 61.3341 98.5598 71.304 101.435 74.688C104.31 78.072 115.146 73.5888 125.639 64.6743Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M131.881 89.8603C145.528 88.0345 156.113 82.9867 155.524 78.5854C154.936 74.1844 143.395 72.0967 129.748 73.9222C116.102 75.748 105.516 80.7958 106.105 85.1971C106.694 89.5981 118.234 91.6861 131.881 89.8603Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M149.487 117.728C151.371 113.707 142.792 105.711 130.324 99.8683C117.857 94.0255 106.223 92.5486 104.339 96.5692C102.454 100.59 111.033 108.586 123.501 114.429C135.968 120.271 147.602 121.749 149.487 117.728Z" stroke="white" strokeMiterlimit="10"/>
                    <path d="M123.261 147.395C127.02 145.031 124.126 133.666 116.797 122.01C109.469 110.354 100.48 102.822 96.7211 105.185C92.9621 107.548 95.8559 118.914 103.185 130.569C110.513 142.225 119.502 149.758 123.261 147.395Z" stroke="white" strokeMiterlimit="10"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M93.4773 133.323C93.612 119.556 90.1215 108.36 85.6815 108.316C81.2412 108.273 77.5326 119.399 77.3982 133.166C77.2635 146.934 80.754 158.13 85.194 158.174C89.6343 158.217 93.3429 147.091 93.4773 133.323ZM67.7257 130.196C75.283 118.687 78.4003 107.381 74.6887 104.944C70.9768 102.507 61.8415 109.861 54.2845 121.37C46.7272 132.879 43.6099 144.185 47.3215 146.622C51.0334 149.06 60.1684 141.705 67.7257 130.196ZM47.7224 113.684C60.3026 108.088 69.0377 100.263 67.2329 96.2057C65.4284 92.1485 53.7674 93.3959 41.1872 98.9918C28.6071 104.587 19.8719 112.413 21.6765 116.47C23.4812 120.527 35.1423 119.28 47.7224 113.684ZM65.7226 84.8283C66.3982 80.4396 55.9141 75.1839 42.3061 73.0893C28.6977 70.9947 17.1185 72.8547 16.443 77.2434C15.7675 81.6321 26.2516 86.8875 39.8598 88.9821C53.4679 91.0767 65.0473 89.2167 65.7226 84.8283ZM70.6083 74.3734C73.5489 71.0464 67.5693 60.9577 57.2526 51.8398C46.9359 42.722 36.1887 38.0277 33.2482 41.3549C30.3077 44.6821 36.2873 54.7708 46.6041 63.8887C56.9208 73.0066 67.668 77.7007 70.6083 74.3734ZM80.3387 68.2631C84.6113 67.0541 85.0359 55.334 81.2871 42.0858C77.5383 28.8375 71.0355 19.0778 66.7629 20.2868C62.4903 21.4958 62.0658 33.2158 65.8146 46.4641C69.5634 59.7121 76.0661 69.4721 80.3387 68.2631ZM106.76 46.8764C110.77 33.7046 110.576 21.9786 106.328 20.6855C102.08 19.3925 95.3866 29.0221 91.3771 42.1938C87.3679 55.3655 87.5611 67.0916 91.8091 68.3846C96.0571 69.6776 102.751 60.0482 106.76 46.8764ZM125.639 64.6743C136.132 55.7598 142.308 45.7899 139.433 42.406C136.558 39.022 125.721 43.5054 115.228 52.4196C104.735 61.3341 98.5598 71.304 101.435 74.688C104.31 78.072 115.146 73.5888 125.639 64.6743ZM131.881 89.8603C145.528 88.0345 156.113 82.9867 155.524 78.5854C154.936 74.1844 143.395 72.0967 129.748 73.9222C116.102 75.748 105.516 80.7958 106.105 85.1971C106.694 89.5981 118.234 91.6861 131.881 89.8603ZM149.487 117.728C151.371 113.707 142.792 105.711 130.324 99.8683C117.857 94.0255 106.223 92.5486 104.339 96.5692C102.454 100.59 111.033 108.586 123.501 114.429C135.968 120.271 147.602 121.749 149.487 117.728ZM123.261 147.395C127.02 145.031 124.126 133.666 116.797 122.01C109.469 110.354 100.48 102.822 96.7211 105.185C92.9621 107.548 95.8559 118.914 103.185 130.569C110.513 142.225 119.502 149.758 123.261 147.395Z" stroke="white" strokeMiterlimit="10"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M169 85C169 131.392 131.392 169 85 169C38.6081 169 1 131.392 1 85C1 38.6081 38.6081 1 85 1C131.392 1 169 38.6081 169 85ZM85.6815 108.316C90.1215 108.36 93.612 119.556 93.4773 133.323C93.3429 147.091 89.6343 158.217 85.194 158.174C80.754 158.13 77.2635 146.934 77.3982 133.166C77.5326 119.399 81.2412 108.273 85.6815 108.316ZM74.6887 104.944C78.4003 107.381 75.283 118.687 67.7257 130.196C60.1684 141.705 51.0334 149.06 47.3215 146.622C43.6099 144.185 46.7272 132.879 54.2845 121.37C61.8415 109.861 70.9768 102.507 74.6887 104.944ZM67.2329 96.2057C69.0377 100.263 60.3026 108.088 47.7224 113.684C35.1423 119.28 23.4812 120.527 21.6765 116.47C19.8719 112.413 28.6071 104.587 41.1872 98.9918C53.7674 93.3959 65.4284 92.1485 67.2329 96.2057ZM42.3061 73.0893C55.9141 75.1839 66.3982 80.4396 65.7226 84.8283C65.0473 89.2167 53.4679 91.0767 39.8598 88.9821C26.2516 86.8875 15.7675 81.6321 16.443 77.2434C17.1185 72.8547 28.6977 70.9947 42.3061 73.0893ZM57.2526 51.8398C67.5693 60.9577 73.5489 71.0464 70.6083 74.3734C67.668 77.7007 56.9208 73.0066 46.6041 63.8887C36.2873 54.7708 30.3077 44.6821 33.2482 41.3549C36.1887 38.0277 46.9359 42.722 57.2526 51.8398ZM81.2871 42.0858C85.0359 55.334 84.6113 67.0541 80.3387 68.2631C76.0661 69.4721 69.5634 59.7121 65.8146 46.4641C62.0658 33.2158 62.4903 21.4958 66.7629 20.2868C71.0355 19.0778 77.5383 28.8375 81.2871 42.0858ZM106.328 20.6855C110.576 21.9786 110.77 33.7046 106.76 46.8764C102.751 60.0482 96.0571 69.6776 91.8091 68.3846C87.5611 67.0916 87.3679 55.3655 91.3771 42.1938C95.3866 29.0221 102.08 19.3925 106.328 20.6855ZM139.433 42.406C142.308 45.7899 136.132 55.7598 125.639 64.6743C115.146 73.5888 104.31 78.072 101.435 74.688C98.5598 71.304 104.735 61.3341 115.228 52.4196C125.721 43.5054 136.558 39.022 139.433 42.406ZM155.524 78.5854C156.113 82.9867 145.528 88.0345 131.881 89.8603C118.234 91.6861 106.694 89.5981 106.105 85.1971C105.516 80.7958 116.102 75.748 129.748 73.9222C143.395 72.0967 154.936 74.1844 155.524 78.5854ZM130.324 99.8683C142.792 105.711 151.371 113.707 149.487 117.728C147.602 121.749 135.968 120.271 123.501 114.429C111.033 108.586 102.454 100.59 104.339 96.5692C106.223 92.5486 117.857 94.0255 130.324 99.8683ZM116.797 122.01C124.126 133.666 127.02 145.031 123.261 147.395C119.502 149.758 110.513 142.225 103.185 130.569C95.8559 118.914 92.9621 107.548 96.7211 105.185C100.48 102.822 109.469 110.354 116.797 122.01Z" stroke="white" strokeMiterlimit="10"/>
                    </svg>
                        </div>
{/* ------------------------------------------------------------------------------------------ */}

                <p>선물이 {state.selectGift.achieved}% 채워지고있어요!</p>
            </div>
        )
    }
    const donutAnimation = setInterval(() => {
        if(donut.current){
            donut.current.style.background = `conic-gradient(rgb(254, 51, 96) 0deg, rgb(254 51 96 / 44%)  ${t4}%, rgb(224, 224, 224) ${t4}%,  #E0E0E0 ${t4}% 100% )`
            t4++ >= totalMinwon && clearInterval(donutAnimation)
        }
    }, 10)

    function checkValidate(e:any){
        // e.preventDefault()

        // amount 숫자이고 공백아닌지 확인
        if(Number.isNaN(amount)){
            e.preventDefault()
            alert('축하금액에 숫자를 입력하세요!')
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
        const congratsInfo:Paying = {
            amount : amount,
            payType : "",
            celebFrom : cardFrom,
            celebTel : cardPhone,
            celebContent : cardContents,
            celebImgUrl : imgUrl,
            giftId : state.selectGift.id,
            userId : 1,
        }
        // Paying 자료형 >> 결제창으로 넘어갈때 결제정보 인자로 넘기기
        PayingPort.onClickPayment(congratsInfo, state.selectGift.name)
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
                            <div onClick={checkValidate} className='congrats-form-btn'>축하보내기</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}