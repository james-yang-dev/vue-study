import createRequest from './index'

/**
 * 유저리스트 전체를 가져온다
 */
const getCategoryList = () => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: 'categories'
  }
  return createRequest(REQUEST_CONFIG)
}

export default { getCategoryList }
