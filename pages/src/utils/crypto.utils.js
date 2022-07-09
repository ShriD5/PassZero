import bcrypt from "bcrypt";
export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
