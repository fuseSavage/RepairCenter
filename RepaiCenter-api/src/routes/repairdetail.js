// import express from 'express'
const express = require("express");

const router = express.Router();

const RepairDetailController = require("../controller/RepairDetailController");

router.use("/repairdetail", RepairDetailController);

module.exports = router;
