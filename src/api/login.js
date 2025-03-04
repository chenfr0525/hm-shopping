// 此处是login相关的api
import request from '@/utils/request'
// 请求图象验证码
export const getPic = () => {
  return request.get('/captcha/image')
}
// 请求短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    from: {
      captchaCode, captchaKey, mobile
    }
  })
}
// 登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
