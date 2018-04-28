import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/signIn', component: _import('signIn/Index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/Index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'icon-dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/uCenter',
    component: Layout,
    redirect: '/uCenter/BaseInfo',
    meta: {
      roles: ['admin'],
      title: 'uCenter',
      icon: 'icon-ucenter',
      noCache: true
    },
    name: 'uCenter',
    children: [
      {
        path: 'baseInfo',
        component: _import('uCenter/BaseInfo'),
        name: 'baseInfo',
        meta: {
          title: 'baseInfo',
          icon: 'icon-ucenter',
          roles: ['admin']
        }
      },
      {
        path: 'bankInfo',
        component: _import('uCenter/BankInfo'),
        name: 'bankInfo',
        meta: {
          title: 'bankInfo',
          icon: 'icon-bank',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/member',
    meta: {
      roles: ['admin'],
      title: 'user',
      icon: 'icon-user',
      noCache: true
    },
    name: 'user',
    children: [
      {
        path: 'member',
        component: _import('user/Member'),
        name: 'member',
        meta: {
          title: 'member',
          icon: 'icon-user',
          roles: ['admin']
        }
      },
      {
        path: 'personal',
        component: _import('user/Personal'),
        name: 'personal',
        meta: {
          title: 'personal',
          icon: 'icon-personal',
          roles: ['admin']
        }
      },
      {
        path: 'company',
        component: _import('user/Company'),
        name: 'company',
        meta: {
          title: 'company',
          icon: 'icon-company',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/crew',
    component: Layout,
    redirect: '/crew/Index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('crew/Index'),
      name: 'crew',
      meta: {
        title: 'crew',
        icon: 'icon-administrator',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/bankInstitutions',
    component: Layout,
    redirect: '/bankInstitutions/Index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('bankInstitutions/Index'),
      name: 'bankInstitutions',
      meta: {
        title: 'bank',
        icon: 'icon-bank',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/products',
    component: Layout,
    redirect: '/products/companyProduct',
    meta: {
      roles: ['admin'],
      title: 'products',
      icon: 'icon-product',
      noCache: true
    },
    name: 'products',
    children: [
      {
        path: 'companyProduct',
        component: _import('products/CompanyProduct'),
        name: 'companyProduct',
        meta: {
          title: 'companyProduct',
          icon: 'icon-companyProduct',
          roles: ['admin']
        }
      },
      {
        path: 'personalProduct',
        component: _import('products/PersonalProduct'),
        name: 'personalProduct',
        meta: {
          title: 'personalProduct',
          icon: 'icon-personalProduct',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/application',
    component: Layout,
    redirect: '/application/CompanyProductApply',
    meta: {
      roles: ['admin'],
      title: 'application',
      icon: 'icon-productApply',
      noCache: true
    },
    name: 'application',
    children: [
      {
        path: 'companyProductApply',
        component: _import('application/CompanyProductApply'),
        name: 'companyProductApply',
        meta: {
          title: 'companyProductApply',
          icon: 'icon-companyProduct',
          roles: ['admin']
        }
      },
      {
        path: 'personalProductApply',
        component: _import('application/PersonalProductApply'),
        name: 'personalProductApply',
        meta: {
          title: 'personalProductApply',
          icon: 'icon-personalProduct',
          roles: ['admin']
        }
      },
      {
        path: 'requirementApply',
        component: _import('application/RequirementApply'),
        name: 'requirementApply',
        meta: {
          title: 'requirementApply',
          icon: 'icon-productApply',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/newsCenter',
    component: Layout,
    redirect: '/newsCenter/News',
    meta: {
      roles: ['admin'],
      title: 'newsCenter',
      icon: 'icon-news-center',
      noCache: true
    },
    name: 'newsCenter',
    children: [
      {
        path: 'news',
        component: _import('newsCenter/News'),
        name: 'news',
        meta: {
          title: 'news',
          icon: 'icon-news',
          roles: ['admin']
        }
      },
      {
        path: 'banner',
        component: _import('newsCenter/Banner'),
        name: 'banner',
        meta: {
          title: 'banner',
          icon: 'icon-banner',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/logs',
    component: Layout,
    redirect: '/logs/Index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('logs/Index'),
      name: 'logs',
      meta: {
        title: 'logs',
        icon: 'icon-logo',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report/Index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('report/Index'),
      name: 'report',
      meta: {
        title: 'report',
        icon: 'icon-report',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/label',
    component: Layout,
    redirect: '/label/SystemLabel',
    meta: {
      roles: ['admin'],
      title: 'label',
      icon: 'icon-product-label-management',
      noCache: true
    },
    name: 'label',
    children: [
      {
        path: 'systemLabel',
        component: _import('label/SystemLabel'),
        name: 'systemLabel',
        meta: {
          title: 'systemLabel',
          icon: 'icon-systemLable',
          roles: ['admin']
        }
      },
      {
        path: 'userLable',
        component: _import('label/UserLable'),
        name: 'userLable',
        meta: {
          title: 'userLable',
          icon: 'icon-product-label-management',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/formControl',
    component: Layout,
    redirect: '/formControl/Index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('formControl/Index'),
      name: 'formControl',
      meta: {
        title: 'formControl',
        icon: 'icon-formfill',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]
