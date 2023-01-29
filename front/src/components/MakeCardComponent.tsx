import { Dictionary } from "@reduxjs/toolkit";
import axios from "axios";
import { useCallback, useRef } from "react";

const MakeCardComponent=(cardData:Dictionary<string>, setCardData:Dictionary<string>, phone:string, disable:boolean, card:string, cardEng:string) =>{
      const inputRef = useRef<HTMLInputElement | null>(null);
      const API_HOST = ''
      const onUploadImageButtonClick = useCallback(() => {
          if (!inputRef.current) {
            return;
          }
          inputRef.current.click();
        }, []);
      
        const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) {
            return;
          }
      
          const formData = new FormData();
          formData.append('image', e.target.files[0]);
      
          axios({
            baseURL: API_HOST,
            url: '/images/:username/thumbnail',
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }, []);
    function setTitle(e:any){
      setCardData = {title:e.target.value}
    }
    function setPhone(e:any){
      setCardData = {phone:e.target.value}
    }
    function setMessage(e:any){
      setCardData = {contents:e.target.value}
    }
    return(
        <div className='thanks-card-container'>
        <div className='thanks-card'>
          <div className='thanks-input'>
            <label htmlFor="제목">{card === '축하'? '보내는 사람' : '제목'}</label>
            <input className='input-small'type="text" name='제목' onKeyUp={setTitle}/>
          </div>
          <div className='thanks-input'>
            <label htmlFor="연락처">연락처</label>
            <input className='input-small'type="text" name='연락처' onKeyUp={setPhone} placeholder={phone} disabled={disable}/>
          </div>
          <div  className='thanks-input'>
            <label htmlFor="내용">{card}메세지</label>
            <textarea name="내용" id=""onKeyUp={setMessage} placeholder='카드 내용을 입력하세요'></textarea>
          </div>
          <div className='thanks-input'>
            <label htmlFor="">사진</label>
            <input className='img-input' type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} name="thumbnail"/>
            <div className={`${cardEng}-photo-btn`} onClick={onUploadImageButtonClick}>
              <h1>+</h1>
            </div>
          </div>
        </div>
        
      </div>
    )
}
export default MakeCardComponent;