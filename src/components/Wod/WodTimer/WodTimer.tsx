import { useEffect, useState } from "react";

const WodTimer = () => {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const startTimer = () => {
    setIsStart(true);
    setIsStop(false);
  };

  const stopTimer = () => {
    setIsStop(true);
    setIsStart(false);
  };

  const resetTimer = () => {
    setIsStop(false);
    setTime(0);
    setIsStart(false);
  };

  useEffect(() => {
    let interval: number = 0;

    if (isStart) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isStart]);

  return (
    <div className='sticky top-0 md:static flex justify-center m-4 items-center rounded-xl bg-amber-400'>
      <div className='text-2xl mr-12 sm:mr-4 md:mr-10 lg:mr-4 py-4 w-1/4 flex'>
        <span className=''>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      {!isStart && !isStop && (
        <button onClick={() => startTimer()} className='text-2xl' type='button'>
          GO
        </button>
      )}
      {isStart && !isStop && (
        <>
          <button onClick={() => stopTimer()} className='text-2xl' type='button'>
            STOP
          </button>
        </>
      )}
      {isStop && (
        <>
          <button onClick={() => resetTimer()} className='text-2xl mr-4' type='button'>
            RESET
          </button>
          <button className='text-2xl' onClick={() => startTimer()} type='button'>
            START
          </button>
        </>
      )}
    </div>
  );
};

export default WodTimer;
