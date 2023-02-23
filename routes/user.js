const router=require('express').Router()
const templates=require('../models/template')
const users=require('../models/user')
const varifyuser=require('../middlewers/middlewere.js')


//new student attendence
router.post('/newattendence',varifyuser,async (req,res)=>{

    try{  
        const ad = await users.findOne({"_id":req.id});
            const mk=await templates.findOne({"roll":ad.roll})
              if(mk){res.status(200).json({"success":false,"message":"student already marked attendence"})}
              else{

                const mes= new templates({
                    student: ad.username,
                    roll:ad.roll,
                });
                const m=await mes.save()
                res.status(200).json({"success":true,"message":m})
              }
    
}catch(e){
    res.status(400).json({"success":false,"message":"some error occured","error":e.message})
}})
//get all active students
router.get('/activestudents',async (req,res)=>{
    try{
     
     const userdata=await templates.find({});
     if(userdata){

        res.status(200).json({"success":true,"message":userdata})
    }
        else{
            res.status(401).json({"success":false,"message":"Not authorize"})
        }}catch(e){res.status(400).json({"success":"false","message":"some error occured","error":e.message})
    }})

// delete student attendence
router.delete('/deleteattendence',varifyuser,async (req,res)=>{

    try{  

        const m = await  users.findOne({"_id":req.id});
        const t=await templates.findOne({"roll":m.roll})
        if(t){
        const m1=await templates.deleteOne({"roll":m.roll})
            res.status(200).json({"success":true,"message":m1})       
        }
        else{
            res.status(200).json({"success":false,"message":"student is not there"})
        }
  
}catch(e){
    res.status(400).json({"success":false,"message":"some error occured","error":e.message})
}})
    
module.exports = router ;