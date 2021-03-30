import { Prisma } from '@prisma/client';
import express from 'express';
import prisma from '../lib/prismaClient';
import validate from '../middlewares/validate';
import { validateEmployee } from '../models/employee';
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from '../services/employee';
const router = express.Router();

router.get('/', async (req, res) => res.send(await getEmployees()));

router.get('/:id', async (req, res) => {
  const employee = await getEmployee(Number(req.params.id));

  if (!employee) return res.status(404).send('Employee Not Found');

  res.send(employee);
});

// Pwede namang kahit void lang to kung hindi mo naman need yung inserted employee.
// pina-follow ko lang yung traditional basic pattern.
router.post('/', validate(validateEmployee), async (req, res) => res.send(await createEmployee(req.body)));

// Eto din
router.put('/:id', validate(validateEmployee), async (req, res) => {
  const id = Number(req.params.id);
  const employee = await getEmployee(id);

  if (!employee) return res.status(404).send('Employee Not Found');

  res.send(await updateEmployee(id, req.body));
});

// Eto pwede naman kahit hindi na ireturn yung deleted employee.
// kahit 200 status lang, and it depend on the situation.
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const employee = await getEmployee(id);

  if (!employee) return res.status(404).send('Employee Not Found');

  res.send(await deleteEmployee(id));
});

export default router;
