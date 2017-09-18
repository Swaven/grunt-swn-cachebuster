'use strict'

const rx = /(\/?bower_components)?(\/.*\.(html|js))('|"|`)/gi, // find all dependencies except bower components
      ts = Date.now() // timestamp we'll add to all dependencies urls

module.exports = exports = function replace(content){
  return content.replace(rx, ($0, $1, $2, $3, $4) => {
    return $1 ? $0 : `${$2}?v=${ts}${$4}`
  })
}
