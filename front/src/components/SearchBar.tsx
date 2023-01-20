import "../css/searchBar.styles.css"
import search from "../assets/iconSearch.svg";
export function SearchBar(){
    return(
        <div className="search-bar-container">
            <div className="serach-bar">
            
            <input type="text" placeholder="원하는 선물을 찾아보세요!"/>
            <img src={search} alt="search icon" />
            </div>
        </div>
    );
}