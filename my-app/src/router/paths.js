
export default [
    {
        path: '/',
        // Relative to /src/views
        view: 'Login'
    },
    {
        path: '/home',
        name: '账户信息',
        view: 'UserProfile'
    },
    {
        path: '/',
        name: '试题管理',
        view: 'manageQuestion'
    },
    {
        path: '/add-question',
        name: '试题录入',
        view: 'AddQuestion'
    },
    {
        path: '/manage-user',
        name: '用户管理',
        view: 'manageUser'
    },
    {
        path: '/exams',
        name: '试卷生成',
        view: 'exams'
    }
]
