import SearchButton from "module/_core/app/component/Button/SearchButton";
import MainForm from "module/_core/app/component/Form/MainForm";
import strings from "module/_core/infras/constant/strings";
import { Form, Input, Select, Button, InputNumber, Tag, DatePicker } from "antd";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { FilterFormItemType } from "./type";
import clsx from "clsx";
import { FormInstance } from "antd/lib";
import dayjs from "dayjs";

interface FilterFormProps<T> {
    filterName: string;
    filter: T;
    changeFilter: Dispatch<SetStateAction<T>>;
    items: FormItem[];
    className?: string;
}

interface InputItem {
    type: FilterFormItemType.Input;
    name: string;
    label: string;
    placeholder: string;
    className?: string;
    onChange?: (value: string, filterForm?: FormInstance<any>) => void;
}

interface InputNumberItem {
    type: FilterFormItemType.InputNumber;
    name: string;
    label: string;
    placeholder: string;
    className?: string;
    onChange?: (value: number | string | null, filterForm?: FormInstance<any>) => void;
}

interface SelectItem {
    type: FilterFormItemType.Select;
    name: string;
    label: string;
    placeholder: string;
    className?: string;
    showSearch?: boolean;
    disabled?: boolean;
    dropdownStyle?: CSSProperties;
    options: {
        value: string | number | boolean;
        label: string;
    }[];
    onChange?: (value: string | number, filterForm?: FormInstance<any>) => void;
}

interface TagItem {
    type: FilterFormItemType.Tag;
    name: string;
    label: string;
    className?: string;
    defaultValue?: string | number | boolean;
    options: {
        value?: string | number | boolean;
        label: string;
    }[];
    onChange?: (value: string | number | boolean | undefined, filterForm?: FormInstance<any>) => void;
}

interface DateItem {
    type: FilterFormItemType.Date;
    name: string;
    label: string;
    placeholder: string;
    className?: string;
    onChange?: (value: string, filterForm?: FormInstance<any>) => void;
}

interface HiddenItem {
    type: FilterFormItemType.Hidden;
    name: string;
}

type FormItem = InputItem | InputNumberItem | SelectItem | TagItem | HiddenItem | DateItem;

interface FilterFormItemProps {
    data: FormItem;
    filterName: string;
    filterForm: FormInstance<any>;
}

const FilterFormItem = ({ data, filterName, filterForm }: FilterFormItemProps) => {
    if (data.type === FilterFormItemType.Input) {
        const { name, label, placeholder, className = "!w-[200px]", onChange } = data;

        return (
            <Form.Item name={[filterName, name]} label={label} className="mb-4 [&>div>.ant-form-item-label]:pb-[6px]">
                <Input
                    className={className}
                    placeholder={placeholder}
                    allowClear
                    onChange={(e) => onChange && onChange(e.target.value, filterForm)}
                />
            </Form.Item>
        );
    } else if (data.type === FilterFormItemType.InputNumber) {
        const { name, label, placeholder, className = "!w-[200px]", onChange } = data;

        return (
            <Form.Item name={[filterName, name]} label={label} className="mb-4 [&>div>.ant-form-item-label]:pb-[6px]">
                <InputNumber
                    className={className}
                    placeholder={placeholder}
                    controls={false}
                    onChange={(e) => onChange && onChange(e, filterForm)}
                />
            </Form.Item>
        );
    } else if (data.type === FilterFormItemType.Select) {
        const {
            name,
            label,
            placeholder,
            showSearch,
            options,
            dropdownStyle,
            className = "!w-[200px]",
            disabled,
            onChange
        } = data;

        return (
            <Form.Item name={[filterName, name]} label={label} className="mb-4 [&>div>.ant-form-item-label]:pb-[6px]">
                <Select
                    className={className}
                    placeholder={placeholder}
                    allowClear
                    options={options}
                    showSearch={showSearch}
                    onChange={(value) => onChange && onChange(value, filterForm)}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    dropdownStyle={dropdownStyle}
                    disabled={disabled}
                />
            </Form.Item>
        );
    } else if (data.type === FilterFormItemType.Tag) {
        const { name, label, options, defaultValue, className, onChange } = data;

        return (
            <Form.Item name={[filterName, name]} label={label} className="mb-4 [&>div>.ant-form-item-label]:pb-[6px]">
                <Form.Item className="mb-0" shouldUpdate>
                    {({ getFieldValue, setFieldValue }) => {
                        const dataSelect = getFieldValue([filterName, name]);
                        return (
                            <div className="flex flex-wrap gap-y-2">
                                {options.map(({ value, label }, index) => (
                                    <Tag
                                        key={index}
                                        className={clsx(
                                            "rounded-2xl cursor-pointer border-none bg-[#f2f5f9] hover:bg-[#daecfb]",
                                            (!!dataSelect && dataSelect.includes(value)) ||
                                                (!dataSelect && defaultValue === value)
                                                ? "!bg-primary text-white"
                                                : "bg-[#F5F5F5] text-secondary-typo",
                                            className
                                        )}
                                        onClick={() => {
                                            setFieldValue([filterName, name], [value]);
                                            onChange && onChange(value, filterForm);
                                        }}
                                    >
                                        <div className="text-md text-center mx-2.5 leading-9">{label}</div>
                                    </Tag>
                                ))}
                            </div>
                        );
                    }}
                </Form.Item>
            </Form.Item>
        );
    } else if (data.type === FilterFormItemType.Date) {
        const { name, label, placeholder, className = "!w-[200px]", onChange } = data;

        return (
            <Form.Item name={[filterName, name]} label={label} className="mb-4 [&>div>.ant-form-item-label]:pb-[6px]">
                <DatePicker
                    className={className}
                    placeholder={placeholder}
                    allowClear
                    onChange={(_, dateString) => onChange && onChange(String(dateString), filterForm)}
                />
            </Form.Item>
        );
    } else if (data.type === FilterFormItemType.Hidden) {
        const { name } = data;
        return <Form.Item name={[filterName, name]} noStyle></Form.Item>;
    }
    return null;
};

const FilterForm = <T,>({ filterName, items, filter, changeFilter, className }: FilterFormProps<T>) => {
    const [filterForm] = Form.useForm();

    const handleFilter = (values: object) => {
        // console.log(values);
        const newFilter = {
            ...filter,
            ...values[filterName],
            page: undefined
        };

        for (const key in newFilter) {
            if (newFilter[key] === undefined || newFilter[key] === "" || newFilter[key] === null) {
                delete newFilter[key];
            }
            if (dayjs.isDayjs(newFilter[key])) newFilter[key] = newFilter[key].toISOString();
        }

        changeFilter(newFilter);
    };

    const handleResetFilter = () => {
        filterForm.resetFields();
        changeFilter({} as T);
    };

    return (
        <div className={`${className} mb-5`}>
            <MainForm form={filterForm} onFinish={handleFilter}>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {items.map((item, index) => (
                        <FilterFormItem key={index} data={item} filterName={filterName} filterForm={filterForm} />
                    ))}
                    <div className="flex gap-2 w-60 items-end mb-4">
                        <SearchButton className="flex-auto h-[34px]" />
                        <Button
                            className="flex-auto h-[34px] border-none !bg-[#16A085] !text-white hover:opacity-80"
                            onClick={handleResetFilter}
                        >
                            {strings.reset}
                        </Button>
                    </div>
                </div>
            </MainForm>
        </div>
    );
};

export default FilterForm;
