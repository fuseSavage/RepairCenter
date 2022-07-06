const responseCode = require("../configs/responseCode");

const {
  getAllGarage,
  getGarage,
  registerGarage,
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
  getGarageAll,
  getAllSpare,
  Approve,
} = require("./database");

//fucntion callback Insert Garage
async function callRegisterGarage(data, callback) {
  try {
    registerGarage(data, function (err, result, status) {
      if (err || !result.length) {
        // callback("error or no results");
        console.log('55555')
      } 
      result = result.map((obj) => obj);
      // console.log(result)
      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback Login User Garage
async function callLoginUser(data, callback) {
  try {
    // console.log(data)
    loginUser(data, function (err, result, status) {

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get all garage
async function callGetallGarage(callback) {
  try {
    getAllGarage("result", function (err, result) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get all garage
async function callGetGarageAll(callback) {
  try {
    getGarageAll("result", function (err, result) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get one garage
async function callGetGarage(data, callback) {
  // console.log(data)
  try {
    getGarage(data, function (err, result) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, responseCode.SUCCESS);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback Update Garage
async function callUpdateGarage(data, callback) {
  // console.log(data)
  try {
    updateGarage(data, function (err, result, status) {
      // console.log('test', result)

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback Approve Garage
async function callApproveGarage(data, callback) {
  // console.log(data)
  try {
    Approve(data, function (err, result, status) {
      // console.log('test', result)

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback Delete Garage
async function callDeleteGarage(data, callback) {
  // console.log(data)
  try {
    deleteGarage(data, function (err, result, status) {
      // console.log('test', result)

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get all member
async function callGetallMember(callback) {
  try {
    getAllMember("result", function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      // console.log(result);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback Insert Member
async function callRegisterMember(data, callback) {
  try {
    registerMember(data, function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get one Member
async function callGetMember(data, callback) {
  // console.log(data)
  try {
    getMember(data, function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get one Member
async function callGetMemberByGarage(data, callback) {
  // console.log(data)
  try {
    getMemberByGarage(data, function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback Delete Member
async function callDeleteMember(data, callback) {
  // console.log(data)
  try {
    deleteMember(data, function (err, result, status) {
      // console.log('test', result)

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback detail
async function callRepairDetail(data, callback) {
  try {
    repairDetail(data, function (err, result, status) {
      // if (err || !result.length) return callback("error or no results");

      // result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback detail
async function callSpareDetail(data, callback) {
  try {
    spareDetail(data, function (err, result, status) {
      // if (err || !result.length) return callback("error or no results");

      // result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get all detail
async function callGetallDetail(callback) {
  try {
    getAllDetail("result", function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get by member
async function callGetByMember(data, callback) {
  try {
    getByMember(data , function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get by garage
async function callGetByGarage(data, callback) {
  try {
    getByGarage(data , function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      // console.log(result)
      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get by garageID
async function callGetByDetailID(data, callback) {
  try {
    getByDetailID(data , function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      // console.log(result)
      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get Spare All
async function callGetAllSpare(data, callback) {
  try {
    getAllSpare(data , function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      // console.log(result)
      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get Spare by detailID
async function callGetSpareByDetailID(data, callback) {
  try {
    getSpareByDetailID(data , function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      // console.log(result)
      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback delete spare
async function callDeleteSpare(data, callback) {
  // console.log(data)
  try {
    deleteSpare(data, function (err, result, status) {
      // console.log('test', result)

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}



//fucntion callback Insert report
async function callInsertReport(data, callback) {
  try {
    insertReport(data, function (err, result, status) {
      // if (err || !result.length) return callback("error or no results");

      // result = result.map((obj) => obj);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback get all member
async function callGetReport(callback) {
  try {
    getReport("result", function (err, result, status) {
      if (err || !result.length) return callback("error or no results");

      result = result.map((obj) => obj);
      // console.log(result);

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}

//fucntion callback update detail
async function callUpdateDetail(data, callback) {
  // console.log(data)
  try {
    updateDetail(data, function (err, result, status) {
      // console.log('test', result)

      callback(null, result, status);
    });
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  callRegisterGarage,
  callGetallGarage,
  callGetGarage,
  callUpdateGarage,
  callDeleteGarage,
  callGetallMember,
  callRegisterMember,
  callGetMember,
  callDeleteMember,
  callRepairDetail,
  callGetallDetail,
  callGetByMember,
  callGetByGarage,
  callInsertReport,
  callGetReport,
  callLoginUser,
  callGetByDetailID,
  callSpareDetail,
  callGetSpareByDetailID,
  callDeleteSpare,
  callUpdateDetail,
  callGetMemberByGarage,
  callGetGarageAll,
  callGetAllSpare,
  callApproveGarage
};
