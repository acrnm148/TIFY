// import Slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  // 옵션
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Slider>
    </div>
  );
};

export default Carousel;
