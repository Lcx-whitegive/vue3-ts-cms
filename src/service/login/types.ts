export interface IAccount {
  name: string
  password: string
}
export interface IResult<T = any> {
  code: number
  data: T
}
