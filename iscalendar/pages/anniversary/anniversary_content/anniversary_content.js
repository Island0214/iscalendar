// pages/anniversary/anniversary_content/anniversary_content.js
const app = getApp()
Page({
  data: {
    cur: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    calendarConfig: {
      /**
       * 初始化日历时指定默认选中日期，如：'2018-3-6' 或 '2018-03-06'
       * 初始化时不默认选中当天，则将该值配置为false。
       */
      multi: false, // 是否开启多选,
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      takeoverTap: false, // 是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用
      disablePastDay: false, // 是否禁选当天之前的日期
      disableLaterDay: true, // 是否禁选当天之后的日期
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: false, // 日历面板是否只显示本月日期
      hideHeadOnWeekMode: false, // 周视图模式是否隐藏日历头部
      showHandlerOnWeekMode: true // 周视图模式是否显示日历头部操作栏，hideHeadOnWeekMode 优先级高于此配置
    },
    today: {
      'day': '',
      'month': '',
      'year': '',
      'week': ''
    },

    AnniversaryDetails: {
      'weekDay': 'NaN1',      //星期几
      'month': 'NaN2',      //月份
      'day': 'NaN3',       //天
      'timeName': 'NaN4', //时间名
      'passDay': 'NaN5', //已过天数
      'nextAnniversary': 'NaN6', //下一个纪念日
      // 'createDay': 'NaN7',         //建立时间
      // 'checkinProgess': "0"           //当前进度
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