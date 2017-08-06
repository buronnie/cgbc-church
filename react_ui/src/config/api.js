let url;

if (process.env.NODE_ENV === "production") {
  url = 'http://cgbc-env.93zkisfwvt.us-west-2.elasticbeanstalk.com/';
} else {
  url = 'http://localhost:3000';
}
export const apiUrl = url;
