import app from "./app.js";
import dbconnect from "./config/db.js";
import dns from "dns";
const port = process.env.PORT;
const startServer = async () => {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]); // reslove dns issue while using mobile hotspot
    await dbconnect();
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  } catch (error) {
    console.log("failed to start server", error);
  }
};

startServer();
