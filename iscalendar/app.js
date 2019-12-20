//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
        //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // this.login()

    var day = new Date();
    day.setTime(day.getTime());
    var arr_week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    var arr_month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    this.globalData.today = {
      'day': day.getDate(),
      'month': arr_month[day.getMonth()],
      'year': day.getFullYear(),
      'week': arr_week[day.getDay()]
    }
  },
  getFormatDate: function(str) {
    var arr_week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    var arr_month = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var day = new Date(str);
    day.setTime(day.getTime());
    return {
      'day': day.getDate(),
      'month': arr_month[day.getMonth()],
      'year': day.getFullYear(),
      'week': arr_week[day.getDay()]
    }
  },
  globalData: {
    userInfo: null,
    today: {}
  },
  login() {
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // wx.reLaunch({
          //   url: '/pages/login/login',
          // })
          wx.request({
            url: 'http://fa.com/api/schoolreserve/login',
            data: {
              code: res.code,
              user_info: this.globalData.userInfo
            },
            success: function (res) {
              console.log('回调成功')
              console.log(res.data.data)
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('user_id', res.data.data.user_id)
            },
            complete: function () {
              wx.checkSession({
                success() {
                  console.log('经过验证，登录有效')
                  // session_key 未过期，并且在本生命周期一直有效
                },
                fail() {
                  console.log('session过期，请重新登录')
                  // session_key 已经失效，需要重新执行登录流程
                  wx.switchTab({
                    url: '/pages/login/login',
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      }
    })
  },
})