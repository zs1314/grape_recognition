// miniprogram/pages/isMe/isMe.js
Page({
  data: {
    userName: "", //用户名
    headImg: "",
    home: "", //家庭地址
    schoolId: "", //学号
    call: "", //电话
    schoolPicker: ["南京农业大学", "南京大学", "清华"]
  },

//   onShow() {

//     wx.showLoading({
//       title: '数据加载中...',
//     });

//     var that = this;
//     const db = wx.cloud.database({ // 链接数据表
//       env: "test-5ghp2j4d337534cb"
//     });
//     db.collection('user').where({ //数据查询
//       _openid: wx.getStorageSync('openId').result.userInfo.openId
//     }).get({
//       success: function (res) {
//         that.setData({
//           userName: res.data[0].userName,
//           headImg: res.data[0].headImg,
//           home: res.data[0].home,
//           schoolId: res.data[0].schoolId,
//           call: res.data[0].call
//         })
//       }
//     })
//     wx.hideLoading(); //隐藏正在加载中
//   },


  headImg() {
    if (this.data.headImg != wx.getStorageSync('userinfo').avatarUrl) {
      const db = wx.cloud.database({
        env: "test-5ghp2j4d337534cb"
      });
      db.collection('user').where({
        _openid: wx.getStorageSync('openId').result.userInfo.openId
      }).update({
        // data 字段表示需新增的 JSON 数据

        data: {
          headImg: wx.getStorageSync('userinfo').avatarUrl,
        },
      })


      wx.showModal({
        title: "修改成功", // 提示的标题
        content: "点击返回上一页", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确认", // 确认按钮的文字，最多4个字符
        confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        complete: function () {
          // console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          wx.navigateBack({
            delta: 1
          })
        }
      })

    } else {
      wx.showToast({
        title: "纺院社区：您的头像与微信头像一致无需修改", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
    }

  },

  schoolPicker(e) {
    this.setData({
      schoolId: this.data.schoolPicker[e.detail.value]
    })
    const db = wx.cloud.database({
      env: "test-5ghp2j4d337534cb"
    });
    db.collection('user').where({
      _openid: wx.getStorageSync('openId').result.userInfo.openId
    }).update({
      // data 字段表示需新增的 JSON 数据

      data: {
        schoolId: this.data.schoolId,
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
  }

})