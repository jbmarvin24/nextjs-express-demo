import { Employee } from '@prisma/client';
import prisma from '../lib/prismaClient';

export async function getEmployees(): Promise<Employee[]> {
  return await prisma.employee.findMany();
}

export async function getEmployee(id: number): Promise<Employee | null> {
  return await prisma.employee.findFirst({
    where: {
      id,
    },
  });
}

export async function createEmployee(data: any): Promise<Employee> {
  return await prisma.employee.create({
    data,
  });
}

export async function updateEmployee(id: number, data: any): Promise<Employee> {
  return await prisma.employee.update({
    data,
    where: {
      id,
    },
  });
}

export async function deleteEmployee(id: number): Promise<Employee> {
  return await prisma.employee.delete({
    where: {
      id,
    },
  });
}
