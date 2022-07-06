import axios from "axios";

// register
export const Registion = (data) => {
  return axios
    .post(
      process.env.REACT_APP_SECRET_API + "/authentication/registion",
      data
    )
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// login
export const sendLogin = (data) => {
  return axios
    .post(process.env.REACT_APP_SECRET_API + "/authentication/login", data)
    .then((response) => {
      if (response.data.code === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // sessionStorage.setItem('user', JSON.stringify(response.data));
      } else if (response.data.code === 202) {
        localStorage.setItem("user", JSON.stringify(response.data));
        // sessionStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// logout
export const sendLogout = () => {
  return localStorage.removeItem("user");
};

// get list All garage is Approve
export const FetchGarageAll = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/garage/all")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get list garage All
export const FetchGarage = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/garage/all-repair")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// Fetch Thai Address API
export const FetchThaiAddress = () => {
  return axios
    .get("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get  FetchMemberTel
export const FetchMemberTel = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/member/all")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// send data to InsertDetails
export const InsertDetails = (data) => {
  return axios
    .post(process.env.REACT_APP_SECRET_API + "/repairdetail/insert", data)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get data FetctDetailByGarage
export const FetctDetailByGarage = (data) => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/repairdetail/getbygarage", {
      params: data,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get data FetctDetailByGarageID
export const FetctDetailByGarageID = (data) => {
  return (
    axios
      // .get(process.env.REACT_APP_SECRET_API + "/repairdetail/getbygarage", data)
      .get(process.env.REACT_APP_SECRET_API + "/repairdetail/getbydetailID", {
        params: data,
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      })
  );
};

// get data FetctDetailByMember
export const FetchDetailByMember = (data) => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/repairdetail/getbymember", {
      params: data,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// send data to Insert Spare to Details
export const InsertSpare = (data) => {
  return axios
    .post(process.env.REACT_APP_SECRET_API + "/repairdetail/insert-spare", data)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get data FetctDetailAll Spare
export const FetchAllSpare = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/repairdetail/getallspare")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get data FetctSpairByDetailID
export const FetchSpareByDetailID = (data) => {
  return axios

    .get(process.env.REACT_APP_SECRET_API + "/repairdetail/getspare-detailid", {
      params: data,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// Delete Spare
export const DeleteSpare = (data) => {
  return axios
    .delete(process.env.REACT_APP_SECRET_API + "/repairdetail/delete-spare", {
      data: { id: data },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// Update Spare
export const UpdateDetail = (data) => {
  console.log(data);
  return axios
    .put(process.env.REACT_APP_SECRET_API + "/repairdetail/update-detail", data)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

export const ApproveGarage = (data) => {
  console.log(data);
  return axios
    .put(process.env.REACT_APP_SECRET_API + "/garage/approve", data)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// Insert Member
export const InsertMember = (data) => {
  // console.log('service', data)
  return axios
    .post(process.env.REACT_APP_SECRET_API + "/member/insert", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// get data FetctMemberByGaragename
export const FetctMemberByGarage = (data) => {
  // console.log(data)
  return axios

    .get(process.env.REACT_APP_SECRET_API + "/member/getmember/member-regis", {
      params: data,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// Insert Report
export const InsertReport = (data) => {
  return axios
    .post(process.env.REACT_APP_SECRET_API + "/report/insert", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// get  All Member
export const FetchMemberAll = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/member/all")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// get  All Report
export const FetchReportAll = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/report/all")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

// Get Detail
export const FetchDetailAll = () => {
  return axios
    .get(process.env.REACT_APP_SECRET_API + "/repairdetail/all")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};



// // logout
// export const sendLogout = () => {
//   return localStorage.removeItem("user");
// };
