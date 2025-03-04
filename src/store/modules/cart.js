import { changeGoodNum, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    GETCARTLIST (state, newList) {
      state.cartList = newList
    },
    TOGGLECHECKED (state, goodId) {
      const good = state.cartList.find(item => item.goods_id === goodId)
      good.isChecked = !good.isChecked
    },
    TOGGLEALLCHECK (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    CHANGECARTNUM (state, { goodsNum, goodsId }) {
      const good = state.cartList.find(item => item.goods_id === goodsId)
      good.goods_num = goodsNum
    }
  },
  actions: {
    async getCartList (context) {
      const { data } = await getCartList()
      // 后台返回的数据中，不包含复选框的选中状态，需要手动给每一项添加一个ischecked状态
      data.list.forEach(element => {
        element.isChecked = true
      })
      context.commit('GETCARTLIST', data.list)
    },
    async changeCartNum (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先修改本地数据
      context.commit('CHANGECARTNUM', { goodsId, goodsNum })
      // 再修改后台数据
      await changeGoodNum(goodsId, goodsNum, goodsSkuId)
    },
    async delGoods (context) {
      const cartIds = context.getters.selCartList.map(item => item.id)
      const res = await delSelect(cartIds)
      Toast(res.message)
      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 购物车商品总数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的购物车商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的购物车商品数量
    selCartTotal (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的购物车商品总价
    selCartPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
