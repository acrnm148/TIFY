import iconCategory1Birthday from '../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../assets/category/iconCategory7Etc.svg';
import '../css/myPage.styles.css';

export function MyWish() {
  return (
    <div className="my-wish-div">
      <WishCardActive title={'안녕안녕'}></WishCardActive>
      <WishCardActive title={'안녕안녕'}></WishCardActive>
      <WishCardActive title={'안녕안녕'}></WishCardActive>
      <WishCardActive title={'안녕안녕'}></WishCardActive>

      <WishCardDeactive title={'안녕안녕'}></WishCardDeactive>
      <WishCardDeactive title={'안녕안녕'}></WishCardDeactive>
      <div style={{ width: '200px' }}>
        <img src={iconCategory2Marry} alt="" />
        <img src={iconCategory3Employed} alt="" />
        <img src={iconCategory4Health} alt="" />
        <img src={iconCategory5Childbirth} alt="" />
        <img src={iconCategory6Unmarried} alt="" />
        <img src={iconCategory7Etc} alt="" />
      </div>
    </div>
  );
}

function Donator() {
  return (
    <div className="donator-div">
      <div className="flex items-center space-x-2 text-base">
        <p className="text-xs ">축하해주신 분</p>
      </div>
      <div className="mt-1 flex -space-x-2 overflow-hidden">
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-1 ring-white"
          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="mt-1 text-xs">
        <a className="text-blue-500">+ 198 others</a>
      </div>
    </div>
  );
}

function WishCardActive(props) {
  return (
    <div className="wish-box shadow-xl">
      <p className="p-date">완료까지 7일</p>
      <p className="p-proceed">진행중</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="wish-title">"{props.title}"</p>
      </div>
      <Donator />
    </div>
  );
}

function WishCardDeactive(props) {
  return (
    <div className="wish-box shadow-xl">
      <p className="p-date">완료까지 7일</p>
      <p className="p-done">진행중</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="wish-title">"{props.title}"</p>
      </div>
      <Donator />
    </div>
  );
}
