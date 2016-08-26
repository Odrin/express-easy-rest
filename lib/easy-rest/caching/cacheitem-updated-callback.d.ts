export interface ICacheItemUpdatedCallback {
    (key: string, newValue: any, oldValue: any): void;
}
