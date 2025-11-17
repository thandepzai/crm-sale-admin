"use client";

import Block from "module/_core/app/component/Block";
import FilterForm from "module/_core/app/component/FilterForm";
import { FilterFormItemType } from "module/_core/app/component/FilterForm/type";
import MainTable from "module/_core/app/component/Table/MainTable";
import QueryPageSizeSelect from "module/_core/app/component/Table/QueryPageSizeSelect";
import QueryPagination from "module/_core/app/component/Table/QueryPagination";
import { CustomCommonService } from "module/common/domain/service/custom";
import { UserPublicDTO, UserPublicFilterDTO } from "module/user/domain/dto/user";
import { UserService } from "module/user/domain/service/user";
import useFilter from "module/_core/infras/hook/useFilter";
import { errorHandler } from "module/_core/infras/util/exceptionHandler";
import { getRange } from "module/_core/infras/util/pagination";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { HeaderService } from "@module/_core/app/layout/MainHeader/service";
import { BreadcrumbService } from "@module/_core/app/layout/MainBreadcrumb/service";
import { AppLoadingView } from "@module/_core/app/component/Loading/AppLoading";
import ErrorEmpty from "@module/_core/app/component/Empty/ErrorEmpty";
import { keepPreviousData } from "@tanstack/react-query";

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const UserPublicView = () => {
    const { setHeaderTitle } = HeaderService.useHeader(() => 0);
    const { setDefault } = BreadcrumbService.useBreadcrumb(() => 0);
    useEffect(() => {
        setHeaderTitle("Người dùng công khai");
        setDefault();
    }, []);

    const { filter: userPublicFilter, changeFilter: changeUserPublicFilter } = useFilter<UserPublicFilterDTO>();
    const { name, email, phone, yob, cityId, page = 1, pageSize = DEFAULT_PAGE_SIZE } = userPublicFilter;

    const { data, isPending, isFetching, isError } = UserService.useUserPublic({
        filter: {
            name,
            email,
            phone,
            yob,
            cityId,
            page: page ?? 1,
            pageSize: pageSize ?? DEFAULT_PAGE_SIZE
        },
        fetcherOptions: {
            staleTime: 0,
            gcTime: 0,
            placeholderData: keepPreviousData,
            onError: (error) => {
                errorHandler(error);
            }
        }
    });

    const cityExtraData = CustomCommonService.useCityExtraData();

    const columns: ColumnsType<UserPublicDTO> = [
        {
            title: "STT",
            key: "stt",
            align: "center",
            width: 60,
            fixed: true,
            render: (_, __, index) =>
                (data ? (data.pagination.currentPage - 1) * data.pagination.pageSize : 0) + index + 1
        },
        {
            title: "Người dùng",
            dataIndex: "name",
            width: 300
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone"
        },
        {
            title: "Tỉnh thành",
            dataIndex: "city",
            render: (value) => value?.name
        },
        {
            title: "Trường học",
            dataIndex: "school",
            width: 200,
            render: (value) => value?.name
        },
        {
            title: "Năm sinh",
            dataIndex: "yearOfBirth"
        }
    ];

    return (
        <Block>
            <FilterForm<UserPublicFilterDTO>
                filterName="user-public"
                filter={{ name, phone, yob, cityId, email }}
                changeFilter={changeUserPublicFilter}
                items={[
                    {
                        type: FilterFormItemType.Input,
                        name: "name",
                        label: "Họ và tên",
                        placeholder: "Họ và tên",
                        className: "w-[260px]!"
                    },
                    {
                        type: FilterFormItemType.Input,
                        name: "email",
                        label: "Email",
                        placeholder: "Email",
                        className: "w-[260px]!"
                    },
                    {
                        type: FilterFormItemType.Input,
                        name: "phone",
                        label: "Số điện thoại",
                        placeholder: "Số điện thoại"
                    },
                    {
                        type: FilterFormItemType.InputNumber,
                        name: "yob",
                        label: "Năm sinh",
                        placeholder: "Năm sinh",
                        className: "w-[180px]!"
                    }
                    // {
                    //     type: FilterFormItemType.Select,
                    //     name: "cityId",
                    //     label: "Tỉnh thành",
                    //     placeholder: "Tỉnh thành",
                    //     showSearch: true,
                    //     options: cityExtraData.data?.cities
                    //         ? cityExtraData.data?.cities.map(({ id, name }) => ({ value: id, label: name }))
                    //         : []
                    // }
                ]}
            />
            {isPending ? (
                <AppLoadingView containerClassName="h-[60vh]" />
            ) : data ? (
                <div className="table-container">
                    <div className="title-table tab:mt-4 lap:mt-12">
                        <div>{getRange(data?.pagination)}</div>
                        <QueryPageSizeSelect
                            value={pageSize}
                            pageSizeOptions={PAGE_SIZE_OPTIONS}
                            onPageSizeChange={(newPageSize) => {
                                changeUserPublicFilter((prev) => ({
                                    ...prev,
                                    pageSize: newPageSize,
                                    page: 1
                                }));
                            }}
                        />
                    </div>
                    <MainTable
                        dataSource={data?.users}
                        columns={columns}
                        rowKey="id"
                        scroll={{ x: "max-content" }}
                        loading={isPending || isFetching}
                        pagination={false}
                    />
                    <QueryPagination
                        total={data?.pagination.total}
                        pageSize={data?.pagination.pageSize}
                        current={data?.pagination.currentPage}
                        onPageChange={(newPage) => {
                            changeUserPublicFilter((prev) => ({
                                ...prev,
                                page: newPage
                            }));
                        }}
                    />
                </div>
            ) : null}
            {isError ? <ErrorEmpty /> : null}
        </Block>
    );
};

export default UserPublicView;
