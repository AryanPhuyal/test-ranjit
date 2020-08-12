const Router = require("express");
const { getCategory } = require("../controller/category");
const { threadValidation } = require("../validator/threadValidation");
const { upload } = require("../middleware/multer");

const {
  addThread,
  showAllThread,
  showOneThread,
  showOwnThread,
  showUserThread,
  deleteThread,
} = require("../controller/thread");

const { me, updateProfile } = require("../controller/user");
const router = Router();
//
router.get("/category", getCategory);
router.get("/threads", showAllThread);
router.get("threads/:threadId", showOneThread);
router.post("/thread", threadValidation, addThread);
router.get("/myThread", showOwnThread);
router.patch("/thread/:threadId", deleteThread);
router.get("/userThread/:userId", showUserThread);
// deactivate user
// router.get("/deactivate");

// router.
module.exports = router;
