const express = require("express");
const router = express.Router();
const {
  addUser,
  updateUser,
  findUser,
  viewProfile,
  reportProfileMistake,
  forlogin,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const {
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");

router.post("/", protect, resetPasswordValidation, validate, addUser);
router.get("/", protect, viewProfile);
router.put("/upda/:userId", protect, updateUser);
router.get("/find/:userId", protect, findUser);
router.get("/forlogin/:userId", protect, forlogin);
router.post("/report", protect, reportProfileMistake);

module.exports = router;
