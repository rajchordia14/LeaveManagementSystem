const express = require('express');
const crypto = require("crypto");
const app = express();
const {Pool, Client} = require("pg");
const { application } = require('express');
const { count } = require('console');
var nodemailer = require('nodemailer');
const { captureRejections } = require('events');
const { parse } = require('path');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lms.lnmiit@gmail.com',
      pass: '#Work4guru'
    }
  });
const PORT = process.env.PORT || 4000;
// const algorithm = "aes-256-cbc"; 
// const initVector = crypto.randomBytes(16);
// const Securitykey = crypto.randomBytes(32);

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Leave_Manage",
    password: "12345678",
    port: "5432"
});
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));

app.post('/users/staff',(req,res)=>{

let errorsout=[];
let {type,s_date,e_date,numdays,remark,fid,user,role,dept} = req.body;
console.log({type,s_date,e_date,numdays,remark,fid,user,role,dept});

var holiday = `SELECT * FROM holidays`;
pool.query(holiday,(errholiday,resholiday)=>{
    if(errholiday)
    throw errholiday;
    let r = [];
    for(let i=0;i<resholiday.rows.length;i++)
    {
        r.push(resholiday.rows[i]);
    }   
});

var chkdate = new Date();
chkdate.setDate(chkdate.getDate()+7);
var strdate = new Date(s_date);

console.log({chkdate,strdate});
var a;
var col_name;
var x  = parseInt(type);

if(x==0) {
    a = 'Casual Leave';
    col_name = 'cl';
}
else if(type=="1") {
    a = 'Privilege Leave';
    col_name = 'pl';
}
else if(type=="2") {
    a = 'On Duty Leave';
    col_name = 'dl';
}
else {
    a = 'Special Leave';
    col_name = 'sl';
}
sql = `Select * from leaves where fid = '${fid}'`;
var flag;
var datef=0;
console.log({numdays});

pool.query(sql,(err3,res3)=>{
    
    if(err3)
        throw err3;
    if(col_name=='cl' && parseInt(res3.rows[0].cl,10)<=0 )
    {
        errorsout.push("No Casual Leave left");
    }
    if(col_name=='cl' && parseInt(res3.rows[0].cl,10)<parseInt(numdays,10))
    {
        errorsout.push("Not Enough Casual Leaves");
    }
    if(col_name=='pl'&& parseInt(res3.rows[0].pl,10)<parseInt(numdays,10))
    {
        errorsout.push("Not Enough Privilege Leaves");
    }
    if(col_name=='pl' && parseInt(res3.rows[0].pl,10)<=0)
    {
        errorsout.push("No Privilege Leave Left");
    }

    if(numdays==='Invalid Dates' || parseInt(numdays,10)==0)
    {
        errorsout.push('Please select Valid Dates');
    }

    if(strdate.getTime()<chkdate.getTime() && col_name=='pl')
    {
        errorsout.push('Please Select a date from 7 days after ');
    }

    console.log(errorsout.length);

    if(errorsout.length>0){
        let r=[];
        res.render("staff",{fid:fid,user:fid,holiday_dates:r,data:res3.rows[0],role:role,dept,errors:errorsout});
    }
    else
    {
    var query = `INSERT INTO record (fid,"type","user",s_date,e_date,reason,status,numdays,auth,role,dept) VALUES ('${fid}','${a}','${user}','${s_date}','${e_date}','${remark}','P',${numdays},'H','${role}','${dept}')`;
    pool.query(
        query,(err1,result1)=>{
            if(err1)
            throw err1;
            console.log(result1.rows);

            var mailOptions = {

                from: 'lms.lnmiit@gmail.com',
                to: '19ucs227@lnmiit.ac.in',
                subject: 'Leave Approval',
                html: `
  <head>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  </style>
  </head>
  <body>
  <p>
  Hello,<br>A new leave request has arrieved at the LMS portal waiting for your approval.
  </p>
  <table>
  <tr>
    <th>User Name</th>
    <th>Leave Type</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Number of working days</th>
    <th>Remark</th>

  </tr>
  <tr>
    <td>${user}</td>
    <td>${a}</td
    <td>${s_date}</td>
    <td>${e_date}</td>
    <td>${numdays}</td>
    <td>${remark}</td>
  </tr>
  </table>
  <p>
  Please visit the portal for further action.<br>Thank You
  </p>
  </body>
  `
            };

            transporter.sendMail(mailOptions, function(errormail, info){
                if (errormail) {
                  console.log(errormail);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            var query2 = `Select * from leaves WHERE (fid='${fid}')`
            pool.query(
                query2,(err,result2)=>{
                    if(err)
                    throw err;
                    
                    console.log(result2.rows);
                    var holiday = `SELECT * FROM holidays`;
                    pool.query(holiday,(errholiday,resholiday)=>{
                        if(errholiday)
                            throw errholiday; 
                        let r = [];
                        for(let i=0;i<resholiday.rows.length;i++)
                        {
                            r.push(resholiday.rows[i]);
                        }
                        res.render("staff",{user:user,holiday_dates:r,data:result2.rows[0],fid:fid,role:role,dept:dept,errors:errorsout}); 
                });
                    
            });
        });

    }

    });
});
app.post("/users/previous_app",(req,res)=>{
    
    let {type,s_date,e_date,numdays,remark,fid,user} = req.body;
    console.log({type,s_date,e_date,numdays,remark,fid});   
    
    var query = `SELECT * from record WHERE (fid = '${fid}')`;
    
    pool.query(
        query,(err,result)=>{
            
            if(err)
            throw err;
            
            let r = [];
            for(let i=0;i<result.rows.length;i++)
            {

                r.push(result.rows[i]);
            }
            
            res.render("previous_app",{data:r,user:user});
        });
});

app.post("/users/hos",(req,res)=>{
                
    let {fid,user,b1,b2,rembyHOS,s_date,e_date,type,status,dept,depth,roleh,fidh,userh} = req.body;
    console.log({fid,user,b1,b2,rembyHOS,s_date,e_date,type,status});

    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
    console.log({sdate,edate});
    var query;
    if(b1=='1')
    {
        query = `UPDATE record SET status = 'P', auth='R', "rembyDOFA" = '${rembyHOS}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
    }
    else
    {
        query = `UPDATE record SET status = 'D', auth='O', "rembyDOFA" = '${rembyHOS}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
    }

    pool.query(
    query,(err,result)=>{
        
        if(err)
        throw err;
        
        var query2 = `SELECT * from record WHERE status= 'P' AND auth='O'`; 
        
        pool.query(
            query2,(err2,result2)=>{
                
                if(err2)
                throw err;
                
                
                let r = [];
                for(let i=0;i<result2.rows.length;i++)
                {
                    r.push(result2.rows[i]);
                }
                
                res.render("hos",{user:user,data:r,userh:userh,fidh:fidh,depth:depth,roleh:roleh});
            }
            );            
        });
 });
app.post("/users/non_faculty",(req,res)=>{
    
    let {type,s_date,e_date,numdays,remark,fid,user,role,dept} = req.body;
    console.log({type,s_date,e_date,numdays,remark,fid,user,role,dept});
    
    var a;
    var col_name;
    console.log(type);
    var x  = parseInt(type);
    console.log(x);
    
    if(type=="0") {
        a = 'Casual Leave';
        col_name = 'cl';
    }
    else if(type=="1") {
        a = 'Privilege Leave';
        col_name = 'pl';
    }
    else if(type=="2") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else {
        a = 'Special Leave';
        col_name = 'sl';
    }
    
    console.log({col_name});
    var query = `INSERT INTO record (fid,"type","user",s_date,e_date,reason,status,numdays,auth,role,dept) VALUES ('${fid}','${a}','${user}','${s_date}','${e_date}','${remark}','P',${numdays},'O','${role}','${dept}')`;
    pool.query(
        
        query,(err1,result1)=>{
            if(err1)
            throw err1;
            var query2 = `Select * from leaves WHERE (fid='${fid}')`
            pool.query(
                query2,(err,result2)=>{
                    if(err)
                    throw err;
                    console.log(result2.rows);
                    
                    res.render("non_faculty",{fid:fid,user:user,data:result2.rows[0],role:role,dept});
                }
                )
                
            });
            
});
 app.post("/users/resgistrar",(req,res)=>{
            
            let {fid,user,b1,b2,rembydir,s_date,e_date,type,status,dept} = req.body;
            console.log({fid,user,b1,b2,rembydir,s_date,e_date,type,status,dept});
            const ss_date = new Date(s_date);
            const ee_date = new Date(e_date)
            const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
            const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
            console.log(typeof(sdate));
            console.log({sdate,edate});
            var query;
            if(b1=='1')
            {
                query = `UPDATE record SET status = 'A', auth='R', "rembydir" = '${rembydir}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
            }
            else
            {
                query = `UPDATE record SET status = 'D', auth='R', "rembydir" = '${rembydir}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
            }
            
            pool.query(
                query,(err,result)=>{
                    
                    if(err)
                    throw err;
                    var query2 = `SELECT * from record WHERE status= 'P' AND auth='R'`; 
                    pool.query(
                        query2,(err2,result2)=>{
                            
                            if(err2)
                            throw err;
                            
                            
                            let r = [];
                            for(let i=0;i<result2.rows.length;i++)
                            {
                                r.push(result2.rows[i]);
                            }
                            
                            res.render("resgistrar",{user:user,data:r});
                        }
                        );
                        
                        
                    }
                    );
});

app.get("/users/login",(req,res)=>{
    let errors=[];
    res.render("login",{errors:errors});
});
app.get("/users/views/logout",(req,res)=>{
    let errors=[];
    res.render("login",{errors:errors});
});

app.get("/users/h_previous_app",(req,res)=>{
        let {fid,user,role,dept,name} = req.query;
        console.log({fid,user,role,dept});
        res.render("h_previous_app",{user:user,fid:fid,role:role,dept:dept});
});
app.post("/users/h_previous_app",(req,res)=>{
                    let {type,s_date,e_date,numdays,remark,fid,user,role,dept} = req.body;
                    console.log({type,s_date,e_date,numdays,remark,fid,user,role,dept});
                    
                    var a;
                    var col_name;
                    console.log(type);
                    var x  = parseInt(type);
                    console.log(x);
                    
                    if(type=="0") {
                        a = 'Casual Leave';
                        col_name = 'cl';
                    }
                    else if(type=="1") {
                        a = 'Privilege Leave';
                        col_name = 'pl';
                    }
                    else if(type=="2") {
                        a = 'On Duty Leave';
                        col_name = 'dl';
                    }
                    else {
                        a = 'Special Leave';
                        col_name = 'sl';
                    }
                    var auth;  
                    if(role=='H')
                    auth = 'D';
                    else if(role=='D')
                    auth = 'X';
                    else if(role=='N')
                    auth = 'O';
                    else if(role=='O')
                    auth = 'R';
                    console.log({col_name});
                    var query = `INSERT INTO record (fid,"type","user",s_date,e_date,reason,status,numdays,auth,role,dept) VALUES ('${fid}','${a}','${user}','${s_date}','${e_date}','${remark}','P',${numdays},'${auth}','${role}','${dept}')`;
                    pool.query(
                        query,(err1,result1)=>{
                            if(err1)
                            throw err1;
                            var query2 = `Select * from leaves WHERE (fid='${fid}')`
                            pool.query(
                                query2,(err,result2)=>{
                                    if(err)
                                    throw err;
                                    console.log(result2.rows);
                                    
                                    res.render("h_previous_app",{fid:fid,user:fid,data:result2.rows[0],role:role,dept});
                                }
                                )
                                
                            });
                            
                            
 });
                                            
app.post("/users/logout",(req,res)=>{
    // req.logout();
    res.clearCookie('users');
    //let errors=[];
    //res.render("login",{errors:errors});
});
                                            
app.post("/users/dofa",(req,res)=>{
    
    let {fid,user,b1,b2,rembyDOFA,s_date,e_date,type,status,dept,numdays,depth,roleh,fidh,userh} = req.body;
    console.log({fid,user,b1,b2,rembyDOFA,s_date,e_date,type,status});
    
    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
    //  console.log(typeof(sdate))
    console.log({sdate,edate});
    var query;
    var a;
    var col_name;
    var x  = parseInt(type);
    if(type=="Casual Leave") {
        a = 'Casual Leave';
        col_name = 'cl';
    }
    else if(type=="Privilege Leave") {
        a = 'Privilege Leave';
        col_name = 'pl';
    }
    else if(type=="On Duty Leave") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else if(type=="Special Leave") {
        a = 'Special Leave';
        col_name = 'sl';
    }
    
    if(numdays>7 && numdays<=30)
    { 
        if(b1=='1')
        {
            query = `UPDATE record SET status = 'A', auth='D', "rembyDOFA" = '${rembyDOFA}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
            if(col_name == 'sl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}+${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
            else if(col_name == 'dl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}+${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
            else if(col_name == 'cl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
            else if(col_name == 'pl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
        }
        else
        {
            query = `UPDATE record SET status = 'D', auth='D', "rembyDOFA" = '${rembyDOFA}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
        }
    }
    else
    { 
        if(b1=='1')
        {
            query = `UPDATE record SET status = 'P', auth='X', "rembyDOFA" = '${rembyDOFA}', "recbyDOFA" = false where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
        }
        else
        {
            query = `UPDATE record SET status = 'P', auth='X', "rembyDOFA" = '${rembyDOFA}' , "recbyDOFA" = true where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
        }
    }
    
    pool.query(
        query,(err,result)=>{
            
            if(err)
            throw err;
            
            var query2 = `SELECT * from record WHERE status= 'P' AND auth='D'`; 
            
            pool.query(
                query2,(err2,result2)=>{
                    
                    if(err2)
                    throw err;
                    
                    
                    let r = [];
                    for(let i=0;i<result2.rows.length;i++)
                    {
                        r.push(result2.rows[i]);
                    }
                    
                    res.render("dofa",{userh:userh,data:r, fidh:fidh,depth:depth,roleh:roleh});
                }
                );            
            });
        });
        
app.post("/users/hod",(req,res)=>{
    let {fid,user,b1,b2,rembyHOD,s_date,e_date,type,status,dept,numdays,fidh,depth,roleh,userh} = req.body;
    console.log({fid,user,b1,b2,rembyHOD,s_date,e_date,type,status ,numdays,fidh,depth,roleh,userh});

    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
    var query;

    var a;
    var col_name;
    var x  = parseInt(type);

    if(type=="Casual Leave") {
        a = 'Casual Leave';
        col_name = 'cl';
    }
    else if(type=="Privilege Leave") {
        a = 'Privilege Leave';
        col_name = 'pl';
    }
    else if(type=="On Duty Leave") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else if(type=="Special Leave") {
        a = 'Special Leave';
        col_name = 'sl';
    }
    if(numdays<=7)
    {
        if(b1=='1')
        {
            query = `UPDATE record SET status = 'A', auth='H', "rembyHOD" = '${rembyHOD}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
            if(col_name == 'sl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}+${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
            else if(col_name == 'dl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}+${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
            else if(col_name == 'cl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }
            else if(col_name == 'pl'){
                q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
                    pool.query(q1,(e,r)=>{
                    if(e)
                    throw e;
                });
            }


        }
        else
        {
            query = `UPDATE record SET status = 'D', auth='H', "rembyHOD" = '${rembyHOD}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
        }
    }
    else
    {
        if(b1=='1')
        {
            query = `UPDATE record SET status = 'P', auth='D', "rembyHOD" = '${rembyHOD}',"recbyHOD" = false where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}'`;
        }
        else
        {
            query = `UPDATE record SET status = 'P', auth='D', "rembyHOD" = '${rembyHOD}',"recbyHOD" = true where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}'`;
        }
    }
    pool.query(
        query,(err,result)=>{
            
            if(err)
            throw err;
            
            var query2 = `SELECT * from record WHERE status= 'P' AND auth='H' AND dept='${dept}'`; 
            
            pool.query(
                query2,(err2,result2)=>{
                    
                    if(err2)
                    throw err;
                    
                    
                    let r = [];
                    for(let i=0;i<result2.rows.length;i++)
                    {
                        r.push(result2.rows[i]);
                    }
                    
                    res.render("hod",{userh:userh,data:r,fid:fid,fidh:fidh,depth:depth,roleh:roleh});
                }
                );
                
                
            }
            );
        });
    
app.post("/users/director",(req,res)=>{
    
    let {fid,user,userh,b1,b2,rembydir,s_date,e_date,type,status,dept,numdays} = req.body;
    console.log({fid,user,b1,b2,rembydir,s_date,e_date,type,status,dept,numdays});
    
    var a;
    var col_name;
    console.log(type);
    var x  = parseInt(type);
    console.log(x);
    
    if(type=="Casual Leave") {
        a = 'Casual Leave';
        col_name = 'cl';
    }
    else if(type=="Privilege Leave") {
        a = 'Privilege Leave';
        col_name = 'pl';
    }
    else if(type=="On Duty Leave") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else if(type=="Special Leave") {
        a = 'Special Leave';
        col_name = 'sl';
    }
    
    console.log({col_name});
    
    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
    console.log(typeof(sdate));
    console.log({sdate,edate});
    var query;
    
    if(b1=='1')
    {
        query = `UPDATE record SET status = 'A', auth='X', "rembyHOD" = '${rembydir}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
        if(col_name == 'sl'){
            q1 = `UPDATE leaves SET ${col_name}=${col_name}+${numdays} WHERE  fid='${fid}'`;
                pool.query(q1,(e,r)=>{
                if(e)
                throw e;
            });
        }
        else if(col_name == 'dl'){
            q1 = `UPDATE leaves SET ${col_name}=${col_name}+${numdays} WHERE  fid='${fid}'`;
                pool.query(q1,(e,r)=>{
                if(e)
                throw e;
            });
        }
        else if(col_name == 'cl'){
            q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
                pool.query(q1,(e,r)=>{
                if(e)
                throw e;
            });
        }
        else if(col_name == 'pl'){
            q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
                pool.query(q1,(e,r)=>{
                if(e)
                throw e;
            });
        }
    }
    else
    {
        query = `UPDATE record SET status = 'D', auth='X', "rembyHOD" = '${rembydir}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
    }
    
    pool.query(
        query,(err,result)=>{
            
            if(err)
            throw err;
            var query2 = `SELECT * from record WHERE status= 'P' AND auth='X'`; 
            pool.query(
                query2,(err2,result2)=>{
                    
                    if(err2)
                    throw err;
                    
                    
                    let r = [];
                    for(let i=0;i<result2.rows.length;i++)
                    {
                        r.push(result2.rows[i]);
                    }
                    
                    res.render("director",{userh:userh,data:r});
                }
                );
                
                
            }
            );
            
            
});
app.post("/users/login",(req,res)=>{
    
    let errors = [];
    let {username,password} = req.body;
    console.log({username,password});
    
    var query = `SELECT * From login WHERE (staff_id = '${username}' AND password='${password}')`;
    pool.query(query,(err,result)=>{
        
        if(err)
        throw err;
        
        if(result.rows.length>0)
        {
            const type = result.rows[0].role;
            const name = result.rows[0].name;
            const fid = result.rows[0].staff_id;
            const role = result.rows[0].role;
            const dept = result.rows[0].dept;
            
            //console.log({type,name,role,dept});
            
            if(type=='F')
            {
                var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                pool.query(query2,(errr,result2)=>{
                    if(errr)
                    throw errr;
                    
                    var holiday = `SELECT * FROM holidays`;
                    pool.query(holiday,(errholiday,resholiday)=>{
                        if(errholiday)
                        throw errholiday;
                        let r = [];
                        for(let i=0;i<resholiday.rows.length;i++)
                        {
                            r.push(resholiday.rows[i]);
                        }
                        res.render("staff",{user:name,holiday_dates:r,data:result2.rows[0],fid:fid,role:role,dept:dept,errors:errors});  
                    });
                });
                
            }
            else if(type=='N')
            {
                var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                pool.query(query2,(errr,result2)=>{
                    if(errr)
                    throw errr;
                    
                    console.log(typeof(result2.rows[0]));
                    res.render("non_faculty",{user:name,data:result2.rows[0],fid:fid,role:role,dept:dept,errors:errors});    
                });
                
                //res.render("non_faculty",{user:name,fid:fid});
            }
            else if(type=='O')
            {
                var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                
                pool.query(query2,(errr,result2)=>{
                    
                    if(errr)
                    throw errr;
                    
                    var query = `SELECT * from record WHERE status= 'P' AND auth= 'O'`;
                    
                    pool.query(
                        query,(err,result)=>{
                            
                            if(err)
                            throw err;
                            
                            let r = [];
                            for(let i=0;i<result.rows.length;i++)
                            {
                                r.push(result.rows[i]);
                            }
                            
                            res.render("hos",{user:name,data:r,fid:fid,role:role,dept:dept});
                        }
                        );
                        
                    });
                }
                else if(type == 'H')
                {
                    
                    var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                    
                    pool.query(query2,(err,result2)=>{
                        
                        if(err)
                        throw err;
                        
                        var query = `SELECT * from record WHERE status= 'P' AND auth= 'H' AND dept = '${dept}'`;
                        
                        pool.query(
                            query,(err,result)=>{
                                
                                if(err)
                                throw err;
                                
                                let r = [];
                                for(let i=0;i<result.rows.length;i++)
                                {
                                    r.push(result.rows[i]);
                                }
                                
                                res.render("hod",{userh:name,data:r,fidh:fid,roleh:role,depth:dept});
                            }
                            );
                            
                        });
                    }
                    else if(type=='D')
                    {
                        var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                        
                        pool.query(query2,(err,result2)=>{
                            
                            if(err)
                            throw err;
                            
                            var query = `SELECT * from record WHERE status= 'P' AND auth= 'D'`;
                            
                            pool.query(
                                query,(err,result)=>{
                                    
                                    if(err)
                                    throw err;
                                    
                                    let r = [];
                                    for(let i=0;i<result.rows.length;i++)
                                    {
                                        r.push(result.rows[i]);
                                    }
                                    
                                    res.render("dofa",{userh:name,data:r,fidh:fid,roleh:role,depth:dept});
                                }
                                );
                                
                            });
                        }
                        else if(type=='R')
                        {
                            var query = `SELECT * from record WHERE status= 'P' AND auth = 'R'`;
                            
                            pool.query(
                                query,(err,result)=>{
                                    
                                    if(err)
                                    throw err;
                                    
                                    let r = [];
                                    for(let i=0;i<result.rows.length;i++)
                                    {
                                        r.push(result.rows[i]);
                                    }
                                    
                                    res.render("resgistrar",{userh:name,data:r});
                                }
                                );
                                
                                // res.render("resgistrar",{user:name,fid:fid});
                            }
                            else if(type == 'X')
                            {
                                
                                
                                var query = `SELECT * from record WHERE status= 'P' AND auth = 'X'`;
                                
                                pool.query(
                                    query,(err,result)=>{
                                        
                                        if(err)
                                        throw err;
                                        
                                        let r = [];
                                        for(let i=0;i<result.rows.length;i++)
                                        {
                                            r.push(result.rows[i]);
                                        }
                                        
                                        res.render("director",{userh:name,data:r});
                                    }
                                    );
                                }
                                else
                                {
                                    errors.push("Something is Wrong");
                                    res.render("login",{errors:errors});
                                }
                            }
                            else
                            {
                                errors.push("Username/Password is Invalid");
                                res.render("login",{errors:errors})
                            }
                        });
});                                                                              
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
