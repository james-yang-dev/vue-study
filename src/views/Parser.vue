<template>
  <div class="parser">
    <h1>인덱스 웹 파서 페이지 입니다</h1>
    <WebParser></WebParser>
  </div>
</template>

<script>
import WebParser from '@/components/WebParser.vue'

export default {
  name: 'Parser',
  components: {
    WebParser
  }
}
</script>
