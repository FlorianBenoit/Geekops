import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RandomCard from "../RandomCard/RandomCard";
import "./RandomWod.css";

const RandomWod = () => {
  const [randomWodId, setRandomWodId] = useState(0);
  const wods = useSelector((state: RootState) => state.wodsReducer.wods);
  const isLoaded = useSelector((state: RootState) => state.wodsReducer.wodsLoaded);

  useEffect(() => {
    if (isLoaded) {
      generateRandomWod();
    }
  }, [isLoaded, wods]);

  const generateRandomWod = () => {
    const randomId = Math.floor(Math.random() * wods.length);
    setRandomWodId(randomId);
  };

  const handleRandomButtonClick = () => {
    generateRandomWod();
  };

  return (
    <>
      {isLoaded && (
        <div className='random-wod flex flex-col items-center justify-center border-y-2 border-amber-500 text-center h-auto py-8 bottom-0 w-full'>
          <RandomCard wod={wods[randomWodId]} onButtonClick={handleRandomButtonClick} />
        </div>
      )}
    </>
  );
};

export default RandomWod;
