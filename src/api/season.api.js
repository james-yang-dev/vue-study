import createRequest from './index'

/**
 * 시즌 리스트 전체를 가져온다
 */
const getSeasonList = () => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: 'seasons'
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 시즌의 정보를 가져온다
 * @param {*} seasonId : 정보를 조회 할 season id
 */
const getSeasonInfo = seasonId => {
  const REQUEST_CONFIG = {
    method: 'get',
    url: `seasons/${seasonId}`
  }
  return createRequest(REQUEST_CONFIG)
}

/**
 * 특정 시즌의 정보를 가져온다
 * @param {*} seasonType : 정보를 조회 할 season 유형, 아무것도 넣지 않는 경우 this를 기본값으로 가진다
 * this - 이번 시즌을 가져온다.
 * next - 이번 시즌 이후를 가져온다.
 * done - 완료된 시즌을 가져온다
 */
const getSeasonType = (seasonType = 'this') => {
  console.log('seasonType', seasonType)
  const REQUEST_CONFIG = {
    method: 'get',
    url: `seasons/type/${seasonType}`
  }
  return createRequest(REQUEST_CONFIG)
}

export default { getSeasonList, getSeasonInfo, getSeasonType }
