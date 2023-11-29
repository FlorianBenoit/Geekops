import { useSelector } from "react-redux";
import { FavHeart } from "../../FavHeart/FavHeart";
import { RootState } from "../../../store/store";
import { IWodExercices } from "../../../@types/wods";

const WodDesc = ({
  exercices,
  wodId,
  repetition,
}: {
  exercices: IWodExercices[];
  wodId: number | null;
  repetition: number;
}) => {
  const isLogged = useSelector(
    (state: RootState) => state.userReducer.isLogged
  );
  return (
    <div className='w-full relative p-4 md:w-3/5 flex flex-col justify-center gap-2 bg-white border-b border-r'>
      <div className='flex flex-col justify-between '>
        {isLogged && <FavHeart id={wodId} />}
        <h1 className='pb-8 text-2xl md:text-4xl text-black mb-4'>
          Exercices :
        </h1>
        {exercices.map((exercice) => (
          <div className='pb-4' key={exercice.id}>
            <h4 className='pb-2 font-bold'>{exercice.activity.name}</h4>
            <span className='font-hilogin'>x {exercice.quantity.number}</span>
          </div>
        ))}
      </div>
      <p className='pt-2 mb-4'>Nombre de tours à réaliser : {repetition}</p>
      <p className='italic'>
        Réalisez ces exercices en respectant les temps de repos et le nombres de
        répétitions !
      </p>
    </div>
  );
};

export default WodDesc;
