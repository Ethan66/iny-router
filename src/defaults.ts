const toString = Object.prototype.toString

const defaults = {
  stringifyQuery(query: { [propName: string]: any }): string {
    if (toString.call(query) !== '[object Object]') return ''

    let str: string = ''

    const keys: string[] = Object.keys(query)

    for (let i = 0; i < keys.length; i++) {
      if (query[keys[i]] === null || typeof query[keys[i]] === 'undefined') {
        continue
      }

      if (typeof query[keys[i]] === 'object') {
        str += `&${keys[i]}=${JSON.stringify(query[keys[i]])}`
      } else {
        str += `&${keys[i]}=${query[keys[i]]}`
      }
    }

    return str.length ? '?' + str.substr(1) : str
  },
  parseQuery(value: string): { [prop: string]: any } {
    if (!value) return {}

    const arr: string[] = value.split('&')

    const params: {
      [prop: string]: any
    } = {}

    let i = 0

    while (i < arr.length) {
      if (arr[i].indexOf('=') !== -1) {
        const cur = arr[i].split('=')
        params[cur[0]] = cur[1]
      }
      i++
    }

    return params
  }
}

export default defaults
