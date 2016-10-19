export interface IIdentity {
  isAuthenticated: boolean;
  authenticationType: string | undefined | null;
  name: string | undefined | null;
}
