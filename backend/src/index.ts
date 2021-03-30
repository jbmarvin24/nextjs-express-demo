import express from 'express';
import routes from './startup/routes';
import db from './startup/db';

const PORT = process.env.PORT || 4000;
const app = express();

routes(app);
db();

app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}...`));
