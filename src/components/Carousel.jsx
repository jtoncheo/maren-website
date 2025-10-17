import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/images/03jan526.jpg';
import image2 from '../assets/images/fox2709b.jpg';
import "./Carousel.css";


const images = [image1,image2];
const Carousel = () => {
  const settings = {
    // dots: true,
    // infinite: true,
    // autoplay: true,
    // speed: 1000,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // adapativeHeight: true,
        dots: false,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className ="carousel-container">
      <Slider {...settings}>
        {/* <div className="carousel-slide"><img src={image1}  /></div>
        <div className="carousel-slide"><img src={image2} alt="Home 2" className="w-full h-[400px] object-cover" /></div> */}
        {images.map((img,idx) => (
          <div className="carousel-slide" key={idx}>
            <img src = {img} className='carousel-image'/> 
            <div className="carousel-text">Big Builders For homes lol</div>
          </div>
        ))}
      </Slider>
    </div>

  );
};

export default Carousel;
