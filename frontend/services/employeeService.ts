import { Employee } from '../models/employee';
import httpService from './httpService';

const apiEndPoint = process.env.API_ENDPOINT + '/employees';

export async function getEmployees() {
  return await httpService.get(apiEndPoint);
}

export async function getEmployee(id: number) {
  return await httpService.get(apiEndPoint + '/' + id);
}

export async function createEmployee(data: any) {
  return await httpService.post(apiEndPoint, data);
}

export async function updateEmployee(id: number, data: any) {
  return await httpService.put(apiEndPoint + '/' + id, data);
}

export async function deleteEmployee(id: number) {
  return await httpService.delete(apiEndPoint + '/' + id);
}
