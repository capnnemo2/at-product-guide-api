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
        console.dir(comments);
        console.log(comments);
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
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(CommentsService.serializeComment(comment));
      })
      .catch(next);
  });

commentsRouter
  .route("/:comment_id")
  .all((req, res, next) => {
    CommentsService.getById(req.app.get("db"), req.params.comment_id)
      .then((comment) => {
        if (!comment) {
          return res
            .status(404)
            .json({ error: { message: `Comment doesn't exist` } });
        }

        res.comment = comment;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeComment(res.comment));
  })
  .delete((req, res, next) => {
    CommentsService.deleteComment(req.app.get("db"), req.params.comment_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { user_name, content } = req.body;
    const commentToUpdate = { user_name, content };

    const numberOfValues = Object.values(commentToUpdate).filter(Boolean)
      .length;

    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'user_name' or 'content'`,
        },
      });

    CommentsService.updateComment(
      req.app.get("db"),
      req.params.comment_id,
      commentToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = commentsRouter;
