import { useDispatch } from "react-redux";
import { actionSetConnexionIsClicked } from "../../../store/actions/menuReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IWodDetails {
  rounds: number;
  handleClickMinus: () => void;
  handleClickPlus: () => void;
  handleChangeTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  wodTime: number;
  wodComment: string | undefined;
}

const WodPersonnalDetails = ({
  rounds,
  handleClickMinus,
  handleClickPlus,
  wodTime,
  handleChangeTime,
  wodComment,
  handleChangeComment,
  handleSubmit,
}: IWodDetails) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);

  return (
    <div className=' h-full flex flex-col p-4 bg-white border-b justify-around'>
      {!isLogged && (
        <div className='flex flex-col h-full justify-center'>
          <p>
            Pour enregistrer et suivre votre progression, créez votre compte ou connectez-vous !
          </p>
          <button
            onClick={() => dispatch(actionSetConnexionIsClicked())}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4'
            type='submit'>
            Je me connecte
          </button>
        </div>
      )}
      {isLogged && (
        <form action='#' className='flex flex-col' onSubmit={(event) => handleSubmit(event)}>
          <div className='mb-2'>
            <span className='font-bold'>Rounds réalisés : </span>
            <button onClick={handleClickMinus} className='text-xl  mb-2' type='button'>
              -
            </button>
            <span> {rounds} </span>
            <button onClick={handleClickPlus} className='text-xl' type='button'>
              +
            </button>
          </div>
          <div className='mb-4'>
            <label htmlFor='timer' className='font-bold mr-2'>
              Temps du Wod :
            </label>
            <input
              className=' text-black w-16 bg-white text-lg p-2 border'
              type='number'
              id='timer'
              value={wodTime}
              onChange={(event) => handleChangeTime(event)}
            />
            <span className='pl-2'>Minutes</span>
          </div>
          <textarea
            className='bg-white border text-black mb-2'
            name=''
            id=''
            cols={30}
            rows={10}
            value={wodComment}
            onChange={(event) => handleChangeComment(event)}
          />
          <button
            className='bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg mt-4'
            type='submit'>
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
};

export default WodPersonnalDetails;
