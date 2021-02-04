import * as db from '../db';
import bcrypt from 'bcrypt';

export type User = {
  userId: string;
  username: string;
  password: string;
  salt: string;
  obselete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FIND_USER = `
  select * from "User" where username = $1
`;

const CREATE_ACCOUNT = `
  INSERT INTO "User"(username, password, salt) VALUES($1, $2, $3) RETURNING *
`;

export async function createAccount(username: string, plainPassword: string): Promise<{ response: string }> {
  const users: Array<User> = (await db.query(FIND_USER, [username])).rows;
  if (users.length !== 0) {
    throw new Error('username already existed');
  }
  const salt: string = await bcrypt.genSalt(10);
  const password: string = await bcrypt.hash(plainPassword, salt);
  const user: Array<User> = await (await db.query(CREATE_ACCOUNT, [username, password, salt])).rows;
  const response = user[0] ? 'succeeded' : 'failed';
  return { response };
}
