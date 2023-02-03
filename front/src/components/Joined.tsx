import iconCategory1Birthday from '../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../assets/category/iconCategory7Etc.svg';
import '../css/Joined.styles.css';

export function Joined() {
  return (
    <div className="joined-wish-div">
      <JoinedWishCardActive title="hello"></JoinedWishCardActive>
      <JoinedWishCardActive title="hello"></JoinedWishCardActive>
      <JoinedWishCardDeactive title="hello"></JoinedWishCardDeactive>
    </div>
  );
}

function JoinedWishCardActive(props: { title: string }) {
  return (
    <div className="joined-wish-box shadow-xl">
      <p className="p-date">완료까지 7일</p>
      <p className="p-proceed">진행중</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="joined-wish-title">"{props.title}"</p>
      </div>
      <div className="button-div">
        <button className="button-gift">보낸 선물</button>
        <button className="button-card">보낸 축하 카드</button>
      </div>
    </div>
  );
}

function JoinedWishCardDeactive(props: { title: string }) {
  return (
    <div className="joined-wish-box shadow-xl">
      <p className="p-date">22.01.02 ~ 22.01.26</p>
      <p className="p-done">완료</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="joined-wish-title">"{props.title}"</p>
      </div>
      <div className="button-div">
        <button className="button-gift">보낸 선물</button>
        <button className="button-card">보낸 축하 카드</button>
      </div>
    </div>
  );
}
