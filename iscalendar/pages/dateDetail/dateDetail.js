//index.js
//获取应用实例
const app = getApp()

Page({ //页面的生命周期钩子、事件处理函数、页面的默认数据
  data: {
    content: "富文本编辑器，可以对图片、文字进行编辑。编辑器导出内容支持带标签的 html和纯文本的 text，编辑器内部采用 delta 格式进行存储。通过setContents接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，建议开发者在小程序内使用时通过 delta 进行插入。富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入 这段样式，并维护<ql-container><ql-editor></ql-editor></ql-container>的结构。图片控件仅初始化时设置有效。",
    day: '2019',
    week: "sun1",
    month: "Dec1",
    day: "151",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    placeholder: '开始输入..',
    date: {},
    checkinList: [{
        id: '1232131',
        name: '跑步',
        iconURL: '1.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: true,
        show: false,
      },
      {
        id: '1232132',
        name: '早起',
        iconURL: '2.png',
        background: '#5626e530',
        stickDays: 2,
        checked: true,
        show: false,
      },
      {
        id: '1232133',
        name: '跑步',
        iconURL: '3.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: true,
        show: false,
      },
      {
        id: '1232134',
        name: '跑步',
        iconURL: '4.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: true,
        show: false,
      },
      {
        id: '1232135',
        name: '跑步',
        iconURL: '5.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: true,
        show: false,
      }
    ],
    anniversaryList: [{
        id: 1,
        name: "纪念日1", //纪念日名称
        iconURL: "1.png", //指定图标
        passDays: "5", //已过时间
        createDate: "2019-01-01", //纪念日创建日期
        background: "#eeeeee",
        description: '3周年纪念'
      },
      {
        id: 2,
        name: "纪念日2", //纪念日名称
        iconURL: "2.png", //指定图标
        passDays: "2", //已过时间
        createDate: "2018-01-02", //纪念日创建日期
        background: "#eeeeee",
        description: '2个月纪念'
      },
    ],
    files: ['../../images/clock/1.png', '../../images/clock/2.png']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(option) {
    if (app.globalData.userInfo) {
      var dateObject = app.getFormatDate(option.year + '-' + option.month + '-' + option.day);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        year: option.year,
        month: option.month,
        day: option.day,
        date: dateObject
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
  onshow: function() {
    var that = this;
    that.getMsg();
  },
  //获取日记
  getMsg() {
    let that = this;
    wx.request({
      url: '服务器请求',
      success: function(res) {
        console.log(res.data.content)
        res.data.content = res.data.content.replace(/width\s*:\s*[0-9]+px/g, 'width:100%');
        res.data.content = res.data.content.replace(/<([\/]?)(center)((:?\s*)(:?[^>]*)(:?\s*))>/g, '<$1div$3>'); //替换center标签
        res.data.content = res.data.content.replace(/\<img/gi, '<img class="rich-img" '); //正则给img标签增加class
        //或者这样直接添加修改style
        res.data.content = res.data.content.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="width:100%;height:auto;display: block;margin:auto"');
        res.data.content = res.data.content.replace(/\<p/gi, '<P class="rich-p" '); //正则给p标签增加class

        //不支持section标签情况
        //   article_content = article_content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
        //   .replace(/<section/g, '<div')
        //  .replace(/\/section>/g, '\div>');
        that.setData({
          content: res.data.content
        })
      }
    })
  },
  getUserInfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }

    ,
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },

  getArticleInfo: function(id) {


  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }

})