
const assert = require('chai').assert

var replace = require('../tasks/replace.js')

describe('Replace', () => {
  it('ignore bower_components', () => {
    let input = '<link rel="import" href="/bower_components/help/coin.js">'
    assert.equal(input, replace(input))
  })

  it('includes timestamp', () => {
    var input = '<link rel="import" href="/../help/coin.js">',
        output = replace(input),
        rx = /coin\.js\?v=\d+">/i
    assert.isTrue(rx.test(output))
  })
})
