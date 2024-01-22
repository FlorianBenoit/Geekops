import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { actionSetPasswordInput, actionSetPseudoInput } from "../../store/actions/usersReducer";
import { actionLogUser } from "../../store/thunk/thunk";

const Connexion = ({ clickInscription }: { clickInscription: () => void }) => {
  const dispatch = useDispatch() as AppDispatch;
  const pseudo = useSelector((state: RootState) => state.userReducer.pseudoInput);
  const password = useSelector((state: RootState) => state.userReducer.passwordInput);

  const handleClickLog = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(actionLogUser());
  };

  return (
    <div className='md:w-1/5 h-fit bg-black text-center border-white border-2 rounded-sm p-3 flex flex-col absolute z-10'>
      <form action='#' className='flex flex-col'>
        <p className='text-white'>Connection</p>
        <label htmlFor='pseudo' className='text-white'></label>
        <input
          className='my-6 p-2 text-white'
          type='text'
          id='pseudo'
          placeholder='Pseudo'
          value={pseudo}
          onChange={(event) => dispatch(actionSetPseudoInput(event.target.value))}
        />
        <label htmlFor='password' className='text-black'></label>
        <input
          className='mb-6 p-2 text-white'
          type='password'
          id='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(event) => dispatch(actionSetPasswordInput(event.target.value))}
        />
        <button
          onClick={(event) => handleClickLog(event)}
          className='mb-2 bg-sky-400 px-3 py-1 rounded-lg hover:bg-amber-500 text-black'
          type='submit'>
          Connexion
        </button>
      </form>
      <span className='mb-2 text-xs text-black'>Ou créez votre compte : </span>
      <button
        onClick={() => clickInscription()}
        className='bg-sky-400 px-3 py-1 rounded-lg hover:bg-amber-500 text-black'
        type='button'>
        Inscription
      </button>
    </div>
  );
};

export default Connexion;
