import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/makeWishPage.styles.css"
import addHeart from "../assets/addHeart.svg"
import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
export default function CarouselComponent( props:{propFunction: (arg0: string) => void}) {
    const [imgUrlS3, setImgUrlS3] = useState(addHeart)
    let cardList = [
        imgUrlS3,
        'https://user-images.githubusercontent.com/87971876/216435039-6eb5b4ba-24b6-4305-9274-2b9766fa68a2.jpg',
        'https://user-images.githubusercontent.com/87971876/216435043-77c5fa12-a4ce-4b5a-b767-5e3c012efb9e.jpg',
        'https://user-images.githubusercontent.com/87971876/216435045-ef976fc6-09db-4de6-9f89-c412196b609a.jpg',
        'https://user-images.githubusercontent.com/87971876/216435046-1ef30270-a505-4f79-8f5e-d41eedaeb3ba.jpg',
      ];
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onUploadImageButtonClick = useCallback((i:number) => {
        if(i!==0){
            return
        }
        inputRef.current?.click();
      }, []);
      // 사진 등록
  const handleChangeFile = (event: any) => {
    const formData = new FormData();
    const sizeLimit = 300*10000
    // 300만 byte 넘으면 경고문구 출력
    if (event.target.files[0].size > sizeLimit){
      Swal.fire('사진 크기가 3MB를 넘을 수 없습니다.')
    } else{
      if (event.target.files[0]) {
        formData.append('file', event.target.files[0] ); // 파일 상태 업데이트
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
            setImgUrlS3(con.data);
            props.propFunction(con.data)
          })
          .catch((err) => {
            console.log('이미지주소불러오기 실패', err);
          });
      };
      getImgUrl();
    }
  };
  const whatsOn = (e:any)=>{
    if(e==0){
        let cl = cardList[e].slice(-3,cardList[e].length)
        if(cl==='svg'){
            return
        }
    }
    props.propFunction(cardList[e])
  }
    return (
        <div className="carousel-wrapper">
            <Carousel onChange={(e)=>whatsOn(e)}>
                {
                    cardList.map((cart, i:number)=>{
                        return(
                            <div className={`wish-card-sel ${i===0&&'img-small'}`} 
                                    onClick={()=>onUploadImageButtonClick(i)}
                                    >
                                {/* style={{"backgroundImage":`url(${cardList[i]})`}} */}
                                <img className="" src={cardList[i]}/>
                            </div>
                        )
                    })
                }
                
            </Carousel>
            <input
                      type="file"
                      name="imgFile"
                      accept="image/*"
                      ref={inputRef}
                      id="imgFile"
                      onChange={handleChangeFile}
                      style={{ display: 'none' }}
                    />
        </div>
    );
}