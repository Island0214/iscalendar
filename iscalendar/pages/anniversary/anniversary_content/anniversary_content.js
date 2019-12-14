// pages/anniversary/anniversary_content/anniversary_content.js
const app = getApp()
Page({
  data: {
    cur: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    date: {
      'day': '',
      'month': '',
      'year': '',
      'week': ''
    },
    AnniversaryDetails: {
      'date': '2019-01-01',       //天
      'timeName': '生日', //时间名
      'passDay': '1120', //已过天数
      'nextAnniversary': '240', //下一个纪念日
      'type': '每年纪念',         //建立时间
      'description': "啊啊啊啊啊啊啊啊啊啊啊"           //当前进度
    },

    icon_url: {
      'icon_delete': '../../../images/icon/icon_delete.png',
      'icon_edit': '../../../images/icon/icon_edit.png',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("message: ", options.content)
    this.setData({
      cur: options.content,
      today: app.globalData.today
    })
    this.setData({
      date: app.getFormatDate(this.data.AnniversaryDetails.date)
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //按下删除图标
  onClickDelete: function (e) {
    console.log("按下了删除图标");
  },

})