// pages/checkin/checkin.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否开启网络功能（Debug）
    isNetworkOn: true ,

    // 所有的打卡列表
    // status字段代表此项状态，为true时代表创建并显示，为false时代表对其进行删除或屏蔽
    checkinLists: [
      {
        id: '1232131',
        name: '跑步',
        iconURL: '1.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: false,
        status: true,
      },
      {
        id: '1232132',
        name: '早起',
        iconURL: '2.png',
        background: '#5626e530',
        stickDays: 2,
        checked: true,
        status: true,
      },
      {
        id: '1232133',
        name: '跑步',
        iconURL: '3.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: true,
        status: true,
      },
      {
        id: '1232134',
        name: '跑步',
        iconURL: '4.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: false,
        status: true,
      },
      {
        id: '1232135',
        name: '跑步',
        iconURL: '5.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: false,
        status: true,
      },
      {
        id: '1232136',
        name: '跑步(test_false)',
        iconURL: '5.png',
        background: '#d6c6de',
        stickDays: 1,
        checked: false,
        status: false,
      }
    ],
    // slideButtons: [{
    //   text: '普通',
    //   src: '/images/icon/slide_icon/icon_love.svg', // icon的路径
    // }, {
    //   text: '普通',
    //   extClass: 'test',
    //   src: '/images/icon/slide_icon/icon_star.svg', // icon的路径
    // }, {

    /* 左滑删除按钮 */
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: '/images/icon/slide_icon/icon_del.svg', // icon的路径
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatabaseData();
  },

  getDatabaseData: function() {
    // 读取数据库内容
    // 传入：用户id
    // 传出：该用户的所有打卡项列表
    var that = this;
    if (this.data.isNetworkOn) {
      var arr = new Array();
      wx.request({
        //url: "https://172.19.241.77:8080/project/user/getUserInfo",//url中接口前面加一下project项目名
        url: "https://172.19.241.77:443/project/checkin/getCheckinsAllByUser",
        method: "POST",
        dataType: 'JSON',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          user_id: "3",
        },
        success: (res) => {
          console.log("用户的所有打卡项如下：", res.data)
          var item = JSON.parse(res.data);
          var i = 0;
          for(i=0; i<item.length; i++){
            var tmp = item[i];
            //console.log(tmp);
            var obj = {
              id: tmp.id,
              name: tmp.checkin_name,       //打卡名称
              iconURL: tmp.icon_url,          //指定图标
              background: tmp.background,      // 背景颜色
              stickDays: 0,    //坚持日期
              details: tmp.checkin_description,       //打卡详细内容
              status: true,
            };
            console.log(obj);
            arr.push(obj);
          }   
          
          // 重新刷新数组
          this.setData({
            checkinLists: arr
          });
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
    // 在这里刷新界面内容
    // var list = this.data.checkinLists;
    // this.setData({
    //   checkinLists: list
    // });
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

  //跳转到打卡详情界面
  goDetails: function (e) {
    console.log('点击具体打卡项')
    console.log(e)
    //实现界面的跳转
    wx.navigateTo({
      // 在这里传入参数字段：1.id, 2.content
      // 示例：
      // url: "./checkin_content/checkin_content?id=" + e.currentTarget.dataset.id + "&content=" + e.currentTarget.dataset.content
      url: "./checkin_content/checkin_content?id=" + e.currentTarget.dataset.id + "&content=" + e.currentTarget.dataset.content
    })
  },

  //添加一个打卡卡片
  onClickAdd: function (e) {
    console.log("add")
    wx.navigateTo({
      url: "../addCheck/addCheck"
    })
    // this.setData({
    //   isMaskWindowShow: !this.data.isMaskWindowShow,
    //   maskWindowInputValue_title: "",
    //   maskWindowInputValue_content: "",
    // })
  },

  //长按卡片事件
  onLongPressCard: function (e) {
    console.log("长按卡片");
  },

  // 响应滑动按钮事件
  slideButtonTap(e) {
    console.log('slide button tap', e.detail);
    var that = this;

    // 模态弹窗确定是否要删除
    wx.showModal({
      title: '确定删除',
      content: '是否确定删除该打卡项？',
      success: function (res) {
        if (res.confirm) {
          console.log("删除id:", e.currentTarget.dataset.id);
          // 删除这个id项
          // var del_ID = e.currentTarget.dataset.id;
          // var list = that.data.checkinLists;
          // for (var i = 0; i < list.length; i++) {
          //   if (list[i].id === del_ID) {
          //     list.splice(i, 1);
          //   }
          // }
          // // 重新刷新数组
          // that.setData({
          //   checkinLists: list
          // });
          wx.request({
            url: "https://172.19.241.77:443/project/checkin/deleteCheckin",
            method: "POST",
            dataType: 'JSON',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              console.log(res.data);
            }
          })
          that.getDatabaseData();
        }
      }
    })
  },

})