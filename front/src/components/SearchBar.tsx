import "../css/searchBar.styles.css"
import search from "../assets/iconSearch.svg";
import { useState } from "react";
// export function SearchBar(){
    
    const SearchBar = (props: { propFunction: (arg0: string) => void; }) => {
        const [query, setQuery] = useState("");
        
        const textChangeHandler : React.ChangeEventHandler<HTMLInputElement> =(e) => {
            setQuery(e.target.value);
        }

        const sumbitQ = () => {
            props.propFunction(query)
            console.log(query, '가 ENTER로 전송되었습니다')
        }

        const handleOnKeyPress = (e) => {
            if (e.key === 'Enter'){
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
                />
                <img onClick={sumbitQ} src={search} alt="search icon" />
                </div>
            </div>
        );
    }
// }

export default SearchBar