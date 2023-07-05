let express = require('express')
let router = express.Router()
let user= require('./API/user')
let info = require('./API/list')
let business = require('./API/business_list')
let account = require('./API/account')

router.get('/user', user.get)

router.get('/list/all', info.all)
router.get('/list/get', info.get)
router.get('/list/add', info.add)
router.get('/list/update', info.update)
router.get('/list/del', info.del)

router.get('/business_list/all', business.all)
router.get('/business_list/get', business.get)
router.get('/business_list/add', business.add)
router.get('/business_list/update', business.update)
router.get('/business_list/del', business.del)

router.get('/account/all', account.all)
router.get('/account/get', account.get)
router.get('/account/add', account.add)
router.get('/account/update', account.update)
router.get('/account/del', account.del)

module.exports = router