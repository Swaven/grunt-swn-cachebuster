'use strict'

/*
* grunt-swn-cachebuster
* https://github.com/Swaven/grunt-swn-cachebuster
*
* Copyright (c) 2017 Swaven
* Licensed under the MIT license.
*/

const fs = require('fs'),
      path = require('path'),
      mkdirp = require('mkdirp'),
      replace = require('../lib/replace.js'),
      util = require('util'),
      lstat = util.promisify(fs.lstat),
      readFile = util.promisify(fs.readFile),
      writeFile = util.promisify(fs.writeFile)

module.exports = function(grunt){


  grunt.registerMultiTask('cachebuster', 'Appends timestamp param to import urls', function(){
    const done = this.async(),
          options = this.options(),
          self = this

    var proms = []

    // get all files' content and dependencies
    for (let i = 0; i < this.files.length; i++){
      proms.push(updateLinks(this.files[i]))
    }

    Promise.all(proms)
    .then(() => {
      done(true)
    })
  })

  // reads file, updates all dependencies urls and write at destination
  async function updateLinks(fileInfo){
    var filepath = fileInfo.src[0]

    try{
      let stats = await lstat(filepath)

      // not a file: ignore
      if (!stats.isFile()){
        // console.log(`${filepath} is not a file, ignore`)
        return Promise.resolve()
      }

      let data = await readFile(filepath, {encoding: 'utf8'}),
          result = replace(data)

      // write update content to output file
      mkdirp.sync(path.dirname(fileInfo.dest))
      await writeFile(fileInfo.dest, result, 'utf8')
      return Promise.resolve()
    }
    catch(err){
      grunt.fail.warn(`${filepath}: ${err.message}`)
    }
  }
}
