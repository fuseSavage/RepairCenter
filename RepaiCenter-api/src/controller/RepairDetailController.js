const express = require("express");

const {
  callRepairDetail,
  callGetallDetail,
  callGetByMember,
  callGetByGarage,
  callGetByDetailID,
  callSpareDetail,
  callGetSpareByDetailID,
  callDeleteSpare,
  callUpdateDetail,
  callGetAllSpare,
} = require("../services/funcCallback");
const responseCode = require("../configs/responseCode");

const { pushMessage } = require("../services/lineApi");

const router = express.Router();

// Insert Details
router.post("/insert", async (request, response, next) => {
  try {
    let data = request.body;
    callRepairDetail(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "insert success",
          data: data,
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

// Get All Detail
router.get("/all", (request, response, next) => {
  try {
    callGetallDetail(function (err, datas, status) {
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

// Get By Member
router.get("/getbymember", (request, response, next) => {
  let data = request.query;
  console.log(data);
  try {
    callGetByMember(data, function (err, datas, status) {
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
          message: "ไม่มี member นี้อยู่ในตาราง",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get By Garage
router.get("/getbygarage", (request, response, next) => {
  let data = request.query;
  // console.log("data", data);
  try {
    callGetByGarage(data, function (err, datas, status) {
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
          message: "ไม่มี garage นี้อยู่ในตาราง",
          data: null,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get By GarageID
router.get("/getbydetailID", (request, response, next) => {
  let data = request.query;
  console.log("data", data);
  try {
    callGetByDetailID(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get data success",
          data: datas,
        });
      } else {
        response.json({
          code: 500,
          message: "ไม่มี garage นี้อยู่ในตาราง",
          data: null,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Insert Details
router.post("/insert-spare", async (request, response, next) => {
  try {
    let data = request.body;
    // console.log('spare',data)

    callSpareDetail(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "insert spare success",
          data: data,
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

// Get By spare All
router.get("/getallspare", (request, response, next) => {
  // let data = request.query;
  // console.log("data", data);
  try {
    callGetAllSpare("data", function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get data success",
          data: datas,
        });
      } else {
        response.json({
          code: 500,
          message: "ไม่มี data นี้อยู่ในตาราง",
          data: null,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get By spare GarageID
router.get("/getspare-detailid", (request, response, next) => {
  let data = request.query;
  // console.log("data", data);
  try {
    callGetSpareByDetailID(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "get data success",
          data: datas,
        });
      } else {
        response.json({
          code: 500,
          message: "ไม่มี data นี้อยู่ในตาราง",
          data: null,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete-spare", async (request, response, next) => {
  try {
    let data = request.body;
    console.log("555", data);

    callDeleteSpare(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "ลบสำเร็จ",
          data: data,
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

// Update Garage
router.put("/update-detail", (request, response, next) => {
  let data = request.body;
  try {
    callUpdateDetail(data, function (err, datas, status) {

      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "Update  success",
          total: datas.length,
          data: datas,
        });

        if (datas[0].status === "สำเร็จ") {
          pushMessage(datas);
        }
      } else {
        response.json({
          code: 400,
          message: "not success",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
