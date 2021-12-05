const express = require('express');
const crypto = require("crypto");
const app = express();
const {Pool, Client} = require("pg");
const { application } = require('express');
const { count } = require('console');
const PORT = process.env.PORT || 4000;

const algorithm = "aes-256-cbc"; 
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);

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

    let errors=[];

    let {type,s_date,e_date,numdays,remark,fid,user,role,dept} = req.body;
    console.log({type,s_date,e_date,numdays,remark,fid,user,role,dept});

    if(fid.notvalid())
    {
        errors.push("LOGIN WITH VALID ID")
    }

    
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
        a = 'Previledge Leave';
        col_name = 'pl';
    }
    else if(type=="2") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else {
        a = 'Speacial Leave';
        col_name = 'sl';
    }


    sql = `Select * from leaves where fid = '${fid}'`;
    pool.query(sql,(err3,res3)=>{
        if(err3)
            throw err3;

        console.log(col_name,res3.rows[0].cl);

        errors.push("raj");

        if(col_name=='sl' )
        {
            errors.push("No SL left");
        }
        if(col_name=='cl')
        {
            errors.push("No CL left");
        }
        if(col_name=='pl')
        {
            errors.push("No PL left");
        }
        if(col_name=='dl')
        {
            errors.push("No DL left");
        }

        if(numdays='Invalid Dates')
        {
          errors.push("Please select Valid Dates");
        }
    });

    // if(numdays='Invalid Dates')
    // {
    //     errors.push("Please select Valid Dates");
    // }

    errors.forEach(element => {
        console.log(element);
    });

    console.log({col_name});


    var query = `INSERT INTO record (fid,"type","user",s_date,e_date,reason,status,numdays,auth,role,dept) VALUES ('${fid}','${a}','${user}','${s_date}','${e_date}','${remark}','P',${numdays},'H','${role}','${dept}')`;
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
            
                        res.render("staff",{fid:fid,user:fid,data:result2.rows[0],role:role,dept});
                    }
                )
            
            });

});

// post and get
// get -> bhejna
// post -> lena

    
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
        }
    );
});





app.post("/users/hos",(req,res)=>{
    
    let {fid,user,b1,b2,rembyHOS,s_date,e_date,type,status,dept,depth,roleh,fidh,userh} = req.body;
    console.log({fid,user,b1,b2,rembyHOS,s_date,e_date,type,status});

    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
  //  console.log(typeof(sdate));

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
        }
    );


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
        a = 'Previledge Leave';
        col_name = 'pl';
    }
    else if(type=="2") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else {
        a = 'Speacial Leave';
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


app.get("/users/h_previous_app",(req,res)=>{

    let {fid,user,role,dept,name} = req.query;
    console.log({fid,user,role,dept});
    res.render("h_previous_app",{user:user,fid:fid,role:role,dept:dept});
});

app.post("/users/h_previous_app",(req,res)=>{

    console.log("raj");
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
        a = 'Previledge Leave';
        col_name = 'pl';
    }
    else if(type=="2") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else {
        a = 'Speacial Leave';
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

app.post("/users/dofa",(req,res)=>{

    let {fid,user,b1,b2,rembyDOFA,s_date,e_date,type,status,dept,depth,roleh,fidh,userh} = req.body;
    console.log({fid,user,b1,b2,rembyDOFA,s_date,e_date,type,status});

    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
  //  console.log(typeof(sdate));

    console.log({sdate,edate});
    var query;
    if(b1=='1')
    {
        query = `UPDATE record SET status = 'P', auth='X', "rembyDOFA" = '${rembyDOFA}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
    }
    else
    {
        query = `UPDATE record SET status = 'D', auth='D', "rembyDOFA" = '${rembyDOFA}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
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
        }
    );


   // res.render("dofa");
});

app.post("/users/hod",(req,res)=>{

    let {fid,user,b1,b2,rembyHOD,s_date,e_date,type,status,dept,     fidh,depth,roleh,userh} = req.body;
    console.log({fid,user,b1,b2,rembyHOD,s_date,e_date,type,status ,           fidh,depth,roleh,userh});
   

    const ss_date = new Date(s_date);
    const ee_date = new Date(e_date)
    const sdate = ss_date.getFullYear() + '-' + (ss_date.getMonth()+1) + '-' + ss_date.getDate();
    const edate = ee_date.getFullYear() + '-' + (ee_date.getMonth()+1) + '-' + ee_date.getDate();
    console.log(typeof(sdate));
    console.log({sdate,edate});
    var query;

    if(b1=='1')
    {
        query = `UPDATE record SET status = 'P', auth='D', "rembyHOD" = '${rembyHOD}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
    }
    else
    {
        query = `UPDATE record SET status = 'D', auth='H', "rembyHOD" = '${rembyHOD}' where fid='${fid}' AND s_date = '${sdate}' AND e_date = '${edate}' AND type = '${type}' AND status ='${status}' `;
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
                        
                        res.render("hod",{userh:userh,data:r,fid:fid,     fidh:fidh,depth:depth,roleh:roleh});
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

    if(type=="0") {
        a = 'Casual Leave';
        col_name = 'cl';
    }
    else if(type=="1") {
        a = 'Previledge Leave';
        col_name = 'pl';
    }
    else if(type=="2") {
        a = 'On Duty Leave';
        col_name = 'dl';
    }
    else {
        a = 'Speacial Leave';
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
        q1 = `UPDATE leaves SET ${col_name}=${col_name}-${numdays} WHERE  fid='${fid}'`;
        pool.query(q1,(e,r)=>{
            if(e)
                throw e;
        });
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

    var errors = [];
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

            console.log({type,name,role,dept});

            if(type=='F')
            {
                
                var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                pool.query(query2,(err,result2)=>{
                    console.log(typeof(result2.rows[0]));
                    res.render("staff",{user:name,data:result2.rows[0],fid:fid,role:role,dept:dept});    
                });
                
            }
            else if(type=='N')
            {
                var query2=`SELECT * FROM leaves WHERE(fid='${username}')`
                pool.query(query2,(err,result2)=>{

                    console.log(typeof(result2.rows[0]));
                    res.render("non_faculty",{user:name,data:result2.rows[0],fid:fid,role:role,dept:dept});    
                });

                //res.render("non_faculty",{user:name,fid:fid});
            }
            else if(type=='O')
            {
                var query2=`SELECT * FROM leaves WHERE(fid='${username}')`

                pool.query(query2,(err,result2)=>{

                    if(err)
                        throw err;
                    
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

                //res.render("hos",{user:name,fid:fid});
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

             //   res.render("dofa",{user:name,fid:fid});
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
