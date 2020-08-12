// admin routes

const Router = require("express").Router;
const router = Router();
// const {} = require("../controller/admin");
const { upload } = require("../middleware/multer");
const { isAdmin } = require("../middleware/isAdmin");
const {
  getCategory,
  deleteCategory,
  createCategory,
  editCategory,
} = require("../controller/category");

const { listUsers, detailUser } = require("../controller/admin");

const { deleteUser } = require("../controller/auth");

// delete user
// any user
// admin route
// router.get("/delete-user/:userId");
// // reset password
// router.get("/reset-password/:userId");
router.get("/category", getCategory);
router.delete("/category", isAdmin, deleteCategory);
router.put("/category", isAdmin, editCategory);
router.post("/category", isAdmin, upload.single("profile"), createCategory);
router.delete("/user", isAdmin, deleteUser);
router.get("/users", isAdmin, listUsers);
router.get("/user/:userId", isAdmin, detailUser);
module.exports = router;
