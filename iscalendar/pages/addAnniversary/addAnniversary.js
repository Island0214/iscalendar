// pages/addAnniversary/addAnniversary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    date: '',
    types: ['非纪念日', '每月纪念', '每年纪念'],
    selectedType: '非纪念日'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    this.setData({
      today: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    })
    this.setData({
      date: this.data.today
    })
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

  selectType: function (event) {
    this.setData({
      selectedType: event.currentTarget.dataset.item
    })
  }
})