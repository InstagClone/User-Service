import * as db from '../db';

export type UserProfile = {
  userId: string;
  name: string;
  email?: string;
  dateOfBirth?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInfo {
  userId: string; 
  name?: string;
  email?: string;
  dateOfBirth?: string
}

export interface UserData {
  name?: string;
  email?: string;
  dateOfBirth?: string;
}

const FIND_USER_PROFILE = `
  select * from "UserProfile" where "userId" = $1
`;

const CREATE_USER_PROFILE = `
  INSERT INTO "UserProfile"("userId", name, email, "dateOfBirth", "lastLogin") VALUES($1, $2, $3, $4, $5) RETURNING *
`;

const getUpdateScript = (userId: string, data: UserData) => {
  const columns: Array<string> = Object.keys(data).map(key => key.replace(/\W/g, ''));
  const values = columns.map((column: string) => data[column]);
  const set = columns.map((column, i) => `\n\t"${column}" = $${i + 1}`);
  values.push(userId)
  const query = `
    UPDATE "UserProfile"
    SET ${set}
    WHERE "userId" = $${values.length}
    RETURNING *`
  return query;
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

export async function updateProfile(userInfo: UserInfo): Promise<UserProfile> {
  const { userId, ...userData } = userInfo;
  const userProfiles: Array<UserProfile> = (await db.query(FIND_USER_PROFILE, [userId])).rows;
  if (userProfiles.length === 0) {
    throw new Error('Profile does not exist');
  }
  const updateScript = getUpdateScript(userId, userData);
  const userProfile: Array<UserProfile> = (await db.query(updateScript, [...Object.values(userData), userId])).rows;
  return userProfile[0];
}
