import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { NavLink, useParams } from "react-router-dom";
import "../css/giftHubDetail.styles.css"
import iconGHeart from "../assets/iconGHeart.svg";
import iconMHeart from "../assets/iconMHeart.svg"
import { GiftRecommendList } from "../components/GiftRecommendList";
import { GiftItem } from "../components/GiftItem";

const CATEGORY_DATA = [
    {id: 0, name : '전체'},
    {id: 1, name : '뷰티'},
    {id: 2, name : '전자기기'},
    {id: 3, name : '키친'},
    {id: 4, name : '식품'},
    {id: 5, name : '출산유아'},
    {id: 6, name : '인테리어'},
    {id: 7, name : '반려동물'},
    {id: 8, name : '의류'}
  ]
type Gift = {
    name: string
    price: number
    repImg : string
    id : number
    options : any
    imgList : {url : string}[]
    description : string
    category : number
    likeCount : number
    quantity : number
  }

export function GiftHubDetailPage(){

    
    const userId = useSelector((state: RootState) => state.authToken.userId);

    const accessToken = useSelector(
        (state: RootState) => state.authToken.accessToken,
      );
    const [showMore, setShowMore] = useState<boolean>(false)

    const [data, setData] = useState<Gift>(
        {id:0,name:'', imgList : [], description:'', category:0, 
        likeCount: 0, options:[],price:0,  quantity:0, repImg:'',}
        );
    
    let {giftId} = useParams()
    const [heart, setHeart] = useState(false);
    useEffect(() => {
        const fetchData = async() =>{
            const API_URL = `https://i8e208.p.ssafy.io/api/gifthub/product/${giftId}`;
            axios.get(API_URL).then((con) => {
                console.log(con.data)
                setData(con.data)
            }).catch((err) => {
                console.log('상품 디테일 데이터를 받아오지못함', err)
            })
        }
        fetchData();

        const fetchData2 = async () => {
            console.log('data.category',data.category)
            const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/search/';
            axios
              .get(API_URL, {
                params: {
                    minPrice: '',
                    maxPrice: '',
                    name: '',
                    category: data.category,
                    max_result:10,
                    page: 0,
                },
              })
              .then((e) => {
                let copy:Array<any> = [...e.data.content];
                setGiftList(copy)
                console.log('카테고리별 추천선물 요청', e)
                
              })
              .catch((err) => {
                console.log('error', err);
              });
          };
          fetchData2();
    },[]);
    const checkHeart = () =>{
        if (heart){
            let r = confirm('이미 장바구니에 존재하는 상품입니다.'+ '\n장바구니에서 삭제할까요?')
            if (r){ setHeart(false) }
        } else{
            let result = confirm('카트에 담으시겠습니까? ')
            console.log('accessToken',accessToken)
            if (result){
                setHeart(true)
                const putCart = async() =>{
                    
                    const API_URL = `https://i8e208.p.ssafy.io/api/cart/`;
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


    let [giftList, setGiftList] = useState<Array<any>>([]);
  
    const GiftRecommend = (props:{giftList: any;}) =>{
            return(
                <div className="gift-recommend-list" style={{"width": "90%"}}>
                        <p>{CATEGORY_DATA[data.category]?.name} 카테고리에서 가장 많이 주고받은 선물</p>
                        <div className="gift-only-list" style={{'display' : 'flex'}}>
                            {props.giftList.slice(0, 4).map((gift: any, i:number) => (
                                <GiftItem key={i} gift={gift} />
                            ))}
                        </div>
                    </div>
            ) 
        }
    return(
        <div className="concon">
            <div className="gift-item-detail-container">
                <div className="go-back" onClick={()=>(window.location.href='/gifthub')}><p>상품 목록으로</p></div>
                <div className="product-info">
                    <img className="product-img" src={data.repImg} alt="" /> 
                    <div className="product-info-right">
                        <div className="product-cate-like">
                            <p>{CATEGORY_DATA[data.category].name}</p>
                            {data.likeCount !== 0 &&
                            
                            <h3><span>|</span>관심고객수{data.likeCount}</h3>
                            }
                        </div>
                        <div className="product-name-like">
                            <p>{data.name}</p>
                            
                        </div>
                        <div className="product-price-option">
                            <p className="product-price">₩ {data.price.toLocaleString('ko-KR') }</p>
                        </div>
                        <div>
                        {data.options.length > 0 && 
                            <div className="product-option">
                                <div>{data.options[0].title}</div>
                            </div>
                        }
                            <div className="make-wish" onClick={()=>{checkHeart()}}>
                                장바구니에 담기
                            </div>
                        </div>

                    </div>
                </div>
                <GiftRecommend giftList={giftList}/>
                <div className="product-image">
                    {data.imgList.map((img:{url:string}, i:number) => {
                        if(i===0){return <img src={img.url} alt="" />}
                        else if(i!==0 &&showMore){return <img src={img.url} alt="" />}
                    })}
                    {
                        data.imgList.length > 1 &&
                        <div className='more-img' >
                            <button className="more-img-btn" onClick={()=>setShowMore(!showMore)}>
                                {showMore? '상세이미지 닫기' : '상세이미지 더보기'}
                            </button>
                        </div>

                    }

                </div>
            </div>
        </div>
    )
}