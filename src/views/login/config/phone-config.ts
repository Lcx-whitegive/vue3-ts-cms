export const rules = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern:
        /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/,
      message: '请输入符合规则的手机号',
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码为6位数字',
      trigger: 'blur'
    }
  ]
}
