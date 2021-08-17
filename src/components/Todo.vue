<template>
  <div class="Todo">
    <strong class="title_todo">공부할 것</strong>
    <div class="cover_title">
      <select class="select_status" @change="onChangeSelected">
        <option value="">종목 (선택)</option>
        <option 
        v-for="item of categoryList" 
        :value="item.categoryCode" 
        :key="item.categoryCode">
          {{item.categoryName}}
        </option>
      </select>
      <input type="text" class="inp_title" :value="inputTitle" @input="updateTitle" placeholder="타이틀">
    </div>
    <textarea class="textArea" :value="inputDescription" @input="updateDescription" rows="10"/>
    <div>
      <button @click="commitTodo" type="button">업로드</button>
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
} = createNamespacedHelpers('Todo')

export default {
  name: 'Todo',
  data() {
    return {
      msg: 'Todo components',
    }
},
  created() {
    this.getCategories();
  },
  computed: {
    ...mapState({
      categoryList: state => state.categories,
      inputTitle: state => state.inputTitle,
      inputDescription: state => state.inputDescription,
      inputCategory: state => state.inputCategory
    }),
    ...mapGetters([
      ])
  },
  methods: {
    ...mapActions({
      commitTodo: 'dataUpdate',
      updateTitle: 'updateTitle',
      updateDescription: 'updateDescription',
      onChangeSelected:'updateCategory',
      getCategories: 'getCategories'
    })
  }
}
</script>

<style lang="scss">
.Todo{
  width:600px;
  margin:0 auto;
  .cover_title{
    overflow:hidden;
  }
  .title_todo{
    display:block;
  }
  .inp_title{
    overflow:hidden;
  }
  .select_status{
    float:left;
    width:100px;
  }
  .inp_title{
    float:left;
    width:500px;
    padding:0;
    outline:none;
    box-sizing:border-box;
  }
  .textArea{
    margin-top:10px;
    width:100%;
    outline:none;
    box-sizing:border-box;
  }
}
</style>
