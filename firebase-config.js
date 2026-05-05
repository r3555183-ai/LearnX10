// LearnX10 Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTsSHQDDZQxke_cDMaoalK7-Ffzy0YSeM",
  authDomain: "learnx10-hub.firebaseapp.com",
  projectId: "learnx10-hub",
  storageBucket: "learnx10-hub.firebasestorage.app",
  messagingSenderId: "127942677227",
  appId: "1:127942677227:web:e8516a7d48d717d11564ae"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// XP Level Thresholds
export const LEVELS = [
  { level: 0, xpRequired: 0,    xpReward: 0,   title: "Newcomer" },
  { level: 1, xpRequired: 200,  xpReward: 50,  title: "Explorer" },
  { level: 2, xpRequired: 500,  xpReward: 100, title: "Learner" },
  { level: 3, xpRequired: 1000, xpReward: 200, title: "Scholar" },
  { level: 4, xpRequired: 2000, xpReward: 350, title: "Sage" },
  { level: 5, xpRequired: 3500, xpReward: 500, title: "Master" },
  { level: 6, xpRequired: 5500, xpReward: 750, title: "Grandmaster" },
  { level: 7, xpRequired: 8000, xpReward: 1000, title: "Legend" },
];

export const BADGES = [
  { id: "newcomer",   name: "Newcomer",          icon: "🌱", xpRequired: 0,    streakRequired: 0  },
  { id: "novice",     name: "Novice",             icon: "📚", xpRequired: 200,  streakRequired: 0  },
  { id: "consistent", name: "Consistent Learner", icon: "🔥", xpRequired: 0,    streakRequired: 10 },
  { id: "pro",        name: "Pro",                icon: "⚡", xpRequired: 1000, streakRequired: 0  },
  { id: "dedicated",  name: "Dedicated",          icon: "💎", xpRequired: 0,    streakRequired: 30 },
  { id: "master",     name: "Master",             icon: "🏆", xpRequired: 3500, streakRequired: 0  },
  { id: "legend",     name: "Legend",             icon: "👑", xpRequired: 8000, streakRequired: 0  },
];

export const ADMIN_EMAIL = "rakshitpal9690@gmail.com";

export function getCurrentLevel(xp) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.xpRequired) current = lvl;
    else break;
  }
  return current;
}

export function getNextLevel(xp) {
  for (const lvl of LEVELS) {
    if (xp < lvl.xpRequired) return lvl;
  }
  return null;
}

export function getEarnedBadges(userData) {
  const earned = [];
  for (const badge of BADGES) {
    const xpMet = badge.xpRequired === 0 || (userData.xp || 0) >= badge.xpRequired;
    const streakMet = badge.streakRequired === 0 || (userData.maxStreak || 0) >= badge.streakRequired;
    if (xpMet && streakMet) earned.push(badge.id);
  }
  return earned;
}

// Device fingerprint (lightweight)
export function getDeviceFingerprint() {
  const parts = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency || 0
  ];
  let hash = 0;
  const str = parts.join('|');
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

// Honeypot check
export function initHoneypot() {
  const trap = document.createElement('div');
  trap.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
  trap.innerHTML = '<input type="text" name="hp_field" tabindex="-1" autocomplete="off" />';
  document.body.appendChild(trap);
  trap.querySelector('input').addEventListener('input', () => {
    console.warn('Bot detected via honeypot');
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;color:red;">Access Denied</div>';
  });
}
