import axios from 'axios'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import cheerio from 'cheerio'

// state
const state = {
  message: `파서가 하는 일은 읽어 들이는 것 입니다`,
  inputUrl: 'http://html.gt.dev.daum.net',
  projectName: 'insure-2019/mobile',
  defaultUrl: '',
  completedSteps: 0,
  totalSteps: 0,
  hasProgress: false
}

// getters
const getters = {
  getMsg(state) {
    return `${state.message}`
  },
  getInputUrl(state) {
    return `${state.inputUrl}`
  },
  getInputProjectName(state) {
    return `${state.projectName}`
  },
  getCompletedSteps(state) {
    return `${state.completedSteps}`
  },
  getTotalSteps(state) {
    return `${state.totalSteps}`
  },
  hasProgress(state) {
    return state.totalSteps > 0 && state.totalSteps > state.completedSteps
  }
}

// watch
const watch = {}

// mutations
const mutations = {
  changeMessage(state, newMsg) {
    state.message = newMsg
  },
  changeURL(state, newUrl) {
    state.inputUrl = newUrl
  },
  changeProjectName(state, newProjectName) {
    state.projectName = newProjectName
  },
  changeProgress(state, progressValue) {
    const changedProgressValue = state.completedSteps + progressValue
    if (state.totalSteps >= changedProgressValue && changedProgressValue >= 0) {
      state.completedSteps = changedProgressValue
    }
  },
  changeTotalSteps(state, progressCount) {
    state.totalSteps = progressCount
    state.hasProgress = true
  },
  resetProgress(state, isOn) {
    state.totalSteps = 0
    state.completedSteps = 0
    // state.hasProgress = isOn
  }
}

// actions
const actions = {
  callMutation({ state, commit }, payload) {
    commit('changeMessage', payload)
  },
  updateUrl({ state, commit }, e) {
    const inputValue = e.target.value
    commit('changeURL', inputValue)
  },
  updateProjectName({ state, commit }, e) {
    const inputValue = e.target.value
    commit('changeProjectName', inputValue)
  },
  resetProgress({ state, commit }, { off }) {
    const isOn = !off
    commit('resetProgress', isOn)
  },
  async callUrl({ state, commit }) {
    commit('resetProgress')
    // 초기데이터 호출
    const url = `${state.inputUrl}/${state.projectName}/index.html`
    const indexData = await callApi(url)

    const urlList = []
    const cssList = []
    const jsList = []
    let $ = cheerio.load(indexData.trim())

    $('a').each((index, item) => {
      item.attribs.href && urlList.push(item.attribs.href)
    })

    const urlBalckList = ['#none', 'wiki.']
    const urlFilteredList = urlList.filter(
      url => urlBalckList.findIndex(black => url.includes(black)) < 0
    )

    $('link').each((index, item) => {
      item.attribs.href && cssList.push(item.attribs.href)
    })

    $('script').each((index, item) => {
      item.attribs.src && jsList.push(item.attribs.src)
    })
    const jsBlackList = 'http'
    const jsFilteredList = jsList.filter(js => !js.includes(jsBlackList))

    const totalStepCount =
      urlFilteredList.length + cssList.length + jsFilteredList.length
    commit('changeTotalSteps', totalStepCount)
    const setIncreaseProgress = () => {
      commit('changeProgress', 1)
    }
    callHtmlParser(
      urlFilteredList,
      cssList,
      jsFilteredList,
      setIncreaseProgress
    )
  }
}

const callApi = async url => {
  const config = {
    headers: {
      Accept: 'application/json'
    }
  }
  const res = await Promise.resolve(axios.get(url, config)).then(
    res => res.data
  )
  return res
}

// 기본 index html을 호출하고 body를 추출한다. 만들어야 할 html 리스트를 생성한다.
const callHtmlParser = async (
  urlList,
  cssList,
  jsList,
  setIncreaseProgress
) => {
  const urlData = await getHtmlList(urlList, setIncreaseProgress)
  const cssData = await getCssList(cssList, setIncreaseProgress)
  const jsData = await getJsList(jsList, setIncreaseProgress)
  saveFile(urlData, cssData, jsData)
}

// index html에서 파싱된 html 리스트를 호출하고 html 파일로 저장한다.
const getHtmlList = async (urlList, setIncreaseProgress) => {
  const htmlDataList = await Promise.all(
    urlList.map(async url => {
      const fileUrl = state.inputUrl + url
      const fileRes = await callApi(fileUrl)

      const removeDirty = url.replace(`/${state.projectName}/`, '')

      const splitWithParam = removeDirty.split('?')
      const params = splitWithParam[1] ? `__${splitWithParam[1]}` : ''

      const splitWithFileName = splitWithParam[0].split('/')
      const folderList =
        splitWithFileName.length > 1 ? splitWithFileName.slice(0, -1) : ['temp']

      const fileName = splitWithFileName.slice(-1)[0].replace('.html', '')

      const depthWord = folderList.map(() => '..').join('/')
      const replaceWord = new RegExp(`="/${state.projectName}/_`, 'gi')

      const replacedFileData = fileRes.replace(
        replaceWord,
        `="../${depthWord}/_`
      )

      const fileExtention = 'html'

      const fileData = {
        folderList: folderList,
        fileName: `${fileName}${params}.${fileExtention}`,
        blob: new Blob([replacedFileData], { type: 'text/html;charset=utf-8' })
      }
      setIncreaseProgress()
      return fileData
    })
  )
  return htmlDataList
}

// index html에서 파싱된 CSS 리스트를 호출하고 CSS 파일로 저장한다.
const getCssList = async (cssList, setIncreaseProgress) => {
  const cssDataList = await Promise.all(
    cssList.map(async url => {
      const cleanUrl = url.replace(`/${state.projectName}/`, '')
      const fileUrl = `${state.inputUrl}/${state.projectName}/${cleanUrl}`
      const fileRes = await callApi(fileUrl)

      const splitWithFileName = url.split('/')
      const folderList = ['_css']

      const fileNameWithParam = splitWithFileName.slice(-1)[0]
      const fileName = fileNameWithParam.split('?')[0]

      const fileData = {
        folderList: folderList,
        fileName: `${fileName}`,
        blob: new Blob([fileRes], { type: 'text/css;charset=utf-8' })
      }
      setIncreaseProgress()
      return fileData
    })
  )
  return cssDataList
}

// index html에서 파싱된 CSS 리스트를 호출하고 CSS 파일로 저장한다.
const getJsList = async (jsList, setIncreaseProgress) => {
  const jsDataList = await Promise.all(
    jsList.map(async url => {
      const cleanUrl = url.replace(`/${state.projectName}/`, '')
      const fileUrl = `${state.inputUrl}/${state.projectName}/${cleanUrl}`
      const fileRes = await callApi(fileUrl)

      const splitWithFileName = url.split('/')
      const folderList = ['_js']

      const fileNameWithParam = splitWithFileName.slice(-1)[0]
      const fileName = fileNameWithParam.split('?')[0]

      const fileData = {
        folderList: folderList,
        fileName: `${fileName}`,
        blob: new Blob([fileRes], { type: 'text/javascript;charset=utf-8' })
      }
      setIncreaseProgress()
      return fileData
    })
  )
  return jsDataList
}

// api 호출한 내역으로 파일을 저장한다.
const saveFile = async (htmlList, cssList, jsList) => {
  const PROJECT_NAME = state.projectName.split('/')[0]
  const zipFileName = PROJECT_NAME === '' ? 'htmlList' : PROJECT_NAME

  const zip = new JSZip()
  const folders = zip.folder(zipFileName)

  const htmlSrcFolder = 'src'

  // 넘어온 html리스트를 jsZip 객체에 넣는다
  htmlList.forEach(html => {
    const folderName = html.folderList.join('/')
    folders.file(`${htmlSrcFolder}/${folderName}/${html.fileName}`, html.blob)
  })

  // css 리스트를 jsZip에
  cssList.forEach(css => {
    const folderName = css.folderList.join('/')
    folders.file(`${folderName}/${css.fileName}`, css.blob)
  })

  // js도
  jsList.forEach(js => {
    const folderName = js.folderList.join('/')
    folders.file(`${folderName}/${js.fileName}`, js.blob)
  })

  zip.generateAsync({ type: 'blob' }).then(function(content) {
    saveAs(content, `${zipFileName}.zip`)
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
