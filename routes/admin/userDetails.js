const express = require('express');
const router = express.Router();
const userControler = require('../../controllers/admin/userController');
const auth = require('../../Middleware/jwtAuth');

router.get('/dashboard',userControler.dashboardLoad);
router.get('/userEdit/:id',userControler.userDetailsLoad);
router.post('/update/:id',userControler.userUpdate);
router.get('/userDelete/:id',userControler.userDelete);
router.get('/addUser',userControler.sessionCheck,userControler.addUser);
router.post('/insertUser',userControler.sessionCheck,userControler.insertUser);

module.exports = router;