import { Link } from "react-router-dom";
import { FavHeart } from "../FavHeart/FavHeart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetWods } from "../../store/thunk/thunk";
import { AppDispatch, RootState } from "../../store/store";
import { IWod } from "../../@types/wods";
import "./WodCard.css";

export const WodCard = ({
  wods,
  displayHearth,
}: {
  wods: IWod[];
  displayHearth: boolean;
}) => {
  const dispatch = useDispatch() as AppDispatch;
  const isLogged = useSelector(
    (state: RootState) => state.userReducer.isLogged
  );

  const buttonStates = useSelector(
    (state: RootState) => state.wodsReducer.buttonStates
  );
  useEffect(() => {
    dispatch(actionGetWods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredWods = wods.filter((wod: IWod) => {
    const isFullBody = buttonStates[0] && wod.category.name === "Full body";
    const isHautDuCorps =
      buttonStates[1] && wod.category.name === "Haut du corps";
    const isBasDuCorps =
      buttonStates[2] && wod.category.name === "Bas du corps";
    if (buttonStates.every((state) => !state)) {
      return true;
    }

    return isFullBody || isHautDuCorps || isBasDuCorps;
  });

  return (
    <div className='w-full flex flex-wrap'>
      {filteredWods.map(
        (wod: IWod) =>
          wod.status && (
            <Link
              key={wod.id}
              className='wod-card flex flex-col w-full md:w-6/12 lg:w-[calc(100%/4)] p-4 text-black text-center items-center relative'
              to={`/wod/${wod.id}`}>
              <div className='relative'>
                {isLogged && displayHearth && (
                  <FavHeart key={wod.id} id={wod.id} />
                )}
                <div className='shadow-xl max-w-xl mx-auto bg-transparent rounded-lg bg-white'>
                  <div className='global flex flex-col items-center'>
                    <h1 className='font-semibold text-lg p-4'>{wod.name}</h1>
                    <div className='w-3/5 m-1'>
                      <img
                        src={wod.image}
                        alt={wod.image}
                        className='rounded-t-lg object-cover pb-4'
                      />
                    </div>
                    <div className='additional-text mb-2'>
                      {wod.exercices.map((exercice) => (
                        <div className='pb-4' key={exercice.id}>
                          <h4 className='pb-2 font-bold'>
                            {exercice.activity.name}
                          </h4>
                          <span className='font-hilogin'>
                            x {exercice.quantity.number}
                          </span>
                        </div>
                      ))}
                    </div>
                    <hr className='my-2 w-2/3 border-t border-gray-300' />
                    <div className='type flex flex-col justify-center w-full mb-2'>
                      <h2>{wod.category.name}</h2>
                      <h2>{wod.type.name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default WodCard;
