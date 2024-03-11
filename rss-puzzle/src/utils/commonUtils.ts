type NullLike = null | undefined;
type Nullable<T> = T | NullLike;

export function isNull<T>(value: Nullable<T>): value is NullLike {
  return value === null || value === undefined;
}

export function isNotNull<T>(value: Nullable<T>): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function storeUserData(firstName: string, surname: string, isLoggedIn: boolean): void {
  const userData = { firstName, surname, isLoggedIn };
  localStorage.setItem('userData', JSON.stringify(userData));
}

//get user name
function getUserInfoFromLocalStorage(): { firstName: string; surname: string; isLoggedIn: boolean } | null {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// generate greeting
export function generateGreeting(): string {
  const userData = getUserInfoFromLocalStorage();
  if (userData) {
    return `Welcome, ${userData.firstName} ${userData.surname}!`;
  } else {
    return 'Welcome!';
  }
}

// check is logged in or not
export function checkUserStatus(): boolean {
  const userData = getUserInfoFromLocalStorage();

  if (userData && userData.isLoggedIn) {
    return true;
  }
  return false;
}