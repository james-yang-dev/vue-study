const bodyParser = require('body-parser')
const shortid = require('shortid')

const jsonServer = require('json-server')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const server = jsonServer.create()
const router = jsonServer.router('./db.live.json')
const middlewares = jsonServer.defaults()

const adapter = new FileSync('src/data/db.live.json')
const db = low(adapter)

server.use(middlewares)
server.use(bodyParser.json())

server.patch('/todos/completed', (req, res) => {
  // lowdb를 사용해서 db.json에서 done: true인 todo를 제거
  db.get('todos')
    .remove({ done: true })
    .write()

  res.send(db.get('todos').value())
})

// user 전체 리스트
server.get('/users', (req, res) => {
  const userData = db.get('users').value()
  res.send(userData)
})

// user id 정보
server.get('/users/:userId', (req, res) => {
  const userId = req.params.userId
  const userData = db
    .get('users')
    .find({ id: userId })
    .value()

  res.send(userData)
})

// season 전체 리스트
server.get('/seasons', (req, res) => {
  const seasonData = db.get('seasons').value()

  res.send(seasonData)
})

// season id 정보
server.get('/seasons/:seasonId', (req, res) => {
  const seasonId = req.params.seasonId
  const seasonData = db
    .get('seasons')
    .find({ seasonId: seasonId })
    .value()

  res.send(seasonData)
})

// 현재 시즌 가져오기
server.get('/seasons/type/this', (req, res) => {
  const seasonData = db
    .get('seasons')
    .find({ isNow: true, done: false })
    .value()

  res.send(seasonData)
})

// 예정 시즌 가져오기
server.get('/seasons/type/next', (req, res) => {
  const seasonData = db
    .get('seasons')
    .find({ isNow: false, done: false })
    .value()

  res.send(seasonData)
})

// 종료 시즌 가져오기
server.get('/seasons/type/done', (req, res) => {
  const seasonData = db
    .get('seasons')
    .find({ done: true })
    .value()

  res.send(seasonData)
})

// category
server.get('/categories', (req, res) => {
  const categoryData = db.get('categories').value()

  res.send(categoryData)
})

// user 체크
server.post('/users', (req, res) => {
  const userId = req.body.userId
  const userPw = req.body.userPw

  const userData = db
    .get('users')
    .find({ id: userId, password: userPw })
    .value()

  res.send(userData)
})

// todo 입력
server.put('/todo', (req, res) => {
  const inputData = req.body.todoData

  const todoData = db
    .get('todos')
    .push({
      id: shortid.generate(),
      title: inputData.title,
      categoryCode: inputData.categoryCode,
      description: inputData.description,
      links: inputData.links,
      seasonId: inputData.seasonId,
      userId: '',
      done: inputData.done
    })
    .write()

  console.log('todoData', todoData)
  res.send(todoData)
})

// todo 업데이트
server.patch('/todo', (req, res) => {
  const updateData = req.body.todoData
  const todoData = db
    .get('todos')
    .find({ id: updateData.id })
    .assign({
      title: updateData.title,
      categoryCode: updateData.categoryCode,
      description: updateData.description,
      links: updateData.links,
      seasonId: updateData.seasonId,
      done: updateData.done
    })
    .write()

  console.log('todoData', todoData)
  res.send(todoData)
})

// todo 전체 리스트 검색
server.get('/todos', (req, res) => {
  const todoData = db.get('todos').value()

  res.send(todoData)
})

const getTodoSeason = seasonList => {
  const todoData = db
    .get('todos')
    .filter(todo => seasonList.indexOf(todo.seasonId) >= 0)
    .value()

  return todoData
}
// todo 이번 시즌 리스트 불러오기
server.get('/todos/season/next', (req, res) => {
  const seasonData = db
    .get('seasons')
    .filter({ isNow: false, done: false })
    .value()

  const seasonList = seasonData.map(season => season.seasonId)

  res.send(getTodoSeason(seasonList))
})

// todo 이번 시즌 리스트 불러오기
server.get('/todos/season/this', (req, res) => {
  const seasonData = db
    .get('seasons')
    .filter({ isNow: true, done: false })
    .value()

  const seasonList = seasonData.map(season => season.seasonId)

  res.send(getTodoSeason(seasonList))
})

// todo 이번 시즌 리스트 불러오기
server.get('/todos/season/done', (req, res) => {
  const seasonData = db
    .get('seasons')
    .filter({ done: true })
    .value()

  const seasonList = seasonData.map(season => season.seasonId)

  res.send(getTodoSeason(seasonList))
})

// todo id 검색
server.get('/todos/:id', (req, res) => {
  const paramId = req.params.id
  const todoData = db
    .get('todos')
    .find({ id: paramId })
    .value()

  res.send(todoData)
})

// user별 todo api 불러오기
server.get('/user/todos/:userId', (req, res) => {
  const paramUserId = req.params.userId
  const todoData = db
    .get('todos')
    .find({ userId: paramUserId })
    .value()

  res.send(todoData)
})

// server.delete('/todos/completed', (req, res) => {
//   db.get('todos')
//     .remove({ done: true })
//     .write()

//   res.send(db.get('todos').value())
// })

server.use(router)

server.listen(7979, () => {
  console.log('JSON Server is running')
})
