// import express from 'express'
const express = require("express");

const router = express.Router();
const axios = require("axios");

// import UserController from '../controllers/users/UserController'
// const ChatController = require('../controllers/chat/chatController')

// router.use('/chat', ChatController)
const responseCode = require("../configs/responseCode");
const request = require("request");
const { callRegisterMember } = require("../services/funcCallback");

router.post("/chat/webhook", async (req, res, next) => {
  // console.log("Hello", req.body.events[0]);

  try {
    let reply_token = req.body.events[0].replyToken;
    console.log("body-------------", req.body);
    const postback = req.body.events[0].postback;
    console.log("postback-------------", postback);
    console.log("req.body source.userID => ", req.body.events[0].source.userId);
    // console.log('req.body message.text => ', req.body.events[0].message.text?)
    let userId = req.body.events[0].source.userId;
    let messageText = req.body.events[0].message?.text || null;

    // reply(reply_token)
    console.log("postback before if", postback);

    if (messageText !== null) {
      let messageSplit = messageText.split(",");
      console.log("connect succes", messageSplit[0]);
      if (messageSplit.length !== 3) {
        console.log("ข้อมูลไม่ครบ!!!");
        //////test
        reply(reply_token);
      } else {
        if (messageSplit[0] === "ลงทะเบียน") {
          console.log("connect succes", userId);
          await findUserProfile(userId).then((res) => {
            if (res) {
              let data = {
                party: "member",
                userIdLine: res.userId,
                imageUrl: res.pictureUrl,
                userName: res.displayName,
                member_tel: messageSplit[1],
                member_name: messageSplit[2],
              };
              // console.log("data => ", data);
              callRegisterMember(data, function (err, datas, status) {
                if (status == responseCode.SUCCESS) {
                  replyMulti(reply_token, "ลงทะเบียนสำเร็จ");
                  console.log("test");
                } else if (status == responseCode.ERROR_DB_DUPLICATE) {
                  replyMulti(
                    reply_token,
                    'ลงทะเบียน "ไม่สำเร็จ" หมายเลขโทรศัพท์นี้ลงทะเบียนเเล้ว'
                  );
                } else if (status == responseCode.SUCCESS_NO_CONTENT) {
                  replyMulti(
                    reply_token,
                    'ลงทะเบียน "ไม่สำเร็จ" ID Line นี้ได้มีการลงทะเบียนแล้ว'
                  );
                } else {
                  replyMulti(reply_token, 'ลงทะเบียน "ไม่สำเร็จ"');
                }
              });
            } else {
              replyMulti(reply_token, 'ลงทะเบียน "ไม่สำเร็จ"');
            }
          });
        } else if (postback != undefined) {
          console.log(
            "req.body.events[0].postback => ",
            req.body.events[0].postback
          );
          console.log("data => ", req.body.events[0].postback.data);
          const _postBack = postback.data.split(",");
          console.log("postback => ", _postBack);
          const status = _postBack[0];
          const _orderId = _postBack[1];
          console.log("pos", status, _orderId);
          
        } else {
          console.log("5555!!!");
          //////test
          reply(reply_token);
        }
      }
    } else {
      console.log("5555!!!");
      console.log("messageText", messageText);
      //////test
      reply(reply_token);
    }

    // res.sendStatus(200)
  } catch (err) {
    next(err);
  }
});

/// testttttttt

function reply(reply_token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer pe35stwPZGxT24BSF7Y6aGOa7YDmKtBlMQppWrjjZvbE8WY1Z+QSiaUhanQNRsUi9H9AhtOr52TJi1dMTqlyOoJtwoCta05j+iR8WFO1rN0BOc7n7wEtc0rrM8CcohZFAwk+9OGWaOfiRnqqRlgCmgdB04t89/1O/w1cDnyilFU=",
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "Repair Center ระบบจัดการร้านซ่อม สวัสดีค่ะ \n ( ไม่สามารถตอบกลับได้ )",
      },
      {
        type: "text",
        text: 'หากลูกค้าที่ต้องการลงทะเบียน ให้พิมพ์คำว่า  " ลงทะเบียน,เบอร์โทรศัพท์,ชื่อ-นามสกุล "  ได้เลยค่ะ',
      },
      {
        type: "text",
        text: 'ตัวอย่าง \n " ลงทะเบียน,09xxxxxxxx,สุขสม นามใจ "',
      },
      {
        type: "sticker",
        packageId: "6136",
        stickerId: "10551378",
      },
    ],
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}


async function findUserProfile(userId) {
  let userData;
  await axios
    .get(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: {
        Authorization:
          "Bearer pe35stwPZGxT24BSF7Y6aGOa7YDmKtBlMQppWrjjZvbE8WY1Z+QSiaUhanQNRsUi9H9AhtOr52TJi1dMTqlyOoJtwoCta05j+iR8WFO1rN0BOc7n7wEtc0rrM8CcohZFAwk+9OGWaOfiRnqqRlgCmgdB04t89/1O/w1cDnyilFU=",
      },
    })
    .then((res) => {
      userData = res.data;
    });
  return userData;
}

function replyMulti(reply_token, reponseText) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer pe35stwPZGxT24BSF7Y6aGOa7YDmKtBlMQppWrjjZvbE8WY1Z+QSiaUhanQNRsUi9H9AhtOr52TJi1dMTqlyOoJtwoCta05j+iR8WFO1rN0BOc7n7wEtc0rrM8CcohZFAwk+9OGWaOfiRnqqRlgCmgdB04t89/1O/w1cDnyilFU=",
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: reponseText,
      },
    ],
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}

module.exports = router;
