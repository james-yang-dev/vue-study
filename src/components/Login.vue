<template>
  <form @submit="onSubmit">
    <div class="login_form">
        <div class="wrap_inp">
          <strong class="tit_g">아이디</strong>
          <input type="text" v-model="userId" @input="updateUserIdEvent">
        </div> 
        <div class="wrap_inp">
          <strong class="tit_g">비밀번호</strong>
          <input type="password" v-model="userPw" @input="updateUserPasswordEvent">
        </div> 
      <div>
        <span>{{ message }}</span>
      </div>
      <div>
        <!-- <button @click="updateMessageEvent('변한 메시지')">Message 변경</button> -->
        <button type="submit">로그인버튼</button>
      </div>
    </div>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('Login')

export default {
  name: 'Login',
  data() {
    return {
      msg: 'Login components',
      userId: '',
      userPw: ''
    }
  },
  computed: {
    ...mapState({
      message: state => state.message,
      userId: state => state.userId,
      userPw: state => state.userPw
    }),
    ...mapGetters(['getMessage'])
  },
  methods: {
    ...mapActions({
      updateMessageEvent: 'updateMessageAction',
      updateUserIdEvent: 'updateUserIdAction',
      updateUserPasswordEvent: 'updateUserPasswordAction'
    }),
    onSubmit () {
      console.log(this.userId)
      console.log(this.userPw)
    }
  }
}
</script>

<style>
.login_form{overflow:hidden}
.wrap_inp{overflow:hidden;width:270px;margin:20px auto}
.wrap_inp .tit_g{float:left;width:100px;margin-right:15px;text-align:left}
</style>
