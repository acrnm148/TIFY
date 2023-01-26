import "../css/searchBar.styles.css"
import search from "../assets/iconSearch.svg";
import { useState } from "react";
export function SearchBar(){
    const [query, setQuery] = useState("");
    const textChangeHandler : React.ChangeEventHandler<HTMLInputElement> =(e) => {
        setQuery(e.target.value);
    }
    return(
        <div className="search-bar-container">
            <div className="serach-bar">
            
            <input 
                type="text" 
                onChange={textChangeHandler} 
                placeholder="원하는 선물을 찾아보세요!"
            />
            <img src={search} alt="search icon" />
            </div>
        </div>
    );
}