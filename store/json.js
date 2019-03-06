import expressMenu from '~/assets/json/express_menu.json'

// 状態管理
export const state = () => ({
  data: expressMenu,
})

// getters
export const getters = {
  getAll (state) {
    return state.json
  }
}
