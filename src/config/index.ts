import 'dotenv/config';

export default {
  port: process.env.PORT,
  pg_connection_string: process.env.PG_CONNECTION_STRING
}
