import {ClassAttributes, HTMLAttributes, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState} from "react";
import { NavLink } from "react-router-dom";
import "../css/styles.css"
import "../css/checkWishPage.styles.css"
import gift from "../assets/iconGift.svg"
import { List } from "reselect/es/types";

// slider
import ReactSlider from "react-slider";
import 'rc-slider/assets/index.css';


// [TODO] wish정보 props로 받아서 표출 
const wishTitle = '졸업해버렸습니다'
const wishCategory = '졸업'
const wishDday = 34
const wishAchieved=33
const wishId = 1

export function CheckWishPage() {
  const [isWish, setIsWish] = useState<Boolean>(false)
  const [wishGoing, setWishGoing] = useState<Boolean>(true)
  const [username, setUsername] = useState<string>('ssafy')
  const [congratsList, setCongratsList] = useState<List>([
    {
      from : '성현이',
      to : username,
      id : 1
    },
    {
      from : '지현이',
      to : username,
      id : 2
    },
    {
      from : '기한이',
      to : username,
      id : 3,
    },
    {
      from : '상훈이',
      to : username,
      id : 4,
    },
    {
      from : '영일이',
      to : username,
      id : 5,
    },
    {
      from : '수나',
      to : username,
      id : 6,
    },
  ])
  
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
  const CongratCardList = () =>{

    return(
      <>
        <div className="congrat-card-container">
          {wishGoing? <WishOpened /> : <WishOnGoing wishTitle={wishTitle} wishCategory={wishCategory} wishDday={wishDday} wishAchieved={wishAchieved} wishId={wishId}/>}
          <div className="congrat-card-list">
            {congratsList.map((c, i:number) =>(
              // to={`/thanks/${wishId}/${c.id}`}
              <NavLink to={`/thanks/${wishId}/${c.id}`}>
                <CongratCard key={i} from={c.from} to={c.to} />
              </NavLink>
            ))}
          </div>
        </div>
      </>
    )
  }
  const WishOpened = () => {
    return(
      <div className="wish-open">
        위시 오픈 애니메이션
      </div>
    )
  }
  const WishOnGoing = (props:{wishTitle:string, wishCategory:string, wishDday:number, wishAchieved:number, wishId:number}) => {
    // const left = {left : {props.wishAchieved}}
    return(
      <NavLink to={`/congrats/${wishId}`} className="wish-on-going-background" >
        <div className="wish-on-going-box">
          <h3 className="font-lg">{username}님의 {props.wishCategory}위시</h3>
          <p className="font-xl">"{props.wishTitle}"</p>
          <p  className="font-lg">{props.wishDday}일 뒤 축하편지를 확인하세요</p>
          <div className="slider-and-label-container">
            {/* <h3 style={left}>{props.wishAchieved}</h3> */}
            <div className="slider-and-label">
              <span>진행도</span>
              <ReactSlider
                className="horizontal-slider"
                defaultValue={[props.wishAchieved]}
                disabled={true}
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderTrack={(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>, state: any) => <div {...props} />}//custom track
            />
            </div>
          </div>
        </div>
      </NavLink>
    )
  }
  const IsWishLayout = () =>{
    return(
      <div className="is-wish-layout">
        <button className="temp-button" onClick={()=>(setWishGoing(!wishGoing))}>{wishGoing?'위시완료':'위시진행중'}</button>
        <CongratCardList />
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
