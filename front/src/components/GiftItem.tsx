import { Link } from 'react-router-dom';
import '../css/giftItem.styles.css';
// import type { Gift } from "../interface/interface"
interface GiftProps {
  gift: {
    name: string;
    price: number;
    repImg: string;
    id: number;
    likeCount: number;
  };
  key: number;
}
const HEART_IMG =
  'https://tifyimage.s3.ap-northeast-2.amazonaws.com/7fca4889-273f-4ec1-8b51-c9a1407bbc6d.png';
const RABBIT_IMG =
  'https://tifyimage.s3.ap-northeast-2.amazonaws.com/386b7d5f-fc70-46df-98ec-de52719efcca.png';
export function GiftItem({ gift }: GiftProps, key: number) {
  return (
    <div className="gift-item-card-container">
      <Link to={`/gifthub/${gift.id}`}>
        <div className="gift-item-card">
          <div className="gift-image">
            {gift.repImg ? (
              <img src={gift.repImg} alt="상품이미지" />
            ) : (
              <img
                className="gift-image"
                src="https://tifyimage.s3.ap-northeast-2.amazonaws.com/16a3c9cb-24cd-43c7-91cf-c1daa6cb4952.PNG"
                alt="이미지가 없습니다"
              />
            )}
          </div>
          <div>
            <div className="gift-con-wrap">
              <p className="gift-con-name">{gift.name}</p>
              <p className="gift-con-price">
                {gift.price.toLocaleString('ko-KR')}원
              </p>
              <p className="gift-con-like">
                <img src={HEART_IMG} /> {/*{HEART_IMG} {RABBIT_IMG}*/}
                <p className="gift-con-cart">{gift.likeCount}명 카트</p>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
