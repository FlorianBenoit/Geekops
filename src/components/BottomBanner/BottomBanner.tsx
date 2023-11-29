import { useDispatch, useSelector } from "react-redux";
import { actionSetConnexionIsClicked } from "../../store/actions/menuReducer";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

export function BottomBanner() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);

  return (
    <div className='bg-white text-black border-y-2 border-amber-500 text-center py-8 bottom-0 w-full'>
      <div className='p-2 mx-auto flex flex-col items-center'>
        <p className='max-w-2xl text-center'>
          Libérez votre créativité sportive en façonnant le WOD de vos rêves, sur mesure pour
          dépasser vos limites et atteindre vos objectifs fitness!
        </p>

        {!isLogged && (
          <button
            onClick={() => dispatch(actionSetConnexionIsClicked())}
            className='bg-amber-500 text-black px-4 py-2 rounded-lg mt-4'>
            Connectez-Vous
          </button>
        )}
        {window.location.pathname === "/add-your-wod" && isLogged && <></>}
        {isLogged && window.location.pathname !== "/add-your-wod" && (
          <button
            className='bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg mt-4'
            type='button'>
            <Link to='/add-your-wod'>Je crée mon Wod</Link>
          </button>
        )}
      </div>
    </div>
  );
}
