import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FavHeart } from "../FavHeart/FavHeart";
import Fade from "react-reveal/Fade";
import "./RandomCard.css";
import { Link } from "react-router-dom";
import { IWod } from "../../@types/wods";

export const RandomCard = ({ wod, onButtonClick }: { wod: IWod; onButtonClick: void }) => {
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);

  return (
    <Fade right>
      <div className='text-white flex flex-col justify-center items-center text-center bottom-0 w-full'>
        <div className='flex items-baseline'>
          <h1 className='font-bold m-6'>
            Wod aléatoire, si tu n'as pas envie de chercher et de commencer au plus vite !
          </h1>
          <button onClick={onButtonClick} className='random-button mt-4'>
            Un Autre ?
          </button>
        </div>
        <div className='random mt-6 w-4/5 p-4 flex flex-col justify-center items-center relative border-white border-solid border-4 rounded-3xl'>
          <div className='shadow-lg relative w-full flex  rounded-3xl p-2 justify-center flex-col items-center bg-trandparent'>
            {isLogged && <FavHeart id={wod.id} />}
            <div className=' mb-6 border-black'>
              <h1 className='font-semibold text-amber-500 text-lg md:text-2xl'>{wod.name}</h1>
              <h2 className='title font-bold'>{wod.category.name}</h2>
            </div>
            <div className='flex w-full flex-col justify-center md:flex-col items-center'>
              <div className='exercices w-3/5 items-center justify-center font-bold mb-2 flex flex-col md:flex-row flex-wrap '>
                {wod.exercices.map((exercise) => (
                  <div className=' md:m-4 mb-2 border-4 w-80 p-4' key={exercise.id}>
                    <p className='text-sm md:text-2xl'>{exercise.activity.name}</p>
                    <p className='text-sm md:text-2xl'>x {exercise.quantity.number}</p>
                  </div>
                ))}
              </div>
              <div className='flex justify-center items-center font-bold w-full'>
                <h2 className='text-sm md:text-xl '>Répétitions :</h2>
                <p className='m-4 text-sm md:text-xl '>x{wod.repetition.repetition}</p>
              </div>
            </div>
          </div>
          <Link key={wod.id} to={`/wod/${wod.id}`} className='btn'>
            START !
          </Link>
        </div>
      </div>
    </Fade>
  );
};

export default RandomCard;
