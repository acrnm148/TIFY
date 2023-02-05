import {ClassAttributes, HTMLAttributes, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css"
import "../css/checkWishPage.styles.css"
import gift from "../assets/iconGift.svg"
import { Bool, List } from "reselect/es/types";

// slider
import ReactSlider from "react-slider";
import 'rc-slider/assets/index.css';
import axios from "axios";
// user
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import { CheckWish } from "../interface/interface";

// [TODO] wish정보 props로 받아서 표출 
const wishTitle = '졸업해버렸습니다'
const wishCategory = '졸업'
const wishDday = 34
const wishAchieved=33
const wishId = 1

export function CheckWishPage() {
  const [userId, setUserId] = useState(useSelector((state: RootState) => state.authToken.userId))
  const [isWish, setIsWish] = useState<Boolean>(false)
  const [wishGoing, setWishGoing] = useState<Boolean>(true)
  const [conList, setConList] = useState<Array<CheckWish>>([])
  const [goOpenList, setGoOpenList] = useState<Array<CheckWish>>([])
  const [ setLsts, setSetLsts ] = useState<Boolean>(false)
  
  useEffect(()=>{
    const API_URL = `https://i8e208.p.ssafy.io/api/wish/wish/${userId}`;
    axios.get(API_URL, userId
      ).then((res)=>{
        console.log('유저의 위시정보 get', res.data)
        // nList = res.data.finishYN이 N이고 감사카드까지 모두 작성한??? 위시리스트
        // 1. nList가 빈값일 때 진행중인 위시가 없습니다
        // 2. nList를 checkWishPage 에 표출
        // 2-1. nList 진행중인 위시
        // 2-2. nList 완료되었고 축하카드를 확인하지 않은 위시
        if (res.data.length > 0){
          setIsWish(true)
          res.data.map((e:any)=>{
            // 1. 날짜 종료여부 확인
            if(e.finishYN === 1){
              // a. 완료된 리스트에서 금액 달성과 카드를 아직 안열어봤다면 => goOpenList
              if (e.totPrice <= e.nowPrice && e.cardOpen !== 1){
                alert('완료되었는데 아직 카드를 안열어본 리스트 아고복잡해ㅋㅋㅋㅋ')
                // 여기서는 percent를 -1로 
              }       
            } else {
              // b. conList => 진행중인 위시
              // conList.percent => nowPrice에서 totPrice가 몇퍼센트인지 
              // conList.restDay => 남은 일수
              let diff = new Date(e.endDate).getTime() - new Date().getTime();
              setConList([...conList,{
                wishId : e.id,
                userName : e.user.username,
                title : e.title,
                category : e.category,
                restDay : String(Math.floor((diff) / (1000*60*60*24))), // 오늘 날짜랑 계산해서 몇일남았는지
                percent : (e.nowPrice % e.totPrice)*100,
                fromList : e.payList, // payList어떻게 생겼는지 모름...!!!!!!! 
                fromId : 1 // payList어떻게 생겼는지 모름...!!!!!!! 
              }])
            }
          })

      }
      }).catch((err)=>{
        console.log('유저의 위시정보 불러오지못함')
      })
  },[])

  const CongratCard = (props: { from: string, to:string }) =>{
    return(
      <div className="congrat-card-cover">
        <div className="congrat-card">
          <div className="congrat-card-from">
            <p>from : {props.from}</p>  
          </div>
          <div className="congrat-card-to">
            <p>to : {props.to}</p>
          </div>
        </div>
      </div>
    )
  }
  const CongratsCards = (props:{fromList:string[], fromId : number, userName:string}) =>{
    return(
      <div className="congrat-card-list">
      {/* {props.fromList.map((from, i:number) =>(
        <NavLink to={`/thanks/${wishId}/${props.fromId}`}>
          <CongratCard key={i} from={from} to={props.userName} />
        </NavLink>
      ))} */}
    </div>
    )
  }
  const CongratCardList = () =>{

    return(
      <>{
        <div className="congrat-card-container">
          {/* <WishOpened goOpenList={...goOpenList}/> */}
          <WishOnGoing conList={[...conList]}/>
        </div>
      }
      </>
    )
  }
  const WishOpened = ({ goOpenList } : {goOpenList : CheckWish[]}) => {
    return(
      <>
        {
          goOpenList.map((lst:CheckWish) =>{
            return(
              <div>
                <div className="wish-open">
                  위시 오픈 애니메이션
                </div>
                <CongratsCards fromList={lst.fromList} fromId={lst.fromId} userName={lst.userName}/>
              </div>
            )
          })

        }
      </>
    )
  }
  const WishOnGoing = ({ conList } : {conList : CheckWish[]}) => {
    return(
      <>
        {conList && conList.map((lst:CheckWish)=>{
          return(
            <div>
              <NavLink to={`/congrats/${lst.wishId}`} className="wish-on-going-background" >
                <div className="wish-on-going-box">
                  <h3 className="font-lg">{lst.userName}님의 {lst.category}위시</h3>
                  <p className="font-xl">"{lst.title}"</p>
                  <p  className="font-lg">{lst.restDay}일 뒤 축하편지를 확인하세요</p>
                  <div className="slider-and-label-container">
                    <div className="slider-and-label">
                      <span>진행도</span>
                      <ReactSlider
                        className="horizontal-slider"
                        defaultValue={[lst.percent]}
                        disabled={true}
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderTrack={(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>, state: any) => <div {...props} />}//custom track
                    />
                    </div>
                  </div>
                </div>
              </NavLink>
              <CongratsCards fromList={lst.fromList} fromId={lst.fromId} userName={lst.userName}/>
            </div>
            
          )
        })
        }
      </>
    )
  }
  const IsWishLayout = () =>{
    return(
      <div className="is-wish-layout">
        <WishOnGoing conList={[...conList]}/>
      </div>
      
    )
  }
  const EmptyWishLayout = () =>{
    return(
      // <h1>없다</h1>
      <div className="empty-wish-container">
        <img src={gift} alt="선물아이콘" />
        <h3 className="no-wish">진행중인 위시가 없습니다</h3>
        <NavLink to="/makewish" className="gradient-button make-wish-button">위시 만들기</NavLink>
      </div>
    )
  }
    return(
      <>
      <div className="page-name-block">
        <h1>userid:{userId}</h1>
          <button className="temp-button" onClick={()=>(setIsWish(!isWish))}>{isWish?'위시있음':'위시없음'}</button>
        <div className={isWish?'page-name check-wish':''} />
      </div>
      <div className="check-wish-container">
      {
        isWish ? <IsWishLayout /> : <EmptyWishLayout />
      }
      </div>
      
      </>
    )
  }
