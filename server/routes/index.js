const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController');

const app = express();

// App Routes
router.get('/', mainController.homepage);

module.exports = router;