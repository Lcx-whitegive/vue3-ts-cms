import { useStore } from '@/store'

export default function useQueryPermissions(
  pageName: string,
  handleName: string
) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions

  const verifyPermission = `system:${pageName}:${handleName}`

  return !!permissions.find((item) => item === verifyPermission)
}
