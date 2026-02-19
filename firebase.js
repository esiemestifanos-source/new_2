// Firebase CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDODZTg4XKIhkG4hxyFQISq_8qWMd7UvtU",
  authDomain: "gearsouls-5da31.firebaseapp.com",
  projectId: "gearsouls-5da31",
  storageBucket: "gearsouls-5da31.firebasestorage.app",
  messagingSenderId: "668054432272",
  appId: "1:668054432272:web:273393583b19feec4cb895",
  measurementId: "G-JCH0MVKVXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);

// ==================== AUTH FUNCTIONS ====================

// Sign Up
window.signup = async () => {
  const name = document.getElementById("signupName")?.value || "USER";
  const email = document.getElementById("signupEmail")?.value;
  const password = document.getElementById("signupPassword")?.value;
  const confirm = document.getElementById("signupConfirm")?.value;
  
  if (!email || !password) {
    showNotification("PLEASE FILL ALL FIELDS", "error");
    return;
  }
  
  if (password !== confirm) {
    showNotification("PASSWORDS DO NOT MATCH", "error");
    return;
  }
  
  if (password.length < 6) {
    showNotification("PASSWORD MUST BE AT LEAST 6 CHARACTERS", "error");
    return;
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name.toUpperCase()
    });
    
    showNotification("ACCOUNT CREATED SUCCESSFULLY 🚀", "success");
    window.addActivity('signup', 'New account created');
    
    // Clear forms
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("signupConfirm").value = "";
    
    // Switch to sign in after 2 seconds
    setTimeout(() => {
      window.showForm('signin');
    }, 2000);
    
  } catch (err) {
    showNotification(err.message, "error");
  }
};

// Login
window.login = async () => {
  const email = document.getElementById("signinEmail")?.value;
  const password = document.getElementById("signinPassword")?.value;
  
  if (!email || !password) {
    showNotification("PLEASE ENTER EMAIL AND PASSWORD", "error");
    return;
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    showNotification("ACCESS GRANTED ✅", "success");
    
    // Clear password field
    document.getElementById("signinPassword").value = "";
    
  } catch (err) {
    showNotification(err.message, "error");
  }
};

// Logout
window.logout = async () => {
  try {
    await signOut(auth);
    showNotification("LOGGED OUT SUCCESSFULLY 👋", "success");
    window.addActivity('logout', 'Logged out');
    
    // Switch to sign in form
    setTimeout(() => {
      window.showForm('signin');
    }, 1000);
    
  } catch (err) {
    showNotification(err.message, "error");
  }
};

// Reset Password
window.resetPassword = async () => {
  const email = document.getElementById("resetEmail")?.value;
  
  if (!email) {
    showNotification("PLEASE ENTER YOUR EMAIL", "error");
    return;
  }
  
  try {
    await sendPasswordResetEmail(auth, email);
    showNotification("RESET LINK SENT TO YOUR EMAIL 📩", "success");
    
    // Clear email field
    document.getElementById("resetEmail").value = "";
    
    // Switch to sign in after 3 seconds
    setTimeout(() => {
      window.showForm('signin');
    }, 3000);
    
  } catch (err) {
    showNotification(err.message, "error");
  }
};

// Change Password
window.changePassword = async () => {
  const newPassword = prompt("ENTER NEW PASSWORD:");
  
  if (!newPassword) return;
  
  if (newPassword.length < 6) {
    showNotification("PASSWORD MUST BE AT LEAST 6 CHARACTERS", "error");
    return;
  }
  
  try {
    await updatePassword(auth.currentUser, newPassword);
    showNotification("PASSWORD UPDATED SUCCESSFULLY 🔐", "success");
    window.addActivity('password_change', 'Password updated');
    
  } catch (err) {
    showNotification(err.message, "error");
  }
};

// ==================== NOTIFICATION FUNCTION ====================
function showNotification(message, type = 'info') {
  // Check if notification function exists from account.js
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, type);
  } else {
    alert(message);
  }
}

// ==================== AUTH STATE OBSERVER ====================
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("userStatus");
  
  if (status) {
    if (user) {
      status.innerHTML = `
        <i class="fas fa-circle" style="color: #00ff00; font-size: 8px;"></i>
        CONNECTED AS ${user.email}
      `;
    } else {
      status.innerHTML = 'NOT CONNECTED';
    }
  }
  
  // Update dashboard if function exists
  if (typeof window.updateDashboard === 'function') {
    window.updateDashboard(user);
  }
});