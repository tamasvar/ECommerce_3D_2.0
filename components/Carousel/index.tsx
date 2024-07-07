'use client'
import { FC, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ICarousel {
  navigation?: boolean,
  slides: ReactNode[],
  children: ReactNode,
  className?: string,
  slideClassName?: string,
};

const Carousel: FC<ICarousel> = (props) => {
  const { slides, className = '', slideClassName = '', navigation = false, children } = props;
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={navigation}
        modules={[Autoplay, Pagination, Navigation]}
        className={`size-full ${className} bg-cover`}
        style={{ backgroundImage: 'url(assets/feedback-bg.jpg)' }}
      >
        {children}
        {
          slides?.map((slide, index) => (
            <SwiperSlide key={index} className={slideClassName}>{slide}</SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
export default Carousel