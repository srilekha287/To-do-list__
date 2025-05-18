const express=require('express')
const cors=require('cors')
const mysql=require('mysql2')

const app=express();
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    db.query(`select * from todoitems`,(err,result)=>{
        if(err){
            console.log('error occured in fetching');
            return;
        }
        console.log(result);
        res.send(result);
    })
    // res.send('successfully added');
})
app.post('/add-item',(req,res)=>{
    console.log(req.body);
   
    db.query(`insert into todoitems(itemDescription) values('${req.body.input}')`,(err,result)=>{
        if(err){
            console.log('error occured');
            return;
        }
        console.log('inserted successfully');
    })
    res.send('Added successfully')
})
app.delete('/delete-item',(req,res)=>{
    db.query(`delete from todoitems where id='${req.body.ID}'`,(err,result)=>{
        if(err){
            console.log('error occured');
            return;
        }
        console.log('deleted successfully');
    })
})
app.put('/edit-item',(req,res)=>{
    console.log(req.body);
    db.query(`update todoitems set itemDescription='${req.body.itemDescription}' where id='${req.body.ID}'`,(err,result)=>{
        if(err){
            console.log('error occured');
            return;
        }
        res.send('updated successfully')
    })
   
})

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'abcd@1234',
    database:'todo'
})

db.connect((err)=>{
    if(err){
        console.log("Error occured");
        return;
    }
    console.log("connected to db successfully")
})
app.listen(4000,()=>{
    console.log('server is running on port 4000')
})
