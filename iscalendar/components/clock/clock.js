// components/clock/clock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    clockConfig: {
      type: Object,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: '',
    backgroundColor: '#FFFFFF',
    checked: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickClock: function() {
      this.setData({
        checked: !this.data.checked
      })

      this.setBackground();
    },
    setBackground: function() {
      if (this.data.checked) {
        this.setData({
          backgroundColor: this.properties.clockConfig.background
        })
      } else {
        this.setData({
          backgroundColor: '#FFFFFF'
        })
      }
    }
  },

  attached: function() {
    this.setData({
      checked: this.properties.clockConfig.checked
    })

    this.setBackground();
  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
})