export interface IWod {
  id: number;
  name: string;
  image: string;
  description: string;
  type: {
    id: number;
    name: string;
  };
  exercices: Array<{
    id: number;
    activity: {
      id: number;
      name: string;
    };
    quantity: {
      id: number;
      number: number;
    };
    unity: {
      id: number;
      name: string;
    };
  }>;
  category: {
    id: number;
    name: string;
  };
  comment: Array<string>;
  repetition: {
    id: number;
    repetition: number;
    time: number;
  };
  status: boolean;
}

export interface IExercices {
  id: number;
  activity: {
    id: number;
    name: string;
    image: string;
    category: {
      name: string;
    };
    description: string;
  };
  quantity: {
    id: number;
    number: number;
  };
  unity: {
    id: number;
    name: string;
  };
}

export interface ITypes {
  id: number;
  name: string;
}

export interface IActivity {
  id: number;
  name: string;
  image: string;
  category: {
    id: number;
    name: string;
  };
  description: string;
}

export interface ICategories {
  id: number;
  name: string;
}

export interface IRepetitions {
  id: number;
  number: string;
}

export interface IWodRepetitions {
  id: number;
  repetition: string;
}

export interface IWods {
  wods: IWod[];
  exercices: IExercices[];
  repetitions: IRepetitions[];
  wodRepetitions: IWodRepetitions[];
  types: ITypes[];
  activities: IActivity[];
  categories: ICategories[];
  buttonStates: boolean[];
  wodsLoaded: boolean;
  isLoading: boolean;
  wodExo: IWodExo[];
  initalNameExo: number | undefined;
  initialRepExo: number | undefined;
  wodName: string;
  wodSubtitle: string;
  inputSelectTypeValue: number | undefined;
  inputSelectCatValue: number | undefined;
  inputWodRepValue: number | undefined;
  isError: boolean;
  errorMessage: string;
  inputUnity: number;
  wodIsSent: boolean;
}

export interface IWodExercices {
  id: number | null;
  activity: {
    id: number;
    name: string;
  };
  quantity: {
    id: number;
    number: number;
  };
  unity: {
    id: number;
    name: string;
  };
}

export interface Ihistoric {
  id: number;
  date: string;
  rounds: number;
  comment: string | undefined;
  time: number;
}

export interface IWodExo {
  id: number;
  activity: number | undefined;
  quantity: number | undefined;
  unity: number;
}
