import { toast } from "react-toastify";

export function CreateUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/signup", {
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
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        toast.info("Thanks for signing in! Enjoy your shopping");
      } else {
        const error = await response.text();
        reject(error);
        toast.error("Wrong Credentials!");
      }
    } catch (error) {
      reject(error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
      toast.error(
        "An error occurred while checking authentication. Please try again later."
      );
    }
  });
}

export function SignOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        resolve({ data: "success" });
        toast.info("You are Logged Out. Please visit again.");
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(resetInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(resetInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
