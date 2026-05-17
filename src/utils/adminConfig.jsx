export const ADMIN_EMAILS = [
  "admin@clearskin.com",
  "hogrider@gmail.com",
];

export const isAdmin = (email) => ADMIN_EMAILS.includes(email?.toLowerCase());