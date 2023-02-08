import React, { useState } from "react";

export interface Order {
	createdDate: string;
	modifiedDate: string;
	id: number;
	user: User;
	gift: string;
	tel: string;
	gatheredPrice: number;
	orderPrice: number;
	deliveryNumber: string;
	state: number;
}

export interface ThkcardList {
	id: number;
	title: string;
	phoneNumber: string;
	content: string;
	imageUrl: string;
	pay: string;
}

export interface PayList {
	pay_id: number;
	amount: string;
	celeb_img_url: string;
	celeb_from: string;
	celeb_tel: string;
	celeb_content: string;
	pay_type: string;
	user_id: number;
	createTime: string;
	order: Order;
	thkcardList: ThkcardList[];
}

export interface GiftOption {
	giftOptId: number;
	gift: string; // 수정가능
	giftOpt: string; // 수정가능
}

export interface GiftItem {
	id: string;
	productId: number;
	quantity: number; // 수정가능
	userOption: string; // 수정가능
	giftname: string; // 수정가능
	type: string; // 수정가능
	finishYN: string; // 수정가능
	maxAmount: number; // 수정가능 -> pure 결정시 자동 결정 1.05배
	purePrice: number; // 수정가능
	gathered: number; // pay 기준 계산, read only
	successYN: string; // 수정가능
	idx: number; // 수정가능
	finishDate: string; // 수정가능
	giftImgUrl: string; // 수정가능
	giftUrl: string; // 수정가능
	// payList: PayList[]; 수정 불가 노필요
	giftOptions: Array<GiftOption>; // 수정가능
}
 
export interface User {
	id: number;
	userid: string;
	password: string;
	roles: string;
	provider: string;
	nickname: string;
	profileImg: string;
	username: string;
	birth: string;
	email: string;
	tel: string;
	addr1: string;
	addr2: string;
	zipcode: string;
	birthYear: string;
	gender: string;
	emailAuth: boolean;
	createTime: string;
	roleList: Array<String>;
}

export interface Wish {
	id?: number;
	giftItems?: Array<GiftItem>;// 수정가능
	user?: User;
	totPrice?: number; // 수정-> giftItems로 계산.
	nowPrice?: number;
	title?: string; // 수정가능
	content?: string; // 수정가능
	joinCount?: number;
	finishYN?: string; // 수정가능
	createDate?: string;
	startDate?: string;
	endDate?: string; // 수정가능
	cardImageCode?: string; // 수정가능
	addr1?: string; // 수정가능
	addr2?: string; // 수정가능
	zipCode?: string; // 수정가능
	cardopen?: string;
	category?: string; // 수정가능
}