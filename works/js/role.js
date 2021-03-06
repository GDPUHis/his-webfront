/**
 * Created by Administrator on 2016/5/16.
 */
avalon.ready(function () {
    //var url = $.getLocalStorage(URLCONFIG)["getRoles"];
    var vm = avalon.define({
        $id: "role",
        logo: '',
        copyRight: '',
        curUser: JSON.parse(sessionStorage.getItem("CURRENTUSER")),
        roleData: [],
        //获取角色列表
        getRoles: function () {
            var roleImg = {
                "普通用户": "/images/role/role0.png",
                "科室负责人": "/images/role/role1.jpg",
                "管理员": "/images/role/role2.png",
                "超级管理员": "/images/role/role3.jpg"
            };
            var background = {
                "普通用户": "#33c06e",
                "科室负责人": "#8183f1",
                "管理员": "#ffb810",
                "超级管理员": "#fb592d"
            };
            var userTypes = {
                "普通用户": 1,
                "科室负责人": 2,
                "管理员": 4,
                "超级管理员": 8
            };
            var roles = [];
            for (var i = 1; i <= 8; i *= 2) {
                if ((vm.curUser.userTypes & i) > 0) {
                    var index = (Math.log(i)) / (Math.log(2));
                    roles.push(roleNames[index]);
                }
            }
            //筛选出角色集合
            vm.roleData = $.map(roles, function (item) {
                var img = roleImg[item];
                var backColor = background[item];
                var userType = userTypes[item];
                return {
                    "img": img,
                    "background": backColor,
                    "roleName": item,
                    "userType": userType
                }
            });
            avalon.log(vm.roleData);
            layer.closeAll('loading');
        },
        //选择角色
        selectRole: function (role) {
            layer.load(2);
            sessionStorage.setItem(CURRENTUSER, JSON.stringify({
                "username": vm.curUser.username,
                "code": vm.curUser.code,
                "name": vm.curUser.name,
                "departmentId": vm.curUser.departmentId,
                "jobNumber": vm.curUser.jobNumber,
                "positionId": vm.curUser.positionId,
                "userTypes": vm.curUser.userTypes,
                "userType": role.userType,
                "phone":vm.curUser.phone,
                "lineTel": vm.curUser.lineTel
            }));
            //if(role.userType == 1){//普通用户登入，跳转至PC
            //    window.location.href = "/login.html";
            //}else {
            //    if(role.userType == 2){//商家登录，查询出商家的信息
            //        $.ajax({
            //            url: '/cm/admin/shop/initShop?uid='+vm.curUser.code,
            //            dataType: 'json',
            //            type: 'get',
            //            complete: function () {
            //              layer.close('loading');
            //            },
            //            success: function (result) {
            //                if (isSuccess(result)){
            //                     if(result.bizData.length == 0){
            //                         layer.alert("商店已经停用！",{icon: 2});
            //                     }else{
            //                         sessionStorage.setItem(CURRENTSHOP, JSON.stringify(result.bizData));
            //                     }
            //                }
            //            }
            //        });
            //    }
                window.setTimeout(function () {
                    window.location.href = "/index.html";
                },2000);
            //}
        },
        init: function () {
            layer.load(2);
            vm.getRoles();
        }
    });
    avalon.scan();
    vm.init();
});