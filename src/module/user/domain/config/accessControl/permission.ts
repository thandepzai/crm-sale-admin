import { BaseACP } from "module/auth/domain/config/accessControl/permission";

export class PublicUserACP extends BaseACP {
    static RESOURCE_PUBLIC_USER = "publicUser";

    // PublicUser
    static CreatePublicUser = this.p(this.RESOURCE_PUBLIC_USER, this.ACTION_CREATE);
    static ReadPublicUser = this.p(this.RESOURCE_PUBLIC_USER, this.ACTION_READ);
    static UpdatePublicUser = this.p(this.RESOURCE_PUBLIC_USER, this.ACTION_UPDATE);
    static DeletePublicUser = this.p(this.RESOURCE_PUBLIC_USER, this.ACTION_DELETE);
}
