// 每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // 在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})