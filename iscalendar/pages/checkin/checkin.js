// pages/checkin/checkin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有的打卡列表
    checkinLists:[
      { name: "跑步" },
      { name: "早起" },
      { name: "健走" },
      { name: "饮食" },
      { name: "学习" },
      { name: "做作业" },
      { name: "英语" },
      { name: "数学" },
      { name: "语文" },
      { name: "物理" },
      { name: "化学" },
      { name: "test1" },
      { name: "test2" }
    ],

    Image_addItem_URL: "../../images/icon/icon_add.png",
    Image_checkinItem_URL: "../../images/icon/icon_checkin_item.png",
    Details_Page_URL: "./checkin_content/checkin_content"
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
    //TODO: 带参数跳转
    wx.navigateTo({
      url: "./checkin_content/checkin_content?content=" + e.currentTarget.dataset.content
    })
  }
})