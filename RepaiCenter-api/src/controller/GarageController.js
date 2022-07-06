const express = require("express");

const {
  callRegisterGarage,
  callGetallGarage,
  callGetGarage,
  callUpdateGarage,
  callDeleteGarage,
  callGetGarageAll,
  callApproveGarage
} = require("../services/funcCallback");
const responseCode = require("../configs/responseCode");

const router = express.Router();

// Insert garage
router.post("/insert", async (request, response, next) => {
  try {
    let data = request.body;
    // console.log(request.body)

    callRegisterGarage(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "insert garage success",
          data: datas,
        });
      } else {
        response.json({
          code: 204,
          message: "มี UserID นี้แล้ว",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get All Garage
router.get("/all", (request, response, next) => {
  try {
    callGetallGarage(function (err, datas, status) {
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

// Get Garage All 
router.get("/all-repair", (request, response, next) => {
  try {
    callGetGarageAll(function (err, datas, status) {
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

// Get One Garage
router.get("/getgarage", (request, response, next) => {
  let data = request.body;
  // console.log(data)
  try {
    callGetGarage(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get one garage success",
          total: datas.length,
          data: datas,
        });
      } else {
        response.json({
          code: 500,
          message: "ไม่มี UsesID นี้อยู่ในตาราง",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Garage
router.post("/update", (request, response, next) => {
  let data = request.body;
  // console.log(data)
  try {
    callUpdateGarage(data, function (err, datas, status) {
      // console.log(status)
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "Update garage success",
          total: datas.length,
          data: datas,
        });
      } else {
        response.json({
          code: 400,
          message: "Update garage not success",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Approve
router.put("/approve", (request, response, next) => {
  let data = request.body;
  console.log(data)
  try {
    callApproveGarage(data, function (err, datas, status) {
      // console.log(status)
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "Update garage success",
          total: datas.length,
          data: datas,
        });
      } else {
        response.json({
          code: 400,
          message: "Update garage not success",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Garage
router.delete("/delete", (request, response, next) => {
  let data = request.body;
  try {
    callDeleteGarage(data, function (err, datas, status) {
      // console.log(status)
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "Delete garage success",
          total: datas.length,
          data: datas,
        });
      } else {
        response.json({
          code: 400,
          message:
            "Delete garage not success มี garageID นี้ อยู่ในประวัติการซ่อมอยู่",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
