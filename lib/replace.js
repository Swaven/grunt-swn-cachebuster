'use strict'

const rx = /(\/?bower_components)?(\/.*\.(html|js))('|"|`)/gi, // find all dependencies
      ts = Date.now() // timestamp we'll add to all dependencies urls

module.exports = exports = function replace(content){
  if (typeof content !== 'string')
    throw new Error(`Content is not a string`)

  return content.replace(rx, ($0, $1, $2, $3, $4) => {
    // ignore urls to bower_components
    return $1 ? $0 : `${$2}?v=${ts}${$4}`
  })
}
