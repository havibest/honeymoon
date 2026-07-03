import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/firebase/config";
import { RegisterUserData } from "@/types/auth";

export async function registerUser(data: RegisterUserData) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const user = credential.user;

  await sendEmailVerification(user);

  await setDoc(doc(db, "users", user.uid), {
    displayName: data.displayName,
    country: data.country,
    goal: data.goal,
    subscriptionStatus: "inactive",
    emailVerified: false,
    profileCompleted: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function loginUser(
  email: string,
  password: string
) {
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logoutUser() {
  await signOut(auth);
}

export async function resetUserPassword(
  email: string
) {
  await sendPasswordResetEmail(auth, email);
}
