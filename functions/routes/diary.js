const express = require("express");
const { db } = require("../util/admin");
const router = express.Router();
const Cookie = require("universal-cookie")

router.use((req, res, next) => {
  const currentUserId = req.cookies.Hackathon;
  const cookie = new Cookie(req.headers.cookie);
  if (currentUserId === undefined && cookie.get("Hackathon") === undefined) {
    return res.status(403).json({ error: "Unauthorized Please login first" });
  }
  next();
});

// @route   GET diary
// @desc    Get all of user diary
router.get("/", async (req, res) => {
  const userId = req.cookies.Hackathon;
  const diaryRef = await db.collection("Diary");
  const diarys = await diaryRef
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .get();
  const diarysArray = await diarys.docs.map((doc) => {
    return { ...doc.data(), diaryId: doc.id };
  });
  return res.send(diarysArray);
});

// @route   GET diary
// @desc    Get all of user diary
router.get("/:diaryId", async (req, res) => {
  const userId = req.cookies.Hackathon;
  const diaryRef = await db.collection("Diary");
  const diarys = await diaryRef.doc(req.params.diaryId).get();
  if (diarys.empty) return res.status(404).json({ error: "Diary not found" });
  if (diarys.data().userId !== userId)
    return res.status(403).json({ error: "Unauthorized" });
  return res.send({ ...diarys.data(), diaryId: diarys.id });
});

// @route   POST diary
// @desc    add diary
router.post("/", async (req, res) => {
  const userId = req.cookies.Hackathon;
  const diaryRef = await db.collection("Diary");
  const { title, content, date } = req.body;
  const diaryId = await diaryRef.add({ title, content, userId, date });
  return res.send(diaryId);
});

// @route   PATCH diary
// @desc    edit diary
router.patch("/", async (req, res) => {
  const { diaryId, title, content } = req.body;
  const currentUserId = req.cookies.Hackathon;
  const diaryRef = db.collection("Diary").doc(diaryId);
  const diary = await diaryRef.get();
  if (!diary.exists) return res.status(400).send("Diary not found");
  const userId = diary.data().userId;
  if (userId !== currentUserId)
    return res.status(400).send("You are not authorized to edit this diary");
  if (title) diaryRef.update({ title });
  if (content) diaryRef.update({ content });
  return res.send("Update Success");
});

// @route   DELETE diary
// @desc    delete diary
router.delete("/", async (req, res) => {
  const { diaryId } = req.body;
  const currentUserId = req.cookies.Hackathon;
  const diaryRef = db.collection("Diary").doc(diaryId);
  const diary = await diaryRef.get();
  if (!diary.exists) return res.status(400).send("Diary not found");
  const userId = diary.data().userId;
  if (userId !== currentUserId)
    return res.status(400).send("You are not authorized to delete this diary");
  await diaryRef.delete();
  return res.send("Delete Success");
});

module.exports = router;
