/**
 * Reset stuck navigation state
 * Call this in browser console if you get stuck: resetApp()
 */
export function resetApp() {
  // Clear all localStorage
  localStorage.clear();

  // Clear all sessionStorage
  sessionStorage.clear();

  // Redirect to login
  window.location.href = "/";

  console.log("✅ App reset! Redirecting to login...");
}

// Make it available globally in development
if (typeof window !== "undefined") {
  (window as any).resetApp = resetApp;
}
