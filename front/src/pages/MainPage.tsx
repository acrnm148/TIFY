import phone from "../assets/phone.svg"
import { GiftHubCategory } from "../components/GiftHubCategory";
import { GiftRecommendList } from "../components/GiftRecommendList";
import {SearchBar} from "../components/SearchBar";
import "../css/mainPage.styles.css"

export function MainPage() {
    const giftList =[
        {
          name : "삼성비스포크1",
          price : 100000 
        },
        {
          name : "삼성비스포크2",
          price : 200000 
        },
        {
          name : "삼성비스포크3",
          price : 300000 
        },
      ]
    return (
        <div className="main-container">
            <div className="main-components">
                <div className="catch-prase">
                    <h1>티피에서</h1>
                    <h1>원하는 선물로</h1>
                    <h1>축하를 주고받아 보세요!</h1>
                    <div>
                        <button>위시만들기</button>
                    </div>
                    
                </div>
                <div className="phone-video">
                    <img src={ phone } className="phone-image" alt="phone image" />
                </div>
            </div>
            <div>
                <GiftHubCategory />
                <SearchBar />
                <GiftRecommendList giftList={giftList}/>
            </div>
            
        </div>
        
    );
}
  