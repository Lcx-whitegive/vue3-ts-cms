export const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10位的字母或者数字',
      trigger: 'blur'
    }
  ],
  realname: [
    {
      required: true,
      message: '请输入真实姓名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '真实姓名必须是5-10位的字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10位的字母或者数字',
      trigger: 'blur'
    }
  ],
  cellphone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      pattern:
        /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/,
      message: '请输入符合规则的手机号',
      trigger: 'blur'
    }
  ]
}
