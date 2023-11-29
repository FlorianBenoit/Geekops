import { useSelector } from "react-redux";
import Error from "../Error/Error";
import "./Banner.css";
import { RootState } from "../../store/store";

type BannerProps = {
  title: string;
  subtitle: string;
};

export function Banner({ title, subtitle }: BannerProps) {
  const isError = useSelector((state: RootState) => state.wodsReducer.isError);
  return (
    <>
      {isError && <Error />}
      <div
        className='home bg-cover h-screen-1/2 text-black flex flex-col justify-center p-6'
        style={{
          backgroundImage: "url('/_8a9fee81-b0e9-4433-ac4b-f4603f2cd462.jpg')",
        }}>
        <h1 className='ban-text text-2xl content-center md:text-4xl font-hilogin text-amber-500 mb-4'>
          {title}
        </h1>
        <p className='p-ban text-white'>{subtitle}</p>
      </div>
    </>
  );
}
