export default {
  methods: {
    loginConfirm () {
      // 判断是否有token
      if (!this.$store.getters.token) {
      // 弹出确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
