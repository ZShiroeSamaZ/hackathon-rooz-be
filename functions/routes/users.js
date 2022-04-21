const express = require("express");
const router = express.Router();
const { admin, auth } = require("../util/admin");
const { signInWithEmailAndPassword } = require("firebase/auth");

router.post("/login", async (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );
    res.cookie("Hackathon", user.user.uid);
    return res.send({ uid: user.user.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(body);
  try {
    const user = await admin
      .auth()
      .createUser({ email: body.email, password: body.password });
    console.log({ user });
    return res.send({ uid: user.uid, username: body.username });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
