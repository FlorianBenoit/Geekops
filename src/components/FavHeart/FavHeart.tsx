import { useEffect, useState } from "react";
import "./FavHeart.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { actionAddFav, actionDeleteFav } from "../../store/thunk/thunk";

export const FavHeart = ({ id }: { id: number | null }) => {
  const dispatch = useDispatch() as AppDispatch;
  const [isButtonOn, setIsButtonOn] = useState(false);
  const likedWods = useSelector((state: RootState) => state.userReducer.userFav);

  useEffect(() => {
    setIsButtonOn(likedWods.includes(id));
  }, [likedWods, id]);

  const toggleButton = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isButtonOn === true) {
      dispatch(actionDeleteFav(id));
    } else {
      dispatch(actionAddFav(id));
    }
    setIsButtonOn((prevState) => !prevState);
  };
  return (
    <button
      className={isButtonOn ? "pixel-art-button-on" : "pixel-art-button-off"}
      onClick={toggleButton}></button>
  );
};
