requirejs(['../libs/base'], function (args) {
   requirejs(['jquery','avalon', 'mmState', 'common'], function () {
       /*ajax内容加载*/
       jQuery(function ($) {
           if ('enable_ajax_content' in ace) {
               var options = {
                   content_url: function (url) {
                       if (url.indexOf("login") >= 0) {
                           return false;
                       }
                       return "/html" + url;
                   },
                   default_url: '/welcome.html',
                   loading_icon: "fa-spinner fa-2x blue"
               };
               ace.enable_ajax_content($, options);
           }
       });
       avalon.config({debug: true}); //打开调试
       var root = avalon.define({
           $id: "hisRootController",
           page: '',
           init: function () {
               //if(!isLoad()){
               //    window.location = "/login.html";
               //}else{//在此处做初始化的事务
               //
               //}
           }
       });
       avalon.state('root', {
           url: '/',
           abstract: true, //抽象状态, 不会映射到url上
           views: {
               "" : {
                   templateUrl: '/'
               }
           }
       });
       avalon.state.config({
           onError: function () {
               avalon.log(args)
           },//推荐打开错误配置
           onLoad: function () {
               avalon.log(mmState.currentState.stateName);
               root.page = mmState.currentState.stateName.split(".")[1];
           }
       });
       avalon.history.start({
           fireAnchor: false
       });
       avalon.scan();
       root.init();

   })
});