// pages/checkin/checkin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有的打卡列表
    // status字段代表此项状态，为true时代表创建并显示，为false时代表对其进行删除或屏蔽
    checkinLists:[
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
    curID: 7,
    Image_addItem_URL: "../../images/icon/icon_add.png",
    Image_checkinItem_URL: "../../images/icon/icon_checkin_item.png",
    Details_Page_URL: "./checkin_content/checkin_content",

    //是否需要隐藏弹窗
    hiddenModalPut: true,
    showInput: false, //控制输入栏

    isMaskWindowShow: false,
    isMaskWindowInputShow: false,
    maskWindowInputValue_title: "",
    maskWindowInputValue_content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  // 获取当前所有的打卡列表
  // 从数据库中进行获取
  getCheckinLists(){
    //TODO
  },

  //跳转到打卡详情界面
  goDetails:function(e){
    console.log('点击具体打卡项')
    console.log(e)
    //实现界面的跳转
    wx.navigateTo({
      // 在这里传入参数字段：1.id, 2.content
      // 示例：
      // url: "./checkin_content/checkin_content?id=" + e.currentTarget.dataset.id 
      url: "./checkin_content/checkin_content?id=" + e.currentTarget.dataset.id + "&content=" + e.currentTarget.dataset.content
      //url: "./checkin_content/checkin_content?content=" + e.currentTarget.dataset.content
    })
  },

  //添加一个打卡卡片
  onClickAdd: function(e){
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
  onLongPressCard: function(e){
    console.log("长按卡片");
  },


  //弹框以外区域点击
  maskWindowBgClick: function (e) {
    this.dismissMaskWindow();
  },

  //弹窗区域点击事件
  clickTap: function (e) {

  },

  //切换选择项事件
  maskWindowTableSelect: function (e) {
    var index = e.currentTarget.dataset.windowIndex;
    this.setData({
      selectIndex: e.currentTarget.dataset.windowIndex,
      isMaskWindowInputShow: index == 4
    })
  },

  //输入框[标题]输入绑定事件
  maskWindowInput_title: function (e) {
    var value = e.detail.value;
    this.setData({
      maskWindowInputValue_title: value
    })
  },

  //输入框[详情]输入绑定事件
  maskWindowInput_content: function (e) {
    var value = e.detail.value;
    this.setData({
      maskWindowInputValue_content: value
    })
  },

  maskWindowOk: function (e) {
    console.log("确定按钮");
    var index = this.data.selectIndex;
    var text_title = this.data.maskWindowInputValue_title;
    var text_content = this.data.maskWindowInputValue_content;

    //判断字符串是否为空
    if (typeof text_title == "undefined" || text_title == null || text_title == "") {
      this.dismissMaskWindow();
      return;
    }
    
    //添加一个新事项
    var list = this.data.checkinLists;
    var c_ID = ++this.data.curID;
    var obj = {
      id: c_ID,
      name: text_title,       //打卡名称
      iconURL: "../../images/icon/item/item_default.png",          //指定图标
      stickDays: "0",    //坚持日期
      details: text_content,       //打卡详细内容
    };
    list.push(obj);
    this.setData({
      checkinLists: list
    });
    console.log("添加ID",c_ID);
    this.dismissMaskWindow();
  },

  maskWindowCancel: function (e) {
    console.log("取消按钮");
    this.dismissMaskWindow();
  },

  // 显示蒙版弹窗
  showMaskWindow: function () {
    this.setData({
      isMaskWindowShow: true,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      maskWindowInputValue: ""
    })
  },

  // 隐藏蒙版窗体
  dismissMaskWindow: function () {
    this.setData({
      isMaskWindowShow: false,
      selectIndex: -1,
      isMaskWindowInputShow: false,
      maskWindowInputValue: ""
    })
  },


})