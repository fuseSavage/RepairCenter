const { query } = require("express");
const mysql = require("mysql");

const bcrypt = require("bcrypt");

const constants = require("../configs/constants");
const responseCode = require("../configs/responseCode");

const identify = require("sql-query-identifier");
var sql = require("sql-query"),
  sqlQuery = sql.Query(); //for dialect: sql.Query('postgresql')

// Create a connection to the database
const db = mysql.createConnection({
  host: constants.HOST,
  user: constants.USER,
  password: constants.PASSWORD,
  database: constants.DB,
});

// Import SQL Commmand
const createTable = require("../sql/createTable");
const insertInto = require("../sql/insertInto");
const { exit } = require("yargs");

// DataBase Connected
db.connect((err) => {
  try {
    if (err) throw err;
    console.log("connected!!");

    // Show All Table in DataBase
    db.query("SHOW TABLES", (err, result) => {
      if (err) throw err;
      let allTable = [];
      for (let i = 0; i < result.length; i++) {
        allTable.push(result[i].Tables_in_repaircenter_db);
      }

      // Check Table garage in DataBase
      if (allTable.includes("garage") == false) {
        // Create Table
        db.query(createTable.garage, (err) => {
          if (err) throw err;
          console.log("Created table garage successfully.");
        });
      } else {
        console.log("database there is already this table.");
      }

      // Check Table member in DataBase
      if (allTable.includes("member") == false) {
        // Create Table
        db.query(createTable.member, (err) => {
          if (err) throw err;
          console.log("Created table member successfully.");
        });
      } else {
        console.log("database there is already this table.");
      }

      // Check Table repairDetails in DataBase
      if (allTable.includes("repairdetails") == false) {
        // Create Table
        db.query(createTable.repairDetails, (err) => {
          if (err) throw err;
          console.log("Created table repairDetails successfully.");
        });
      } else {
        console.log("database there is already this table.");
      }

      // Check Table reported in DataBase
      if (allTable.includes("reported") == false) {
        // Create Table
        db.query(createTable.reported, (err) => {
          if (err) throw err;
          console.log("Created table reported successfully.");
        });
      } else {
        console.log("database there is already this table.");
      }

      // Check Table reported in DataBase
      if (allTable.includes("spare") == false) {
        // Create Table
        db.query(createTable.spare, (err) => {
          if (err) throw err;
          console.log("Created table spare successfully.");
        });
      } else {
        console.log("database there is already this table.");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// insert garage in RepairCenterDB
async function registerGarage(data, callback) {
  values = [
    data.garageID,
    data.party,
    data.password,
    data.user_name,
    data.garage_name,
    data.email,
    data.garage_type,
    data.address_number,
    data.moo,
    data.alley,
    data.road,
    data.sub_district,
    data.district,
    data.province,
    data.pos_code,
    data.address_map,
    new Date(),
    data.on_time,
    data.off_time,
    data.tel,
    data.confirmation,
  ];

  encryptedPassword = await bcrypt.hash(data.password, 10);

  let garageType = JSON.stringify(data.garage_type);
  let adsMap = JSON.stringify(data.address_map);
  let timeElapsed = Date.now();
  let today = new Date(timeElapsed);
  let dateNow = today.toLocaleDateString();

  try {
    let sql = `SELECT garageID FROM garage`;
    db.query(sql, (error, result) => {
      if (error) {
        console.log("===>>> Error", error);
        ``;
      } else {
        let listGID = [];
        result.forEach((doc) => {
          listGID.push(doc.garageID);
        });

        const checkGID = listGID.includes(data.garageID);
        if (checkGID === false) {
          db.query(
            insertInto.insert_garage,
            [
              data.garageID,
              data.party,
              encryptedPassword,
              data.user_name,
              data.garage_name,
              data.email,
              garageType,
              data.address_number,
              data.moo,
              data.alley,
              data.road,
              data.sub_district,
              data.district,
              data.province,
              data.pos_code,
              adsMap,
              dateNow,
              data.on_time,
              data.off_time,
              data.tel,
              data.confirmation,
            ],
            (err, result) => {
              if (err) {
                return callback(err);
              } else {
                callback(null, values, responseCode.SUCCESS);
              }
            }
          );
        } else {
          callback(null, result, responseCode.SUCCESS_NO_CONTENT);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Login user
async function loginUser(data, callback) {
  // console.log(data);
  try {
    if (data.garageID && data.password) {
      db.query(
        "SELECT * FROM garage WHERE garageID = ?",
        [data.garageID],
        (error, results, fields) => {
          if (error) {
            console.log("error =>", error);
          }

          if (results.length != 0) {
            // console.log(results[0].password);
            if (bcrypt.compareSync(data.password, results[0].password)) {
              // console.log("Successful", results[0].confirmation);
              if (results[0].confirmation === "approve") {
                callback(null, results[0], responseCode.SUCCESS);
              } else {
                if (results[0].garageID === "admin") {
                  // console.log("Successful", results[0].garageID);
                  callback(null, results[0], responseCode.SUCCESS_ACCEPTED);
                } else {
                  //  console.log("test", results[0].garageID);
                  callback(null, null, responseCode.SUCCESS_NO_APPROVE);
                }
              }
            } else {
              // console.log("Incorrect Email and/or Password!");
              callback(null, null, responseCode.SUCCESS_NO_CONTENT);
            }
          } else {
            callback(null, null, responseCode.ERROR_BAD_REQUEST);
          }
        }
      );
    } else {
      console.log("Please enter Username and Password!");
    }

    // console.log(sql);
    //   db.query(sql, async (err, rows) => {
    //     // console.log(rows);
    //     if (err) {
    //       callback(err);
    //     } else {
    //       if (
    //         data.garageID = rows.garageID &&
    //         data.password == (await bcrypt.compare(data.password, rows.password))
    //       ) {
    //         console.log(rows.password);
    //         callback(null, rows, responseCode.SUCCESS);
    //       } else {
    //         console.log("rows", rows.password);
    //         callback(null, null, responseCode.SUCCESS_NO_CONTENT);
    //       }
    //     }

    //   });
  } catch (err) {
    console.log(err);
  }
}

// get All Garage
function getAllGarage(data, callback) {
  try {
    db.query(
      `SELECT * FROM garage WHERE confirmation = 'approve' `,
      function (err, rows) {
        if (err) return callback(err);
        callback(null, rows, responseCode.SUCCESS);
      }
    );
  } catch (err) {
    console.log(err);
  }
}

// get All Garage
function getGarageAll(data, callback) {
  try {
    db.query(`SELECT * FROM garage `, function (err, rows) {
      if (err) return callback(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// get one Garage
function getGarage(data, callback) {
  // console.log(data.userID);
  let sql = `SELECT * FROM garage WHERE garageID = "${data.garageID}"`;
  try {
    db.query(sql, function (err, rows) {
      if (err) return callback(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Update garage
function updateGarage(data, callback) {
  let sql = `UPDATE garage SET 
    garageID = "${data.garageID}",
    user_name = "${data.user_name}",
    garage_name = "${data.garage_name}",
    email = "${data.email}",
    garage_type = "${data.garage_type}",
    address_number = "${data.address_number}",
    moo = "${data.moo}",
    alley = "${data.alley}",
    road = "${data.road}",
    sub_district = "${data.sub_district}",
    district = "${data.district}",
    province = "${data.province}",
    pos_code = "${data.pos_code}",
    address_map = "${data.address_map}",
    on_time = "${data.on_time}",
    off_time = "${data.off_time}",
    tel = "${data.tel}" WHERE garageID = "${data.garageID}"
    `;
  try {
    // console.log(sql, data.garageID)

    db.query(sql, (error, result) => {
      if (error) {
        // console.log("error",error);
        callback(null, result, responseCode.ERROR_BAD_REQUEST);
      } else {
        // console.log("good");
        callback(null, data, responseCode.SUCCESS);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Approve garage
function Approve(data, callback) {
  let sql = `UPDATE garage SET 
    confirmation = "approve" WHERE garageID = "${data.garageID}"
    `;
  try {
    // console.log(sql, data.garageID)

    db.query(sql, (error, result) => {
      if (error) {
        // console.log("error",error);
        callback(null, result, responseCode.ERROR_BAD_REQUEST);
      } else {
        // console.log("good");
        callback(null, data, responseCode.SUCCESS);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Delete Garage
function deleteGarage(data, callback) {
  // console.log(data)
  let sql = `DELETE FROM garage WHERE garageID = "${data.garageID}"`;
  try {
    // console.log(sql, data.garageID)

    db.query(sql, (error, result) => {
      if (error) {
        // console.log("error", error);
        callback(null, result, responseCode.ERROR_BAD_REQUEST);
      } else {
        // console.log("good");
        callback(null, data, responseCode.SUCCESS);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Get All Member
function getAllMember(data, callback) {
  try {
    db.query("SELECT * FROM member", function (err, rows) {
      if (err) return callback(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// insert Member register
function registerMember(data, callback) {
  let timeElapsed = Date.now();
  let today = new Date(timeElapsed);
  let dateNow = today.toLocaleDateString();
  values = [
    data.party,
    data.userIdLine,
    data.imageUrl,
    data.userName,
    data.member_tel,
    data.member_name,
    dateNow,
  ];
  try {
    let sql = `SELECT userIdLine FROM member`;
    db.query(sql, (error, result) => {
      if (error) {
        console.log("===>>> Error", error);
        ``;
      } else {
        let listUID = [];
        result.forEach((doc) => {
          listUID.push(doc.userIdLine);
        });
        // console.log(listUID)
        const check = listUID.includes(data.userIdLine);
        if (check === false) {
          db.query(insertInto.insert_member, [values], (err, result) => {
            if (err) {
              callback(null, values, responseCode.ERROR_DB_DUPLICATE);
              console.log("Main error =>", err);
            } else {
              callback(null, values, responseCode.SUCCESS);
              console.log("insert success");
            }
          });
        } else {
          console.log("มี userID นี้แล้ว");
          callback(null, result, responseCode.SUCCESS_NO_CONTENT);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// get one Member
function getMember(data, callback) {
  // console.log(data.userID);
  let sql = `SELECT * FROM member WHERE member_tel = "${data.member_tel}"`;
  try {
    db.query(sql, function (err, rows, status) {
      if (err) return callback(err);
      // console.log(rows)
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// get one Member By GarageName
function getMemberByGarage(data, callback) {
  // console.log(data.userID);
  let sql = `SELECT * FROM member WHERE garageID = "${data.userId}"`;
  try {
    db.query(sql, function (err, rows, status) {
      if (err) return callback(err);
      // console.log(rows)
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Delete Member
function deleteMember(data, callback) {
  // console.log(data)
  let sql = `DELETE FROM member WHERE member_tel = "${data.member_tel}"`;
  try {
    // console.log(sql, data.garageID)

    db.query(sql, (error, result) => {
      if (error) {
        // console.log("err", error);
        callback(null, result, responseCode.ERROR_BAD_REQUEST);
      } else {
        // console.log("good");
        callback(null, data, responseCode.SUCCESS);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// insert RepairDetail
function repairDetail(data, callback) {
  // let timeElapsed = Date.now();
  // let today = new Date(timeElapsed);
  // let dateNow = today.toLocaleDateString();

  // let details = JSON.stringify(data.detail);

  // console.log(data);

  try {
    db.query(
      insertInto.insert_detail,
      [
        data.garageID,
        data.member_tel,
        data.device_type,
        data.car_number,
        data.car_province,
        data.brand,
        data.model,
        data.kilo_number,
        data.repair_details,
        data.repair_date,
        data.spare_parts_list,
        data.status,
        data.price,
        data.status_payment,
        data.equipment,
      ],
      (err, result) => {
        if (err) {
          callback(null, null, responseCode.SUCCESS_NO_CONTENT);
          console.log("err", err);
        } else {
          callback(null, null, responseCode.SUCCESS);
          // console.log("insert success");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

//insert Spare Detail
function spareDetail(data, callback) {
  console.log(data);
  try {
    db.query(
      `INSERT INTO spare ( detailsID, spare, member_tel) VALUES (${data.detailsID}, '${data.spare}' , '${data.memberTel}')`,
      (err, result) => {
        if (err) {
          console.log("error", err);
          callback(null, null, responseCode.SUCCESS_NO_CONTENT);

          console.log("err", err);
        } else {
          callback(null, null, responseCode.SUCCESS);
          // console.log("insert success");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

// Get Spare By GarageID
function getAllSpare(data, callback) {
  try {
    // console.log(detailID)
    let sql = `SELECT * FROM spare`;

    db.query(sql, function (err, rows) {
      if (err) return callback(err);
      // if (err) console.log(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Get Spare By GarageID
function getSpareByDetailID(data, callback) {
  try {
    // console.log(detailID)
    let sql = `SELECT * FROM spare WHERE detailsID = ${data.detailID}`;

    db.query(sql, function (err, rows) {
      if (err) return callback(err);
      // if (err) console.log(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

//Delete Spare
function deleteSpare(data, callback) {
  console.log(data);
  let sql = `DELETE FROM spare WHERE spareID = '${data.id}'`;
  try {
    // console.log(sql, data.garageID)

    db.query(sql, (error, result) => {
      if (error) {
        console.log("err", error);
        callback(null, result, responseCode.ERROR_BAD_REQUEST);
      } else {
        // console.log("good");
        callback(null, data, responseCode.SUCCESS);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Get All Datail
function getAllDetail(data, callback) {
  try {
    let sql = `SELECT * FROM repairdetails AS a 
    INNER JOIN member AS b ON a.member_tel = b.member_tel 
    INNER JOIN garage AS c ON a.garageID = c.garageID`;
    db.query(sql, function (err, rows) {
      // if (err) return callback(err);
      if (err) console.log(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Get By Member
function getByMember(data, callback) {
  try {
    let memberTel = data.member_tel;
    // console.log(memberTel)
    let sql = `SELECT * FROM repairdetails AS a 
    INNER JOIN member AS b ON a.member_tel = b.member_tel 
    INNER JOIN garage AS c ON a.garageID = c.garageID 
    WHERE a.member_tel = ${memberTel} ORDER BY a.repair_date DESC `;

    db.query(sql, function (err, rows) {
      if (err) return callback(err);
      // if (err) console.log(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Get By Garage
function getByGarage(data, callback) {
  try {
    let garageID = data.garageID;
    // console.log(garage)
    let sql = `SELECT * FROM repairdetails AS a 
    INNER JOIN member AS b ON a.member_tel = b.member_tel 
    INNER JOIN garage AS c ON a.garageID = c.garageID 
    WHERE a.garageID = "${garageID}" ORDER BY detailsID DESC`;

    db.query(sql, function (err, rows) {
      if (err) return callback(err);
      // if (err) console.log(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Get By GarageID
function getByDetailID(data, callback) {
  try {
    let detailID = data.detailID;
    // console.log(detailID)
    let sql = `SELECT * FROM repairdetails AS a 
    INNER JOIN member AS b ON a.member_tel = b.member_tel 
    INNER JOIN garage AS c ON a.garageID = c.garageID 
    WHERE a.detailsID = ${detailID}`;

    db.query(sql, function (err, rows) {
      if (err) return callback(err);
      // if (err) console.log(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// insert Report
function insertReport(data, callback) {
  let timeElapsed = Date.now();
  let today = new Date(timeElapsed);
  let dateNow = today.toLocaleDateString();

  let values = [
    data.party,
    data.user_report,
    data.username,
    data.report_detail,
    data.report_tel,
    dateNow,
  ];

  try {
    db.query(insertInto.insert_reported, [values], (err, result) => {
      if (err) {
        callback(null, null, responseCode.SUCCESS_NO_CONTENT);
      } else {
        callback(null, null, responseCode.SUCCESS);
      }
    });
  } catch (err) {
    console.log(err);
  }
}


// Get All Report
function getReport(data, callback) {
  try {
    db.query("SELECT * FROM reported", function (err, rows) {
      if (err) return callback(err);
      callback(null, rows, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

// Update Detail
function updateDetail(data, callback) {
  let sql = `UPDATE repairdetails SET 
    status = "${data.status}",
    price = "${data.sumPrice}",
    status_payment = "${data.status_payment}" WHERE detailsID = "${data.detailsID}"
    `;
  try {

    db.query(sql, (error, result) => {
      if (error) {

        callback(null, result, responseCode.ERROR_BAD_REQUEST);
      } else {
        db.query(
          `SELECT a.device_type, a.car_number, a.car_province, a.brand, a.model, a.repair_date, a.status, a.price, a.status_payment, a.equipment,
          b.member_tel, b.member_name, b.userIdLine, c.spare,
          d.user_name, d.garage_name 
          FROM repairdetails AS a 
          INNER JOIN member AS b ON a.member_tel = b.member_tel 
          INNER JOIN spare AS c ON a.detailsID = c.detailsID 
          INNER JOIN garage AS d ON a.garageID = d.garageID 
          WHERE a.detailsID = "${data.detailsID}" `,
          (error, result) => {
            if (error) {
              console.log("error", error);
            } else {
              if (result) {
                callback(null, result, responseCode.SUCCESS);
              }
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  registerGarage,
  getAllGarage,
  getGarageAll,
  getGarage,
  updateGarage,
  deleteGarage,
  getAllMember,
  registerMember,
  getMember,
  deleteMember,
  repairDetail,
  getAllDetail,
  getByMember,
  getByGarage,
  insertReport,
  getReport,
  loginUser,
  getByDetailID,
  spareDetail,
  getSpareByDetailID,
  deleteSpare,
  updateDetail,
  getMemberByGarage,
  getAllSpare,
  Approve,
};
