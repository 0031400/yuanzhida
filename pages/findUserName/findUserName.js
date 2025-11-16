const api = require('../../utils/api.js')
Page({
  data: {
    outputItems:{},
    userName:{},
    userNameShow: false
  },
  onLoad: function () {
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: 'text', key: 'mail', label: '邮箱' },
        ]
    })
  },
  onInput: function (e) {
    this.setData({ outputItems: e.detail })
  },
  getUserName: function(e) {
    const { mail } = this.data.outputItems
    api.getUserName({mail}).then(res => {
      this.setData({ 'userName': '您的用户名是：' + res })
      this.setData({ 'userNameShow': true })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/findUserName/findUserName.wxml',
        })
      }, 1500);
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  }
})