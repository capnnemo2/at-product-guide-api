const express = require("express");
const path = require("path");
const CommentsService = require("./comments-service");

const commentsRouter = express.Router();
const jsonParser = express.json();

commentsRouter
  .route("/")
  .get((req, res, next) => {
    CommentsService.getAllComments(req.app.get("db"))
      .then((comments) => {
        res.json(comments.map(CommentsService.serializeComment));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { product_id, user_name, content } = req.body;
    const newComment = { product_id, user_name, content };

    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });

    CommentsService.insertComment(req.app.get("db"), newComment)
      .then((comment) => {
        res
          .status(201)
          // not sure about this location because you can only view comments on the productDetails page...
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(CommentsService.serializeComment(comment));
      })
      .catch(next);
  });

module.exports = commentsRouter;
