import axios from "axios";
// import https from "https";
// import fs from "fs";

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
//   ca: fs.readFileSync("./certificate.cer"),
// });

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
  
// })
export default axios.create({
  baseURL: "http://coiliiot.com.cn:8080",
  // httpsAgent,
});