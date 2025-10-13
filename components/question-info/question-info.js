const api = require('../../utils/api')
const data = require('../../utils/data')
Component({
  data: {
    solvedFlag: false,
    viewCount: 0,
    commentCount: 0,
    likeCount: 0,
    entityUserId: 0,
    questionId: 0,
    likeStatus: '未登录',
    isOwn: false,
    username: '',
    categoryId: 0
  },
  methods: {
    updateData: function (d) {
      this.setData(d)
      this.setData({ isOwn: data.isOwn(this.data.username) })
    },
    deleteQuestion: function () {
      api.deleteQuestion(this.data.questionId).then(() => {
        wx.showToast({
          title: '删除成功',
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/questions/questions?categoryId=' + this.data.categoryId
          })
        }, 1500);
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    },
    flagSolved: function () {
      api.flagSolved(this.data.questionId, !this.data.solvedFlag).then(() => {
        wx.showToast({
          title: '标记已经解决',
        })
        this.setData({ solvedFlag: !this.data.solvedFlag })
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    },
    likeQuestion: function () {
      if (this.data.likeStatus == '未登录') {
        wx.showToast({
          title: '未登录',
          icon: 'error'
        })
        return
      }
      api.likeQuestion(this.data.questionId, this.data.entityUserId).then(() => {
        if (this.data.likeStatus == '未点赞') {
          wx.showToast({
            title: '点赞成功',
          })
          this.setData({ likeStatus: '已点赞', likeCount: this.data.likeCount + 1 })
        } else {
          wx.showToast({
            title: '取消点赞',
          })
          this.setData({ likeStatus: '未点赞', likeCount: this.data.likeCount - 1 })
        }
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    },
    correntQuestion: function () {
      this.triggerEvent('correntQuestion')
    }
  }
})