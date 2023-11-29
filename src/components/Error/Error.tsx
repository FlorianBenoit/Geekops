import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Error = () => {
  const message = useSelector(
    (state: RootState) => state.userReducer.errorMessage
  );
  const errorMessage = useSelector(
    (state: RootState) => state.wodsReducer.errorMessage
  );
  return (
    <div className='w-full bg-red-400 absolute text-white p-2'>
      <p>
        {message}
        {errorMessage}
      </p>
    </div>
  );
};

export default Error;
