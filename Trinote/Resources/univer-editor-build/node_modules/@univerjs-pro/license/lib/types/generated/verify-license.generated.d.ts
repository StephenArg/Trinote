import type { ILicenseDecryptedInfo } from '../common/type';
export declare function initializeLicenseCrypto(): void;
export declare function bindLicenseKeyToGlobal(license?: string): void;
export declare function getLicenseInfo(license?: string, publicKey?: string): ILicenseDecryptedInfo;
