import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {RootState} from "../store/main"
export function GiftHubDetailPage(){
    const state = useSelector((state:RootState) =>state);

    let {giftId} = useParams();
    console.log(giftId,'===============');
    // console.log(state.gift)
    return(
        <>
        <h1><span>{giftId}</span>번 상품의 디테일페이지입니다.</h1>
        </>
    )
}
