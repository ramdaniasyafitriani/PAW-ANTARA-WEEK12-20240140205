const { Review } = require('../models');

async function renderReviewPage(req, res) {
  const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
  res.render('review', {
    username: req.session.username,
    reviews,
    errors: [],
    successMsg: null,
    beforeAfter: null,
  });
}

async function handleCreateReview(req, res) {
  const { comment, rating } = req.body;
  const rawComment = req.rawBodyForDemo ? req.rawBodyForDemo.comment : comment;

  if (req.validationErrors && req.validationErrors.length > 0) {
    const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(400).render('review', {
      username: req.session.username,
      reviews,
      errors: req.validationErrors,
      successMsg: null,
      beforeAfter: null,
    });
  }

  // Query Parameterized via ORM
  await Review.create({
    comment,
    rating: parseInt(rating, 10),
    username: req.session.username || 'Anonim',
  });

  const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
  res.render('review', {
    username: req.session.username,
    reviews,
    errors: [],
    successMsg: 'Ulasan berhasil disimpan secara aman!',
    beforeAfter: { before: rawComment, after: comment },
  });
}

module.exports = { renderReviewPage, handleCreateReview };