/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Banner } from "./components/Banner/Banner";
import { BottomBanner } from "./components/BottomBanner/BottomBanner";
import Footer from "./components/Footer/Footer";
import { WodCard } from "./components/WodCard/WodCard";
import { HomeCarousel } from "./components/HomeCarousel/HomeCarousel";
import { Route, Routes, useLocation } from "react-router-dom";
import Wod from "./components/Wod/Wod";
import ProfilPage from "./components/ProfilPage/ProfilPage";
import { Filter } from "./components/Filter/Filter";
import { ExerciceCard } from "./components/ExerciceCard/ExerciceCard";
import { MentionLegale } from "./components/MentionLegale/MentionLegale";
import Error from "./components/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import AddWod from "./components/AddWod/AddWod";
import Loader from "./components/Loader/Loader";
import { useEffect } from "react";
import { actionLoadUserfromStorage } from "./store/actions/usersReducer";
import { IUserLoad } from "./@types/connexion_menu";
import Navigation from "./components/Navigation/Navigation";
import Error404 from "./components/Error404/Error404";
import RandomWod from "./components/RandomWod/RandomWod";

function App() {
  const dispatch = useDispatch() as AppDispatch;
  const creationError = useSelector((state: RootState) => state.userReducer.isError);
  const isLoading = useSelector((state: RootState) => state.wodsReducer.isLoading);
  const storedData: string | null = localStorage.getItem("items");
  const wods = useSelector((state: RootState) => state.wodsReducer.wods);
  const items: IUserLoad | null = storedData ? JSON.parse(storedData) : null;

  useEffect(() => {
    if (items) {
      dispatch(actionLoadUserfromStorage(items));
    }
  }, [items]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 100,
    });
  }, [location.pathname]);

  return (
    <>
      {creationError && <Error />}
      <Navigation />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Banner title='Wod Experience' subtitle="Le sport n'importe où, n'importe quand !" />
              <HomeCarousel />
              <RandomWod />
            </>
          }
        />
        <Route
          path='/wods'
          element={
            <>
              <Banner title='Les Wods' subtitle="Wods-Wods, that's the sound of da police !" />
              <Filter />
              {isLoading && <Loader />}
              <WodCard displayHearth={true} wods={wods} />
              <BottomBanner />
            </>
          }
        />
        <Route
          path='/exercices'
          element={
            <>
              <Banner
                title='Les exercices'
                subtitle='Voici comment réaliser correctement vos exercices !'
              />
              <Filter />
              {isLoading && <Loader />}
              <ExerciceCard />
              <BottomBanner />
            </>
          }
        />
        <Route
          path='/add-your-wod'
          element={
            <>
              <Banner
                title='Propose ton Wod !'
                subtitle='Libérez votre créativité sportive en façonnant le WOD de vos rêves !'
              />
              <AddWod />
              <BottomBanner />
            </>
          }
        />
        <Route path='/profil' element={<ProfilPage />} />
        <Route
          path='/contact'
          element={
            <>
              <Banner title='Nous contacter' subtitle='' />
              <p>Contactez-nous</p>
            </>
          }
        />
        <Route
          path='/legal'
          element={
            <>
              <Banner title='Mentions legales' subtitle='' />
              <MentionLegale />
            </>
          }
        />
        <Route path='/wod/:wodId' element={<Wod />} />
        <Route path='/add-your-wod' element={<p>Proposez un exercice</p>} />
        <Route path='*' element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
