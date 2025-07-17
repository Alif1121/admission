// admin-auth.js

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "123",
};

export function handleLogin(username, password) {
  return (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  );
}
