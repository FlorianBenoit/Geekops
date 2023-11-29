import { useEffect, useState } from "react";
import SelectExo from "./SelectExo/SelectExo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  actionSetCatValue,
  actionSetRepWod,
  actionSetTypeValue,
  actionSetWodExo,
  actionSetWodNameInput,
  actionSetWodSubtitleInput,
} from "../../store/actions/wodsReducer";
import {
  actionCreateWod,
  actionGetCategories,
  actionGetExercices,
  actionGetRepetitions,
  actionGetTypes,
  actionGetWodActivies,
  actionGetWodRepetitions,
} from "../../store/thunk/thunk";
import Infobox from "../Infobox/Infobox";

const AddWod = () => {
  const [hasAtLeastOneEx, setHasAtLeastOneEx] = useState(true);
  const [hasATitle, setHasATitle] = useState(true);
  const [hasASubTitle, setHasASubTitle] = useState(true);
  const dispatch = useDispatch() as AppDispatch;
  let defaultCat: number | undefined = undefined;
  const categories = useSelector(
    (state: RootState) => state.wodsReducer.categories
  );
  if (categories.length !== 0) {
    defaultCat = categories[0].id;
  }
  let defaultType: number | undefined = undefined;
  const types = useSelector((state: RootState) => state.wodsReducer.types);
  if (types.length !== 0) {
    defaultType = types[0].id;
  }
  let defaultRep: number | undefined = undefined;
  const wodsRepetition = useSelector(
    (state: RootState) => state.wodsReducer.wodRepetitions
  );
  if (wodsRepetition.length !== 0) {
    defaultRep = wodsRepetition[0].id;
  }
  const wodExo = useSelector((state: RootState) => state.wodsReducer.wodExo);
  const repWodValue = useSelector(
    (state: RootState) => state.wodsReducer.inputWodRepValue
  );
  const initialName = useSelector(
    (state: RootState) => state.wodsReducer.initalNameExo
  );
  const initialRep = useSelector(
    (state: RootState) => state.wodsReducer.initialRepExo
  );
  const initialUnity = useSelector(
    (state: RootState) => state.wodsReducer.inputUnity
  );
  const typeValue = useSelector(
    (state: RootState) => state.wodsReducer.inputSelectTypeValue
  );
  const catValue = useSelector(
    (state: RootState) => state.wodsReducer.inputSelectCatValue
  );
  const wodIsSent = useSelector(
    (state: RootState) => state.wodsReducer.wodIsSent
  );
  const [elementCount, setElementCount] = useState(0);
  const [elementId, setElementId] = useState(1);

  const wodName = useSelector((state: RootState) => state.wodsReducer.wodName);
  const wodSubtitle = useSelector(
    (state: RootState) => state.wodsReducer.wodSubtitle
  );

  const isLogged = useSelector(
    (state: RootState) => state.userReducer.isLogged
  );

  const addElement = () => {
    if (elementCount <= 4) {
      const newArray = [...wodExo];
      const newEle = {
        id: elementId,
        activity: initialName,
        quantity: initialRep,
        unity: initialUnity,
      };
      newArray.push(newEle);
      setElementId((prev) => prev + 1);
      setElementCount((prev) => prev + 1);
      dispatch(actionSetWodExo(newArray));
    }
  };

  const delElement = (id: number | null) => {
    if (elementCount >= 0) {
      const updatedElements = wodExo.filter((element) => element.id !== id);
      dispatch(actionSetWodExo(updatedElements));
      setElementCount((prev) => prev - 1);
    }

    if (elementCount <= 0) {
      setElementCount(0);
    }
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = parseInt(event.target.value);
    dispatch(actionSetTypeValue(type));
  };

  const handleChangeCat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = parseInt(event.target.value);
    dispatch(actionSetCatValue(cat));
  };

  const handleChangeWodRep = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rep = parseInt(event.target.value);
    dispatch(actionSetRepWod(rep));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (wodExo.length === 0) {
      setHasAtLeastOneEx(false);
    } else {
      setHasAtLeastOneEx(true);
    }
    if (wodName === "") {
      setHasATitle(false);
    } else {
      setHasATitle(true);
    }
    if (wodSubtitle === "") {
      setHasASubTitle(false);
    } else {
      setHasASubTitle(true);
    }
    if (wodExo.length !== 0 && wodName !== "" && wodSubtitle !== "") {
      dispatch(actionCreateWod());
    }
  };
  useEffect(() => {
    dispatch(actionGetExercices());
    dispatch(actionGetCategories());
    dispatch(actionGetTypes());
    dispatch(actionGetRepetitions());
    dispatch(actionGetWodRepetitions());
    dispatch(actionGetWodActivies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(actionSetTypeValue(defaultType));
    dispatch(actionSetCatValue(defaultCat));
    dispatch(actionSetRepWod(defaultRep));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultType, defaultCat, defaultRep]);

  return (
    <>
      {isLogged && (
        <>
          {wodIsSent && (
            <Infobox content='Le wod a été soumis aux administrateurs. ' />
          )}
          {!hasAtLeastOneEx && (
            <p className='bg-red-400 p-2'>
              Veuillez ajouter au moins 1 exercice à votre wod.
            </p>
          )}
          {!hasATitle && (
            <p className='bg-red-400 p-2'>Veuillez ajouter un titre au wod.</p>
          )}
          {!hasASubTitle && (
            <p className='bg-red-400 p-2'>
              Veuillez ajouter un sous-titre au wod.
            </p>
          )}
          <div className='bg-white flex items-center p-4'>
            <form
              onSubmit={handleSubmit}
              className='w-full flex flex-wrap gap-4 justify-start'
              action='#'>
              <fieldset className='border flex flex-col items-start p-4 mb-4 w-1/3 '>
                <legend className='text-black rounded-sm bg-amber-500 px-2 py-1 text-base'>
                  {" "}
                  1 - Donne un nom à ton Wod !
                </legend>
                <p className='mt-1 text-sm leading-6 text-gray-600 mb-2'>
                  Le nom doit respecter les conditions d'utilisation du site.
                </p>
                <label
                  htmlFor='name'
                  className='block text-base font-medium leading-6 text-gray-900'>
                  Nom du Wod :
                </label>
                <input
                  type='text'
                  value={wodName}
                  onChange={(event) => {
                    dispatch(actionSetWodNameInput(event.target.value));
                  }}
                  id='name'
                  className=' border p-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mb-4'
                  placeholder='Nom du wod'
                />
                <label
                  htmlFor='name'
                  className='block text-base font-medium leading-6 text-gray-900'>
                  Sous-titre du Wod :
                </label>
                <input
                  type='text'
                  id='name'
                  value={wodSubtitle}
                  onChange={(event) => {
                    dispatch(actionSetWodSubtitleInput(event.target.value));
                  }}
                  className=' border p-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  placeholder='Sous-titre du wod'
                />
              </fieldset>
              <fieldset className='border flex flex-col items-start p-4 gap-2 mb-4'>
                <legend className='text-black rounded-sm bg-amber-500  px-2 py-1 text-base'>
                  {" "}
                  2 - Sélectionne les exercices !
                </legend>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  Un Wod doit être composé de 1 à 4 exercices maximum.
                </p>
                <label
                  htmlFor='exo'
                  className='block text-base font-medium leading-6 text-gray-900'>
                  Sélectionne un exercice :
                </label>
                {wodExo.map((ele) => (
                  <SelectExo key={ele.id} id={ele.id} del={delElement} />
                ))}
                {elementCount < 4 && (
                  <button
                    onClick={() => addElement()}
                    type='button'
                    className='rounded-md bg-white px-2.5 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                    Ajoute un exercice
                  </button>
                )}
              </fieldset>
              <fieldset className='border flex flex-col items-start p-4 gap-2 mb-4 '>
                <legend className='text-black rounded-sm bg-amber-500  px-2 py-1 text-base'>
                  {" "}
                  3 - Sélectionnez le type et la catégorie !
                </legend>
                <p className='mt-1 text-sm leading-6 text-gray-600 mb-2'>
                  HIIT / Tabata
                </p>
                <label
                  htmlFor='repWod'
                  className='block text-base font-medium leading-6 text-gray-900'>
                  Sélectionne le type de Wod :
                </label>
                <div className='flex items-center gap-x-2'>
                  <select
                    value={typeValue !== null ? typeValue : undefined}
                    onChange={(event) => handleChangeType(event)}
                    id='repWod'
                    className=' border p-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
                    {types &&
                      types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>
                <label
                  htmlFor='repWod'
                  className='block text-base font-medium leading-6 text-gray-900'>
                  Sélectionne la catégorie du wod :
                </label>
                <div className='flex items-center gap-x-2'>
                  <select
                    onChange={(event) => handleChangeCat(event)}
                    value={catValue !== null ? catValue : undefined}
                    id='repWod'
                    className=' border p-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
                    {categories &&
                      categories.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie.name}
                        </option>
                      ))}
                  </select>
                </div>
              </fieldset>
              <fieldset className='border flex flex-col items-start p-4 gap-2 mb-4'>
                <legend className='text-black rounded-sm bg-amber-500  px-2 py-1 text-base'>
                  {" "}
                  4 - Sélectionne le nombre de répétitions !
                </legend>
                <p className='mt-1 text-sm leading-6 text-gray-600 mb-2'>
                  Le nombre maximale de répétitions pour un wod est de 4000.
                </p>
                <label
                  htmlFor='repWod'
                  className='block text-base font-medium leading-6 text-gray-900'>
                  Sélectionne le nombre de répétitions :
                </label>
                <div className='flex items-center gap-x-2'>
                  <select
                    value={repWodValue}
                    onChange={(event) => handleChangeWodRep(event)}
                    id='repWod'
                    className=' border p-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
                    {wodsRepetition &&
                      wodsRepetition.map((wodRep) => (
                        <option key={wodRep.id} value={wodRep.id}>
                          x {wodRep.repetition}
                        </option>
                      ))}
                  </select>
                  <p className='text-gray-900 text-sm'>répétition(s)</p>
                </div>
              </fieldset>

              {/* <fieldset className='border flex flex-col items-start p-4 gap-2 mb-4 '>
      <legend className='text-white bg-blue-950 px-2 py-1 text-base'>
        {" "}
        5 - Sélectionne un visuel !
      </legend>
      <p className='mt-1 text-sm leading-6 text-gray-600 mb-2'>
        L'image doit faire 400x400.
      </p>
      <input
        className='text-sm'
        type='file'
        accept='image/png, image/jpeg'
      />
    </fieldset> */}
              <button
                type='submit'
                className='text-black bg-amber-500 hover:bg-amber-700 rounded p-6 self-center'>
                Crée ton Wod !
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddWod;
