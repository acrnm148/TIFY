import "../css/makeWishPage.styles.css"
import "../css/styles.css"
import addHeart from "../assets/addHeart.svg";
import React, { Component, useState } from 'react';

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {DateRange} from "react-date-range";
import {addDays} from "date-fns";
import moment from 'moment'; //현재(한국)시간 불러오기
import { ko } from 'date-fns/esm/locale'; // 한국어 불러오기

import Postcode from "../components/Post"
export function MakeWishPage() {
  // declare {Post}: Component;

  const formList = ['제목', '내용']
  const wishOption = ['생일', '결혼', '입학', '졸업','출산', '독립', '비혼', '건강']
  
  // calendar 
  const [range, setRange] = useState<any[]>([
    {
      endDate: addDays(new Date(), 0),
      key: "selection",
      startDate : new Date(),
    },
  ])
  const now = new Date()
  const disableDates = new Date(now.setMonth(now.getMonth()+3)) //위시 기간 최대 3개월
  const duration = Math.abs((range[0].endDate - range[0].startDate) / (1000 * 60 * 60 * 24))+1
  
  const zero = (num: string | number) => num < 10 && num >= 0 ? "0" + num : num;
  const dateKo = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) => `${date.getFullYear()}년 ${zero(date.getMonth() + 1)}월 ${zero(date.getDate())}일`;
  const startDate = dateKo(range[0].startDate)
  const endDate = dateKo(range[0].endDate)

  // address
  const [enroll_company, setEnroll_company] = useState({ address : '',},)
  const [popup, setPopup] = useState(false);
  const handleInput = (e:any) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]:e.target.value,
    })
  }
  
  return (
      <>
      <div className="page-name-block">
        <div className="page-name" />
        <div className="make-wish-form">
          <div className="input-form input-select">
            <label htmlFor="카테고리">카테고리</label>
            <select name="" id="">
              {wishOption.map(op => (
                <option value={op}>{op}</option>
              ))}
            </select>
          </div>
          {
          formList.map(tag => (
            <FormInput tag={tag}/>
          ))
          }
          
          <div className="duration-container">
            <label htmlFor="">기간</label>
            <h1>위시 진행 기간을 선택해주세요</h1>
            
            <div className="duration-from calendar-container">
            
            <DateRange 
              editableDateInputs={false}
              onChange={item => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              retainEndDateOnFirstSelection={true}
              ranges={range}
              months={2}
              direction="horizontal"
              minDate={moment().add(1,'days').toDate()}
              maxDate={disableDates}
              locale={ko}
              dateDisplayFormat="yyyy년 MM월 dd일"
              />          
            <h1>위시 시작 일 : <span>{startDate}</span></h1>
            <h1>위시 종료 : <span>{endDate}</span></h1>
            <h1>위시 진행 일 : <span>{duration}</span> 일</h1>
            </div>
          </div>
          <div>
            <label htmlFor="">카드</label>
            <div className="wish-card-container">
              <div className="wish-card">
                <div className="wish-card-item">카드</div>
                <div className="wish-card-item">카드</div>
              </div>
              <div>
                <img src={addHeart} alt="" />
              </div>
              
            </div>
          </div>
          <div >
            <label htmlFor="">선물</label>
            <div className="wish-card-container">
              <div className="wish-card">
                <div className="wish-card-gift">선물</div>
                <div className="wish-card-gift">선물</div>
              </div>
              <div>
                <img src={addHeart} alt="" />
              </div>
            </div>
          </div>
          <div className="address-form-container">
            <label htmlFor="태그">주소</label>
            <div className="address-form">
              <input type="text" placeholder="주소"required={true} name="address" onChange={handleInput} value={enroll_company.address} disabled/>
              <Postcode company={enroll_company} setcompany={setEnroll_company}/>
            </div>
          </div>
          <div>
            <label htmlFor="상세주소">상세주소</label>
            <div className="input-form">
              <input type='text' name="상세주소"/>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
export function FormInput(props: {tag:string}): JSX.Element{
  return(
    <div className={`input-form 
      ${props.tag==='내용'? "input-wide" : ''}`}>
        <label htmlFor="태그">{props.tag}</label>
        <input type={`${props.tag==='내용'? "textarea" : "text"}`} name="태그"/>
    </div>
  )
}
