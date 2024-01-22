import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  actionSetEmailInput,
  actionSetErrorMessage,
  actionSetPasswordCheckedInput,
  actionSetPasswordInput,
  actionSetPseudoInput,
} from "../../store/actions/usersReducer";
import { actionCreateUser } from "../../store/thunk/thunk";

const Inscription = () => {
  const dispatch = useDispatch() as AppDispatch;
  const email = useSelector((state: RootState) => state.userReducer.emailInput);
  const password = useSelector((state: RootState) => state.userReducer.passwordInput);
  const passwordCheck = useSelector((state: RootState) => state.userReducer.passwordCheckInput);
  const pseudo = useSelector((state: RootState) => state.userReducer.pseudoInput);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === passwordCheck) {
      dispatch(actionCreateUser());
    } else {
      const message = "Les mots de passe ne correspondent pas.";
      dispatch(actionSetErrorMessage(message));
    }
  };

  return (
    <div className='md:w-1/5 h-fit bg-black border-white rounded-sm border-2 text-center p-3 flex flex-col w-full absolute z-10'>
      <form onSubmit={(event) => handleSubmit(event)} action='#' className='flex flex-col'>
        <p className='text-white'>Inscription</p>
        <label htmlFor='pseudo' className='text-white mb-2'></label>
        <input
          className='my-6 p-2 text-white'
          type='text'
          id='pseudo'
          placeholder='Pseudo'
          value={pseudo}
          onChange={(event) => dispatch(actionSetPseudoInput(event.target.value))}
        />
        <label htmlFor='email' className='text-black mb-2'></label>
        <input
          className='mb-6 p-2 text-white'
          type='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={(event) => dispatch(actionSetEmailInput(event.target.value))}
        />
        <label htmlFor='password' className='text-black mb-2'></label>
        <input
          className='mb-6 p-2 text-white'
          type='password'
          id='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(event) => dispatch(actionSetPasswordInput(event.target.value))}
        />
        <label htmlFor='verifyPassword' className='text-black mb-2'></label>
        <input
          className='mb-4 p-2 text-white'
          type='password'
          id='verifyPassword'
          placeholder='Ressaisissez votre mot de passe'
          value={passwordCheck}
          onChange={(event) => dispatch(actionSetPasswordCheckedInput(event.target.value))}
        />
        <p className='text-black mb-2'>Valider vos informations :</p>
        <button
          className='mb-2 bg-sky-400 px-3 py-1 rounded-lg hover:bg-amber-500 text-black'
          type='submit'>
          Valider
        </button>
      </form>
    </div>
  );
};

export default Inscription;
