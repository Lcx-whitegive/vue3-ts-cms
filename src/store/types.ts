import { IDashboardState } from './analysis/types'
import { ILoginState } from './login/types'
import { ISystemState } from './system/types'
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModules {
  loginModule: ILoginState
  systemModule: ISystemState
  dashboardModule: IDashboardState
}

export type IStoreType = IRootState & IRootWithModules
