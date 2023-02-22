const Category = require('../models/Category')
const Payment = require('../models/Payment')

const fs = require('fs-extra')
const path = require('path')

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', { title: "Dashboard" })
    },

    // Category Method
    viewCategory: async (req, res) => {
        try {
            const category = await Category.find()
            const alertStatusMessage = req.flash('alertStatusMessage')
            const alertName = req.flash('alertName')
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { statusMessage: alertStatusMessage, name: alertName, message: alertMessage, status: alertStatus }
            res.render('admin/category/view_category', { category, alert, title: "Category" })
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },

    addCategory: async (req, res) => {
        try {
            const { name } = req.body
            await Category.create({ name })
            req.flash('alertStatusMessage', 'Success!')
            req.flash('alertName', ` ${name}`)
            req.flash('alertMessage', ' has been added to the Category.')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },

    editCategory: async (req, res) => {
        try {
            const { id, name } = req.body
            const category = await Category.findOne({ _id: id })
            const oldCategoryName = category.name // retrieve the old name of the category
            category.name = name
            await category.save()
            req.flash('alertStatusMessage', 'Success!')
            req.flash('alertName', ` ${oldCategoryName}`)
            req.flash('alertMessage', ` has been updated to "${name}".`)
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params
            const category = await Category.findOne({ _id: id })
            const categoryName = category.name // retrieve the name of the deleted category
            await category.remove()
            req.flash('alertStatusMessage', 'Success!')
            req.flash('alertName', ` ${categoryName}`)
            req.flash('alertMessage', ' has been deleted from the Category.')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },
    // End Category Method

    viewProperty: (req, res) => {
        res.render('admin/property/view_property', { title: "Property" })
    },

    // Payment Method
    viewPayment: async (req, res) => {
        try {
            const payment = await Payment.find()
            const alertStatusMessage = req.flash('alertStatusMessage')
            const alertName = req.flash('alertName')
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { statusMessage: alertStatusMessage, name: alertName, message: alertMessage, status: alertStatus }
            res.render('admin/payment/view_payment', { payment, alert, title: "Payment" })
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/payment')
        }
    },

    addPayment: async (req, res) => {
        try {
            const { bankName, accountNumber, accountName } = req.body
            await Payment.create({ bankName, accountNumber, accountName, imageUrl: `images/${req.file.filename}` })
            req.flash('alertStatusMessage', 'Success!')
            req.flash('alertName', ` ${bankName}`)
            req.flash('alertMessage', ' has been added to the Payment Method.')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/payment')
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/payment')
        }
    },

    editPayment: async (req, res) => {
        try {
            const { id, bankName, accountNumber, accountName } = req.body
            const payment = await Payment.findOne({ _id: id })
            if (req.file == undefined) {
                payment.bankName = bankName
                payment.accountNumber = accountNumber
                payment.accountName = accountName
                const oldPaymentName = payment.bankName // retrieve the old name of the bank name
                await payment.save()
                req.flash('alertStatusMessage', 'Success!')
                req.flash('alertName', ` ${oldPaymentName}`)
                req.flash('alertMessage', ' has been updated.')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/payment')
            } else {
                await fs.unlink(path.join(`public/${payment.imageUrl}`))
                payment.bankName = bankName
                payment.accountNumber = accountNumber
                payment.accountName = accountName
                payment.imageUrl = `images/${req.file.filename}`
                const oldPaymentName = payment.bankName // retrieve the old name of the bank name
                await payment.save()
                req.flash('alertStatusMessage', 'Success!')
                req.flash('alertName', ` ${oldPaymentName}`)
                req.flash('alertMessage', ' has been updated.')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/payment')
            }
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/payment')
        }
    },

    deletePayment: async (req, res) => {
        try {
            const { id } = req.params
            const payment = await Payment.findOne({ _id: id })
            const paymentBankName = payment.bankName // retrieve the name of the deleted payment
            await fs.unlink(path.join(`public/${payment.imageUrl}`))
            await payment.remove()
            req.flash('alertStatusMessage', 'Success!')
            req.flash('alertName', ` ${paymentBankName}`)
            req.flash('alertMessage', ' has been deleted from the Payment Method.')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/payment')
        } catch (error) {
            req.flash('alertStatusMessage', 'Failed!')
            req.flash('alertMessage', ` ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/payment')
        }
    },

    // End Payment Method

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', { title: "Booking" })
    }
}