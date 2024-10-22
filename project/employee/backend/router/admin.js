const express = require('express')
const router = express.Router()

const empModel = require('../models/empSchema')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', async (req, res) => {
    try {
        const data = await empModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send('Data not found')
    }
})

router.post('/add', async (req, res) => {
    try {
        data = req.body
        const newEmp = empModel(data)
        const saveData = await newEmp.save()
        res.status(200).send('New employee Added successfully')
    } catch (error) {
        res.status(404).send('Failed to add employee')
    }

})

router.delete('/empDelete/:id', async (req, res) => {
    try {
        id = req.params.id
        const empToDelete = empModel.findBYIdAndDelete(id)
        res.status(200).send('Employee Successfully Deleted')
    } catch (error) {
        res.status(404).send('Failed to remove employee')
    }
})

router.put('/empUpdate/:id', async (req, res) => {
    try {
        id = req.params.id
        const empData =await empModel.findByIdAndUpdate(id, req.body)
        res.status(200).send('Employee data updated successfully')
    } catch (error) {
        res.status(404).send('Updation failed')
    }
})
module.exports = router