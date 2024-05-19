import React, { useEffect, useState } from "react";
import global_axios from "../global/axios";

// const useAuth = () => {
//   const [auth, setAuth] = useState(false);
//   useEffect(() => {
//     global_axios
//       .get("/user/dashboard")
//       .then((res) => {
//         if (res.data.isAuthenticated) {
//           setAuth(res.data.isAuthenticated);
//         }
//         // console.log("Eyow", res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   return { auth };
// };

// export default useAuth;
