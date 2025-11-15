import { CreateApi, DeleteApi, UpdateApi } from "module/_core/infras/config/type/apiOptions";
import { RoleEndpoint } from "../../infras/config/endpointUrl";
import { CreateRoleDTO, GetOneRoleDTO, GetRolesDTO, UpdateRoleDTO } from "../dto/role";
import { IRole, IRoleDetail } from "../model/role";
import { sortActions } from "../utils/permission";
import { requester } from "@module/_core/infras/config/request";

export class RoleApi {
    static async getRoles() {
        return await requester.call<IRole[]>({
            boundedTime: 500,
            handleData: (data: GetRolesDTO) =>
                data.data.roles.map(({ id, name, code, status, defaultSignUp }) => ({
                    id,
                    name,
                    code,
                    status,
                    defaultSignUp
                }))
        })(RoleEndpoint.getRoles());
    }

    static async getOneRole(roleId: number) {
        return await requester.call<IRoleDetail>({
            boundedTime: 500,
            handleData: (data: GetOneRoleDTO) => {
                let permissions: IRoleDetail["permissions"] = [];

                data.data.role.permissions.forEach(({ id, resource, resourceName, action, actionName, status }) => {
                    if (!permissions.some((ele) => ele.resource === resource)) {
                        permissions.push({
                            resource,
                            resourceName,
                            actions: [
                                {
                                    id,
                                    action,
                                    ...(actionName && { actionName }),
                                    status
                                }
                            ]
                        });
                    } else {
                        permissions[permissions.findIndex((ele) => ele.resource === resource)].actions.push({
                            id,
                            action,
                            ...(actionName && { actionName }),
                            status
                        });
                    }
                });

                permissions = permissions.map((ele) => ({
                    ...ele,
                    actions: sortActions(ele.actions)
                }));

                // console.log(permissions);
                return {
                    ...data.data.role,
                    permissions
                };
            }
        })(RoleEndpoint.getOneRole(roleId));
    }

    static async createRole({ body }: CreateApi<CreateRoleDTO>) {
        return await requester.call({
            requestFunc: () => requester.mapServerAxios.post(RoleEndpoint.createRole(), body)
        })();
    }

    static async updateRole({ param, body }: UpdateApi<UpdateRoleDTO>) {
        return await requester.call({
            requestFunc: () => requester.mapServerAxios.put(RoleEndpoint.updateRole(param), body)
        })();
    }

    static async deleteRole({ param }: DeleteApi) {
        return await requester.call({
            requestFunc: () => requester.mapServerAxios.delete(RoleEndpoint.deleteRole(param))
        })();
    }
}
