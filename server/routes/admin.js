const router = require('express').Router()
const adminController = require('../controllers/adminController')
const { upload } = require('../middlewares/multer')

router.get('/dashboard', adminController.viewDashboard)

// Category Endpoint
router.get('/category', adminController.viewCategory)
router.post('/category', adminController.addCategory)
router.put('/category', adminController.editCategory)
router.delete('/category/:id', adminController.deleteCategory)

router.get('/property', adminController.viewProperty)

// Payment Endpoint
router.get('/payment', adminController.viewPayment)
router.post('/payment', upload, adminController.addPayment)
router.put('/payment', upload, adminController.editPayment)
router.delete('/payment/:id', adminController.deletePayment)

router.get('/booking', adminController.viewBooking)

module.exports = router