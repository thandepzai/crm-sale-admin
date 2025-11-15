import { Override } from "lib/types/generics";
import { RoleDTO } from "../dto/role";
import { IPermission } from "./permission";

export type IRole = Omit<RoleDTO, "permissions">;
export type IRoleDetail = Override<
    RoleDTO,
    { permissions: Pick<IPermission, "resource" | "resourceName" | "actions">[] }
>;
