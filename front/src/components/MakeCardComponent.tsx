import { Dictionary } from "@reduxjs/toolkit";
import axios from "axios";
import { urlencoded } from "express";
import { useCallback, useMemo, useRef, useState } from "react";
import imageCompression from 'browser-image-compression';

type UploadImage = {
  file : File;
  thumbnail : string;
  type : string;
}
const MakeCardComponent=(cardData:Dictionary<string>, setCardData:Dictionary<string>, phone:string, disable:boolean, card:string, cardEng:string) =>{
      // 사진 업로드하는 html 버튼에 직접 접근해서 값을 가져오는 inputRef
      const inputRef = useRef<HTMLInputElement | null>(null);
      const API_HOST = ''
      const [ cardImage, setCardImage ] = useState<UploadImage | null>(null);
      const onUploadImageButtonClick = useCallback(() => {
        // inputRef.current html객체(input) 클릭 
          inputRef.current?.click();
        }, []);
      
      const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let fileUrl = ''
        if (!e.target.files) {
          return;
        }
        const fileList = e.target.files[0];

        let img = new Image()
        img.src = e.target.value;
        let width = img.width;
        let height = img.height;
        alert(width + height);

        // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
        const options = { 
          maxSizeMB: 500, 
          maxWidthOrHeight: 1000
        }
        try{
          const compressedFile = await imageCompression(fileList,options);
          // resize된 이미지의 url을 받아 fileUrl에 저장
          const promise = imageCompression.getDataUrlFromFile(compressedFile);
          promise.then(result => {
            fileUrl = result;
            console.log(fileList)
            console.log(fileUrl)
           })
        } catch (err) {
          console.log(err);
        }

        if(fileList && fileList){
          const url = URL.createObjectURL(fileList);
              setCardImage({
                file : fileList,
                thumbnail : url,
                type: fileList.type.slice(0,5), 
            })
          }
      };
      const showImage = useMemo(()=>{
        if(!cardImage && cardImage == null){
          return <p>사진 추가 버튼</p>
        }
        return(
          <div style={{'position':'relative', 'width':'420px', 'height':'150px', 'overflow':'hidden'}}>
            <img style={{"position":'absolute','width':'100%',}} src={cardImage.thumbnail} alt={cardImage.type} onClick={onUploadImageButtonClick} />
          </div>
        )
        
      
      }, [cardImage]);

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
            <div className={`thanks-photo-btn`} onClick={onUploadImageButtonClick}>
              {showImage}
            </div>
          </div>
        </div>
        
      </div>
    )
}
export default MakeCardComponent;