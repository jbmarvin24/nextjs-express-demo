import express from 'express';
import employees from '../routes/employees';
import cors from 'cors';

export default function routes(app: express.Express) {
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['*'],
    })
  );
  app.use('/api/employees', employees);
}
