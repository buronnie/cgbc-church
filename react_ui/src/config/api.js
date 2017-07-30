let url;

if (process.env.NODE_ENV === "production") {
  url = 'https://obscure-brushlands-98802.herokuapp.com';
} else {
  url = 'http://localhost:3000';
}
export const apiUrl = url;
