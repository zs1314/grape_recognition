// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  downloadAlbum: function (e) {
    // wx.cloud.getTempFileURL({
    //   fileList: [{
    //     fileID: 'cloud://cloud1-2gtyvwr00b922c4b.636c-cloud1-2gtyvwr00b922c4b-1307411435/1.png',
    //     maxAge: 60 * 60, // one hour
    //   }]
    // }).then(res => {
    //   // get temp file URL
    //   console.log(res.fileList)
    // }).catch(error => {
    //   // handle error
    // })


    var that = this;
    // 下载链接的地址
    var link = "https://636c-cloud1-2gtyvwr00b922c4b-1307411435.tcb.qcloud.la/1.png";

    // 获取用户授权
    wx.getSetting({
      success(res) {
        // 如果已授权
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.saveAlbum(link);
          // 如果没有授权 
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          // 调起用户授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveAlbum(link);
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
          // 如果之前授权已拒绝
        } else {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.writePhotosAlbum']) {
                that.saveAlbum(link);
              } else {
                wx.showToast({
                  title: '您没有授权，无法保存到相册',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  },

  // 保存影集
  saveAlbum: function (link) {
    wx.downloadFile({
      url: link,
      success(res) {
        if (res.statusCode === 200) {
          var path = res.tempFilePath
          wx.saveVideoToPhotosAlbum({
            filePath: path,
            success(res) {
              if (res.errMsg == 'saveVideoToPhotosAlbum:ok') {
                wx.showToast({
                  title: '下载完成',
                })
              }
            }
          })
        }
      }
    })
  },
})