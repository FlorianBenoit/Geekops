import { createAction } from "@reduxjs/toolkit";
import { IUserLoad } from "../../@types/connexion_menu";

export const actionSetEmailInput = createAction<string>("SET_EMAIL_INPUT");
export const actionSetPasswordInput = createAction<string>("SET_PASSWORD_INPUT");
export const actionSetPasswordCheckedInput = createAction<string>("SET_PASSWORDCHECK_INPUT");
export const actionSetPseudoInput = createAction<string>("SET_PSEUDO_INPUT");
export const actionSetButtonStates = createAction<boolean[]>("SET_BUTTON_STATES");
export const actionSetErrorMessage = createAction<string>("SET_ERROR_MESSAGE");
export const actionUnlogUser = createAction("UNLOG_USER");
export const actionLoadUserfromStorage = createAction<IUserLoad>("LOAD_USER");
export const actionSetWodNameInput = createAction<string>("SET_WOD_NAME_INPUT");
export const actionSetWodSubtitleInput = createAction<string>("SET_WOD_SUBTITLE_INPUT");
