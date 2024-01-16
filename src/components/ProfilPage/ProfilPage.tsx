import { useEffect } from "react";
import { WodCard } from "../WodCard/WodCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { actionUnlogUser } from "../../store/actions/usersReducer";
import { Navigate } from "react-router-dom";
import { actionGetUser } from "../../store/thunk/thunk";
import { jwtDecode } from "jwt-decode";
import Loader from "../Loader/Loader";

interface IJwtPayload {
  id: number;
  roles: string[];
  email: string;
}

function ProfilPage() {
  // const [showPassword, setShowPassword] = useState(false);

  const isUnlogged = useSelector((state: RootState) => state.userReducer.isUnlogged);

  const dispatch = useDispatch() as AppDispatch;
  const token = useSelector((state: RootState) => state.userReducer.token);
  let userId: number;
  let userRoles: string[] = [];
  if (token) {
    const decodedToken: IJwtPayload = jwtDecode(token);
    userId = decodedToken.id;
    userRoles = decodedToken.roles;
  }
  const email = useSelector((state: RootState) => state.userReducer.userEmail);
  const username = useSelector((state: RootState) => state.userReducer.userName);
  const isLoading = useSelector((state: RootState) => state.userReducer.isLoading);
  const wods = useSelector((state: RootState) => state.wodsReducer.wods);
  const wodsFav = useSelector((state: RootState) => state.userReducer.userFav);
  const wodsCreated = useSelector((state: RootState) => state.userReducer.wodsCreatedByUser);
  const userFav = wods.filter((val) => wodsFav.includes(val.id));
  const wodsCreatedToDisplay = wods.filter((val) => wodsCreated.includes(val.id));
  // useEffect(() => {
  //   if (!isEditable) {
  //     setShowPassword(false);
  //   }
  // }, [isEditable]);

  const handleLogout = () => {
    localStorage.removeItem("items");
    dispatch(actionUnlogUser());
  };

  const getStatusClass = (status: boolean) => {
    return status
      ? "text-green-600 font-semibold p-2 border"
      : "text-red-600 font-semibold p-2 border";
  };

  useEffect(() => {
    if (token) {
      dispatch(actionGetUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleImageModification = () => {
  //   setImageModifiable(!imageModifiable);
  // };

  // const handleNomPseudoModification = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (isEditable) {
  //     setNomPseudo(event.target.value);
  //   }
  // };

  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (isEditable) {
  //     setEmail(event.target.value);
  //   }
  // };

  // const handleMotDePasseChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (isEditable) {
  //     setMotDePasse(event.target.value);
  //   }
  // };

  // const handleEditMode = () => {
  //   setIsEditable(!isEditable);
  // };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className='min-h-screen flex flex-col items-center bg-white border-t'>
      <h1 className='text-3xl my-6 text-black'>Bonjour {username} !</h1>
      <div className='flex flex-col gap-2 rounded-lg p-3 mb-6'>
        {/* <div className='mb-2 w-32 h-32 mx-auto relative'>
          {imageModifiable ? (
            <div>
              <input type='file' accept='image/*' className='mb-4' />
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                onClick={handleImageModification}>
                Enregistrer
              </button>
            </div>
          ) : (
            <div
              className='relative w-32 h-32 overflow-hidden bg-gray-100 rounded-full cursor-pointer'
              onClick={handleImageModification}>
              <div className='avatar-background'>
                <img src='lien_de_l_image.jpg' alt='' />
              </div>
            </div>
          )}
        </div> */}
        <div>
          <label className='text-gray-600 dark:text-gray-600'>Pseudo</label>
          {/* <input
            className={`w-full py-3 rounded-lg px-3 ${
              isEditable ? "border border-slate-200" : "border-none"
            }`}
            type='text'
            value={username}
            // onChange={handleNomPseudoModification}
            disabled={!isEditable}
          /> */}
          <input
            className='w-full py-3 rounded-lg px-3 border-none '
            type='text'
            value={username}
            disabled
          />
        </div>

        <div>
          <label className='text-gray-600 dark:text-gray-600'>Email</label>
          {/* <input
            className={`w-full py-3 rounded-lg px-3 ${
              isEditable ? "border border-slate-200" : "border-none"
            }`}
            type='text'
            value={email}
            // onChange={handleEmailChange}
            disabled={!isEditable}
          /> */}
          <input
            className='w-full py-3 rounded-lg px-3 border-none'
            type='text'
            value={email}
            disabled
          />
        </div>
      </div>
      <div className='flex gap-6 mb-12'>
        {/* <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg'
          onClick={handleEditMode}>
          {isEditable ? "Valider" : "Modifier"}
        </button> */}
        <button
          onClick={handleLogout}
          className='bg-orange-400 text-white px-2 py-2 md:px-4 md:py-2 rounded-lg'>
          Se déconnecter
        </button>
        {userRoles.includes("ROLE_ADMIN") && (
          <button className='bg-orange-700 text-white px-2 py-2  md:px-4 md:py-2 rounded-lg'>
            <a href='http://127.0.0.1:8080' target='blank'>
              Administration
            </a>
          </button>
        )}

        {isUnlogged && <Navigate to='/' replace={true} />}
      </div>
      {isLoading && <Loader />}
      <div className='w-full border-t-2 mb-6'>
        <h3 className='text-3xl my-6 text-black mb-0'>Vos Wod's favoris !</h3>
        <p className='text-black italic px-4'>
          Retrouvez ici vos Wod's préférés pour retrailler quand vous voulez vos exercices !
        </p>
        {userFav.length === 0 && (
          <div className='flex flex-col items-center'>
            <p className='text-black px-4 mb-12'>
              Ajoutez des wods en favoris et retrouvez-les ici dans votre espace personnel !
            </p>
            <img src='/coeur.png' alt='' className='w-48 ' />
          </div>
        )}
        <WodCard displayHearth={true} wods={userFav} />
      </div>

      <div className='w-full border-t-2'>
        <h3 className='text-3xl my-6 text-black mb-0'>Vos Wod's créés</h3>
        <p className='text-black italic px-4 mb-6'>
          Vos Wod's créés sont référencés ici. Suivez leur validation avant qu'ils soient proposés à
          toute la communauté !
        </p>
        <div className='flex flex-col items-center'>
          {wodsCreated.length === 0 && (
            <>
              <p className='text-black px-4 mb-12'>
                Créez vos Wod's personnalisés et retrouvez les ici !
              </p>
              <img src='/rocket.png' alt='' className='w-56 ' />
            </>
          )}
          {wodsCreated.length !== 0 && (
            // <WodCard displayHearth={false} wods={wodsCreatedToDisplay} />
            <div className='overflow-x-auto w-full md:w-auto'>
              <table className='table-fixed text-black border'>
                <thead className='bg-orange-200'>
                  <tr>
                    <th className='p-2'>Nom</th>
                    <th>Description</th>
                    <th>Catégorie</th>
                    <th>Type</th>
                    <th>Nombres d'exercices</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className='border'>
                  {wodsCreatedToDisplay.map((ele) => (
                    <tr key={ele.id} className='border'>
                      <td className='p-2 border'>{ele.name}</td>
                      <td className='p-2 border'>{ele.description}</td>
                      <td className='p-2 border'>{ele.category.name}</td>
                      <td className='p-2 border'>{ele.type.name}</td>
                      <td className='p-2 border'>{ele.exercices.length}</td>
                      <td className={getStatusClass(ele.status)}>
                        {ele.status === true ? "Validé" : "En attente"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
