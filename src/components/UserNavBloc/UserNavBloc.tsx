import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { GiMuscleUp } from "react-icons/gi";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IJwtPayload } from "../../@types/connexion_menu";
import { actionGetUser } from "../../store/thunk/thunk";

const UserNavBloc = () => {
  const dispatch = useDispatch() as AppDispatch;
  const username = useSelector((state: RootState) => state.userReducer.userName);

  const token = useSelector((state: RootState) => state.userReducer.token);
  const userFav = useSelector((state: RootState) => state.userReducer.userFav);
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);
  const userId = useSelector((state: RootState) => state.userReducer.userId);
  const userInformation = {
    token,
    username,
    isLogged,
    userId,
    userFav,
  };
  const [items, setItems] = useState(userInformation);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setItems(userInformation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, isLogged, userId, userFav]);

  useEffect(() => {
    const decodedToken: IJwtPayload = jwtDecode(token);
    const userId = decodedToken.id;
    dispatch(actionGetUser(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link to='/profil'>
      <div className='flex items-center mr-4 gap-2 '>
        <span className=''>{username}</span>
        <GiMuscleUp />
      </div>
    </Link>
  );
};

export default UserNavBloc;
