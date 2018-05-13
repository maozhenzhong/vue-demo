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
  { path: '/signIn', component: _import('signIn/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'icon-dashboard', noCache: true }
    }]
  },

  {
    path: '/uCenter',
    component: Layout,
    redirect: '/uCenter/BaseInfo',
    meta: {
      title: 'uCenter',
      icon: 'icon-ucenter',
      noCache: true
    },
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
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/Member/index',
    meta: {
      title: 'member',
      icon: 'icon-user',
      noCache: true
    },
    children: [
      {
        path: 'Member',
        component: _import('member/Member/index'),
        name: 'Member',
        meta: {
          title: 'member',
          icon: 'icon-user',
          roles: ['admin']
        }
      },
      {
        path: 'Approve',
        component: _import('member/Approve/index'),
        name: 'approve',
        meta: {
          title: 'approve',
          icon: 'icon-approve',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/crew',
    component: Layout,
    redirect: '/crew/index',
    meta: {
      title: 'crew',
      icon: 'icon-administrator',
      noCache: true
    },
    children: [
      {
        path: 'index',
        component: _import('crew/index'),
        name: 'crew',
        meta: {
          title: 'crew',
          icon: 'icon-administrator',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'showCrew/:id',
        hidden: true,
        component: _import('crew/showCrew'),
        name: 'showCrew',
        meta: {
          title: 'showCrew',
          icon: 'icon-administrator',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'editCrew/:id',
        hidden: true,
        component: _import('crew/editCrew'),
        name: 'editCrew',
        meta: {
          title: 'editCrew',
          icon: 'icon-administrator',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  {
    path: '/bank',
    component: Layout,
    redirect: '/bank/index',
    meta: {
      title: 'bank',
      icon: 'icon-bank',
      noCache: true
    },
    children: [
      {
        path: 'index',
        component: _import('bank/index'),
        name: 'bank',
        meta: {
          title: 'bank',
          icon: 'icon-bank',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'editBank/:id',
        hidden: true,
        component: _import('bank/editBank'),
        name: 'editBank',
        meta: {
          title: 'editBank',
          icon: 'icon-bank',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'showBank/:id',
        hidden: true,
        component: _import('bank/showBank'),
        name: 'showBank',
        meta: {
          title: 'showBank',
          icon: 'icon-bank',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  {
    path: '/branches',
    component: Layout,
    redirect: '/branches/index',
    meta: {
      title: 'branches',
      icon: 'icon-branches',
      noCache: true
    },
    children: [
      {
        path: 'index',
        component: _import('branches/index'),
        name: 'branches',
        meta: {
          title: 'branches',
          icon: 'icon-branches',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'editBranches/:id',
        hidden: true,
        component: _import('branches/editBranches'),
        name: 'editBranches',
        meta: {
          title: 'editBranches',
          icon: 'icon-branches',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'showBranches/:id',
        hidden: true,
        component: _import('branches/showBranches'),
        name: 'showBranches',
        meta: {
          title: 'showBranches',
          icon: 'icon-branches',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  {
    path: '/products',
    component: Layout,
    redirect: '/products/companyProduct',
    meta: {
      title: 'products',
      icon: 'icon-product',
      noCache: true
    },
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
      title: 'application',
      icon: 'icon-productApply',
      noCache: true
    },
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
    path: '/news',
    component: Layout,
    redirect: '/news/NewsList',
    meta: {
      title: 'news',
      icon: 'icon-news-center',
      noCache: true
    },
    children: [
      {
        path: 'NewsList',
        component: _import('news/NewsList'),
        name: 'newsList',
        meta: {
          title: 'news',
          icon: 'icon-news',
          roles: ['admin']
        }
      },
      {
        path: 'Banner',
        component: _import('news/Banner'),
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
    redirect: '/logs/index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('logs/index'),
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
    redirect: '/report/index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('report/index'),
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
      title: 'label',
      icon: 'icon-product-label-management',
      noCache: true
    },
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
    redirect: '/formControl/index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('formControl/index'),
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

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/uCenter',
  //   component: Layout,
  //   redirect: '/uCenter/BaseInfo',
  //   meta: {
  //     title: 'uCenter',
  //     icon: 'icon-ucenter',
  //     roles: ['admin'],
  //     noCache: true
  //   },
  //   name: 'uCenter',
  //   children: [
  //     {
  //       path: 'baseInfo',
  //       component: _import('uCenter/BaseInfo'),
  //       name: 'baseInfo',
  //       meta: {
  //         title: 'baseInfo',
  //         icon: 'icon-ucenter',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/member',
  //   meta: {
  //     roles: ['admin'],
  //     title: 'user',
  //     icon: 'icon-user',
  //     noCache: true
  //   },
  //   name: 'user',
  //   children: [
  //     {
  //       path: 'member',
  //       component: _import('user/Member'),
  //       name: 'member',
  //       meta: {
  //         title: 'member',
  //         icon: 'icon-user',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'personal',
  //       component: _import('user/Personal'),
  //       name: 'personal',
  //       meta: {
  //         title: 'personal',
  //         icon: 'icon-personal',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'company',
  //       component: _import('user/Company'),
  //       name: 'company',
  //       meta: {
  //         title: 'company',
  //         icon: 'icon-company',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/crew',
  //   component: Layout,
  //   redirect: '/crew/index',
  //   meta: { roles: ['admin'] }, // you can set roles in root nav
  //   children: [{
  //     path: 'index',
  //     component: _import('crew/index'),
  //     name: 'crew',
  //     meta: {
  //       title: 'crew',
  //       icon: 'icon-administrator',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // {
  //   path: '/bankInstitutions',
  //   component: Layout,
  //   redirect: '/bankInstitutions/index',
  //   meta: {
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'index',
  //     component: _import('bankInstitutions/index'),
  //     name: 'bankInstitutions',
  //     meta: {
  //       title: 'bank',
  //       icon: 'icon-bank',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // {
  //   path: '/products',
  //   component: Layout,
  //   redirect: '/products/companyProduct',
  //   meta: {
  //     roles: ['admin'],
  //     title: 'products',
  //     icon: 'icon-product',
  //     noCache: true
  //   },
  //   name: 'products',
  //   children: [
  //     {
  //       path: 'companyProduct',
  //       component: _import('products/CompanyProduct'),
  //       name: 'companyProduct',
  //       meta: {
  //         title: 'companyProduct',
  //         icon: 'icon-companyProduct',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'personalProduct',
  //       component: _import('products/PersonalProduct'),
  //       name: 'personalProduct',
  //       meta: {
  //         title: 'personalProduct',
  //         icon: 'icon-personalProduct',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/application',
  //   component: Layout,
  //   redirect: '/application/CompanyProductApply',
  //   meta: {
  //     roles: ['admin'],
  //     title: 'application',
  //     icon: 'icon-productApply',
  //     noCache: true
  //   },
  //   name: 'application',
  //   children: [
  //     {
  //       path: 'companyProductApply',
  //       component: _import('application/CompanyProductApply'),
  //       name: 'companyProductApply',
  //       meta: {
  //         title: 'companyProductApply',
  //         icon: 'icon-companyProduct',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'personalProductApply',
  //       component: _import('application/PersonalProductApply'),
  //       name: 'personalProductApply',
  //       meta: {
  //         title: 'personalProductApply',
  //         icon: 'icon-personalProduct',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'requirementApply',
  //       component: _import('application/RequirementApply'),
  //       name: 'requirementApply',
  //       meta: {
  //         title: 'requirementApply',
  //         icon: 'icon-productApply',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/news',
  //   component: Layout,
  //   redirect: '/news/NewsList',
  //   meta: {
  //     roles: ['admin'],
  //     title: 'news',
  //     icon: 'icon-news-center',
  //     noCache: true
  //   },
  //   name: 'news',
  //   children: [
  //     {
  //       path: 'NewsList',
  //       component: _import('news/NewsList'),
  //       name: 'newsList',
  //       meta: {
  //         title: 'news',
  //         icon: 'icon-news',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'Banner',
  //       component: _import('news/Banner'),
  //       name: 'banner',
  //       meta: {
  //         title: 'banner',
  //         icon: 'icon-banner',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/logs',
  //   component: Layout,
  //   redirect: '/logs/index',
  //   meta: {
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'index',
  //     component: _import('logs/index'),
  //     name: 'logs',
  //     meta: {
  //       title: 'logs',
  //       icon: 'icon-logo',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // {
  //   path: '/report',
  //   component: Layout,
  //   redirect: '/report/index',
  //   meta: {
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'index',
  //     component: _import('report/index'),
  //     name: 'report',
  //     meta: {
  //       title: 'report',
  //       icon: 'icon-report',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // {
  //   path: '/label',
  //   component: Layout,
  //   redirect: '/label/SystemLabel',
  //   meta: {
  //     roles: ['admin'],
  //     title: 'label',
  //     icon: 'icon-product-label-management',
  //     noCache: true
  //   },
  //   name: 'label',
  //   children: [
  //     {
  //       path: 'systemLabel',
  //       component: _import('label/SystemLabel'),
  //       name: 'systemLabel',
  //       meta: {
  //         title: 'systemLabel',
  //         icon: 'icon-systemLable',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       path: 'userLable',
  //       component: _import('label/UserLable'),
  //       name: 'userLable',
  //       meta: {
  //         title: 'userLable',
  //         icon: 'icon-product-label-management',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/formControl',
  //   component: Layout,
  //   redirect: '/formControl/index',
  //   meta: {
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'index',
  //     component: _import('formControl/index'),
  //     name: 'formControl',
  //     meta: {
  //       title: 'formControl',
  //       icon: 'icon-formfill',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // { path: '*', redirect: '/404', hidden: true }
]
