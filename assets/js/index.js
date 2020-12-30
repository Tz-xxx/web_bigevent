$(function () {


    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 提示用户是否确定退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //   清空本地存储中的token
            localStorage.removeItem('token')
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);//index是layui弹出层的标识，跟着这个标识就能找到对应的弹出框
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {                   
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // 在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}