const express = require("express");

const { callInsertReport, callGetReport } = require("../services/funcCallback");
const responseCode = require("../configs/responseCode");

const router = express.Router();

// Insert Member
router.post("/insert", async (request, response, next) => {
  try {
    let data = request.body;

    callInsertReport(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "insert success",
          data: datas,
        });
      } else {
        response.json({
          code: 204,
          message: "sql is not working!!",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get All Report
router.get("/all", (request, response, next) => {
  try {
    callGetReport(function (err, datas, status) {
      //   console.log(status);
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get all success",
          total: datas.length,
          data: datas,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
