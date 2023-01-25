export interface Gift {
    name : string;
    price : number;
    giftId : number,
}
export interface GiftProps {
    giftList : Gift[];
}