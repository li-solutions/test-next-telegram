const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const loginRoute = () => (BASE_URL + '/api/auth/sign-in')
export const logOutRoute = () => (BASE_URL + '/api/auth/sign-out')
export const dashboardRoute = () => (BASE_URL + '/dashboard')