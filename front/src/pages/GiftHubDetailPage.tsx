import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { NavLink, useParams } from "react-router-dom";
import "../css/giftHubDetail.styles.css"
import iconGHeart from "../assets/iconGHeart.svg";
import iconMHeart from "../assets/iconMHeart.svg"
import { Gift, GiftProps } from "../interface/interface";

export function GiftHubDetailPage(){

    
    const userId = useSelector((state: RootState) => state.authToken.userId);

    const accessToken = useSelector(
        (state: RootState) => state.authToken.accessToken,
      );


    const [data, setData] = useState(
        {id:'',name:'', imgList : [], description:'', category:'', 
        likeCount: '', options:[],price:'',  quantity:'', repImg:'',}
        );
    
    let {giftId} = useParams()
    const [heart, setHeart] = useState(false);
    useEffect(() => {
        const fetchData = async() =>{
            const API_URL = `https://i8e208.p.ssafy.io/api/gifthub/product/${giftId}`;
            axios.get(API_URL).then((con) => {
                console.log(con)
                setData(con.data)
            }).catch((err) => {
                console.log('상품 디테일 데이터를 받아오지못함', err)
            })
        }
        fetchData();
    },[]);
    const checkHeart = () =>{
        if (heart){
            let r = confirm('장바구니에서 삭제하기')
            setHeart(false)
        } else{
            let result = confirm('카트에 담으시겠습니까?')
            console.log('userId',userId)
            if (result){
                setHeart(true)
                const putCart = async() =>{
                    
                    const API_URL = `https://i8e208.p.ssafy.io/api/cart/`;
                    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    axios({
                        method: 'post',
                        url: API_URL,
                        headers: {"Authorization": `Bearer ${accessToken}`,}, 
                        data: {
                            "userId":userId,
                            "productId":data.id, //data.id,
                            "quantity":1, // data.quantity
                            "options":{
                                "":""
                            }
                        }
                    }).then((con) => {
                        console.log('상품 좋아요 성공', con)
                        alert('장바구니에 담기 완료')
                    }).catch((err) => {
                        console.log('상품 좋아요 실패', err)
                    })
                }
                putCart();

    
            }
        }

    }
    return(
        <div className="concon">
            <div className="gift-item-detail-container">
                <div className="go-back"><p>뒤로가기</p></div>
                <div className="product-info">
                    <img className="product-img" src={data.repImg} alt="" /> 
                    <div className="product-info-right">
                        <div className="product-name-like">
                            <p>{data.name}</p>
                            <div className="product-like" onClick={()=>{checkHeart()}}>
                                <img src={heart?iconMHeart:iconGHeart} alt="" />
                            </div>
                        </div>
                        <div className="product-price-option">
                            <p className="product-price">₩ {data.price} </p>
                            <div>{data.options ? data.options:''}</div>
                        </div>
                        {/* [TODO] 기프트정보 같이 보내기 */}
                        <NavLink to={'/makewish'} className="make-wish" >
                            위시 만들기
                        </NavLink>
                    </div>
                </div>
                <div className="product-image">
                    {data.imgList.map(img => {
                        const copy = img
                        return(
                            <img src={img['url']} alt="" />
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}