<template>
  <div class="webParser">
    <div style="padding-bottom: 10px;">
      <span>{{ getMsg }}</span>
    </div>
    <div style="display: inline;">
      URL :
      <input type="text" :value="inputUrl" @input="updateUrl" />
      프로젝트(URI) :
      <input type="text" :value="inputProjectName" @input="updateProjectName" />
      <button @click="makeHtml">{{ type }}</button>
    </div>
    <!-- https://github.com/wyzantinc/vue-radial-progress 확인 -->
    <div
      id="progress"
      style="display: flex; justify-content: center; box-sizing: border-box; margin: 10px"
    >
      <radial-progress-bar
        v-if="hasProgress"
        :completed-steps="completedSteps"
        :diameter="200"
        :total-steps="totalSteps"
        :animateSpeed="300"
        :strokeWidth="10"
        :startColor="'#bbff42'"
        :stopColor="'#429321'"
        :innerStrokeColor="'#323232'"
      >
        <p style="margin: 5px">Total Files: {{ getTotalSteps }}</p>
        <p style="margin: 5px">Completed Files: {{ getCompletedSteps }}</p>
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('parser')

const getRandomWord = () => {
  const buttonWordList = ['Fun', 'Cool', 'Sexy']
  const randomInt = Math.floor(Math.random() * (3 - 0) + 0)

  return buttonWordList[randomInt]
}

const getRandomTitle = () => {
  const titleList = [
    '파서가 하는 일은 읽어 들이는 것 입니다.',
    '읽는 것은 읽는다는 것 입니다.',
    '읽습니다. 그것이 약속 이니까.'
  ]
  const randomInt = Math.floor(Math.random() * (3 - 0) + 0)

  return titleList[randomInt]
}

export default {
  name: 'WebParser',
  data() {
    return {
      type: getRandomWord()
    }
  },
  components: {
    RadialProgressBar
  },
  computed: {
    ...mapState({
      message: state => state.message,
      inputUrl: state => state.inputUrl,
      inputProjectName: state => state.projectName,
      completedSteps: state => state.completedSteps,
      totalSteps: state => state.totalSteps,
      hasProgress: state => state.hasProgress
    }),
    ...mapGetters([
      'getMsg',
      'getInputUrl',
      'getInputProjectName',
      'getCompletedSteps',
      'getTotalSteps'
    ])
  },
  methods: {
    ...mapActions({
      makeHtml: 'callUrl',
      updateUrl: 'updateUrl',
      updateProjectName: 'updateProjectName',
      resetProgress: 'resetProgress'
    })
  },
  watch: {
    completedSteps(newValue, oldValue) {
      const reset = this.resetProgress
      if (newValue === this.totalSteps) {
        setTimeout(function() {
          // 프로그레스 종료시 오프시키는 옵션
          // reset({ off: true })
        }, 1000)
      }
    }
  }
}
</script>
