const express = require("express");
const router = express.Router();
const {
  addUser,
  updateUser,
  findUser,
  viewProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.post("/", protect, resetPasswordValidation, validate, addUser);
router.put("/:userId", protect, resetPasswordValidation, validate, updateUser);
router.get("/:userId", protect, findUser);
router.get("/", protect, viewProfile);

module.exports = router;
