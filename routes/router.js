import express from 'express';
import { createUser, listUser , updateUser, deleteUser } from '../controllers/controllers.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended:true }));

//ROTAS

router.get("/", listUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router