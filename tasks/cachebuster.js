/*
 * grunt-swn-cachebuster
 * https://github.com/Swaven/grunt-swn-cachebuster
 *
 * Copyright (c) 2017 Swaven
 * Licensed under the MIT license.
 */

 'use strict'

 const fs = require('fs'),
       path = require('path'),
       mkdirp = require('mkdirp')

 module.exports = function(grunt){
   const rx = /(\/?bower_components)?(\/.*\.(html|js))('|")/gi, // find all dependencies except bower components
         ts = Date.now() // timestamp we'll add to all dependencies urls

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
   function updateLinks(fileInfo){
     return new Promise((resolve, reject) => {
       var filepath = fileInfo.src[0]
       fs.readFile(filepath, {encoding: 'utf8'}, (err, data) => {
         if (err){
           grunt.fail.warn(`Error reading ${filepath}: ${err}`)
           return reject()
         }
         // add timestamp query string to all matches
         return resolve(data.replace(rx, ($0, $1, $2, $3, $4) => {
           return $1 ? $0 : `${$2}?v=${ts}${$4}`
         }))
       })
     })
     .then(data => {
       return new Promise((resolve, reject) => {
         mkdirp.sync(path.dirname(fileInfo.dest))
         fs.writeFile(fileInfo.dest, data, 'utf8', (err, data) => {
           if (err){
             grunt.fail.warn(`Error writing ${fileInfo.dest}: ${err}`)
             return reject()
           }
           return resolve()
         })
       })
     })
   }
 }
