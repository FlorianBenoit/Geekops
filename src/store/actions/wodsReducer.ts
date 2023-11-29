import { createAction } from "@reduxjs/toolkit";
import { IWodExo } from "../../@types/wods";

export const actionSetWodExo = createAction<IWodExo[]>("SET_WOD_EXOS");
export const actionSetInitialExoValue = createAction("SET_INITIAL_EXO");
export const actionSetNameExo = createAction<{
  name: number;
  id: number | null;
}>("SET_WOD_NAME");
export const actionSetRepExo = createAction<{ rep: number; id: number | null }>(
  "SET_WOD_REP"
);
export const actionSetWodNameInput = createAction<string>("SET_WOD_NAME_INPUT");
export const actionSetWodSubtitleInput = createAction<string>(
  "SET_WOD_SUBTITLE_INPUT"
);
export const actionSetCatValue = createAction<number | undefined>(
  "SET_CAT_VALUE"
);
export const actionSetTypeValue = createAction<number | undefined>(
  "SET_TYPE_VALUE"
);
export const actionSetRepWod = createAction<number | undefined>(
  "SET_REP_WOD_VALUE"
);
export const actionSetDefaultName = createAction<{
  initialName: number | undefined;
  id: number | null;
}>("SET_DEFAULT_NAME");
export const actionSetDefaultRep = createAction<{
  initialRep: number | undefined;
  id: number | null;
}>("SET_DEFAULT_REP");
export const actionSetUnityValue = createAction<{
  value: number;
  id: number | null;
}>("SET_UNITY_VALUE");
