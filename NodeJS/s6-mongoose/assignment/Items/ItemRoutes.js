const router = require('express').Router()
const user = require('./ItemController')

router.post('/items',user.create)//request will now go to ItemController
router.get('/items',user.getAll)
router.patch('/item/:id',user.update)
router.delete('/item/:id',user.delete)

module.exports = router;