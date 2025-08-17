import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/images/img1.jpg';
import image2 from '../assets/images/img2.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div><img src={image1} alt="Home 1" className="w-full h-[400px] object-cover" /></div>
      <div><img src={image2} alt="Home 2" className="w-full h-[400px] object-cover" /></div>
    </Slider>
  );
};

export default Carousel;
