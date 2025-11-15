import { PermissionActionDTO, PermissionDTO } from "../dto/permission";

export interface IPermissionAction extends PermissionActionDTO {}
export interface IPermission extends PermissionDTO {
    actions: IPermissionAction[];
}
