import { toast } from "react-toastify";

export function CreateUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
        toast.info("Thanks for signing up! Enjoy your shopping");
      } else {
        reject({ error: data });
        toast.error("Failed to sign up. Please try again.");
      }
    } catch (error) {
      reject({ error });
      toast.error(
        "An error occurred while signing up. Please try again later."
      );
    }
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
        toast.info("Thanks for signing in! Enjoy your shopping");
      } else {
        reject({ error: data });
        toast.error("Wrong Credentials!");
      }
    } catch (error) {
      reject({ error });
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/check");
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject({ error: data });
      }
    } catch (error) {
      reject({ error });
      toast.error(
        "An error occurred while checking authentication. Please try again later."
      );
    }
  });
}

export function SignOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      // Make API call to sign out (if necessary)
      resolve({ data: "success" });
    } catch (error) {
      reject({ error });
      toast.error(
        "An error occurred while signing out. Please try again later."
      );
    }
  });
}
