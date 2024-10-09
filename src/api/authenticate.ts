export type User = {
  id: string;
  name: string;
};

export function authenticateUser(): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: '1', name: 'feisal' });
    }, 1000);
  });
}
