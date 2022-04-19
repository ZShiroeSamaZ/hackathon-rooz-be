const express = require("express");
const { db } = require("../util/admin");
const router = express.Router();

router.get("/", async (_, res) => {
  const books = await db.collection("Books").get();
  const booksArray = await books.docs.map((doc) => {
    return doc.data()
  });
  return res.send(booksArray);
});

router.post("/", async (_, res) => {
  const bookId = await db
    .collection("Books")
    .doc("book1")
    .set({ title: "Lonely tiger" });
  return res.send(bookId);
});

module.exports = router;
