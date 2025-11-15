import { MapstudyEndpoint } from "module/_core/infras/config/endpointUrl/mapstudy";

export class AuthEndpoint extends MapstudyEndpoint {
    static auth = () => `${this.baseAdmin}/v1/auth/me`;
    static login = () => `${this.baseAdmin}/v1/login`;
    static refreshToken = () => `${this.baseAdmin}/v1/refresh-token`;
    static logout = () => `${this.baseAdmin}/v1/logout`;
}

export class RoleEndpoint extends MapstudyEndpoint {
    static getRoles = () => `${this.baseAdmin}/v1/role`;
    static createRole = () => `${this.baseAdmin}/v1/role`;
    static getOneRole = (roleId: number) => `${this.baseAdmin}/v1/role/${roleId}`;
    static updateRole = (roleId: number) => `${this.baseAdmin}/v1/role/${roleId}`;
    static deleteRole = (roleId: number) => `${this.baseAdmin}/v1/role/${roleId}`;
}

export class PermissionEndpoint extends MapstudyEndpoint {
    static getPermissions = () => `${this.baseAdmin}/v1/permission`;
    static createPermission = () => `${this.baseAdmin}/v1/permission`;
    static updatePermission = (permissionId: number) => `${this.baseAdmin}/v1/permission/${permissionId}`;
    static deletePermission = (permissionId: number) => `${this.baseAdmin}/v1/permission/${permissionId}`;
}
