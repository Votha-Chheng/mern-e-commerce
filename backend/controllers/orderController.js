import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

//@desc   Créer une commande
//@route  POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async(req, res)=>{
  const {produitsCommande, pointRelais, prixTotal, prixProduits, fraisDePort, messageOrder} = req.body

  if(produitsCommande && produitsCommande.length === 0){
    res.status(400)
    throw new Error("Aucun produit dans le panier.")

  } else {
    const order = new Order({
      produitsCommande, 
      client : req.user._id,
      pointRelais, 
      prixTotal, 
      prixProduits, 
      fraisDePort,
      messageOrder
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//@desc   Créer une commande
//@route  DELETE /api/orders/:id
//@access Private
const deleteOrder = asyncHandler(async(req, res)=>{
  const order = await Order.findById(req.params.id)

  const user = await User.findById(req.user._id)

  if(!order || !user.isAdmin){
    res.status(400)
    throw new Error("Commande introuvable.")

  } else {   
    await order.delete()
    res.status(201).json("Commande supprimée.")
  }
})

//@desc   Trouver une commande par son ID
//@route  GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async(req, res)=>{
  
  const order = await Order.findById(req.params.id).populate('client', 'nom prénom email adresse')

  if(order){
    res.json(order)

  } else {
    res.status(404)
    throw new Error("Commande introuvable.") 
  }
})

//@desc   Trouver les commandes d'un utilisateur par son _id client
//@route  GET /api/orders/admin/:id
//@access Private
const getUsersOrder = asyncHandler(async(req, res)=>{

  const userAdmin = await User.findById(req.user._id)
  
  const ordersClient = await Order.find({client : req.params.id})

  if(userAdmin.isAdmin){
    res.json(ordersClient)

  } else {
    res.status(404)
    throw new Error("Vous n'êtes pas administrateur.")
    
  }
})

//@desc   Afficher toutes les commandes
//@route  GET /api/orders/admin/orders
//@access Private
const getAllOrders = asyncHandler(async(req, res)=>{

  const userAdmin = await User.findById(req.user._id)
  
  const allOrders = await Order.find()

  if(userAdmin.isAdmin){
    res.json(allOrders)

  } else {
    res.status(404)
    throw new Error("Vous n'êtes pas administrateur.")
    
  }
})

//@desc   Afficher sa liste de commandes
//@route  GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async(req, res)=>{

  const commandes = await Order.find({client : req.user._id})

  res.json(commandes)
 
})

//@desc   Mettre la commande comme payée
//@route  PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)
  const order = await Order.findById(req.params.id)

  if(order && user){
    order.isPaid = true;
    order.datePaiement = Date.now()
    order.paymentResult = {
      id:req.body.id,
      status:req.body.status,
      update_time: req.body.update_time,
      email_address:req.body.payer.email_address
    }
    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } else {
    res.status(404)
    throw new Error('Commande introuvable ou accès interdit.')
  }
})

//@desc   Mettre la commande comme payée
//@route  PUT /api/orders/delivered/:id
//@access Admin
const updateOrderToDelivered = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.body._id)
  const order = await Order.findById(req.params.id)
  
  if(order && user.isAdmin){
    order.isDelivered = true;
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } else {
    res.status(404)
    throw new Error('Commande introuvable ou accès interdit.')
  }
})

export {addOrderItems, getOrderById, getMyOrders, getUsersOrder, getAllOrders, updateOrderToPaid, deleteOrder, updateOrderToDelivered}