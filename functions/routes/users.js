const express = require("express");
const router = express.Router();
const { admin, auth } = require("../util/admin");
const { signInWithEmailAndPassword } = require("firebase/auth");
const Cookie = require("universal-cookie")

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
    const cookie = new Cookie(req.headers.cookie)
    cookie.set("Hackathon", user.user.uid)
    return res.send({ uid: user.user.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("Hackathon");
  return res.send("Logout Success");
});

router.post("/signup", async (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await admin
      .auth()
      .createUser({ email: body.email, password: body.password });
    res.cookie("Hackathon", user.uid);
    const cookie = new Cookie(req.headers.cookie)
    cookie.set("Hackathon", user.user.uid)
    return res.send({ uid: user.uid, username: body.username });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
