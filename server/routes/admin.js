const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/dashboard', adminController.viewDashboard)

// Category Endpoint
router.get('/category', adminController.viewCategory)
router.post('/category', adminController.addCategory)
router.put('/category', adminController.editCategory)
router.delete('/category/:id', adminController.deleteCategory)

router.get('/property', adminController.viewProperty)
router.get('/payment', adminController.viewPayment)
router.get('/booking', adminController.viewBooking)

module.exports = router