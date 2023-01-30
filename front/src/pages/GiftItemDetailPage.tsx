import { useParams } from "react-router";

export default function GiftItemDetailPage(){
    let {giftId} = useParams();
    return(
        <>
            <h1> {giftId}번 상품의 디테일페이지</h1>
        </>
    )
}