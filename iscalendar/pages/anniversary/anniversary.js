// pages/checkin/checkin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有的打卡列表
    anniversaryLists: [
      {
        id: 1,
        name: "跑步",       //纪念日名称
        iconURL: "../../images/icon/item/item_running.png",          //指定图标
        passDays: "5",    //已过时间
        createDate: "2019.01.01",       //纪念日创建日期
      },
      {
        id: 2,
        name: "早起",       //纪念日名称
        iconURL: "../../images/icon/item/item_getup.png",          //指定图标
        passDays: "2",    //已过时间
        createDate: "2018.01.02",       //纪念日创建日期
      },
      {
        id: 3,
        name: "健走",       //纪念日名称
        iconURL: "../../images/icon/item/item_exercise.png",          //指定图标
        passDays: "4",    //已过时间
        createDate: "2018.10.10",       //纪念日创建日期
      },
      {
        id: 4,
        name: "学习",       //纪念日名称
        iconURL: "../../images/icon/item/item_study.png",          //指定图标
        passDays: "1",    //已过时间
        createDate: "1999.09.11",       //纪念日创建日期
      },
      {
        id: 5,
        name: "背单词",       //纪念日名称
        iconURL: "../../images/icon/item/item_default.png",          //指定图标
        passDays: "0",    //已过时间
        createDate: "2019.11.11",       //纪念日创建日期
      },
      {
        id: 6,
        name: "节食",       //纪念日名称
        iconURL: "../../images/icon/item/item_eating.png",          //指定图标
        passDays: "0",    //已过时间
        createDate: "2008.08.10",       //纪念日创建日期
      },
      {
        id: 7,
        name: "写代码",       //纪念日名称
        iconURL: "../../images/icon/item/item_coding.png",          //指定图标
        passDays: "4",    //已过时间
        createDate: "2000.02.20",       //纪念日创建日期
      },
    ],
    curID: 7,
    Image_addItem_URL: "../../images/icon/icon_add.png",
    Image_checkinItem_URL: "../../images/icon/icon_checkin_item.png",
    Details_Page_URL: "./checkin_content/checkin_content",

    //是否需要隐藏弹窗
    hiddenModalPut: true,
    showInput: false, //控制输入栏

    isMaskWindowShow: false,
    maskWindowList: ['时间太早', '时间太晚', '距离太远', '交通不方便', '其他（输入）', '没有原因'],
    selectIndex: -1,
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
  getCheckinLists() {
    //TODO
  },


  //跳转到打卡详情界面
  goDetails: function (e) {
    //实现界面的跳转
    console.log('点击纪念日详情')
    console.log(e)
    //TODO: 带参数跳转
    wx.navigateTo({
      url: "/pages/anniversary/anniversary_content/anniversary_content?content=" + e.currentTarget.dataset.content
    })
  },

  //添加一个打卡卡片
  onClickAdd: function (e) {
    console.log("添加卡片");
    this.setData({
      isMaskWindowShow: !this.data.isMaskWindowShow,
      maskWindowInputValue_title: "",
      maskWindowInputValue_content: "",
    })
  },

  //长按卡片事件
  onLongPressCard: function (e) {
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
    console.log("添加ID", c_ID);
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