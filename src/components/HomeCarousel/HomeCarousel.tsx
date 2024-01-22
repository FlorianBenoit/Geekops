import { useState, useEffect } from "react";
import { HomeCard } from "../HomeCard/HomeCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { actionGetWods } from "../../store/thunk/thunk";

export function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };
  const dispatch = useDispatch() as AppDispatch;
  useEffect(() => {
    dispatch(actionGetWods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const wods = useSelector((state: RootState) => state.wodsReducer.wods);
  const isLoaded = useSelector((state: RootState) => state.wodsReducer.wodsLoaded);

  return (
    <>
      {isLoaded && (
        <div className='carousel flex items-center justify-center'>
          <div className='relative'>
            <div
              className='carousel-item flex flex-col items-center'
              style={{ display: currentSlide === 0 ? "flex" : "none" }}>
              <HomeCard wod={wods[0]} prevSlide={prevSlide} nextSlide={nextSlide} />
            </div>
            <div
              className='carousel-item'
              style={{ display: currentSlide === 1 ? "block" : "none" }}>
              <HomeCard wod={wods[5]} prevSlide={prevSlide} nextSlide={nextSlide} />
            </div>
            <div
              className='carousel-item'
              style={{ display: currentSlide === 2 ? "block" : "none" }}>
              <HomeCard wod={wods[10]} prevSlide={prevSlide} nextSlide={nextSlide} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
