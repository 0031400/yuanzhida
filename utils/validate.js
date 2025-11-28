function length_validate(value = '', title, min_length, max_length) {
  if (value.length < min_length) {
    return Promise.reject(`${title}不足${min_length}字`)
  } else if (value.length > max_length) {
    return Promise.reject(`${title}超过${max_length}字`)
  } else {
    return false
  }
}
function username_validate(username) {
  return length_validate(username, '用户名', 3, 12)
}
function password_validate(password) {
  return length_validate(password, '密码', 8, 20)
}
function code_validate(code) {
  return length_validate(code, '验证码', 6, 6)
}
function title_validate(title) {
  return length_validate(title, '题目', 5, 20)
}
function content_validate(content) {
  return length_validate(content, '内容', 5, 600)
}
export function mail_validate(mail) {
  if (!(new RegExp(/^\d{8}@buaa.edu.cn$/).test(mail))) {
    return Promise.reject('邮箱不合要求')
  } else {
    return false
  }
}
export function register({ username, password, mail, code }) {
  return username_validate(username) ||
    mail_validate(mail) ||
    password_validate(password) ||
    code_validate(code)
}
export function newQuestion({ title, content }) {
  return title_validate(title) || content_validate(content)
}
export function resetPassword({ username, code, newPassword }) {
  return username_validate(username) || code_validate(code) || password_validate(newPassword)
}