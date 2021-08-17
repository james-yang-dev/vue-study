<template>
  <div class="DashboardBar">
    <div>
      <strong>{{ msg }}</strong>
    </div>
    <div>
      <span>{{ message }}</span>
    </div>
    <div>
      <button @click="updateMessageEvent('변한 메시지')">Message 변경</button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('Dashboard')

export default {
  name: 'DashboardBar',
  data() {
    return {
      msg: 'DashboardBar components'
    }
  },
  computed: {
    ...mapState({
      message: state => state.message
    }),
    ...mapGetters(['getMessage'])
  },
  methods: {
    ...mapActions({
      updateMessageEvent: 'updateMessageAction'
    })
  }
}
</script>

<style></style>
