import { ILoginState } from './login/types'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModules {
  loginModule: ILoginState
}

export type IStoreType = IRootState & IRootWithModules
