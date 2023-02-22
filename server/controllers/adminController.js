const Category = require('../models/Category')

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard')
    },

    // Category Method
    viewCategory: async (req, res) => {
        const category = await Category.find()
        res.render('admin/category/view_category', { category })
    },

    addCategory: async (req, res) => {
        try {
            const { name } = req.body
            await Category.create({ name })
            res.redirect('/admin/category')
        } catch (error) {
            res.redirect('/admin/category')
        }
    },

    editCategory: async (req, res) => {
        try {
            const { id, name } = req.body
            const category = await Category.findOne({ _id: id })
            category.name = name
            await category.save()
            res.redirect('/admin/category')
        } catch (error) {
            res.redirect('/admin/category')
        }
    },

    deleteCategory: async (req, res) => {
        const { id } = req.params
        const category = await Category.findOne({ _id: id })
        await category.remove()
        res.redirect('/admin/category')
    },
    // End Category Method

    viewProperty: (req, res) => {
        res.render('admin/property/view_property')
    },

    viewPayment: (req, res) => {
        res.render('admin/payment/view_payment')
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking')
    }
}