import { useSelector } from "react-redux";
import Connexion from "../Connexion/Connexion";
import Inscription from "../Inscription/Inscription";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  actionSetConnexionIsClicked,
  actionSetInscriptionIsClicked,
  actionSetMenuIsClicked,
} from "../../store/actions/menuReducer";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import UserNavBloc from "../UserNavBloc/UserNavBloc";
import { FiMenu } from "react-icons/fi";

const Navigation = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);

  const connexionIsClicked = useSelector(
    (state: RootState) => state.userReducer.connexionIsClicked
  );
  const menuIsClicked = useSelector((state: RootState) => state.userReducer.menuIsClicked);
  const inscriptionIsClicked = useSelector(
    (state: RootState) => state.userReducer.inscriptionIsClicked
  );

  const handleClickMenu = () => {
    dispatch(actionSetConnexionIsClicked());
  };

  const handleClickInscription = () => {
    dispatch(actionSetInscriptionIsClicked());
  };

  return (
    <>
      <div className='nav px-2 w-full text-amber-500 font-bold overflow-hidden'>
        <nav>
          <ul className='flex h-20 justify-between items-center'>
            <div className='md:flex hidden gap-x-16 bg-transparent rounded-3xl px-4 hover:cursor-pointer'>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    !isActive ? "hover:text-red-600 link" : "text-red-600 link"
                  }
                  to='/'>
                  Acceuil
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    !isActive ? "hover:text-red-600 link" : "text-red-600 link"
                  }
                  to='/wods'>
                  Les Wod's
                </NavLink>
              </li>
              <li className='hover:text-red-600'>
                <NavLink
                  className={({ isActive }) =>
                    !isActive ? "hover:text-red-600 link" : " text-red-600 link"
                  }
                  to='/exercices'>
                  Les Exercices
                </NavLink>
              </li>
              <li className='hover:text-red-600'>
                <NavLink
                  className={({ isActive }) =>
                    !isActive ? "hover:text-red-600 link" : " text-red-600 link"
                  }
                  to='/add-your-wod'>
                  Propose ton Wod
                </NavLink>
              </li>
            </div>
            {!isLogged && (
              <li onClick={handleClickMenu} className='md:flex hidden hover:cursor-pointer'>
                Se connecter - S'inscrire
              </li>
            )}
            {isLogged && <UserNavBloc />}

            {!isLogged && (
              <li onClick={handleClickMenu} className='text-sm sm:text-lg md:hidden mx-2'>
                Se connecter - S'inscrire
              </li>
            )}

            <span
              onClick={() => dispatch(actionSetMenuIsClicked())}
              className='md:hidden flex hover:cursor-pointer'>
              <FiMenu />
            </span>
          </ul>
        </nav>
        <nav className={menuIsClicked ? "block" : "hidden"}>
          <ul className='py-4 text-amber-500 text-lg max-h-screen flex flex-col justify-center border-t gap-y-4'>
            <li>
              <NavLink to='/wods' onClick={() => dispatch(actionSetMenuIsClicked())}>
                Les Wod's
              </NavLink>
            </li>
            <li>
              <NavLink to='/exercices' onClick={() => dispatch(actionSetMenuIsClicked())}>
                Les Exercices
              </NavLink>
            </li>
            <li>
              <NavLink to='/add-your-wod' onClick={() => dispatch(actionSetMenuIsClicked())}>
                Propose ton Wod
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex justify-end'>
        {connexionIsClicked && <Connexion clickInscription={handleClickInscription} />}
      </div>
      <div className='flex justify-end'>{inscriptionIsClicked && <Inscription />}</div>
    </>
  );
};

export default Navigation;
