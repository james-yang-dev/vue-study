import createRequest from './index'

/**
 * 유저리스트 전체를 가져온다
 */
const getUserList = () => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: 'users'
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 유저의 정보를 가져온다
 * @param {*} userId : 정보를 조회 할 user id
 */
const getUserInfo = userId => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: `users/${userId}`
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 유저의 로그인 가능 여부를 체크한다
 * @param {*} id : 로그인 정보를 체크 할 아이디
 * @param {*} password : 로그인 정보를 체크 할 비밀번호
 */
const isUser = (id, password) => {
  if (id && password) {
    const REQUEST_CONFIG = {
      method: 'post',
      url: 'users',
      data: {
        userId: id,
        userPw: password
      }
    }
    return createRequest(REQUEST_CONFIG)
  }
}

export default { isUser, getUserList, getUserInfo }
