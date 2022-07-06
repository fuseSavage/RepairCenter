const express = require("express");
const responseCode = require("../configs/responseCode");

const router = express.Router();
const authentication = require("./authentication");
const member = require("./member");
const garage = require("./garage");
const repairdetail = require("./repairdetail");
const report = require("./report");
const chat = require("./chat")

const middleware = require("../middlewares/authentication");

router.get("/test", (req, res) => {
  const name = req.query.name;
  console.log(name);
  let timestamp = typeof parseInt(+new Date() / 1000);
  res.json({ time: timestamp, code: responseCode.SUCCESS_NO_CONTENT });
  console.log("test");
});

router.use(chat)
router.use(authentication);
router.use(member);
router.use(garage);
router.use(repairdetail);
router.use(report);

module.exports = router;
