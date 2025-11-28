import { ThemeConfig } from "antd";

export const ThemeProvider: ThemeConfig = {
  token: {
    fontFamily: "",
    colorPrimary: "#808182",
    colorPrimaryHover: "#404040",
    colorText: "#36464E",
  },
  components: {
    Input: {
      borderRadius: 8,
      hoverBorderColor: "#D0D5DD",
      colorBorder: "#D0D5DD",
      boxShadow: "box-shadow: 0px 1px 2px 0px #1018280D",
      paddingInline: 16,
      paddingBlock: 9,
      lineHeight: 1.4285714285714286,
      activeBorderColor: "#D0D5DD",
      activeShadow: "box-shadow: 0px 1px 2px 0px #1018280D",
    },
    InputNumber: {
      borderRadius: 8,
      hoverBorderColor: "#D0D5DD",
      colorBorder: "#D0D5DD",
      boxShadow: "box-shadow: 0px 1px 2px 0px #1018280D",
      paddingInline: 16,
      paddingBlock: 9,
      lineHeight: 1.4285714285714286,
      activeBorderColor: "#D0D5DD",
      activeShadow: "box-shadow: 0px 1px 2px 0px #1018280D",
    },
    Select: {
      colorBorder: "#d9d9d9",
      hoverBorderColor: "#D0D5DD",
      activeBorderColor: "#D0D5DD",
      controlOutlineWidth: 0,
      lineHeight: 2.14285714286,
      optionPadding: "10px 16px",
    },
    Button: {
      borderRadius: 8,
      fontWeight: 500,
      boxShadow: "0px 1px 2px 0px #1018280d",
      primaryShadow: "0px 1px 2px 0px #1018280d",
      defaultShadow: "0px 1px 2px 0px #1018280d",
      dangerShadow: "0px 1px 2px 0px rgba(255, 38, 5, 0.06)",
    },
    DatePicker: {
      borderRadius: 8,
      colorBorder: "#d9d9d9",
      hoverBorderColor: "#D0D5DD",
      activeBorderColor: "#D0D5DD",
      controlOutlineWidth: 0,
      lineHeight: 2.14285714286,
    },
  },
};
