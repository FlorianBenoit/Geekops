import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FavHeart } from "../FavHeart/FavHeart";
import "./HomeCard.css";
import { Link } from "react-router-dom";
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
    <div className=' bg-white p-4 flex flex-col justify-center items-center relative'>
      <div className='shadow-lg relative w-full flex  rounded-3xl p-2 justify-center flex-col items-center bg-white'>
        {isLogged && <FavHeart id={wod.id} />}
        <div className='text-black mb-6 border-black'>
          <h1 className='font-semibold text-amber-500 text-lg md:text-2xl'>{wod.name}</h1>
          <h2 className='title'>{wod.category.name}</h2>
        </div>
        <div className='flex w-full flex-col md:flex-col items-center'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='image-wood w-2/4 p-4 text-black flex items-center justify-center'>
              <img src={wod.image} alt={wod.image} className='image w-96' />
            </div>
            <div className='global flex flex-col items-center text-black  w-2/4'>
              <div className='description mt-4 text-xs leading-4'>
                <div className='exercices mb-2 flex flex-col md:flex-row flex-wrap '>
                  {wod.exercices.map((exercise) => (
                    <div className=' md:m-4 mb-2 border w-80 p-4' key={exercise.id}>
                      <p className='text-sm md:text-xl'>{exercise.activity.name}</p>
                      <p className='text-sm md:text-xl'>x {exercise.quantity.number}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center text-black w-full'>
            <h2 className='text-sm md:text-xl '>Répétitions :</h2>
            <p className='m-4 text-sm md:text-xl '>x{wod.repetition.repetition}</p>
          </div>
        </div>
        <button
          className='left-btn absolute flex justify-center rotate-180 top-1/2 left-5'
          onClick={prevSlide}>
          {" "}
          <img className='w-2/4' src='/arrow.png' alt='' />{" "}
        </button>
        <button
          className='right-btn absolute flex justify-center top-1/2 right-5'
          onClick={nextSlide}>
          {" "}
          <img className='w-2/4' src='/arrow.png' alt='' />{" "}
        </button>
      </div>
      <Link key={wod.id} to={`/wod/${wod.id}`} className='start flex bg-cover w-24 h-8 mt-4'></Link>
    </div>
  );
};

export default HomeCard;
