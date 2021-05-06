const { json } = require('body-parser');
const express = require('express');
const app = express();

const pool=require('../NodeJS/db');
//let {pool: pool} = require('./db');
app.use(express.json());

//adding data to table
app.post("/add", async(req,res) => {
try{
    const {emp_name,emp_email,emp_grade,emp_dept,emp_contact} = req.body;
    const empdata= await pool.query(
        "INSERT INTO emp_info(emp_name,emp_email,emp_grade,emp_dept,emp_contact) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [emp_name,emp_email,emp_grade,emp_dept,emp_contact]);
    res.json(empdata.rows[0]);
} catch(err) {
   console.log(err.message)
}
})

//to get all data
app.get("/getAll", async(req,res) => {
try{
    const getAllEmp=await pool.query("SELECT * FROM emp_info");
    res.json(getAllEmp.rows);
}catch(err){
    console.log(err.message)
}
})

//get data by employee ID
app.get("/getById/:id", async(req,res) => {
    
    try{
        const {id}=req.params;
        const getEmpById=await pool.query("SELECT * FROM emp_info WHERE emp_id = $1",[id]);
        res.json(getEmpById.rows[0]);
    }catch(err){
        console.log(err.message)
    }
    })

//update employee data

app.put("/update/:id",async(req,res) => {
   
    try{
        const {id}=req.params;
        const {emp_name,emp_email,emp_grade,emp_dept,emp_contact} = req.body;
        const updateEmp = await pool.query(
            "UPDATE emp_info SET emp_name=$1,emp_email=$2,emp_grade=$3,emp_dept=$4,emp_contact=$5 WHERE emp_id=$6" 
            ,[emp_name,emp_email,emp_grade,emp_dept,emp_contact,id]);
        res.json("employee is updated");
    }catch(err){
        console.log(err.message)
    }
    })

//delete a employee

app.delete("/delete/:id", async(req,res) => {
    
    try{
        const {id}=req.params;
        const deleteEmp=await pool.query("DELETE FROM emp_info WHERE emp_id = $1",[id]);
        res.json("employee successfully deleted");
    }catch(err){
        console.log(err.message)
    }
    })

app.listen(5000, () => console.log('Server started at port : 5000'));

