const express = require("express");
const { db } = require("../util/admin");
const router = express.Router();

// @route   GET diary
// @desc    Get all of user diary
router.get("/", async (req, res) => {
  const userId = req.cookies.Hackathon;
  const diaryRef = await db.collection("Diary");
  const diarys = await diaryRef.where("userId", "==", userId).get();
  const diarysArray = await diarys.docs.map((doc) => {
    return { ...doc.data(), diaryId: doc.id };
  });
  return res.send(diarysArray);
});

// @route   POST diary
// @desc    add diary
router.post("/", async (req, res) => {
  const userId = req.cookies.Hackathon;
  const diaryRef = await db.collection("Diary");
  const { title, content } = req.body;
  const diaryId = await diaryRef.add({ title, content, userId });
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
