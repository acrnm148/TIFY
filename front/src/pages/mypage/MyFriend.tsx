// import type { WishProps } from '../interface/interface';
import { useState } from 'react';
import '../../css/mypage/myFriend.styles.css';
import { Component } from 'react';
// import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Home from '@mui/icons-material/Home';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Carousel from '../../modules/Carousel';

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
  // const StyledSlider = styled(Slider)`
  //   .slick-slide div {
  //     outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  //   }
  // `;

  var items = [
    {
      img: '',
      name: '강기한1',
      nickname: '기한짱짱맨',
      title: 'Probably the most random thing you have ever seen!',
    },
    {
      img: '',
      name: '강기한2',
      nickname: '기한짱짱맨',
      title: 'Probably the most random thing you have ever seen!',
    },
    {
      img: '',
      name: '강기한3',
      nickname: '기한짱짱맨',
      title: 'Probably the most random thing you have ever seen!',
    },
    {
      img: '',
      name: '강기한4',
      nickname: '기한짱짱맨',
      title: 'Probably the most random thing you have ever seen!',
    },
  ];

  return (
    <div id="base-div">
      <h1>Friend</h1>
      {/* <div className="ongoing-wishes">
        {wishes.map(function (wish) {
          return <WishCard wish={wish} />;
        })}
      </div> */}
      <Carousel items={items}></Carousel>
    </div>
  );
}

const Carousel = (items: any) => {
  // 옵션
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2> Responsive </h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
        <div>
          <h3>7</h3>
        </div>
        <div>
          <h3>8</h3>
        </div>
      </Slider>
    </div>
  );
};

// function Item(props) {
//   return (
//     <Paper>
//       <div className="ongoing-wishes">
//         <div className="ongoing-wish">
//           <div>
//             <p>{props.item.name}</p>
//             <p>{props.item.description}</p>
//           </div>
//         </div>
//       </div>
//     </Paper>
//   );
// }

function WishCard({ wish }: any) {
  return (
    <div className="ongoing-wish">
      <h1>카드</h1>
      <p>{wish.title}</p>
    </div>
  );
}
