// A mock function to mimic making an async request for data
import { toast } from "react-toastify";

export function CreateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
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
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();

    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
        toast.info("Thanks for signing in! Enjoy your shopping");
      } else {
        reject({ message: "Your Email or Password is wrong." });
      }
    } else {
      reject({ message: "user not found" });
    }
  });
}
export function SignOut(userId) {
  return new Promise(async (resolve) => {
    //TODO: on server it will return some info of user(not password).
    resolve({ data: "success" });
  });
}
