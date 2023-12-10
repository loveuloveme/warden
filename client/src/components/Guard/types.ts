export enum GuardType {
    AUTH_ONLY,
    UNAUTH_ONLY,
    ANY
}

export interface IGuardProps {
    type: GuardType
}