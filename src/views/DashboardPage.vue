<template>
  <div class="dashboard">
    <span>welcome DashBoard</span>
    <div>
      <DashboardBar></DashboardBar>
    </div>
  </div>
</template>

<script>
import DashboardBar from '@/components/DashboardBar.vue'

export default {
  name: 'DashboardPage',
  components: {
    DashboardBar
    // 대시보드 테이블 구현해야 함
  }
}
</script>

<style></style>
