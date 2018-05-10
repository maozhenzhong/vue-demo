import Cookies from 'js-cookie'
const SIDEBAR_OPENED = 1
const SIDEBAR_CLOSED = 0

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zh',
    theme: Cookies.get('theme') || 'jack'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', SIDEBAR_OPENED)
      } else {
        Cookies.set('sidebarStatus', SIDEBAR_CLOSED)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    HIDDEN_SIDEBAR: state => {
      Cookies.set('sidebarStatus', SIDEBAR_OPENED)
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
      Cookies.set('theme', theme)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    hiddenSidebar({ commit }) {
      commit('HIDDEN_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    }
  }
}

export default app
