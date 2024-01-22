import { useSelector } from "react-redux";
import Error from "../Error/Error";
import "./Banner.css";
import { RootState } from "../../store/store";
import { useRef } from "react";

type BannerProps = {
  title: string;
  subtitle: string;
};

export function Banner({ title, subtitle }: BannerProps) {
  const isError = useSelector((state: RootState) => state.wodsReducer.isError);
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {isError && <Error />}
      <div
        className='home bg-cover bg-center justify-between items-center text-black flex flex-col p-6'
        style={{
          backgroundImage:
            "url('/close-up-portrait-afro-american-sports-man-with-beautiful-muscular-body-doing-pushup-exercise-floor.jpg')",
        }}>
        <div className='duo flex flex-col mt-64'>
          <h1 className='ban-text text-2xl content-center md:text-4xl text-amber-500 mb-4'>
            {title}
          </h1>
          <p className='p-ban text-2xl text-white'>{subtitle}</p>
        </div>
        <button onClick={handleClick} className='arrow'>
          <div ref={ref} className='arrow-up'></div>
        </button>
      </div>
    </>
  );
}
