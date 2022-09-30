import { Pool } from 'pg';

const client = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password:'postgres',
  database: 'Wamppy',
});

export default client;
