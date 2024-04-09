import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeels } from "./topMeels";
import CarouselItem from "./CarouselItem";

const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplateSpeed: 2000,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        {topMeels.map((meel) => (
          <CarouselItem image={meel.image} title={meel.title} />
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
