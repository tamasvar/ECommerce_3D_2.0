// Utility function to set session data in localStorage
export function setSession(session: any): void {
  if (!session) return;

  try {
    // Store the session as a JSON string in localStorage
    localStorage.setItem('session', JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session to localStorage:', error);
  }
};

// Utility function to get the session data from localStorage
export function getSession(): any | null {
  try {
    const storedSession = localStorage.getItem('session');

    if (!storedSession) return null;

    const session: any = JSON.parse(storedSession);

    // Validate if session is still valid by checking the expiration date
    const now = new Date().getTime();
    const expiryTime = new Date(session.expires).getTime();

    if (expiryTime > now) {
      return session;
    } else {
      // Session has expired, remove it from localStorage
      localStorage.removeItem('session');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving session from localStorage:', error);
    return null;
  }
}
