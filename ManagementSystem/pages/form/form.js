//index.js
//获取应用实例
var tcity = require("../../utils/citys.js");

var app = getApp()
Page({
  data: {
    // shows: false,
    // hidden: true,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['请选择', '1', '2', '3', '4', '5'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    showModal: false,
    // dataList: [{
    //   company: '华盟信息科技有限公司',
    //   phone: '13295869463',
    //   state: '跟进中',
    //   isTouchMove: false, //默认隐藏删除
    //   checked: false
    // },
    // {
    //   company: '华盟信息科技有限公司',
    //   phone: '13295869463',
    //   state: '跟进中',
    //   isTouchMove: false, //默认隐藏删除
    //   checked: false
    // },

    // ],
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,

  },
 


  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function () {
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }

    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }

    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })



  },
  // 点击下拉显示框
  selectTap() {
    
    
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });

    
  },
  onLoads: function (options) {

  },




  //表单验证

  //商户名称
  focus_name: function (e) {
    var regLowerCase = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = regLowerCase.exec(e.detail.value);

    if (!rsLowerCase) {
      this.setData({
        result: '请输入正确格式的2~20位中文'
      })
    } else if (e.detail.value == rsLowerCase) {
      this.setData({
        result: ''
      })
    }
  },


  blur_name: function (e) {
    var regLowerCase = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = regLowerCase.exec(e.detail.value);

    if (e.detail.value == rsLowerCase) {
      this.setData({
        result: ''
      })
    } else if (!rsLowerCase) {
      this.setData({
        result: '请输入正确格式的2~20位中文'
      })
    }

  },

  //电话号码
  focus_phone: function (e) {
    var check_phone = new RegExp(/^1[3|4|5|7|8]\d{9}$/);//判断用户输入的是否为手机号正确格式
    var rsLowerCase = check_phone.exec(e.detail.value);

    if (!rsLowerCase) {
      this.setData({
        results: '请输入正确格式的手机号码'
      })
    } else if (e.detail.value == rsLowerCase) {
      this.setData({
        results: ''
      })
    }
  },
  blur_phone: function (e) {
    var check_phone = new RegExp(/^1[3|4|5|7|8]\d{9}$/);//判断用户输入的是否为手机号正确格式
    var rsLowerCase = check_phone.exec(e.detail.value);
    if (e.detail.value == rsLowerCase) {
      this.setData({
        results: ''
      })
    } else if (!rsLowerCase) {
      this.setData({
        results: '请输入正确格式的手机号码'
      })
    }

  },

  //介绍人姓名

  focus_references_name: function (e) {
    var references_name = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = references_name.exec(e.detail.value);

    if (!rsLowerCase) {
      this.setData({
        references: '请输入正确格式的2~6位中文'
      })
    } else if (e.detail.value == rsLowerCase) {
      this.setData({
        references: ''
      })
    }
  },
  blur_references_name: function (e) {
    var references_name = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = references_name.exec(e.detail.value);

    if (e.detail.value == rsLowerCase) {
      this.setData({
        references: ''
      })
    } else if (!rsLowerCase) {
      this.setData({
        references: '请输入正确格式的2~6位中文'
      })
    }

  },

  //介绍人电话号码
  focus_references_phone: function (e) {
    var check_phone = new RegExp(/^1[3|4|5|7|8]\d{9}$/);//判断用户输入的是否为手机号
    var rsLowerCase = check_phone.exec(e.detail.value);

    if (!rsLowerCase) {
      this.setData({
        references: '请输入正确格式的手机号码'
      })
    } else if (e.detail.value == rsLowerCase) {
      this.setData({
        references: ''
      })
    }
  },
  blur_references_phone: function (e) {
    var check_phone = new RegExp(/^1[3|4|5|7|8]\d{9}$/);//判断用户输入的是否为手机号
    var rsLowerCase = check_phone.exec(e.detail.value);

    if (e.detail.value == rsLowerCase) {
      this.setData({
        references: ''
      })
    } else if (!rsLowerCase) {
      this.setData({
        results: '请输入正确格式的手机号码'
      })
    }

  },

  //拜访人姓名

  focus_visit_name: function (e) {
    var visit_name = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = visit_name.exec(e.detail.value);

    if (!rsLowerCase) {
      this.setData({
        visit: '请输入正确格式的2~6位中文'
      })
    } else if (e.detail.value == rsLowerCase) {
      this.setData({
        visit: ''
      })
    }
  },
  blur_visit_name: function (e) {
    var visit_name = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = visit_name.exec(e.detail.value);


    if (e.detail.value == rsLowerCase) {
      this.setData({
        visit: ''
      })
    } else if (!rsLowerCase) {
      this.setData({
        visit: '请输入正确格式的2~6位中文'
      })
    }

  },
  //拜访人时间
     
  focus_visit_time: function (e) {
    var visit_time = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);//判断用户输入的是否为时间
    var rsLowerCase = visit_time.exec(e.detail.value);

    if (!rsLowerCase) {
      this.setData({
        visits: '请输入正确格式的日期如:2000-01-11'
      })
    } else if (e.detail.value == rsLowerCase) {
      this.setData({
        visits: ''
      })
    }
  },
  blur_visit_time: function (e) {
    var visit_time = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);//判断用户输入的是否为时间
    var rsLowerCase = visit_time.exec(e.detail.value);
    console.log(111);

    if (e.detail.value == rsLowerCase) {
      this.setData({
        visits: ''
      })
    } else if (!rsLowerCase) {
      this.setData({
        visits:'请输入正确格式的日期如：2000-01-11'
      })
    }

  },
  // 表单提交  
  formSubmit: function (e) {
    // console.log(e);
    console.log(e.detail.value);
    var that=this
    wx.request({
      url:'https://f7f4be22-820c-418c-a291-fa88a82f3146.mock.pstmn.io/form',	// 请求自己服务器的地址
      data:e.detail.value,
      method: 'POST',	// 
      header: { "content-type": 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          dataList:e.detail.value
        });
        console.log("请求成功!  返回数据如下", res);
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

    let name = e.detail.value.name
    let phone = e.detail.value.phone
    let address = e.detail.value.address
    let detailed_address = e.detail.value.detailed_address
    let requirements_detailed = e.detail.value.requirements_detailed
    let visit_name = e.detail.value.visit_name
    let visit_record = e.detail.value.visit_record
    let visit_time = e.detail.value.visit_time
    let state=this.data.index


    var regLowerCase = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerCase = regLowerCase.exec(name);

    var check_phone = new RegExp(/^1[3|4|5|7|8]\d{9}$/);//判断用户输入的是否为手机号正确格式
    var rsLowerPhone = check_phone.exec(phone);

    var regLowerCase = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);//判断用户输入的是否为中文
    var rsLowerVisitName = regLowerCase.exec(visit_name);

    var regLowerCase = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);//判断用户输入的是否为时间
    var rsLowerVisitTime = regLowerCase.exec(visit_time);
    

    this.focus_name
    this.blur_name
    this.focus_phone
    this.blur_phone
    this.focuss_visit_name
    this.blurs_visit_name
    this.focus_visit_time
    this.blur_visit_time

    

    if (name==''){
      console.log(rsLowerCase);
      
      this.setData({
        submit: '有未输入的内容或内容格式不正确，无法提交',

      })
      return false;

    } else{
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      let arrList = this.data.dataList
      var that = this
      that.setData({
        submit: '',
        showModal: true
      })
      setTimeout(function () {
        that.setData({
          showModal: false
        }),
          wx.navigateBack({
            delta: 2
          })
      }, 2000);

      // var obj = {
      //   company: name,
      //   phone: "",
      //   state: "",
      //   isTouchMove: false,
      //   checked: false
      // }
      // arrList.push(obj)
      // this.setData({ dataList: arrList });
      // console.log(e);
      // console.log(this.data.dataList);



      // console.log(this.data.dataList);
      return true;
    }

     
 
   

  },


  // 禁止屏幕滚动
  preventTouchMove: function () {
  },



})




