export const SEASON_LIST = [
  {
    title: '첫시즌',
    // 시즌의 코드, 시즌의 기간은 겹치지 않도록 한다
    seasonId: '202001',
    // 시즌의 시작
    seasonFrom: '20200601',
    // 시즌의 종료
    seasonTo: '20200730',
    // 현재 시즌의 대상을 의미한다. 전부면 모든 내용을 포함한 시즌,
    seasonType: ['all'],
    // 현재 활성화된 시즌을 의미함, 많을경우 가장 위의 시즌을 활성화 시킨다
    isNow: true
  },
  {
    title: '시즌의 이름',
    seasonId: '202002',
    seasonFrom: '20200801',
    seasonTo: '20200930',
    seasonType: ['all'],
    isNow: false
  }
]
