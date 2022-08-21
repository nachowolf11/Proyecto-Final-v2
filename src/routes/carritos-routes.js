const express = require('express')
const router = express.Router()

const Productos = require('../models/productos')
const Carritos = require('../models/carritos')

router.get('/:id/productos',async(req,res)=>{
    try {
        const carrito = await Carritos.find({id:`${req.params.id}`})
        res.json({data:carrito})
    } catch (error) {
        console.log(error);
    }
})

router.post('/',async(req,res)=>{
    try {
        const carrito = new Carritos(req.body)
        await carrito.save()
        res.json({data:carrito})
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await Carritos.findOneAndDelete(req.params.id)
        res.json('Carrito borrado exitosamente')
    } catch (error) {
        console.log(error);
    }
})

router.post('/:id/productos',async(req,res)=>{
    try {
        const producto = await Productos.model.find(req.body)
        console.log(producto);
        if (producto.length == 0) {
            res.json('No existe producto con el id ingresado.')
        }else{
            await Carritos.findOneAndUpdate(req.params.id,{
                $push: {
                    'productos': producto
                } 
            })
            res.json(`El producto de ID: ${req.body.id} fue agregado.`)
        }

    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id/productos/:id_prod',async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
})

module.exports.router = router