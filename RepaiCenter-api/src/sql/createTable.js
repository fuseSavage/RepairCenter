module.exports = {
  garage: `CREATE TABLE garage(
      garageID varchar(255),
        party varchar(100),
        password varchar(100),
        user_name varchar(255),
        garage_name varchar(255),
        email varchar(255),
        garage_type varchar(255),
        address_number varchar(10),
        moo varchar(10),
        alley varchar(100),
        road varchar(100),
        sub_district varchar(100),
        district varchar(100),
        province varchar(100),
        pos_code varchar(100),
        address_map varchar(255),
        registration_date varchar(100),
        on_time varchar(100),
        off_time varchar(100),
        tel varchar(30),
        confirmation varchar(100),
    
        PRIMARY KEY (garageID)
  )`,

  member: `CREATE TABLE member(
      member_tel varchar(100),
        party varchar(100),
        member_name varchar(255),
        userIdLine varchar(100),
        imageUrl varchar(255),
        userName varchar(100),
        registration_date varchar(100),

        PRIMARY KEY (member_tel)
  )`,

  repairDetails: `CREATE TABLE repairdetails(
        detailsID int NOT NULL AUTO_INCREMENT,
        garageID varchar(255),
        member_tel varchar(100), 
        device_type varchar(255),
        car_number varchar(10),
        car_province varchar(255),
        brand varchar(100),
        model varchar(100),
        kilo_number varchar(10),
        repair_details varchar(255),
        repair_date varchar(100),
        spare_parts_list varchar(255),
        status varchar(100),
        price int(10),
        status_payment varchar(100),
        equipment varchar(100),

        PRIMARY KEY (detailsID),
        FOREIGN KEY (member_tel) REFERENCES member(member_tel),
        FOREIGN KEY (garageID) REFERENCES garage(garageID)
  )`,

  reported: `CREATE TABLE reported(
        reportID int NOT NULL AUTO_INCREMENT,
        party varchar(100),
        user_report varchar(255),
        name varchar(255),
        report_detail varchar(255),
        report_tel varchar(50),
        report_date varchar(100),

        PRIMARY KEY (reportID)
  )`,

  spare: `CREATE TABLE spare(
      spareID int(10) NOT NULL AUTO_INCREMENT,
      detailsID int(10),
      spare varchar(255),
      member_tel varchar(100), 
      
      PRIMARY KEY (spareID),
      FOREIGN KEY (member_tel) REFERENCES member(member_tel),
      FOREIGN KEY (detailsID) REFERENCES repairdetails(detailsID)
)`,
};
