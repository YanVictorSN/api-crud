import dataBase from "../data/dataBase.json" assert { type: "json" };
import * as fs from 'node:fs';
import { cwd } from "process";

const dir = cwd()+'/data/dataBase.json'

//Listar Usuários

export function createUser(req, res, next) {

    const {name , email } = req.body
  
    const newUser = {
        id:dataBase.length,
        name: name,
        email: email,
        delete: false
    }

    dataBase.push(newUser);

    res.status(200).send(`Usuário cadastrado com sucesso!`)
        // res.status(400).send("Página Não encontrada")
       fs.writeFile(dir , JSON.stringify(dataBase), (error, data) => {
           
        return dataBase
})

};

export function listUser (req, res, next) {

    fs.readFile(dir  , "utf-8", (error, data) => {
        if(error){
            console.log(error);
            return;
         }

         const jsonFormated = JSON.parse(data)
        
         return res.json(jsonFormated)
        
    })
}

export function updateUser (req, res, next) {

    const { id } = req.params;
    const { name , email } = req.body;

    dataBase[id].name = name
    dataBase[id].email = email
    
    const oi = res.status(200).send(`Dados alterados com sucesso! Nome: ${ dataBase[id].name} Email:${dataBase[id].email}`)

    fs.writeFile(dir , JSON.stringify(dataBase), (error, data) => {

        return dataBase
    }) 
}

export function deleteUser (req,res, next) {
    const { id } = req.params; 

    dataBase[id].delete = true;

    res.status(200).send(`Usuário ${dataBase[id].name} deletado com sucesso!`);

    fs.writeFile(dir , JSON.stringify(dataBase), (error, data) => {
 
        return dataBase
    }) 
}
