import { GiftHubCategory } from "../components/GiftHubCategory";
import { SearchBar } from "../components/SearchBar";
import search from "../assets/iconSearch.svg";
import { GiftHubList } from "../components/GiftHubList";
import "../css/giftHubPage.styles.css"

export function GiftHubPage() {
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
      <div>
        <GiftHubCategory />
        <SearchBar />
        <div className="filter-bar-container">
          <div className="filter-bar">
            <input type="text" placeholder="가격범위설정"/>
            {/* <img src={} alt="filter icon" /> */}

          </div>
        </div>

        {/* 인기순 높은가격순 낮은가격순 */}
        <div className="gift-sortig" >
          <div>
            <p>인기순</p>
            <p> |</p>
            <p>높은가격순</p>
            <p> |</p>
            <p>낮은가격순</p>
          </div>
        </div>

        <div>
          <GiftHubList giftList={giftList} />
        </div>
      </div>
     

    );
  }
  