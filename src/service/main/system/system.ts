import cxRequest from '@/service'
import { IResult } from '@/service/login/types'

export const getPageList = (url: string, queryInfo: any) => {
  return cxRequest.post<IResult>({
    url,
    data: queryInfo
  })
}

export const deletePageData = (url: string) => {
  return cxRequest.delete<IResult>({
    url
  })
}

export const addPageData = (url: string, info: any) => {
  return cxRequest.post<IResult>({
    url,
    data: info
  })
}

export const editPageData = (url: string, info: any) => {
  return cxRequest.patch<IResult>({
    url,
    data: info
  })
}
