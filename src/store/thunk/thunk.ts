import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const actionGetWods = createAsyncThunk(
  "GET_WODS",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/wods/");
    const data = results.data;
    return data;
  }
);

export const actionGetExercices = createAsyncThunk(
  "GET_EXERCICES",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/activities");
    const data = results.data;
    return data;
  }
);

export const actionGetCategories = createAsyncThunk(
  "GET_CATEGORIES",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/categories");
    const data = results.data;
    return data;
  }
);

export const actionGetTypes = createAsyncThunk(
  "GET_TYPES",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/types");
    const data = results.data;
    return data;
  }
);

export const actionGetRepetitions = createAsyncThunk(
  "GET_REPETITIONS",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/quantities");
    const data = results.data;
    return data;
  }
);

export const actionGetWodRepetitions = createAsyncThunk(
  "GET_WOD_REPETITIONS",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/wods/repetitions");
    const data = results.data;
    return data;
  }
);

export const actionGetWodActivies = createAsyncThunk(
  "GET_WOD_ACTIVITIES",

  async () => {
    const results = await axios("http://127.0.0.1:8080/api/activities");
    const data = results.data;
    return data;
  }
);

export const actionGetUser = createAsyncThunk(
  "GET_USER",

  async (arg: number) => {
    const results = await axios(`http://127.0.0.1:8080/api/users/${arg}`);
    const data = results.data;
    return data;
  }
);

export const actionCreateUser = createAsyncThunk(
  "CREATE_USER",

  async (_, APIthunk) => {
    const state = APIthunk.getState() as RootState;
    const username = state.userReducer.pseudoInput;
    const mail = state.userReducer.emailInput;
    const password = state.userReducer.passwordInput;
    const results = await axios.post("http://127.0.0.1:8080/api/users/", {
      username,
      mail,
      password,
    });

    const data = results.data;
    console.log(data);
    return data;
  }
);

export const actionLogUser = createAsyncThunk(
  "LOG_USER",

  async (_, APIthunk) => {
    const state = APIthunk.getState() as RootState;
    const pseudoInput = state.userReducer.pseudoInput;
    const password = state.userReducer.passwordInput;
    const results = await axios.post("http://127.0.0.1:8080/api/login", {
      username: pseudoInput,
      password: password,
    });
    const data = results.data;
    return data;
  }
);

export const actionAddFav = createAsyncThunk(
  "ADD_FAV",

  async (arg: number | null, APIthunk) => {
    const state = APIthunk.getState() as RootState;
    const userId = state.userReducer.userId;
    const results = await axios.post("http://127.0.0.1:8080/api/likes/", {
      wod: arg,
      user: userId,
    });
    const data = results.data;
    return data;
  }
);

export const actionDeleteFav = createAsyncThunk(
  "DELETE_FAV",

  async (arg: number | null, APIthunk) => {
    const state = APIthunk.getState() as RootState;
    const userId = state.userReducer.userId;
    const results = await axios.delete(`http://127.0.0.1:8080/api/likes/${userId}/${arg}`);
    const data = results.data;
    return data;
  }
);

export const actionCreateWod = createAsyncThunk(
  "CREATE_WOD",

  async (_, APIthunk) => {
    const state = APIthunk.getState() as RootState;
    const userId = state.userReducer.userId;
    const wodName = state.wodsReducer.wodName;
    const wodSub = state.wodsReducer.wodSubtitle;
    const wodExo = state.wodsReducer.wodExo;
    const wodType = state.wodsReducer.inputSelectTypeValue;
    const wodCat = state.wodsReducer.inputSelectCatValue;
    const wodRep = state.wodsReducer.inputWodRepValue;
    const results = await axios.post("http://127.0.0.1:8080/api/wods/", {
      name: wodName,
      description: wodSub,
      type: wodType,
      exercices: wodExo,
      author: userId,
      category: wodCat,
      repetition: wodRep,
    });
    const data = results.data;
    return data;
  }
);
