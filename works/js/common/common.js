/**
 * Created by 郭旭辉 on 2016/4/13.
 */
/**
 * 全局变量*/
var ACCESS_TOKEN = "access_token";
var categoryType = ["设备", "附件", "合同"];
var roleNames = ["普通用户", "科室负责人", "管理员", "超级管理员"];
var CURRENTUSER = "CURRENTUSER";

/** 产生guid *
 * @return {string}
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

/** 判断是否登录 **/
function isLoad() {
    return sessionStorage.getItem("ISLOAD");
}

/** 复选框是否全选 **/
function isSelectedAll(item) {
    if (item.status == 1) {
        return item.checked;
    } else {
        return true;
    }
}

/**通用方法**/
function isSuccess(result) {
    var rtnCode = result.rtnCode;
    if (rtnCode == '0000000')
        return true;
    if (rtnCode == '0100041') {
        if (layer) {
            layer.alert(result.msg, {icon: 5});
        } else {
            alert(result.msg);
        }
    }
    return false;
}
////打开loading
//openLoading = function () {
//    layer.load(2);
//};
////关闭loading
//closeLoading = function () {
//    layer.closeAll('loading');
//};
////读取参数
//getParam = function (name) {
//    return JSON.parse($(".layui-layer-content #param").val())[name];
//};
////打开弹窗
//htmlRoot = '/html',
//index = 0;//记录弹窗
//openDialog = function (url, data, title, width, height, callBack) {
//    $.get(htmlRoot + url, {}, function (html) {
//        var str = JSON.stringify(data);
//        var hidden = "<input id='param' type='hidden' value='" + str + "' />";
//        var area = [width, height];
//        if (height == 'auto') {
//            area = width;
//        }
//        index = layer.open({
//            type: 1,
//            title: title,
//            shift: 2,
//            moveEnd: function () {
//                closeAllTip();
//            },
//            cancel: function () {
//                //取消时重置回调，避免刷新
//                callBack = function () {
//                };
//            },
//            end: function () {
//                closeAllTip();
//                //为了保存后刷新
//                callBack();
//            },
//            shadeClose: false,
//            content: html + hidden,
//            area: area
//        });
//    });
//};
// 登出
function logout() {
    layer.confirm("您确定要登出？", {icon: 5, title: "注销"}, function (index) {
        $.ajax({
            url: "/cm/admin/user/logout",
            dataType: 'json',
            type: 'get',
            success: function (result) {
                if (isSuccess(result)) {
                    layer.alert(result.bizData, {icon: 1});
                    $.removeCookie(ACCESS_TOKEN);
                    sessionStorage.clear();
                } else {
                    layer.alert("操作失败！", {icon: 5});
                }
                window.setTimeout(function () {
                    window.location = "/login.html";
                }, 1200);
            }
        });
        layer.close(index);
    });
}
//查询分类
function queryCategory(type) {
    var category = [];
    $.ajax({
        url: "/cm/admin/category/queryCategory?type=" + type,
        dataType: 'json',
        type: 'get',
        async: false,
        success: function (result) {
            if (isSuccess(result)) {
                category = result.bizData;
            }
        }
    });
    return category;
}
//获取省份
function getProvince() {
    var province = [];
    $.ajax({
        url: "/libs/province.json",
        type: "get",
        dataType: "json",
        async: false,
        success: function (result) {
            province = result;
        }
    });
    return province;
}
//获取城市
function getCity() {
    var city = [];
    $.ajax({
        url: "/libs/city.json",
        type: "get",
        dataType: "json",
        async: false,
        success: function (result) {
            city = result;
        }
    });
    return city;
}
//获取区县
function getTown() {
    var town = [];
    $.ajax({
        url: "/libs/town.json",
        type: "get",
        dataType: "json",
        async: false,
        success: function (result) {
            town = result;
        }
    });
    return town;
}

/**qtip最顶部**/
$.fn.qtip.zindex = 99999999;

/**错误显示**/
function errorPlacement(error, element) {
    if (element.is(':radio') || element.is(':checkbox')) { //如果是radio或checkbox
        var eid = element.attr('name'); //获取元素的name属性
        element = $("input[name='" + eid + "']").last().parent(); //将错误信息添加当前元素的父结点后面
    }
    if (!error.is(':empty')) {
        $(element).not('.valid').qtip({
            overwrite: false,
            content: error,
            hide: false,
            show: {
                event: false,
                ready: true
            },
            style: {
                classes: 'qtip-cream qtip-shadow qtip-rounded'
            },
            position: {
                my: 'top left',
                at: 'bottom right'
            }
        }).qtip('option', 'content.text', error);
    }
    else {
        element.qtip('destroy');
    }
}
/** 拓展验证规则 **/
jQuery.validator.addMethod("isPhone", function (value, element) {
    return this.optional(element) || /^1\d{10}$/.test(value);
}, "电话号码不正确");
// 身份证号码验证
jQuery.validator.addMethod("isIdCardNo", function (value, element) {
    //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
    return this.optional(element) || isIdCardNo(value);
}, "请输入正确的身份证号码。");
//身份证号码的验证规则
function isIdCardNo(num) {
    //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
    var len = num.length, re;
    if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
    else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
    else {
        //alert("输入的数字位数不对。");
        return false;
    }
    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        else {
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (!B) {
            //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
            return false;
        }
    }
    if (!re.test(num)) {
        //alert("身份证最后一位只能是数字和字母。");
        return false;
    }
    return true;
}
// 字符验证，只能包含中文、英文、数字、下划线等字符。
jQuery.validator.addMethod("stringCheck", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
}, "只能包含中文、英文、数字、下划线等字符");
// 判断数值类型，包括整数和浮点数
jQuery.validator.addMethod("isNumber", function (value, element) {
    return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
}, "匹配数值类型，包括整数和浮点数");

//关闭所有提示
function closeAllTip() {
    $('.qtip').each(function () {
        $(this).data('qtip').destroy();
    })
}
/** 过滤器 **/
avalon.filters.categoryTypeFilter = function (value, args, args2) {
    return categoryType[(Math.log(value)) / (Math.log(2))];
};
avalon.filters.userTypeFilter = function (value) {
    var index = (Math.log(value)) / (Math.log(2));
    return roleNames[index];
};
/** 七牛云上传 **/
var bucket = {
    "headIcon": "http://7xtefm.com2.z0.glb.qiniucdn.com/",
    "business": "http://7xtex2.com2.z0.glb.clouddn.com",
    "auth": "http://o6kyy6co9.bkt.clouddn.com/"
};
var bucketType = {
    "BUSINESS": 1,
    "COOKBOOK": 2,
    "DISCOVER": 3,
    "HEADICON": 4,
    "AUTH": 5
};

function getUploadToken(type, key) {
    var uptoken = "";
    $.ajax({
        url: "/cm/admin/common/generalUploadToken?type=" + type + "&key=" + key,
        dataType: "json",
        type: "get",
        async: false,
        success: function (result) {
            if (isSuccess(result)) {
                uptoken = result.bizData;
            } else {
                layer.alert("获取上传凭证失败", 2);
            }
        }
    });
    return uptoken;
}

function previewImage(file, callback) {//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if (!file || !/image\//.test(file.type)) return; //确保文件是图片
    if (file.type == 'image/gif') {//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function () {
            callback(fr.result);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    } else {
        var preloader = new mOxie.Image();
        preloader.onload = function () {
            //preloader.downsize(550, 400);//先压缩一下要预览的图片,宽300，高300
            var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load(file.getSource());
    }
}

function deleteImg(type, key) {
    $.ajax({
        url: '/cm/admin/common/deleteImg',
        dataType: 'json',
        type: 'get',
        data: {type: type, key: key},
        success: function () {

        }
    })
}