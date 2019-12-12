// pages/checkin/checkin_content/checkin_content.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
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

    checkinItem:{
      'plannedDays': 'NaN1',      //计划天数
      'checkinDays': 'NaN2',      //打卡天数
      'missedDays': 'NaN3',       //错过天数
      'totalCheckedDays': 'NaN4', //总计打卡天数
      'curConsecutiveDays': 'NaN5', //当前连续时长
      'maxConsecutiveDays': 'NaN6', //最大连续时长
      'createDay': 'NaN7',         //建立时间
      'checkinProgess': "0"           //当前进度
    },

    icon_url: {
      'icon_delete': '../../../images/icon/icon_delete.png',
      'icon_edit': '../../../images/icon/icon_edit.png',
    },

    clocks: [
      {
        id: '1232131',
        name: '跑步',
        image: '../../images/clock/1.png',
        background: '#d6c6de',
        days: 1,
        checked: false
      },
      {
        id: '1232132',
        name: '早起',
        image: '../../images/clock/2.png',
        background: '#5626e530',
        days: 2,
        checked: true
      },
      {
        id: '1232133',
        name: '跑步',
        image: '../../images/clock/3.png',
        background: '#d6c6de',
        days: 1,
        checked: true
      },
      {
        id: '1232134',
        name: '跑步',
        image: '../../images/clock/4.png',
        background: '#d6c6de',
        days: 1,
        checked: false
      },
      {
        id: '1232135',
        name: '跑步',
        image: '../../images/clock/5.png',
        background: '#d6c6de',
        days: 1,
        checked: false
      }
    ]
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
  * 选择日期后执行的事件
  * currentSelect 当前点击的日期
  * allSelectedDays 选择的所有日期（当mulit为true时，allSelectedDays有值）
  */
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
  },
  /**
   * 当日历滑动时触发(适用于周/月视图)
   * 可在滑动时按需在该方法内获取当前日历的一些数据
   */
  onSwipe(e) {
    console.log('onSwipe', e.detail);
    const dates = this.calendar.getCalendarDates();
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },
  /**
   * 周视图下当改变周时触发
   * => current 当前周信息 / next 切换后周信息
   */
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail);
    // {
    //    current: { currentYM: {year: 2019, month: 1 }, dates: [{}] },
    //    next: { currentYM: {year: 2019, month: 1}, dates: [{}] },
    //    directionType: 'next_week'
    // }
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  onTapDay(e) {
    console.log('onTapDay', e.detail); // => { year: 2019, month: 12, day: 3, ...}
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
  },

  //按下删除图标
  onClickDelete: function(e) {
    console.log("按下了删除图标");
  },

  //按下编辑图标
  onClickEdit: function(e){
    console.log("按下了编辑图标");
  },
})