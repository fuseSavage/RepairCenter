module.exports = {
  insert_garage: `INSERT INTO garage 
    (
        garageID,
        party,
        password,
        user_name,
        garage_name,
        email,
        garage_type,
        address_number,
        moo,
        alley,
        road,
        sub_district,
        district,
        province,
        pos_code,
        address_map,
        registration_date,
        on_time,
        off_time,
        tel,
        confirmation
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

  insert_member: `INSERT INTO member 
    (
        party,
        userIdLine,
        imageUrl,
        userName,
        member_tel,
        member_name,
        registration_date
    ) VALUES (?)`,

  insert_detail: `INSERT INTO repairdetails 
    (
        garageID,
        member_tel, 
        device_type,
        car_number,
        car_province,
        brand,
        model,
        kilo_number,
        repair_details,
        repair_date,
        spare_parts_list,
        status,
        price,
        status_payment,
        equipment
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

  insert_reported: `INSERT INTO reported
  (
    party,
    user_report,
    name,
    report_detail,
    report_tel,
    report_date
  ) VALUES (?)`,

  insert_spare: `INSERT INTO spare
  (
    detailsID,
    spares,
    member_tel

  ) VALUES (?, ?, ?)`,
};
