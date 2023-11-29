export interface Imenu {
  connexionIsClicked: boolean;
  inscriptionIsClicked: boolean;
  menuIsClicked: boolean;
  isLogged: boolean;
  isUnlogged: boolean;
  emailInput: string;
  passwordInput: string;
  passwordCheckInput: string;
  pseudoInput: string;
  userId: number | null;
  userName: string;
  userEmail: string;
  userPassword: string;
  userFav: Array;
  wodsCreatedByUser: Array;
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
  token: string;
}

export interface IJwtPayload {
  id: number;
  roles: string[];
  email: string;
}

interface IUserLoad {
  username: string;
  userId: number;
  userFav: string[];
  isLogged: boolean;
  token: string;
}
