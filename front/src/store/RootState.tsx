export interface RootState {
  authToken: {
    authenticated: boolean;
    accessToken: string | null;
    expireTime: number;
  };
}
