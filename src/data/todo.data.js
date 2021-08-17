export const TODO_DATA = [
  {
    // todo의 아이디임
    id: 't0001',
    // 타이틀을 작성한다
    title: '타이틀',
    // 타이틀이 적용될 카테고리를 의미함
    categoryCode: '03',
    // 할 일의 설명을 자세히 적는다
    description: ``,
    // 자랑 링크의 경로를 의미한다
    links: '',
    // 이 투두가 해당될 시즌의 코드를 의미한다. 사용자가 선택할 수 없고, 현재 활성화된 시즌을 확인함.
    seasonId: '202001',
    // 이 할일의 소유주를 의미함
    userId: 'carlos.yang',
    // 이 할일이 등록 예정인지, 작업 한것인지 나눠서 표시한다. 화면이 2가지임
    done: false
  }
]

export const TODO_CATEGORY = [
  {
    categoryCode: '01',
    categoryName: 'JS'
  },
  {
    categoryCode: '02',
    categoryName: 'HTML'
  },
  {
    categoryCode: '03',
    categoryName: 'Vue'
  },
  {
    categoryCode: '04',
    categoryName: 'React'
  },
  {
    categoryCode: '05',
    categoryName: 'Css'
  },
  {
    categoryCode: '06',
    categoryName: 'Etc'
  }
]
