export interface Gift {
  name: string;
  price: number;
  giftId: number;
  repImg : string;
  id : number;
  options : string[];
  imgList : [{url : string}];
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
