// A mock function to mimic making an async request for data
import { toast } from "react-toastify";

export function CreateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: on server it will return some info of user(not password).
    resolve({ data });
    toast.info("Thanks for signing up! Enjoy your shopping");
  });
}
export function CheckUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        toast.info("Thanks for signing in! Enjoy your shopping");
      } else {
        const error = await response.json();
        reject({ error });
        toast.error("Wrong Credentials !!");
      }
    } catch (error) {
      reject({ error });
    }
  });
}
export function SignOut(userId) {
  return new Promise(async (resolve) => {
    //TODO: on server it will return some info of user(not password).
    resolve({ data: "success" });
  });
}
