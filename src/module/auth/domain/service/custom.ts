import { ExtraDataService } from "module/common/domain/service/extraData";

export class CustomAuthService {
    static useAuthExtraData = () => {
        return ExtraDataService.useExtraData({
            role: true,
            permission: true
        });
    };
}
