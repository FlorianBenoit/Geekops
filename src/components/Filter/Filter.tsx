import { useState } from "react";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { actionSetButtonStates } from "../../store/actions/usersReducer";
import { FiMenu } from "react-icons/fi";

export function Filter() {
  const dispatch = useDispatch();
  const buttonStates = useSelector((state: RootState) => state.wodsReducer.buttonStates);

  const toggleActive = (index: number) => {
    const newStates = [...buttonStates];
    newStates[index] = !newStates[index];
    dispatch(actionSetButtonStates(newStates));
  };

  const [isActive, setIsActive] = useState(true);

  const toggleMenu = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };
  return (
    <div className=' '>
      <div className='md:flex hidden justify-around mt-6'>
        <button
          className={`text-white w-40 text-xl m-4 p-3 rounded-2xl filter-button flex justify-around  ${
            buttonStates[0] ? "bg-amber-500" : ""
          }`}
          onClick={() => toggleActive(0)}>
          FullBody
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button
          className={`text-white w-40 text-xl m-4 p-3 rounded-2xl filter-button flex justify-around ${
            buttonStates[1] ? "bg-amber-500" : ""
          }`}
          onClick={() => toggleActive(1)}>
          Haut du corps
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button
          className={`text-white w-40 text-xl m-4 p-3 rounded-2xl filter-button flex justify-around ${
            buttonStates[2] ? "bg-amber-500" : ""
          }`}
          onClick={() => toggleActive(2)}>
          Bas du corps
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className='text-white md:hidden flex flex-col justify-center items-center'>
        <button className='menu-filtre p-4' onClick={() => toggleMenu()}>
          <p>Filtres</p>
          <FiMenu />
        </button>
        <div className={`md:flex flex-col items-center justify-around ${isActive ? "hidden" : ""}`}>
          <button
            className={`text-white w-40 text-xl m-4 p-3 rounded-2xl filter-button flex justify-around ${
              buttonStates[0] ? "bg-amber-500" : ""
            }`}
            onClick={() => toggleActive(0)}>
            FullBody
          </button>
          <button
            className={`text-white w-40 text-xl m-4 p-3 rounded-2xl filter-button flex justify-around ${
              buttonStates[1] ? "bg-amber-500" : ""
            }`}
            onClick={() => toggleActive(1)}>
            Haut du corps
          </button>
          <button
            className={`text-white w-40 text-xl m-4 p-3 rounded-2xl filter-button flex justify-around ${
              buttonStates[2] ? "bg-amber-500" : ""
            }`}
            onClick={() => toggleActive(2)}>
            Bas du corps
          </button>
        </div>
      </div>
    </div>
  );
}
