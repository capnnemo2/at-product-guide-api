const xss = require("xss");

const CommentsService = {
  getAllComments(db) {
    return db.from("comments").select("*");
  },

  getById(db, id) {
    return db.from("comments AS comm").select("*").where("comm.id", id).first();
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into("comments")
      .returning("*")
      .then(([comment]) => comment)
      .then((comment) => CommentsService.getById(db, comment.id));
  },

  deleteComment(db) {
    return CommentsService.getById(db).delete();
  },

  updateComment(db, newCommentFields) {
    return CommentsService.getById(db).update(newCommentFields);
  },

  serializeComment(comment) {
    return {
      id: comment.id,
      user_name: xss(comment.user_name),
      content: xss(comment.content),
      product_id: comment.product_id,
    };
  },
};

module.exports = CommentsService;
