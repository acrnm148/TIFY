import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import Swal from "sweetalert2";

type UploadImage = {
  file: File;
  thumbnail: string;
  type: string;
};
const MakeCardComponent = (props:{phone: string,payId:string|undefined, userId:number|string|undefined, propFunction:(arg0:boolean)=>void,}) => {
  // 사진 업로드하는 html 버튼에 직접 접근해서 값을 가져오는 inputRef
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>()
  const [contents, setContents] = useState<string>()
  const [iphone, setPhone] = useState<string>(props.phone)
  const [image, setImage] = useState<string>()

  const onUploadImageButtonClick = useCallback(() => {
    // inputRef.current html객체(input) 클릭
    inputRef.current?.click();
  }, []);

  const onUploadImage = async (e: any) => {
    const formData = new FormData();
    const sizeLimit = 300*10000
    // 300만 byte 넘으면 경고문구 출력
    if (e.target.files[0].size > sizeLimit){
      Swal.fire({text: '사진 크기가 3MB를 넘을 수 없습니다.'})
    } else{
      if (e.target.files[0]) {
        formData.append('file', e.target.files[0] ); // 파일 상태 업데이트
      }
      // imgFile 을 보내서 S3에 저장된 url받기
      const getImgUrl = async () => {
        const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
        await axios
          .post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((con) => {
            console.log('이미지주소불러오기 성공', con.data);
            setImage(con.data);
          })
          .catch((err) => {
            console.log('이미지주소불러오기 실패', err);
          });
      };
      getImgUrl();
    }
    
  };

  function setTitleFunc(e: any) {
    setTitle(e.target.value) ;
  }
  function setPhoneFunc(e: any) {
    setPhone(e.target.value) ;
  }
  function setMessageFunc(e: any) {
    setContents(e.target.value) ;
  }

  const thkGo = () =>{
    // form 유효성검사
    let result;
    if(!title){
      result = confirm('제목을 작성하지 않으셨군요')
      if (!result){
        return
      }
    }
    if(!iphone){
      setPhone(props.phone)
    }
    if(!contents){
      Swal.fire('감사메세지가 비어있습니다.')
      return
    }
    console.log('감사 보내자')
    const API_URL = 'https://i8e208.p.ssafy.io/api/thkcards'
    const data = {
      "title":title,
      "phoneNumber":iphone,
      "content":contents,
      "imageURL":image,
      "userId":Number(props.userId),
      "payId":Number(props.payId)
    }
    axios.post(API_URL, data
      ).then((res) =>{
        console.log('감사메세지 보내기 성공!!!', res)
        Swal.fire("감사카드가 <br/>연락처로 <br/>문자 전송될 예정")
        props.propFunction(true)
      }).catch((err) => {
        console.log('감사메세지 보내기 실패', err)
      })

  }
  const inputChange=useCallback((e:any) =>{
    const value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    setPhone(value)
  }, [])
  return (
    <div className="thanks-card-container">
      <div className="thanks-card">
        <div className="thanks-input">
          <label htmlFor="제목">
            제목
          </label>
          <input
            className="input-small"
            type="text"
            name="제목"
            onKeyUp={(e)=>setTitleFunc(e)}
          />
        </div>
        <div className="thanks-input">
          <label htmlFor="연락처">연락처</label>
          <input
            className="input-small"
            type="text"
            name="연락처"
            onChange={inputChange}
            value={iphone?iphone:props.phone}
          />
        </div>
        <div className="thanks-input">
          <label htmlFor="내용">감사메세지</label>
          <textarea
            name="내용"
            id=""
            onKeyUp={(e)=>setMessageFunc(e)}
            placeholder="카드 내용을 입력하세요"
          ></textarea>
        </div>
        <div className="thanks-input" style={{"backgroundImage":`url(${image})`}}>
          <label htmlFor="">사진</label>
          <input
            className="img-input"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onUploadImage}
            name="thumbnail"
          />
          <div
            className={`thanks-photo-btn`}
            onClick={onUploadImageButtonClick}
          >
          </div>
        </div>
      </div>
      <div className='thanks-input'>
            <div className='thanks-form-btn' onClick={()=>thkGo()}>감사보내기</div>
        </div>
    </div>
  );
};
export default MakeCardComponent;
