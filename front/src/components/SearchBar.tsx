import "../css/searchBar.styles.css"
import search from "../assets/iconSearch.svg";
import { useState } from "react";    
const SearchBar = (props: { initailQuery:string, propFunction: (arg0: string) => void}) => {
    // 검색어 입력했을 때 부모 컴포넌트에서 리랜더링 되기때문에 검색바의 쿼리도 재설정되었었는데 초기값을 prop받아서 유지하도록함..대박
    // 이전 : const [query, setQuery] = useState("");
    const [query, setQuery] = useState(props.initailQuery);
    
    const textChangeHandler : React.ChangeEventHandler<HTMLInputElement> =(e) => {
        setQuery(e.target.value);
    }

    const sumbitQ = () => {
        props.propFunction(query)
    }

    const handleOnKeyPress = (e:any) => {
        
        if (e.key === 'Enter'){
            e.preventDefault()
            sumbitQ()
        }
    }
    return(
        <div className="search-bar-container">
            <div className="serach-bar">
            <input 
                type="text" 
                onChange={textChangeHandler} 
                onKeyUp={handleOnKeyPress}
                placeholder="원하는 선물을 찾아보세요!"
                value={query}
            />
            <img onClick={sumbitQ} src={search} alt="search icon" />
            </div>
        </div>
    );
}

export default SearchBar