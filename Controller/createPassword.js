var express = require('express')
var mysql = require('mysql')
var bcrypt = require('bcrypt')
const saltRounds = 14
var db = require('./../Database/database')

module.exports = {
  post: (req, res) => {
    let secretNumber = req.body.secretNumber
    let userName = req.body.userName
    let sqlHashPassword = 'UPDATE user SET password = ? WHERE (userName = ?);'

    bcrypt.hash(secretNumber, saltRounds, (err, hash) => {
      if (err) throw err
      else {
        db.query(sqlHashPassword, [hash, userName], (err, result) => {
          if (err) throw err
          else if (result){
            res.status(200).json({message: 'Create successed'})
          }
          else {
            res.status(400).json({message: 'Failed to create'})
          }
        })
      }
    })
  }
}
