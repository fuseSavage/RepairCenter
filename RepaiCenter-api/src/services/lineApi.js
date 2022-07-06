const request = require("request");
const responseCode = require("../configs/responseCode");

async function pushMessage(data) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer pe35stwPZGxT24BSF7Y6aGOa7YDmKtBlMQppWrjjZvbE8WY1Z+QSiaUhanQNRsUi9H9AhtOr52TJi1dMTqlyOoJtwoCta05j+iR8WFO1rN0BOc7n7wEtc0rrM8CcohZFAwk+9OGWaOfiRnqqRlgCmgdB04t89/1O/w1cDnyilFU=",
  };
  let body = JSON.stringify({
    to: data[0].userIdLine,
    messages: [
      {
        type: "text",
        text: "ขออนุญาตแจ้งสถานะการซ่อมค่ะ",
        weight: "bold",
      },
      {
        type: "text",
        text: `
        ชื่อลูกค้า : ${data[0].member_name}\n
        รหัสลูกค้า : ${data[0].member_tel}\n
        ประเภทอุปกรณ์ : ${data[0].device_type}\n
        ร้าน :  ${data[0].garage_name}\n
        รับซ่อมวันที่ : ${data[0].repair_date}\n
        สถานะการซ่อม : ${data[0].status}\n
        ราคาทั้งหมด : ${data[0].price}฿\n
        การชำระเงิน : ${data[0].status_payment}
        `,
      },
      {
        type: "text",
        text: `Repair Center ขอขอบคุณค่ะ`,
      },
      {
        type: "sticker",
        packageId: "6136",
        stickerId: "10551377",
      },
    ],
  });

  request.post(
    {
      url: "https://api.line.me/v2/bot/message/push",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}

module.exports = { pushMessage };
