/**
 * Created by Administrator on 2016/6/22.
 */
requirejs.config({
    baseUrl: 'libs/',
    paths: {
        "avalon": "avalon/avalon.shim.min", // 跟map上的配置实现同样的效果
        "mmState":'avalon/mmState',
        "mmHistory":'avalon/mmHistory',
        "mmPromise":'avalon/mmPromise',
        "mmRouter": 'avalon/mmRouter',
        "jquery": 'jquery/jquery-1.9.1.min',
        "cookie": 'jquery/jquery.cookie',
        "validate": 'jquery/jquery.validate.min',
        "layDate": 'layDate/laydate',
        "qtip": 'qtip/jquery.qtip.min',

        "layer": "layer/layer",
        "store": 'store/store.min',
        "common": "../js/common/common"
    },
    map: {
        '*': {
            'css': 'require/css.min'
        }
    },
    shim:{
        "layer": {
            deps: ["jquery",'css!/libs/layer/skin/layer.css'],
            exports: "layer"
        },
        "layDate": {
            deps: ['jquery', 'css!/libs/layDate/need/laydate.css'],
            exports: 'layDate'
        },
        "cookie": {
            deps: ['jquery'],
            exports: 'cookie'
        },
        "validate": {
            deps: ['jquery'],
            exports: 'cookie'
        },
        "store": {
            deps: ['store'],
            exports: 'store'
        },
        "qtip": {
          deps: ['jquery','css!/libs/qtip/jquery.qtip.min.css']
        },
        "common": {
            deps: ["jquery",'qtip','validate']
        }
    },
    pragmasOnSave: {
        excludeRequireCss: true
    }
});
//为了可以预览，直接在这里重写加载器
requirejs(['avalon', 'mmState'], function (args) {
   avalon.require = requirejs;
});