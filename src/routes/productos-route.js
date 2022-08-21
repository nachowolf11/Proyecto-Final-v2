const express = require('express')
const router = express.Router()

const Productos = require('../models/productos')

router.get('/',async(req,res)=>{
    try {
        const productos = await Productos.model.find()
        res.json({data: productos})
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const producto = await Productos.model.find({id:req.params.id})
        res.json({data: producto})
    } catch (error) {
        console.log(error);
    }
})

router.post('/',async(req,res)=>{
    try {
        const producto = new Productos.model(req.body)
        await producto.save()
        res.json({producto:producto})
    } catch (error) {
        console.log(error);
    }
})

router.put('/:id',async(req,res)=>{
    try {
        await Productos.model.findOneAndUpdate(req.params.id,req.body)
        res.json('El producto fue actualizado correctamente')
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await Productos.model.findOneAndDelete(req.params.id)
        res.json(`El producto de ID: ${req.params.id} fue eliminado.`)
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router