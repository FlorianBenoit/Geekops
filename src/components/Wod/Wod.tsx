import { useParams } from "react-router-dom";
import WodBanner from "./WodBanner/WodBanner";
import WodDesc from "./WodDesc/WodDesc";
import WodHistory from "./WodHistory/WodHistory";
import WodPersonnalDetails from "./WodPersonnalDetails/WodPersonnalDetails";
import WodSocialBlock from "./WodSocialBlock/WodSocialBlock";
import WodTimer from "./WodTimer/WodTimer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { IWodExercices } from "../../@types/wods";
import { useEffect, useState } from "react";
import { Ihistoric } from "../../@types/wods";
import { actionGetWods } from "../../store/thunk/thunk";

const Wod = () => {
  const [historic, setHistoric] = useState<Ihistoric[]>([]);
  const [rounds, setRounds] = useState<number>(0);
  const [wodTime, setwodTime] = useState<number>(0);
  const [wodComment, setWodComment] = useState<string | undefined>();
  const dispatch = useDispatch() as AppDispatch;
  let userId: number | null = null;
  let exercices: IWodExercices[] = [
    {
      id: null,
      name: "",
    },
  ];
  let wodName = "";
  let wodDesc = "";
  let repetition = 0;
  let comments: { id: number | null; content: string }[] = [
    {
      id: null,
      content: "",
    },
  ];
  const wods = useSelector((state: RootState) => state.wodsReducer.wods);
  const { wodId } = useParams();
  if (typeof wodId === "string") {
    userId = parseInt(wodId);
  }

  if (wods.length !== 0) {
    const wod = wods.find((wod) => wod.id === userId);
    if (wod) {
      wodName = wod.name;
      wodDesc = wod.description;
      exercices = wod.exercices;
      comments = wod.comment;
      repetition = wod.repetition.repetition;
    }
  }

  const handleClickMinus = () => {
    if (rounds > 0) {
      setRounds(rounds - 1);
    } else {
      setRounds(0);
    }
  };

  const handleClickPlus = () => {
    setRounds(rounds + 1);
  };

  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseInt(event.target.value);
    if (time < 0) {
      setwodTime(0);
    } else {
      setwodTime(time);
    }
  };

  const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWodComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const date = new Date().toLocaleDateString("fr");
    const arr = [...historic];
    const newComment: Ihistoric = {
      id: 1,
      date: date,
      rounds: rounds,
      comment: wodComment,
      time: wodTime,
    };
    arr.push(newComment);
    setHistoric(arr);
    setWodComment("");
  };

  useEffect(() => {
    dispatch(actionGetWods());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-white text-black'>
      <WodBanner title={wodName} desc={wodDesc} />
      <div className='flex flex-col md:flex-row '>
        {wods.length !== 0 && (
          <WodDesc exercices={exercices} wodId={userId} repetition={repetition} />
        )}
        <div className='w-full flex flex-col md:w-2/5'>
          <WodTimer />
          <WodPersonnalDetails
            rounds={rounds}
            handleClickMinus={handleClickMinus}
            handleClickPlus={handleClickPlus}
            wodTime={wodTime}
            handleChangeTime={handleChangeTime}
            wodComment={wodComment}
            handleChangeComment={handleChangeComment}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <WodHistory historic={historic} />
      <WodSocialBlock comments={comments} />
    </div>
  );
};

export default Wod;
