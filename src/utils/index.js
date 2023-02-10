/**
 * Created by wuk on 21/07/01.
 */

/**
 * Parameter concatenation
 * @param { Object | Function } parameter
 * @param { String } url
*/
export function parseAjaxUrlParametersByGet(Object, url) {
  const newList = []
  for (const key in Object) {
    const value = Object[key]
    if (value) {
      newList.push(key)
    }
  }
  for (let i = 0; i < newList.length; i++) {
    const item = newList[i]
    if (i == 0) {
      url += item + '=' + Object[item]
    } else {
      url += '&' + item + '=' + Object[item]
    }
  }
  return url
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

// 获取区间每项值
export function getMonthBetween(start, end) { // 传入的格式YYYY-MM
  var betweenMonth = []
  var result = []
  var minDate = new Date(new Date(start).getFullYear() + '-' + (new Date(start).getMonth() + 1))
  var maxDate = new Date(new Date(end).getFullYear() + '-' + (new Date(end).getMonth() + 1))

  while (new Date(new Date(minDate).getFullYear() + '-' + (new Date(minDate).getMonth() + 1)).getTime() <= new Date(new Date(maxDate).getFullYear() + '-' + (new Date(maxDate).getMonth() + 1)).getTime()) {
    var month = minDate.getMonth()
    // month=month==0?12:month;
    var str = minDate.getFullYear() + '-' + (month + 1)
    var s = minDate.getFullYear() + '-0'
    if (str == s) {
      // str=curr.getFullYear()+"-12";
      // 解决出现第二年12月的情况：getMonth()获取的范围是0—11，11后继续+1就成了0即第二年1月且前面的getFullYear()变为第二年的年份
      str = (minDate.getFullYear() - 1) + '-12'
    }
    result.push(str)
    minDate.setMonth(month + 1)
  }
  // 处理数据格式 2019-7 为 2019-07
  for (let i = 0; i < result.length; i++) {
    var monthX = result[i].split('-')
    if (monthX[1] < 10) {
      month = monthX[0] + '-0' + monthX[1]
      betweenMonth.push(month)
    } else {
      betweenMonth.push(result[i])
    }
  }
  return betweenMonth
}
// css统一
export function loadStyleString(href) {
  const cssDom = document.createElement('link')
  cssDom.rel = 'stylesheet'
  cssDom.type = 'text/css'
  cssDom.href = href
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(cssDom)
}
