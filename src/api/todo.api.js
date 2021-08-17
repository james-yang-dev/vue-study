import createRequest from './index'

/**
 * 투두 리스트 전체를 가져온다
 */
const getTodoList = () => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: 'todos'
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 투두의 정보를 가져온다
 * @param {*} todoId : 정보를 조회 할 todo id
 */
const getTodoInfo = todoId => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: `todos/${todoId}`
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 투두의 정보를 가져온다
 * @param {*} seasonType : 정보를 조회 할 todo 유형, 아무것도 넣지 않는 경우 this를 기본값으로 가진다
 * this - 이번 투두을 가져온다.
 * next - 이번 투두 이후를 가져온다.
 * done - 완료된 투두을 가져온다
 */
const getTodoSeasonList = (seasonType = 'this') => {
  console.log('todoType', seasonType)
  const REQUEST_CONFIG = {
    method: 'get',
    url: `todos/season/${seasonType}`
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 투두의 정보를 변경한다
 * @param {*} todoData : 업데이트 할 todo의 정보를 기재한다. 갱신할 값만 변경해서 전체를 넘긴다.
 * {
      "id": "t0001", // 이 id 를 기준으로 업데이트를 한다.
      "title": "타이틀",
      "categoryCode": "03", 
      "description": "자세한 설명은 생략한다11",
      "links": "https://daum.net",
      "seasonId": "202001",
      "userId": "carlos.yang", // 이 값은 수정되지 않는다.
      "done": false
    },
 */
const updateTodo = todoData => {
  const REQUEST_CONFIG = {
    method: 'patch',
    url: `todo`,
    data: {
      todoData: todoData
    }
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 투두의 정보를 가져온다
 * @param {*} todoData : 생성할 todo의 정보를 기재한다. 생성할 값을 넘긴다.
 * {
      "title": "타이틀",
      "categoryCode": "03", 
      "description": "자세한 설명은 생략한다11",
      "links": "https://daum.net",
      "seasonId": "202001",
      "userId": "carlos.yang", // 이 값은 auth에서 자동으로 삽입하도록 나중에 변경한다.
      "done": false
    },
 */
const createTodo = todoData => {
  const REQUEST_CONFIG = {
    method: 'put',
    url: `todo`,
    data: {
      todoData: todoData
    }
  }
  return createRequest(REQUEST_CONFIG)
}

export default {
  getTodoList,
  getTodoInfo,
  getTodoSeasonList,
  updateTodo,
  createTodo
}
