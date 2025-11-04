const auth = require('../../utils/auth')
const data = require('../../utils/data')
const interact = require('../../utils/interact')
Page({
  data: {
    username: '',
    unreadCount: 0
  },
  onLoad() {
    this.setData({ username: auth.getUsername() })
    data.updateMessage()
    this.updateMessage()
  },
  logout: function () {
    interact.warnModal('退出登录', () => {
      auth.logout()
      wx.showToast({ title: '退出登录成功', })
      setTimeout(() => {
        this.setData({ username: '' })
      }, 2000);
    })
  },
  updateMessage: function () {
    if (!this.data.username) return
    const messageSummary = wx.getStorageSync('messageSummary')
    let sum = 0
    messageSummary.map(i => sum += i.unreadCount);
    this.setData({ unreadCount: sum })
  }
})