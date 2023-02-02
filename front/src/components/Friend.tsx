// import type { WishProps } from '../interface/interface';
import { useState } from 'react';
import '../css/mypage/friend.styles.css';

export function Friend() {
  let [wishes, setWishes] = useState([
    {
      title: '왈라비 주머니의 고영일 생일 위시',
      name: '기한',
      nickname: '기한짱짱맨',
    },
    {
      title: '왈라비 주머니의 고영일 생일 위시',
      name: '기한',
      nickname: '기한짱짱맨',
    },
  ]);
  console.log(wishes);

  return (
    <div>
      <h1>Friend</h1>
      <div className="ongoing-wishes">
        {wishes.map(function (wish) {
          return <WishCard wish={wish} />;
        })}
      </div>
    </div>
  );
}

function WishCard({ wish }: any) {
  return (
    <div className="ongoing-wish">
      <h1>카드</h1>
      <p>{wish.title}</p>
    </div>
  );
}
