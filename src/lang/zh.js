export default {
  route: {
    dashboard: '首页',
    user: '用户',
    member: '注册用户',
    personal: '认证农户',
    company: '认证企业',
    administrator: '管理员',
    crew: '人员管理',
    bankInstitutions: '银行管理',
    bank: '银行机构',
    uCenter: '个人中心',
    bankInfo: '银行信息',
    baseInfo: '个人信息',
    products: '产品',
    companyProduct: '银企对接产品',
    personalProduct: '精准扶贫产品',
    application: '产品申请',
    companyProductApply: '银企对接申请',
    personalProductApply: '精准扶贫申请',
    requirementApply: '需求申请',
    newsCenter: '新闻中心',
    news: '新闻',
    banner: '轮播',
    logs: '日志',
    report: '举报',
    label: '标签',
    systemLabel: '系统标签',
    userLable: '用户标签审核',
    formControl: '表单控件'
  },
  headerBar: {
    logo: '宜昌市中小微企业和农村信用信息共享服务平台',
    signOut: '退出',
    dashboard: '首页',
    uCenter: '个人中心',
    refresh: '刷新页面',
    screenfull: '全屏',
    theme: '换肤',
    dark: '暗色',
    light: '亮色'
  },
  signIn: {
    title: '宜昌市中小微企业和农村信用信息共享服务平台',
    logIn: '登录',
    cellPhonePlaceholder: '请输入手机号码',
    passwordPlaceholder: '请输入密码',
    loginIndex: '登录宜昌市中小微企业和农村信用信息共享服务平台官网',
    description: '““宜昌市中小微企业和农村信用信息共享服务平台”网站具有为政府公共管理信息归集、交换、公示及金融产品展示等各类网上服务功能；建立信息采集、信用评价、信用服务、异议处理等功能的信用信息共享服务平台；为建成全面的农村信用主体数据库，围绕信用信息金融应用提供“一站式”服务。'
  },
  userInfo: {
    userInfo: '个人信息',
    bankInfo: '银行信息',
    changePassword: '修改密码',
    cellPhone: '手机号',
    cellPhonePlaceholder: '请输入手机号码',
    crewStaff: '员工编号',
    crewStaffPlaceholder: '请输入员工编号',
    crewUserGroup: '所属银行',
    crewUserGroupPlaceholder: '请输入所属银行',
    crewRealname: '员工姓名',
    crewRealnamePlaceholder: '请输入姓名',
    setAvatar: '设置头像',
    submit: '提交'
  },
  changePassword: {
    oldPassword: '原密码',
    password: '新密码',
    rePassword: '确认密码',
    oldPasswordPlaceholder: '请输入原始密码',
    passwordPlaceholder: '请输入新密码',
    rePasswordPlaceholder: '请确认新密码',
    submit: '提交',
    cellPhone: '手机号码',
    smsCellPhone: '手机号码',
    verifcationCode: '短信验证码',
    sendMessages: '发送短信',
    cellPhonePlaceholder: '请输入手机号码',
    verifcationCodePlaceholder: '请输入短信验证码',
    authentication: '身份验证'
  },
  filter: {
    selectPlaceholder: '请选择',
    searchPlaceholder: '员工编号/手机号',
    searchBtn: '搜索',
    add: '新增'
  },
  crew: {
    crewStaff: '员工编号',
    crewRealname: '姓名',
    crewCellPhone: '手机号码',
    crewRole: '角色',
    crewUsergroup: '所属银行',
    crewStatus: '状态',
    viewTitle: '查看员工信息'
  },
  products: {
    quota: '额度',
    quotaUpperLimit: '额度上限',
    quotaUpperLimitPlaceholder: '请输入额度上限',
    quotaLowerLimit: '额度下限',
    quotaLowerLimitPlaceholder: '请输入额度下限'
  },
  table: {
    actions: '操作',
    modify: '修改',
    view: '查看',
    enable: '启用',
    disabled: '禁用',
    loadingText: '正在加载中，请耐心等待...'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  question: {
    question: '问题',
    questionPlaceholder: '请输入问题',
    answer: '答案',
    answerPlaceholder: '请输入答案'
  },
  form: {
    usergroup: '所属机构',
    usergroupPlaseholder: '请选择银行机构',
    role: '角色',
    updateTime: '更新时间',
    updateTimePlaceholder: '请选择更新时间'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  /*
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },*/
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
