let url;

if (process.env.NODE_ENV === "production") {
  url = 'http://cgbc.surge.sh';
} else {
  url = 'http://localhost:3001';
}
export const uiUrl = url;
