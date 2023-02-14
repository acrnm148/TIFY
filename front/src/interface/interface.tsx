export interface Gift {
  name: string;
  price: number;
  giftId: number;
  repImg: string;
  id: number;
  optionTitle: string;
  options: string[];
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
  length: number;
  giftList: Gift[];
}
export interface Paying {
  amount: number; // api요청시에는 string.!!!
  payType: string;
  celebFrom: string;
  celebTel: string;
  celebContent: string;
  celebImgUrl: string;
  giftId: number;
  userId: number;
}

export interface Wish {
  giftItems: Gift[];
  totalPrice: number;
  wishTitle: string;
  wishConten: string;
  category: number;
  startDate: string;
  endDate: string;
  wishCard: string; //string
  addr1: string;
  addr2: string;
}

export interface CheckWish {
  wishId: string;
  userName: string;
  title: string;
  category: string;
  restDay: string;
  percent: number;
  fromList: string[];
  fromId: number;
  cardOpen: string;
}

export interface MyWishType {
  wishId: string;
  userName: string;
  title: string;
  category: string;
  restDay: number;
  percent: number;
  fromList: string[];
  fromId: number;
  cardOpen: string;
  payImgs: string[];
}
