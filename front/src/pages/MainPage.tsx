import axios, { AxiosPromise } from 'axios';
import { useEffect, useState } from 'react';
import phone from '../assets/main/티피폰.svg';
import GiftHubCategory from '../components/GiftHubCategory';
import { GiftRecommend, GiftRecommendList } from '../components/GiftRecommendList';
import  SearchBar  from '../components/SearchBar';
import '../css/mainPage.styles.css';
import '../css/styles.css';

// scroll animation
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import TIFYphone from "../assets/main/TIFYphone.svg"
import 마음을모아 from "../assets/main/마음을모아.svg"
import { Footer } from '../fixture/Footer';

export function MainPage() {
  let [giftList, setGiftList] = useState<Array<any>>([]);
  
  // scroll animation
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move());

  useEffect(() => {
    async function fetchdata() {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/main';
      axios.get(API_URL
        ).then((r) => { 
          console.log(r)
          let copy:Array<any> = [...r.data];
          setGiftList(copy)
        }).catch((r) => { console.log(r)}
        )}
    fetchdata();
  },[]);

  const propFunction = (x:number) =>{
    console.log('부모컴포넌트에서받음', x)
  }
  function getQuery(arg0: string): void {
    throw new Error('Function not implemented.');
  }

      // <div className="main-container">
      //   <div className="main-components">
      //     <CatchPrase />
      //     <div className="phone-video">
      //       <img src={phone} className="phone-image" alt="phone image" />
      //     </div>
      //   </div>
      //   <div>
      //     <GiftHubCategory propFunction={propFunction} goCategory={undefined}/>
      //     <SearchBar propFunction={getQuery} initailQuery={''}/>
      //     {/* <GiftRecommendList giftList={giftList} /> */}
      //   </div>
      // </div>
  return (
    <div>

  <ScrollContainer>
  <ScrollPage style={{height : "auto"}}>
      <Animator animation={FadeUp} >
      <div className="main-components" style={{display: "flex", justifyContent: "center", alignItems: "center" }} >
          {/* <Animator animation={MoveIn(-500, 0)}><CatchPrase /></Animator> */}
            <img src={phone} className="phone-image" alt="phone image" />
            <img src={마음을모아} alt="" />
         </div>
      </Animator>
      <Animator animation={batch( MoveOut(0, -200))} style={{display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", width:"100vw"}}>
          
      </Animator>
    </ScrollPage>
    <ScrollPage style={{display: "flex", flexDirection: "column",justifyContent: "center", alignItems:"center"}}>
      <Animator animation={FadeUp} >
        {/* <span style={{ fontSize: "40px" }}>I'm FadeUp ⛅️</span> */}
        <div >
          <Animator animation={MoveIn(-100, 0)}  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
          </Animator>
          {/* <Animator animation={MoveIn(0, 100)}  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
          </Animator> */} 
         </div>
      </Animator>
        <h1 style={{fontSize:"40px"}}>GiftHub<span style={{ fontSize: "20px" }}>더보기🎁</span></h1>
    </ScrollPage>
    {/* <ScrollPage>
      <Animator animation={FadeUp} >
        <div >
           <SearchBar propFunction={getQuery} initailQuery={''}/>
          <Animator animation={MoveIn(-500, 0)}  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
          </Animator>
          <Animator animation={MoveIn(0, 500)}  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
          </Animator>
           
         </div>
      </Animator>
    </ScrollPage> */}
    <ScrollPage>
      <Animator  animation={FadeUp} style={{display: "flex", justifyContent: "center", alignItems: "center" }} >
        <div style={{ fontSize: "18px", height:"50%" }}>
          <Animator animation={batch(MoveIn(-500, 0), FadeOut())}>“이번에는 무슨 선물해야 하지?” 👋🏻</Animator>
          <Animator animation={batch(MoveIn(500, 0), FadeOut())}>“뭘 좋아할 지 모르겠네...” 🙋🏻‍♀️</Animator>
          <span style={{ fontSize: "40px" }}>티피와 함께💛</span>
          <Animator animation={batch(MoveOut(500, 0), FadeOut())}>고민은 그만 </Animator>
          <Animator animation={batch(MoveOut(-500, 0), FadeOut())}>Good bye ✋🏻</Animator>
        </div>
        <div>
          {/* <Animator animation={batch(FadeIn(0, -200), Sticky())}><img src={} alt="" /></Animator> */}
        </div>
      
      </Animator>
    </ScrollPage>
    <ScrollPage>
      <div >
        <Animator animation={batch(FadeIn(0, -200), Sticky())} style={{ backgroundColor:"#FF7062" ,display: "flex" , justifyContent: "center", alignItems: "center", height: "100vh", width:"100vw"}}>
        <div className=''>
          <img src={TIFYphone} alt="" />
        </div>
        <div className=''>
          <h1>make your wish</h1>
          <p>당신만의 위시를 만들어보세요.</p>
          <p>꼭 받고 싶은 선물을 담아보세요.</p>
        </div>
        </Animator>
      </div>
    </ScrollPage>
    <ScrollPage>
      <Animator animation={batch(FadeIn(0, -200))}  style={{ backgroundColor:"#FF7062" ,display: "flex" , justifyContent: "center", alignItems: "center", height: "100vh", width:"100vw"}}>
        <span style={{ fontSize: "40px" }}>Done</span>
        <br/>
        <span style={{ fontSize: "30px" }}>
          RRR
        </span>
      </Animator>
    </ScrollPage>
  </ScrollContainer>

    </div>
  );
}
function CatchPrase() {
  return (
    <div className="catch-prase">
      <h1>티피에서</h1>
      <h1>원하는 선물로</h1>
      <h1>축하를 주고받아 보세요!</h1>
      <div>
        <button className="gradient-button">위시만들기</button>
      </div>
    </div>
  );
}