const express = require("express");

const {
  callGetallMember,
  callRegisterMember,
  callGetMember,
  callDeleteMember,
  callGetMemberByGarage,
} = require("../services/funcCallback");
const responseCode = require("../configs/responseCode");

const router = express.Router();

// Get All Member
router.get("/all", (request, response, next) => {
  try {
    callGetallMember(function (err, datas, status) {
      //   console.log(status);
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get all success",
          total: datas.length,
          data: datas,
        });
      } else {
        response.json({
          code: 400,
          message: "nodata",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Insert Member
router.post("/insert", async (request, response, next) => {
  try {
    let data = request.body;

    callRegisterMember(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "สมัครสมาชิกให้ลูกค้าเรียบร้อย",
          data: datas,
        });
      } else {
        response.json({
          code: 204,
          message: "มีรหัสลูกค้านี้อยู่แล้ว!",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get One Member
router.get("/getmember", (request, response, next) => {
  let data = request.body;
  // console.log(data)
  try {
    callGetMember(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get data success",
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

// Get One Member By Garage
router.get("/getmember/member-regis", (request, response, next) => {
  let data = request.query;
  console.log(data)
  try {
    callGetMemberByGarage(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get data success",
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

// Delete Member
router.delete("/delete", (request, response, next) => {
  let data = request.body;
  try {
    callDeleteMember(data, function (err, datas, status) {
      // console.log(status)
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "Delete success",
          total: datas.length,
          data: datas,
        });
      } else {
        response.json({
          code: 400,
          message: "ลบไม่ได้ เนื่องจากมี member นี้ในประวัติการซ่อม",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
