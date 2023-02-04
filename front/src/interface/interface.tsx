export interface Gift {
  name: string;
  price: number;
  giftId: number;
  repImg : string;
  id : number;
  options : string[];
  imgList : {url : string}[];
}
export interface GiftList {
  product_id: number;
  category_id: number;
  description: string;
  like_count: number;
  product_name: string;
  price: number;
  quantity: number;
  rep_img: string;
}
export interface GiftProps {
  giftList: Gift[];
}
export interface Paying{
  amount : number, // api요청시에는 string.!!!
  payType : string,
  celebFrom : string,
  celebTel : string,
  celebContent : string,
  celebImgUrl : string,
  giftId : number,
  userId : number,
  // 결제 시 표출정보
  giftName : string,
}