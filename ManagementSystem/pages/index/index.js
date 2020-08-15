
//index.js
//获取应用实例
var tcity = require("../../utils/citys.js");

// var app = getApp()
Page({

  data: {
    win_scrollTop: 0,
    avatarUrl: "../../images/head.jpg",
    username: "点击头像登陆",
    shows: false,
    hidden: true,
    updata: false,

    // 设置开始的位置
    startX: 0,
    startY: 0,
  },

  onPullDownRefresh: function () {

    var that = this
    let updata = this.data.updata
    // let arrList = that.data.dataList

    if (updata == true) {
      wx.login({
        success: function (res) {
          //发送请求
          wx.request({
            url: 'https://f7f4be22-820c-418c-a291-fa88a82f3146.mock.pstmn.io/form',
            code: res.code,
            method: 'POST',
            header: { "content-type": 'application/json' },
            success: function (res) {



              that.setData({
                dataList: res.data
              });
              // console.log("请求成功!  返回数据如下", res);
              // console.log(arrList);

            },
            fail: function (res) {
              console.log("!!! 请求出错, 请检查网络。 " + res.errMsg);
              wx.showToast({
                title: '网络异常！',
                icon: 'none',
                duration: 3000,
                mask: true
              })
            }
          })
        }
      })
    }
  },


  lading: function (e) {
    var that = this
    // let arrList = that.data.dataList
    wx.login({
      success: function (res) {
        //发送请求
        wx.request({
          url: 'https://f7f4be22-820c-418c-a291-fa88a82f3146.mock.pstmn.io/form',
          code: res.code,
          method: 'POST',
          header: { "content-type": 'application/json' },
          success: function (res) {


            that.setData({
              dataList: res.data
            });
            // console.log("请求成功!  返回数据如下", res);
            // console.log(arrList);

          },
          fail: function (res) {
            console.log("!!! 请求出错, 请检查网络。 " + res.errMsg);
            wx.showToast({
              title: '网络异常！',
              icon: 'none',
              duration: 3000,
              mask: true
            })
          }
        })
      }
    })
    this.setData({
      avatarUrl: this.data.avatarUrl
    })
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({

        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        username: e.detail.userInfo.nickName
      })

    }

    console.log(this.data.updata);

    this.setData({
      updata: true,
      username: e.detail.userInfo.nickName,
      userimg: e.detail.userInfo.avatarUrl
    })

    console.log(this.data.updata);

  },




  touchStart(e) {
    // console.log('touchStart=====>', e);
    let dataList = [...this.data.dataList]
    dataList.forEach(item => {
      if (item.isTouchMove) {
        item.isTouchMove = !item.isTouchMove;
      }
    });
    this.setData({
      dataList: dataList,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  },

  touchMove(e) {
    // console.log('touchMove=====>', e);
    let moveX = e.changedTouches[0].clientX;
    let moveY = e.changedTouches[0].clientY;
    let indexs = e.currentTarget.dataset.index;
    let dataList = [...this.data.dataList]

    // console.log(indexs);

    let angle = this.angle({
      X: this.data.startX,
      Y: this.data.startY
    }, {
      X: moveX,
      Y: moveY
    });

    dataList.forEach((item, index) => {
      item.isTouchMove = false;
      // 如果滑动的角度大于30° 则直接return；
      if (angle > 30) {
        return
      }

      if (indexs === index) {
        if (moveX > this.data.startX) { // 右滑
          item.isTouchMove = false;
        } else { // 左滑
          item.isTouchMove = true;
        }
      }
    })

    this.setData({
      dataList
    })
  },

  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },


  del(e) {
    let indexs = e.currentTarget.dataset.index;
    console.log(e);
    console.log(indexs);
    var that = this
    //发送请求

    wx.request({
      url: 'https://f7f4be22-820c-418c-a291-fa88a82f3146.mock.pstmn.io/form',

      method: 'GET',
      header: { "content-type": 'application/json' },
      success: (res) => {

        that.setData({
          dataList: res.data
        });
        console.log(res.data);

        console.log("请求成功!  返回数据如下", res);
        // console.log(arrList);

      },
      fail: function (res) {
        console.log("!!! 请求出错, 请检查网络。 " + res.errMsg);
        wx.showToast({
          title: '网络异常！',
          icon: 'none',
          duration: 3000,
          mask: true
        })
      }
    })
    wx.showModal({
      title: '提示',
      content: '确认要删除此信息？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户确定删除信息')
          console.log(e.currentTarget.dataset.index);
          this.data.dataList.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            dataList: this.data.dataList
          })
        } else if (res.cancel) {
          console.log('用户取消删除信息')
        }
      }
    })


  },

})



