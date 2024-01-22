import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./HomeCard.css";
import Fade from "react-reveal/Fade";
import { Link, NavLink } from "react-router-dom";
import { IWod } from "../../@types/wods";

export const HomeCard = ({
  wod,
  prevSlide,
  nextSlide,
}: {
  wod: IWod;
  prevSlide: () => void;
  nextSlide: () => void;
}) => {
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);

  return (
    <Fade bottom>
      <div className='mt-16 title w-1/3 flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold text-amber-500'>
          Bienvenue dans le monde du Cross ops !
        </h2>
        <p className=' mt-8 text-white font-bold'>
          Tu peux ici découvrir les différents circuits training (Wod) ou encore les exercices qui
          le compose. Si tu es déjà connaisseur et expérimenter, n'hésite pas à nous proposer tes
          meilleurs entraînements !
        </p>
      </div>
      <div className='p-4 -mt-40 -mb-16 flex gap-8 h-screen w-screen justify-around items-center relative'>
        <NavLink
          className='homecard homecard1 shadow-lg mb-40 relative w-1/5 h-[50vh] flex border-solid border-4 border-amber-500 rounded-3xl p-8 justify-center flex-col items-center'
          to='/wods'>
          <div className=' mb-6 border-black'>
            <h1 className='font-semibold text-amber-500 text-lg md:text-2xl'>Les Wods</h1>
          </div>
          <div className='flex w-full flex-col md:flex-col items-center'>
            <div className='flex flex-col md:flex-row items-center justify-between'></div>
          </div>
        </NavLink>
        <NavLink
          className='homecard homecard2 shadow-lg mt-40 relative w-1/5 h-[50vh] flex border-solid border-4 border-amber-500 rounded-3xl p-8 justify-center flex-col items-center'
          to='/exercices'>
          <div className=' mb-6 border-black'>
            <h1 className='font-semibold text-amber-500 text-lg md:text-2xl'>Les Exercices</h1>
          </div>
          <div className='flex w-full flex-col md:flex-col items-center'>
            <div className='flex flex-col md:flex-row items-center justify-between'></div>
          </div>
        </NavLink>
        <NavLink
          className='homecard homecard3 shadow-lg mb-40 relative w-1/5 h-[50vh] flex border-solid border-4 border-amber-500 rounded-3xl p-8 justify-center flex-col items-center'
          to='/add-your-wod'>
          <div className=' mb-6 border-black'>
            <h1 className='font-semibold text-amber-500 text-lg md:text-2xl'>Propose ton Wod !</h1>
          </div>
          <div className='flex w-full flex-col md:flex-col items-center'>
            <div className='flex flex-col md:flex-row items-center justify-between'></div>
          </div>
        </NavLink>
      </div>
    </Fade>
  );
};

export default HomeCard;
