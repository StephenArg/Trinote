export interface GrpcUri {
    scheme?: string;
    authority?: string;
    path: string;
}
export declare function parseUri(uriString: string): GrpcUri | null;
export interface HostPort {
    host: string;
    port?: number;
}
export declare function splitHostPort(path: string): HostPort | null;
export declare function combineHostPort(hostPort: HostPort): string;
export declare function uriToString(uri: GrpcUri): string;
/**
 * Extracts the service name from a gRPC method path (e.g.
 * "/package.Service/Method" -> "package.Service").
 */
export declare function extractServiceName(methodName: string): string;
/**
 * Computes the service URL used by call credentials (e.g.
 * "https://hostname/serviceName").
 */
export declare function computeServiceUrl(host: string, methodName: string): string;
