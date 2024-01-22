import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { actionGetExercices } from "../../store/thunk/thunk";

export const ExerciceCard = () => {
  const dispatch = useDispatch() as AppDispatch;
  const exercices = useSelector((state: RootState) => state.wodsReducer.activities);
  const buttonStates = useSelector((state: RootState) => state.wodsReducer.buttonStates);
  useEffect(() => {
    dispatch(actionGetExercices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredExercices = exercices.filter((exercice) => {
    const isFullBody = buttonStates[0] && exercice.category.name === "Full body";
    const isHautDuCorps = buttonStates[1] && exercice.category.name === "Haut du corps";
    const isBasDuCorps = buttonStates[2] && exercice.category.name === "Bas du corps";

    if (buttonStates.every((state) => !state)) {
      return true;
    }

    return isFullBody || isHautDuCorps || isBasDuCorps;
  });

  return (
    <div className='exercice-container mt-16'>
      <hr className='my-4 w-3/4 mx-auto border-t-2 border-orange-300 mt-6 mb-6' />
      <h5 className='text-2xl text-white italic mx-4 md:mx-16 mb-4 md:mb-10 mt-6'>
        Explorez notre page d'exercices accompagnée d'instructions détaillées et d'images
        explicatives qui vous guideront vers une exécution parfaite. Parce que bien effectuer chaque
        mouvement est non seulement essentiel pour des résultats efficaces, mais aussi pour votre
        bien-être!
      </h5>
      <hr className='my-4 w-1/2 mx-auto border-t-2 border-orange-300 mb-4 md:mb-8' />
      {filteredExercices.map((exercice, index) => (
        <div
          key={exercice.id}
          className={`flex ${
            index % 2 === 0
              ? "flex-col items-center md:flex-row justify-evenly border-b "
              : "flex-col items-center md:flex-row-reverse flex justify-evenly border-b"
          } py-4 md:py-8`}>
          <div className='w-full h-50vh flex items-center justify-center flex-col text-2xl md:w-1/2 p-4 text-center text-white'>
            <h2 className='text-orange-400 mb-2 font-semibold'>{exercice.name}</h2>
            <p>{exercice.description}</p>
          </div>
          <div className='w-full md:w-1/5 '>
            <img
              src={exercice.image}
              alt={exercice.name}
              className='object-cover w-full h-full rounded-md'
            />
          </div>
        </div>
      ))}
    </div>
  );
};
