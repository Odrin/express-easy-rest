import { IIdentity } from "./identity";
export interface IPrincipal {
    identity: IIdentity;
    isInRole(role: string): boolean;
}
