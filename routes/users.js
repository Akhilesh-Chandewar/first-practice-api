import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [] 

router.get("/", (req,res)=>{
    console.log(users);
    res.send(users);
});

router.post("/",(req,res)=>{
   const user = req.body;
    users.push({...user, id: uuidv4()});
   res.send(`User with firstname ${user.name} added to the database`);
});

router.get("/:id", (req,res) => {
    const { id } = req.params;
    const founduser = users.find((user)=> user.id === id);
    res.send(founduser);
})

router.delete("/:id", (req,res)=>{
    const { id } = req.params;
    users = users.filter((user)=> user.id !== id);
    res.send(`User with the id ${id} is deleted from database`);
})

router.patch("/:id", (req,res)=>{
    const {id}  = req.params;
    const {name, lastname, age} = req.body;
    const userToBeUpdated = users.find((user)=> user.id === id);
    if(name){
        userToBeUpdated.name = name;
    }
    if(lastname){
        userToBeUpdated.lastname = lastname;
    }
    if(age){
        userToBeUpdated.age = age;
    }
    res.send(`User with id ${id} has been updated`);
})
export default router;