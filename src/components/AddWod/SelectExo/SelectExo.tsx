import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  actionSetDefaultName,
  actionSetDefaultRep,
  actionSetNameExo,
  actionSetRepExo,
  actionSetUnityValue,
} from "../../../store/actions/wodsReducer";

const SelectExo = ({ del, id }: { del: (id: number | null) => void; id: number | null }) => {
  const dispatch = useDispatch() as AppDispatch;
  const exercices = useSelector((state: RootState) => state.wodsReducer.activities);
  const wodExo = useSelector((state: RootState) => state.wodsReducer.wodExo);
  let wodExoValue: number | undefined = undefined;
  const foundExoValue = wodExo.find((ele) => ele.id === id);
  if (foundExoValue) {
    wodExoValue = foundExoValue.activity as number;
  }

  let wodExoRep: number | undefined = undefined;
  const foundExoRep = wodExo.find((ele) => ele.id === id);
  if (foundExoRep) {
    wodExoRep = foundExoRep.quantity as number;
  }

  let wodExoUnity: number | undefined = undefined;
  const foundExoUnity = wodExo.find((ele) => ele.id === id);
  if (foundExoUnity) {
    wodExoUnity = foundExoUnity.unity as number;
  }

  const repetitions = useSelector((state: RootState) => state.wodsReducer.repetitions);

  let initialName: number | undefined = undefined;
  let initialRep: number | undefined = undefined;
  if (exercices.length !== 0) {
    initialName = exercices[0].id;
    initialRep = exercices[0].id;
  }
  const handleChangeName = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = parseInt(event.target.value);
    dispatch(actionSetNameExo({ name, id }));
  };

  const handleChangeRep = (event: ChangeEvent<HTMLSelectElement>) => {
    const rep = parseInt(event.target.value);
    dispatch(actionSetRepExo({ rep, id }));
  };

  const handleChangeUnity = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    dispatch(actionSetUnityValue({ value, id }));
  };

  useEffect(() => {
    dispatch(actionSetDefaultName({ initialName, id }));
    dispatch(actionSetDefaultRep({ initialRep, id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex gap-x-2  items-center'>
      <select
        value={wodExoValue}
        onChange={(event) => handleChangeName(event)}
        id='exo'
        className=' border p-2 bg-black py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
        {exercices &&
          exercices.map((exo) => (
            <option key={exo.id} value={exo.id}>
              {exo.name}
            </option>
          ))}
      </select>
      <select
        value={wodExoRep}
        onChange={(event) => handleChangeRep(event)}
        id='reps'
        className=' border p-2 bg-black py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
        {repetitions &&
          repetitions.map((rep) => (
            <option key={rep.id} value={rep.id}>
              {rep.number}
            </option>
          ))}
      </select>
      <select
        value={wodExoUnity}
        onChange={(event) => handleChangeUnity(event)}
        id='unity'
        className=' border p-2 bg-black py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
        <option value={1}>répétitions</option>
        <option value={2}>secondes</option>
      </select>
      <span
        onClick={() => del(id)}
        className='text-white text-sm hover:cursor-pointer hover:underline'>
        supprimer
      </span>
    </div>
  );
};

export default SelectExo;
