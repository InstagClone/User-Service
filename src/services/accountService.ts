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

export type UserProfile = {
  userId: string;
  name: string;
  email?: string;
  dateOfBirth?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FIND_USER = `
  select * from "User" where username = $1
`;

const CREATE_ACCOUNT = `
  INSERT INTO "User"(username, password, salt) VALUES($1, $2, $3) RETURNING *
`;

const FIND_USER_PROFILE = `
  select * from "UserProfile" where "userId" = $1
`;

const CREATE_USER_PROFILE = `
  INSERT INTO "UserProfile"("userId", name, email, "dateOfBirth", "lastLogin") VALUES($1, $2, $3, $4, $5) RETURNING *
`;

export async function createAccount(username: string, plainPassword: string): Promise<{ response: string }> {
  const users: Array<User> = (await db.query(FIND_USER, [username])).rows;
  if (users.length !== 0) {
    throw new Error('username already existed');
  }
  const salt: string = await bcrypt.genSalt(10);
  const password: string = await bcrypt.hash(plainPassword, salt);
  const user: Array<User> = (await db.query(CREATE_ACCOUNT, [username, password, salt])).rows;
  const response = user[0] ? 'succeeded' : 'failed';
  return { response };
}

export async function createProfile(userId: string, name: string, email: string, dateOfBirth: string): Promise<UserProfile> {
  const userProfiles: Array<UserProfile> = (await db.query(FIND_USER_PROFILE, [userId])).rows;
  if (userProfiles.length !== 0) {
    throw new Error('cannot create profile once created');
  }
  const userProfile: Array<UserProfile> = (await db.query(CREATE_USER_PROFILE, [userId, name, email, dateOfBirth, new Date()])).rows;
  return userProfile[0];
}

export async function getProfile(userId: string): Promise<UserProfile> {
  const userProfiles: Array<UserProfile> = (await db.query(FIND_USER_PROFILE, [userId])).rows;
  if (userProfiles.length === 0) {
    throw new Error('Profile does not exist');
  }
  return userProfiles[0];
}
