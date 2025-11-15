import { useRouter, useSearchParams } from "next/navigation";

export interface RouterQuery {
    [key: string]: string;
}

// extract and process query params
export const useRouterQuery = (queryKeyList: string[]) => {
    const router = useRouter();
    const routerQuery: RouterQuery = {};
    const searchParams = useSearchParams();

    queryKeyList.forEach((queryKey) => {
        const queryValue = searchParams.get(queryKey);

        if (Array.isArray(queryValue)) {
            Object.defineProperty(routerQuery, queryKey, { value: queryValue[0] });
        } else if (typeof queryValue === "string") {
            Object.defineProperty(routerQuery, queryKey, { value: queryValue });
        } else return;
    });

    return routerQuery;
};
