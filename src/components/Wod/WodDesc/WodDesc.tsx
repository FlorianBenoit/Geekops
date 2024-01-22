import { useSelector } from "react-redux";
import { FavHeart } from "../../FavHeart/FavHeart";
import { RootState } from "../../../store/store";
import { IWodExercices } from "../../../@types/wods";
import Fade from "react-reveal/Fade";

const WodDesc = ({
  exercices,
  wodId,
  repetition,
}: {
  exercices: IWodExercices[];
  wodId: number | null;
  repetition: number;
}) => {
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);
  return (
    <div className='w-full relative p-4 md:w-3/5 flex flex-col justify-center gap-2 border-b-2 border-amber-500'>
      <Fade left>
        <div className='flex flex-col justify-between '>
          {isLogged && <FavHeart id={wodId} />}
          <h1 className='pb-8 text-2xl md:text-3xl text-amber-500 mb-4'>Exercices :</h1>
          {exercices.map((exercice) => (
            <div className='pb-4' key={exercice.id}>
              <h4 className='pb-2 font-bold'>{exercice.activity.name}</h4>
              <span className=''>
                x {exercice.quantity.number} {exercice.unity.name}
              </span>
            </div>
          ))}
        </div>

        <p className='pt-2 mb-4 '>Nombre de tours à réaliser : {repetition}</p>
        <p className='italic mt-2 text-gray-600'>
          Réalisez ces exercices en respectant les temps de repos et le nombres de répétitions !
        </p>
      </Fade>
    </div>
  );
};

export default WodDesc;
