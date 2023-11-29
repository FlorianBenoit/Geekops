import { createReducer } from "@reduxjs/toolkit";
import { Imenu } from "../../@types/connexion_menu";
import {
  actionSetConnexionIsClicked,
  actionSetInscriptionIsClicked,
  actionSetMenuIsClicked,
} from "../actions/menuReducer";
import {
  actionAddFav,
  actionCreateUser,
  actionCreateWod,
  actionDeleteFav,
  actionGetCategories,
  actionGetExercices,
  actionGetRepetitions,
  actionGetTypes,
  actionGetUser,
  actionGetWodActivies,
  actionGetWodRepetitions,
  actionGetWods,
  actionLogUser,
} from "../thunk/thunk";
import { IWods } from "../../@types/wods";
import {
  actionLoadUserfromStorage,
  actionSetButtonStates,
  actionSetEmailInput,
  actionSetErrorMessage,
  actionSetPasswordCheckedInput,
  actionSetPasswordInput,
  actionSetPseudoInput,
  actionUnlogUser,
} from "../actions/usersReducer";
import {
  actionSetCatValue,
  actionSetDefaultName,
  actionSetDefaultRep,
  actionSetNameExo,
  actionSetRepExo,
  actionSetRepWod,
  actionSetTypeValue,
  actionSetUnityValue,
  actionSetWodExo,
  actionSetWodNameInput,
  actionSetWodSubtitleInput,
} from "../actions/wodsReducer";

const initialStateMenu: Imenu = {
  connexionIsClicked: false,
  inscriptionIsClicked: false,
  menuIsClicked: false,
  isLogged: false,
  isUnlogged: false,
  emailInput: "",
  passwordInput: "",
  passwordCheckInput: "",
  pseudoInput: "",
  token: "",
  userId: null,
  userName: "",
  userEmail: "",
  userPassword: "testpassword",
  userFav: [],
  wodsCreatedByUser: [],
  isError: false,
  isLoading: false,
  errorMessage: "",
};

const initialStateWods: IWods = {
  wods: [],
  exercices: [],
  categories: [],
  types: [],
  repetitions: [],
  activities: [],
  wodRepetitions: [],
  buttonStates: [false, false, false],
  wodsLoaded: false,
  isLoading: false,
  wodName: "",
  wodSubtitle: "",
  wodExo: [],
  initalNameExo: undefined,
  initialRepExo: undefined,
  inputSelectTypeValue: undefined,
  inputSelectCatValue: undefined,
  inputWodRepValue: undefined,
  inputUnity: 1,
  isError: false,
  errorMessage: "",
  wodIsSent: false,
};

export const userReducer = createReducer(initialStateMenu, (builder) => {
  builder
    .addCase(actionSetConnexionIsClicked, (state) => {
      state.connexionIsClicked = !state.connexionIsClicked;
      state.inscriptionIsClicked = false;
    })
    .addCase(actionSetInscriptionIsClicked, (state) => {
      state.inscriptionIsClicked = true;
    })
    .addCase(actionCreateUser.fulfilled, (state, action) => {
      state.isLogged = true;
      state.inscriptionIsClicked = false;
      state.connexionIsClicked = false;
      state.isError = false;
      state.errorMessage = "";
      state.userName = state.pseudoInput;
      state.token = action.payload.token;
    })
    .addCase(actionCreateUser.rejected, (state, action) => {
      state.isError = true;
      state.connexionIsClicked = false;
      switch (action.error.message) {
        case "Request failed with status code 409":
          state.errorMessage = "Compte déjà existant avec cet email.";
          break;
        default:
          state.errorMessage = "Erreur server";
          break;
      }
    })
    .addCase(actionLogUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.isLogged = true;
      state.isUnlogged = false;
      state.userName = state.pseudoInput;
      state.pseudoInput = "";
      state.connexionIsClicked = false;
      state.token = action.payload.token;
    })
    .addCase(actionLogUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionLogUser.rejected, (state, action) => {
      state.isError = true;
      switch (action.error.message) {
        case "Request failed with status code 401":
          state.errorMessage = "Les identifiants de connexion sont incorrects.";
          break;
        default:
          state.errorMessage = "Erreur server";
          break;
      }
    })
    .addCase(actionUnlogUser, (state) => {
      state.isLogged = false;
      state.isUnlogged = true;
      state.userName = "";
      state.passwordInput = "";
      state.userId = null;
      state.userFav = [];
    })
    .addCase(actionGetUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userId = action.payload.id;
      state.userEmail = action.payload.email;
      state.userName = action.payload.username;
      state.userFav = action.payload.wodIdLiked;
      state.wodsCreatedByUser = action.payload.createdWods;
    })
    .addCase(actionAddFav.fulfilled, (state, action) => {
      state.userFav.push(action.payload.wod.id);
    })
    .addCase(actionDeleteFav.fulfilled, (state, action) => {
      const wodIdDisliked = action.payload.wodId;
      const indexToRemove = state.userFav.indexOf(wodIdDisliked);
      state.userFav.splice(indexToRemove, 1);
    })
    .addCase(actionGetUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionSetMenuIsClicked, (state) => {
      state.menuIsClicked = !state.menuIsClicked;
    })
    .addCase(actionSetEmailInput, (state, action) => {
      state.emailInput = action.payload;
    })
    .addCase(actionSetPasswordInput, (state, action) => {
      state.passwordInput = action.payload;
    })
    .addCase(actionSetPasswordCheckedInput, (state, action) => {
      state.passwordCheckInput = action.payload;
    })
    .addCase(actionSetPseudoInput, (state, action) => {
      state.pseudoInput = action.payload;
    })
    .addCase(actionSetErrorMessage, (state, action) => {
      state.errorMessage = action.payload;
      state.isError = true;
    })
    .addCase(actionLoadUserfromStorage, (state, action) => {
      state.userName = action.payload.username;
      state.userId = action.payload.userId;
      state.userFav = action.payload.userFav;
      state.isLogged = action.payload.isLogged;
      state.token = action.payload.token;
    });
});

export const wodsReducer = createReducer(initialStateWods, (builder) => {
  builder
    .addCase(actionGetWods.fulfilled, (state, action) => {
      state.wods = action.payload;
      state.isLoading = false;
      state.wodsLoaded = true;
      state.wodIsSent = false;
    })
    .addCase(actionGetWods.pending, (state) => {
      state.isLoading = true;
      state.wodIsSent = false;
    })
    .addCase(actionGetWods.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = "Erreur pendant le chargement des wods.";
      state.wodIsSent = false;
    })
    .addCase(actionSetButtonStates, (state, action) => {
      state.buttonStates = action.payload;
    })
    .addCase(actionGetExercices.fulfilled, (state, action) => {
      state.activities = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.wodIsSent = false;
    })
    .addCase(actionGetExercices.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
      state.wodIsSent = false;
    })
    .addCase(actionGetExercices.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = "Erreur durant le chargement des exercices.";
      state.wodIsSent = false;
    })
    .addCase(actionGetCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    })
    .addCase(actionGetTypes.fulfilled, (state, action) => {
      state.types = action.payload;
      state.isLoading = false;
    })
    .addCase(actionGetRepetitions.fulfilled, (state, action) => {
      state.repetitions = action.payload;
      state.isLoading = false;
    })
    .addCase(actionGetWodActivies.fulfilled, (state, action) => {
      state.activities = action.payload;
      state.isLoading = false;
    })
    .addCase(actionGetWodActivies.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionGetWodRepetitions.fulfilled, (state, action) => {
      state.wodRepetitions = action.payload;
      state.isLoading = false;
    })
    .addCase(actionGetWodRepetitions.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionGetTypes.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionGetCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionGetRepetitions.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(actionSetWodExo, (state, action) => {
      state.wodExo = action.payload;
    })
    .addCase(actionSetNameExo, (state, action) => {
      state.initalNameExo = action.payload.name;
      const found = state.wodExo.find(
        (element) => element.id === action.payload.id
      );
      found ? (found.activity = action.payload.name) : null;
    })
    .addCase(actionSetRepExo, (state, action) => {
      state.initialRepExo = action.payload.rep;

      const found = state.wodExo.find(
        (element) => element.id === action.payload.id
      );
      found ? (found.quantity = action.payload.rep) : null;
    })
    .addCase(actionSetRepWod, (state, action) => {
      state.inputWodRepValue = action.payload;
    })
    .addCase(actionSetWodNameInput, (state, action) => {
      state.wodName = action.payload;
    })
    .addCase(actionSetWodSubtitleInput, (state, action) => {
      state.wodSubtitle = action.payload;
    })
    .addCase(actionSetTypeValue, (state, action) => {
      state.inputSelectTypeValue = action.payload;
    })
    .addCase(actionSetCatValue, (state, action) => {
      state.inputSelectCatValue = action.payload;
    })
    .addCase(actionSetDefaultName, (state, action) => {
      state.initalNameExo = action.payload.initialName;
      const found = state.wodExo.find((ele) => ele.id === action.payload.id);
      const index = state.wodExo.indexOf(found);
      state.wodExo[index].activity = action.payload.initialName;
    })
    .addCase(actionSetDefaultRep, (state, action) => {
      state.initialRepExo = action.payload.initialRep;
      const found = state.wodExo.find((ele) => ele.id === action.payload.id);
      const index = state.wodExo.indexOf(found);
      state.wodExo[index].quantity = action.payload.initialRep;
    })
    .addCase(actionSetUnityValue, (state, action) => {
      state.inputUnity = action.payload.value;
      const found = state.wodExo.find((ele) => ele.id === action.payload.id);
      const index = state.wodExo.indexOf(found);
      state.wodExo[index].unity = action.payload.value;
    })
    .addCase(actionCreateWod.fulfilled, (state) => {
      state.wodIsSent = true;
      state.wodName = "";
      state.wodSubtitle = "";
    })
    .addCase(actionCreateWod.pending, (state) => {
      state.wodIsSent = false;
    })
    .addCase(actionCreateWod.rejected, (state) => {
      state.wodIsSent = false;
    });
});
