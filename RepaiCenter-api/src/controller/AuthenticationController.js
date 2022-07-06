const express = require("express");

const moment = require("moment");
const jwt = require("jsonwebtoken");
const constants = require("../configs/constants");

const responseCode = require("../configs/responseCode");

const router = express.Router();

const {
  callRegisterGarage,
  callLoginUser,
} = require("../services/funcCallback");


router.post("/registion", async (request, response, next) => {
  try {
    const data = request.body;
    callRegisterGarage(data, function (err, datas, status) {
      if (status == responseCode.SUCCESS) {
        response.json({
          code: 200,
          message: "insert garage success"
        });
      } else {
        response.json({
          code: 204,
          message: "มี UserID นี้แล้ว",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//User Login
router.post("/login", async (request, response, next) => {
  try {
    //get user input
    const data = request.body;

    callLoginUser(data, function (err, datas, status) {
      //   console.log(status);
      if (status == responseCode.SUCCESS) {
        const expireAt = moment().add(constants.EXPIRE_TOKEN, "seconds");
        const tokenData = {
          userId: datas.garageID,
          userName: datas.user_name,
          garageName: datas.garage_name,
          email: datas.email,
          status: status,
        };

        const token = jwt.sign(tokenData, constants.JWT_SECRET, {
          expiresIn: constants.EXPIRE_TOKEN,
        });

        response.json({
          _auth: true,
          code: 200,
          message: "login success",
          data: {
            token,
            expired_at: expireAt,
          },
          userData: tokenData,
        });

        request.session = [token, tokenData];
        
      } else if (status == responseCode.SUCCESS_NO_CONTENT) {
        response.json({
          code: 204,
          message: "Incorrect Email and/or Password!",
        });
      } else if (status == responseCode.SUCCESS_ACCEPTED) {
        response.json({
          _auth: true,
          code: 202,
          message: "Admin Login user",
          userData: {
            userId: datas.garageID,
            email: datas.email,
          },
        });
      } else if (status == responseCode.SUCCESS_NO_APPROVE) {
        response.json({
          code: 205,
          message: "Confirmation is Non-approved!",
        });
      } else {
        response.json({
          code: 400,
          message: "login is not success",
        });
      }
    });
    // response.status(400).send("Invalid Credentials")
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", async (request, response) => {
  const test = request.session;
  console.log(test);
  response.json({
    code: 200,
    message: "Destroy accesstoken success",
    data: response.session,
  });
});

router.delete("/logout", async (request, response) => {
  response.json({
    code: 200,
    message: "Destroy accesstoken success",
    data: response.session,
  });
});

module.exports = router;
