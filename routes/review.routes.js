const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/auth.middleware');
const { reviewValidationRules, handleValidationErrors } = require('../middlewares/validators');
const reviewController = require('../controllers/review.controller');

function captureRawBody(req, res, next) {
  req.rawBodyForDemo = { ...req.body };
  next();
}

router.get('/review', requireAuth, reviewController.renderReviewPage);
router.post('/review', requireAuth, captureRawBody, reviewValidationRules, handleValidationErrors, reviewController.handleCreateReview);

module.exports = router;