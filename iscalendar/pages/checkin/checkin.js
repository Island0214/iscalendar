// pages/checkin/checkin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有的打卡列表
    checkinLists:[
      {name:"打卡列表1"},
      {name:"打卡列表2"},
      {name:"打卡列表3"},
      { name: "打卡列表4" },
      { name: "打卡列表5" },
      { name: "打卡列表6" },
      { name: "打卡列表7" },
      { name: "打卡列表8" },
      { name: "打卡列表9" },
      { name: "打卡列表10" },
      { name: "打卡列表11" },
      { name: "打卡列表12" },
      { name: "打卡列表13" }
    ],

    Image_addItem_URL: "../../images/icon/icon_add.png",
    Image_checkinItem_URL: "../../images/icon/icon_checkin_item.png"
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
  }
})