const express = require('express');
const router = express.Router();
const serviceExchangeController = require('../controllers/exchangeController');
const { checkUser } = require("../middlewares/authMiddleware");

// Create a new service exchange
// POST /api/exchanges
router.post('/',checkUser, serviceExchangeController.createExchange);

// Get all service exchanges
// GET /api/exchanges
router.get('/',checkUser, serviceExchangeController.getAllExchanges);

// Get exchange requests for the logged-in user
// GET /api/exchanges/requests
router.get('/requests',checkUser, serviceExchangeController.getUserRequests);

// Get a specific service exchange by ID
// GET /api/exchanges/:id
router.get('/:id',checkUser, serviceExchangeController.getExchangeById);

// Update a service exchange by ID
// PUT /api/exchanges/:id
router.put('/:id',checkUser, serviceExchangeController.updateExchange);

// Delete a service exchange by ID
// DELETE /api/exchanges/:id
router.delete('/:id',checkUser, serviceExchangeController.deleteExchange);

// Get all exchanges for a specific user
// GET /api/exchanges/user/:userId
router.get('/user/:userId',checkUser, serviceExchangeController.getExchangesByUser);
// Handle a specific exchange request (accept/decline)
// PUT /api/exchanges/requests/:requestId
router.put('/requests/:requestId',checkUser, serviceExchangeController.handleExchangeRequest);



module.exports = router;
