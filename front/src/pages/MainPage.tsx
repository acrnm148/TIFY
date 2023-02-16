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
import tifyou from "../assets/main/tifyou.svg"
import cardPreview from "../assets/main/cardPreview.svg"

import { NavLink } from 'react-router-dom';
import {Footer} from '../fixture/Footer'
import { width } from '@mui/system';
export function MainPage() {
  let [giftList, setGiftList] = useState<Array<any>>([]);
  
  // scroll animation
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move());

  useEffect(() => {
    async function fetchdata() {
      const API_URL = 'https://i8e208.p.ssafy.io/api/gifthub/main';//http://localhost:8081/api/gifthub/main
      axios.get(API_URL
        ).then((r) => { 
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
                 <img src={phone} className="phone-image" alt="phone image" />
                 <img src={마음을모아} alt="" />
             </div>
           </Animator>
         </ScrollPage>
        <ScrollPage style={{display: "flex", flexDirection: "column",justifyContent: "center", alignItems:"center", height:"auto"}}>
          {/* <Animator animation={FadeUp}> */}
             <Animator animation={MoveIn(-50, 0)} >
               <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
             </Animator>
             <Animator animation={MoveIn(0, 200)} >
               <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
             </Animator> 
             <NavLink to={'/gifthub'} className="main-navlink"><h1 style={{fontSize:"40px"}}>GiftHub<span style={{ fontSize: "20px" }}>더보기🎁</span></h1></NavLink>

          {/* </Animator> */}
        </ScrollPage>
        <div style={{height:"5px"}}></div>
        <ScrollPage style={{width:"100%", paddingLeft:"20%",paddingRight:"20%", height:"1218px"}}>
          <div className='messages-con' style={{width:"100%" }}>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", fontSize: "40px", flexDirection:'column',width:"100%"}} >
                <Animator className="gomin" animation={MoveIn(-500, 0)}>
                  <div>이번에는 무슨 선물해야 하지?</div>
                </Animator>
                <Animator className="gomin" animation={MoveIn(-200, 0)}>
                  <div>뭘 좋아할 지 모르겠네...” 🙋🏻‍♀️</div>
                </Animator>

            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", fontSize: "40px",width:"100%", flexDirection:'column'}} >
                <Animator className="gomin gomin-right" animation={MoveIn(500, 0)}>
                  <div>기프티콘 선물은 이제 그만..</div>
                </Animator>
                <Animator className="gomin  gomin-right" animation={MoveIn(200, 0)}>
                  <div>내가 갖고싶은걸 어떻게 말하지?</div>
                </Animator>
            </div>
          </div>
        </ScrollPage>
        <div style={{height:"5px"}}></div>
        <ScrollPage 
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div className="no-gomin" style={{fontSize: "40px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <span style={{ fontSize: "32px" }}>TIFY와 함께하세요</span>
                <img src={tifyou} alt="" />
              </div>
        </ScrollPage>
        <ScrollPage style={{height:"1000px", display:"flex", alignItems:"center"}}>
          <div className='make-your-wish' style={{height:"1000px", display:"flex", alignItems:"center"}}>
                <div  className="wish-preview" style={{backgroundImage:`url(${TIFYphone})`}} >
                    <img src={cardPreview} alt="" />
                </div>
              <div className='myw-text'>
                <h1>Make Your Wish</h1>
                <p>당신만의 위시를 만들어보세요</p>
                <p>꼭 받고 싶은 선물을 담아보세요</p>
              </div>
          </div>
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

// <ScrollContainer>
//       <ScrollPage style={{height : "auto"}}>
//           <Animator animation={FadeUp} >
//           <div className="main-components" style={{display: "flex", justifyContent: "center", alignItems: "center" }} >
//                 <img src={phone} className="phone-image" alt="phone image" />
//                 <img src={마음을모아} alt="" />
//             </div>
//           </Animator>
//         </ScrollPage>
//         <ScrollPage style={{display: "flex", flexDirection: "column",justifyContent: "center", alignItems:"center", height:"auto"}}>
//             <Animator animation={MoveIn(-50, 0)} >
//               <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
//             </Animator>
//             <Animator animation={MoveIn(0, 200)} >
//               <GiftRecommend giftList={giftList} wish='' num = {Math.random()  * (giftList.length-3)}/>
//             </Animator> 
//             <NavLink to={'/gifthub'} className="main-navlink"><h1 style={{fontSize:"40px"}}>GiftHub<span style={{ fontSize: "20px" }}>더보기🎁</span></h1></NavLink>

//         </ScrollPage>
//         <ScrollPage>
//             <div style={{fontSize: "40px", display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center", height: "100%" }} >
//                   <Animator className="gomin" animation={MoveIn(-500, -200)}><div>“이번에는 무슨 선물해야 하지?” 👋🏻</div></Animator>
//                   <Animator className="gomin gomin-right" animation={MoveIn(500, 200)}><div>“뭘 좋아할 지 모르겠네...” 🙋🏻‍♀️</div></Animator>
//             </div>
//         </ScrollPage>  
//         {/* <ScrollPage>
//           <Animator animation={FadeUp}>
//             <span style={{ fontSize: "40px" }}>I'm FadeUp ⛅️</span>
//           </Animator>
//           <div className="no-gomin" style={{fontSize: "40px", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
//             <Animator animation={Fade()} className="no-gomin">
//               <div className="no-gomin" style={{fontSize: "40px", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
//                 <span style={{ fontSize: "40px" }}>티피와 함께💛</span>
//                 <img src={tifyou} alt="" />
//               </div>
//             </Animator>  
//           </div>
//         </ScrollPage> */}
//         <ScrollPage>
//           <div >
//             <Animator animation={batch(FadeIn(0, -200), Sticky())} style={{ backgroundColor:"#FF7062" ,display: "flex" , justifyContent: "center", alignItems: "center", height: "100%"}}>
//             <div className=''>
//               <img src={TIFYphone} alt="" />
//             </div>
//             <div className=''>
//               <h1>make your wish</h1>
//               <p>당신만의 위시를 만들어보세요.</p>
//               <p>꼭 받고 싶은 선물을 담아보세요.</p>
//             </div>
//             </Animator>
//           </div>
//         </ScrollPage>
//         <ScrollPage>
//           <Animator animation={batch(FadeIn(0, -200))}  style={{ backgroundColor:"#FF7062" ,display: "flex" , justifyContent: "center", alignItems: "center", height: "100vh"}}>
//             <span style={{ fontSize: "40px" }}>Done</span>
//             <br/>
//             <span style={{ fontSize: "30px" }}>
//               RRR
//             </span>
//           </Animator>
//         </ScrollPage>
//         <Footer />
//       </ScrollContainer>
