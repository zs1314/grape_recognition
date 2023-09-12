// miniprogram/pages/isMe/qqEmail/qqEmail.js
Page({
  data: {
    call:""
  },
  qqEmailInput(e){
    this.setData({
      call:e.detail.value
    })
  },
  click(e){//数据库修改数据
    const db = wx.cloud.database({
      env: "test-5ghp2j4d337534cb"
    });
    db.collection('user').where({
      _openid: wx.getStorageSync('openId').result.userInfo.openId
    }).update({
      // data 字段表示需新增的 JSON 数据
      
      data: {
        call:this.data.call,
      },
    }) 
    //关闭当前页面并且回到上页面
    wx.showToast({
      title: "纺院社区：修改成功", // 提示的内容
      icon: "none", // 图标，默认success
      image: "", // 自定义图标的本地路径，image 的优先级高于 icon
      duration: 1500, // 提示的延迟时间，默认1500
      mask: false, // 是否显示透明蒙层，防止触摸穿透
    })
    wx.navigateBack({
      delta: 1
    })
  },
})