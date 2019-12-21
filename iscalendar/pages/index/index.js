//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
    clocks: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.setData({
      today: app.globalData.today
    })
    this.getTodayCheckins()
    
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
  getUserInfo: function(e) {
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
    // console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    wx.navigateTo({
      url: '../dateDetail/dateDetail?year=' + e.detail.year + "&month=" + e.detail.month + "&day=" + e.detail.day
    })
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
    var date = app.getFormatDate(e.datail.year + '-' + e.datail.month + '-' + e.datail.day);
    wx.navigateTo({
      url: '../dateDetail/dateDetail?year=' + e.detail.year + '&week=' + date.week + "&month=" + date.month + "&day=" + date.day
    })
    console.log('onTapDay', e.detail); // => { year: 2019, month: 12, day: 3, ...}
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {},

  toDateDetail: function(e) {
    var date = app.getFormatDate(e.currentTarget.dataset.content.year + '-' + e.currentTarget.dataset.content.month + '-' + e.currentTarget.dataset.content.day);
    wx.navigateTo({
      url: "../dateDetail/dateDetail?year=" + date.year + "&week=" + date.week + "&month=" + date.month + "&day=" + date.day
    })
  },

  toWriteDairy: function() {
    wx.navigateTo({
      url: "../writeDairy/writeDairy"
    })
  },

  getTodayCheckins: function() {
    var arr = new Array();
    wx.request({
      url: "https://172.19.241.77:443/project/checkin/getCheckinsAllByUser",
      method: "POST",
      dataType: 'JSON',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id: "3",
      },
      success: (res) => {
        var item = JSON.parse(res.data);
        var i = 0;
        for (i = 0; i < item.length; i++) {
          var tmp = item[i];
          //console.log(tmp);
          var obj = {
            id: tmp.id,
            name: tmp.checkin_name, //打卡名称
            iconURL: tmp.icon_url, //指定图标
            background: tmp.background, // 背景颜色
            stickDays: tmp.stick_days, //坚持日期
            checked: tmp.is_checkin == 1,
            show: true
          };
          arr.push(obj);
        }

        // 重新刷新数组
        this.setData({
          clocks: arr
        });
      },
      fail: (res) => {
        console.log(res);
      }
    })
  }
})