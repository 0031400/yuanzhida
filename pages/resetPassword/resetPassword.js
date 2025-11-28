var api = require('../../utils/api.js')
const interact = require('../../utils/interact')
Page({
  data: {
    outputItems: {},
    codeButtonText: '获取验证码',
    codeButtonDisabled: false,
    countdownTime: 0,
  },
  onLoad: function () {
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: 'text', key: 'username', label: '用户名' },
        { type: 'text', key: 'mail', label: '邮箱' },
        { type: 'text', key: 'code', label: '验证码' },
        { type: 'text', key: 'newPassword', label: '新密码', password: true },
        { type: 'text', key: 'confirmPassword', label: '确认密码', password: true }
      ]
    })
  },
  onInput: function (e) {
    this.setData({ outputItems: e.detail })
  },
  onGetCode: function () {
    api.sendResetPasswordCode({ mail: this.data.outputItems.mail }).then(() => {
      wx.showToast({ title: '验证码已发送到邮箱' })
      this.startCountdown()
    }).catch(interact.errorToast)
  },
  startCountdown: function () {
    let countdownTime = 60
    this.setData({
      codeButtonDisabled: true,
      countdownTime: countdownTime
    })
    const countdownInterval = setInterval(() => {
      countdownTime--
      this.setData({
        countdownTime: countdownTime,
        codeButtonText: countdownTime + 's'
      })

      if (countdownTime <= 0) {
        clearInterval(countdownInterval)
        this.setData({
          codeButtonDisabled: false,
          codeButtonText: '获取验证码',
          countdownTime: 0
        })
      }
    }, 1000)
  },

  onResetPassword: function () {
    const { username, code, newPassword, confirmPassword } = this.data.outputItems
    if (newPassword !== confirmPassword) {
      wx.showToast({ title: '两次输入的密码不一致', icon: 'error' })
      return
    }
    api.resetPassword({ username, code, newPassword }).then(() => {
      wx.showToast({ title: '重置密码成功', duration: 1500 })
      setTimeout(() => { wx.navigateTo({ url: '/pages/login/login' }) }, 1500)
    }).catch(interact.errorToast)
  }
})