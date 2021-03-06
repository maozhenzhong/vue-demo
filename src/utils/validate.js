import { Message } from 'element-ui'
import errorConfig from '@/errorConfig'
// import { getOldPassword } from '@/api/BaseInfo'

function isvalidEmpty(obj, inputValue, promptText) {
  if (inputValue === undefined || inputValue === null || inputValue === '') {
    Message({
      message: errorConfig[promptText],
      type: 'error'
    })

    if (obj) {
      obj.focus()
    }

    return false
  }
  return true
}

export function isvalidOldPassword(obj, value) {
  const pPattern = /^.{6,30}$/
  const oldPwdObj = obj
  const inputValue = value

  if (!isvalidEmpty(oldPwdObj, inputValue, 'ER_OLD_PASSWORD_EMPTY')) {
    return false
  }

  if (!pPattern.test(inputValue)) {
    Message({
      message: errorConfig.ER_OLD_PASSWORD,
      type: 'error'
    })
    oldPwdObj.focus()
    return false
  }

  return true
}

export function isvalidPassword(obj, value) {
  const pPattern = /^.*(?=.{6,30})(?=.*\d)(?=.*[a-zA-Z]).*$/
  const pwdObj = obj
  const inputValue = value

  if (!isvalidEmpty(pwdObj, inputValue, 'ER_PASSWORD_EMPTY')) {
    return false
  }

  if (!pPattern.test(inputValue)) {
    Message({
      message: errorConfig.ER_PASSWORD,
      type: 'error'
    })
    pwdObj.focus()
    return false
  }
  return true
}

export function isvalidRePassword(obj, value, passwordValue) {
  const rePwdObj = obj
  const inputValue = value
  const pwdValue = passwordValue

  if (!isvalidEmpty(rePwdObj, inputValue, 'ER_RE_PASSWORD_EMPTY')) {
    return false
  }

  if (inputValue !== pwdValue) {
    Message({
      message: errorConfig.ER_RE_PASSWORD,
      type: 'error'
    })
    return false
  }
  return true
}

export function isvalidCellphone(obj, value) {
  const mPattern = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/
  const cellPhoneObj = obj
  const inputValue = value

  if (!isvalidEmpty(cellPhoneObj, inputValue, 'ER_CELLPHONE_EMPTY')) {
    return false
  }

  if (!mPattern.test(inputValue)) {
    Message({
      message: errorConfig.ER_CELLPHONE,
      type: 'error'
    })
    cellPhoneObj.focus()
    return false
  }
  return true
}

export function isvalidCrewStaff(obj, value) {
  const sPattern = /^[A-Za-z0-9]{2,10}$/
  const crewStaffObj = obj
  const inputValue = value

  if (!isvalidEmpty(crewStaffObj, inputValue, 'ER_CREW_STAFF_EMPTY')) {
    return false
  }

  if (!sPattern.test(inputValue)) {
    Message({
      message: errorConfig.ER_CREW_STAFF,
      type: 'error'
    })
    crewStaffObj.focus()
    return false
  }
  return true
}

export function isvalidCrewRealname(obj, value) {
  const rPattern = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/
  const crewRealnameObj = obj
  const inputValue = value

  if (!isvalidEmpty(crewRealnameObj, inputValue, 'ER_REALNAME_EMPTY')) {
    return false
  }

  if (!rPattern.test(inputValue)) {
    Message({
      message: errorConfig.ER_REALNAME,
      type: 'error'
    })
    crewRealnameObj.focus()
    return false
  }
  return true
}

export function isvalidVerifcationCode(obj, value) {
  const inputValue = value

  return isvalidEmpty(null, inputValue, 'ER_VERIFICATION_EMPTY')
}

export function isvalidSignInUsername(obj, value) {
  const usernameObj = obj
  const inputValue = value

  return isvalidEmpty(usernameObj, inputValue, 'ER_SIGNIN_USERNAME')
}

export function isvalidSignInPassword(obj, value) {
  const passwordObj = obj
  const inputValue = value

  return isvalidEmpty(passwordObj, inputValue, 'ER_SIGNIN_PASSWORD')
}

export function isvalidQuestion(obj, value) {
  const questionObj = obj
  const inputValue = value

  return isvalidEmpty(questionObj, inputValue, 'ER_QUESTION_EMPTY')
}

export function isvalidAnswer(obj, value) {
  const answerObj = obj
  const inputValue = value

  return isvalidEmpty(answerObj, inputValue, 'ER_ANSWER_EMPTY')
}

export function isvalidUpdateTime(obj, value) {
  const updateTimeObj = obj
  const inputValue = value

  return isvalidEmpty(updateTimeObj, inputValue, 'ER_UPDATETIME_EMPTY')
}

export function isvalidLoanAmountMin(obj, value) {
  const loanAmountMinObj = obj
  const inputValue = parseFloat(value)
  if (!isvalidEmpty(loanAmountMinObj, inputValue, 'ER_LOAN_AMOUNT_MIN_EMPTY')) {
    return false
  }

  console.log(typeof inputValue)
  if (!Number.isInteger(inputValue)) {
    Message({
      message: errorConfig.ER_LOAN_AMOUNT_MIN_FORMAT,
      type: 'error'
    })
    return false
  }

  return true
}

export function isvalidLoanAmountMax(obj, prevObj, value, minValue) {
  const quotaLoanAmountMax = obj
  const loanAmountMinObj = prevObj
  const inputValue = parseFloat(value)
  const inpuMinValue = minValue

  if (!isvalidEmpty(loanAmountMinObj, inpuMinValue, 'ER_LOAN_AMOUNT_MIN_EMPTY')) {
    return false
  }

  if (!isvalidEmpty(quotaLoanAmountMax, inputValue, 'ER_LOAN_AMOUNT_MAX_EMPTY')) {
    return false
  }

  if (!Number.isInteger(inputValue)) {
    Message({
      message: errorConfig.ER_LOAN_AMOUNT_MAX_FORMAT,
      type: 'error'
    })
    return false
  }

  if (inputValue <= inpuMinValue) {
    Message({
      message: errorConfig.ER_LOAN_AMOUNT_MAX_RANGE,
      type: 'error'
    })
    return false
  }

  return true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
