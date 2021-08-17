# API 사용 가이드

## 개요

Local에서 간단한 테스트 및, 데이터 구조를 동일하게 하기 위해 사용되는 로컬 테스트 서버를 이용하여, 필요한 API 기능들을 구축한다.  

## Client

프론트엔드 개발에서 사용되는 방식의 예를 나타낸다.

### API.js

실제 사용은 API의 정보를 다루는 모듈에서 이뤄진다.  
다음은 Get 방식의 예제이다.

```javascript
import createRequest from './index'

/**
 * 유저리스트 전체를 가져온다
 */
const getUserList = () => {
  // request를 보낼 정보를 config에 지정한다.
  const REQUEST_CONFIG = {
    // 메소드의 형식
    method: 'get',
    // 호출할 url
    url: 'users'
  }
  return createRequest(REQUEST_CONFIG)
}
```

Data를 Body로 전달하는 방식. post, put, patch 등을 의미한다.

```javascript
import createRequest from './index'

/**
 * 유저리스트 전체를 가져온다
 */
const getUserList = authData => {
  // request를 보낼 정보를 config에 지정한다.
  const REQUEST_CONFIG = {
    // 메소드의 형식
    method: 'post',
    // 호출할 url
    url: 'users',
    // body를 통해 전달할 데이터
    data: {
      userInfo: authData
    }
  }
  return createRequest(REQUEST_CONFIG)
}
```

### Store에서의 사용

Vuex의 Store에서 사용하는 방식의 예시이다. 가독성과 사용성을 높이기 위해 async/await의 사용을 권장한다.  
이를 사용하기 위해선 [promise](https://poiemaweb.com/es6-promise)에 대한 이해가 필요하다.

```javascript
import UserAPI from '@/api/user.api'

const actions = {
  // 비동기 방식으로 함수를 정의한다.
  async checkUserInfo({ state, commit }, e) {
    // import 한 UserAPI의 특정 함수를 호출한다. 필요시 파라미터를 전달한다.
    const result = await UserAPI.getUserInfo('userId')
    // 결과 받은 result를 콘솔로 확인한다.
    console.log(result)
    // 그리고 필요한 commit을 수행하여 변화를 일으키고 동작을 마무리 짓는다.
    commit('changeMessage', e)
  }
}
```

### Axios

axios 인스턴스를 사용해서 호출하는 모듈을 만든다.  
아주 간단한 예제이며, 실 사용에서는 인터셉터의 정의나, 인스턴스의 재활용을 고려하여 만들어야 한다.

```javascript
const API_URL = 'http://localhost:7979/'

// 외부에서 api를 호출하게 될때 사용하는 request 생성 모듈
const createRequest = config => {
  const instance = axios.create()
  instance.defaults.headers['Accept'] = 'application/json'
  instance.defaults.headers['Content-Type'] = 'application/json'
  instance.defaults.baseURL = API_URL

  // api 호출 정보를 config를 통해 전부 전달 받는다.
  return instance(config)
    // 성공시
    .then(res => Promise.resolve(res.data))
    // 에러시
    .catch(err => {
      console.log(err)
      return Promise.reject({ err: err })
    })
}

export default createRequest
```

## DB 서버

필요한 기능들을 선언한다

```javascript
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
```

router를 통해 넘어오는 url 및 method, request들을 정의한다.

```javascript
// get method의 정의 방식
server.get('/users', (req, res) => {
  // db.get('domain') 을 통해 값을 조회한다.
  // json의 최상단 object를 의미함.
  const userData = db.get('users').value()
  // response를 통해 조회된 값을 전달한다.
  res.send(userData)
})
```

body를 통해 data가 넘어오는경우의 사용방식 post, put, patch 등

```javascript
server.post('/users', (req, res) => {
  // body-parser를 통해 파싱된 request의 body에서 바로 값을 꺼낸다.
  const userId = req.body.userId
  const userPw = req.body.userPw

  const userData = db
    .get('users')
    .find({ id: userId, password: userPw }) // find를 통해 값을 검색한다.
    .value()

  res.send(userData)
})
```

lowdb를 통해 데이터를 조작한다

```javascript
server.patch('/user', (req, res) => {
  const updateData = req.body.userData
  const userData = db
    .get('users')
    .find({ id: updateData.id }) // 수정 전에 필요한 데이터를 find를 이용해 추출한다.
    .assign({ // assign을 통해 수정한다
      name: updateData.name,
      join: true
    })
    .write() // write를 통해 조작된 데이터를 덮어쓴다.

  res.send(todoData)
})
```

이 외에 자세한 내용은 하단에 [lowdb](#lowdb) 섹션을 참고한다.

## 사용 모듈

아래의 모듈들이 사용되었으며, 프로젝트 구동 전 설치를 해 주어야 한다.

- JSON-Server
- lowdb
- nodemon
- FileSync
- shortid
- body-parser

### JSON-Server

json 구조의 파일을 이용해 DB처럼 사용하는 간단한 테스트 서버이며, id를 이용한 기본적인 CRUD를 제공한다.

### lowdb

JSON-Server를 좀 더 다양하게 활용하기 위한 간단한 DB 관리 모듈이다. 함수 호출을 통해 데이터를 조작하고, 기본적으로 제공되는 메소드들이 있다. 모든 데이터 조작이 lowdb를 통해 이뤄진다.  
[lowdb 참조 문서](https://github.com/typicode/lowdb)

### nodemon

router를 생성하고 수정할때 바로 node를 재 시작하도록 해주는 데몬

### Filesync

lowdb에서 특정 파일을 디비로 인식하고, 데이터를 동기화 해주는 파일 모듈

### shortid

unique한 아이디를 생성하게 해주는 모듈. db에 새로 데이터를 주입시 임시의 id를 생성해주기 때문에 간편한 이용이 가능

### body-parser

request를 통해 넘어오는 body의 데이터를 편하게 파싱하기 위한 모듈. request.body를 통해 간편하게 전달되는 데이터들을 추출할 수 있다.