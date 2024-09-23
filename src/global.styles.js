import styled from "styled-components";
import { Menu } from "primereact/menu";
export const CustomMenu = styled(Menu)`
  width: ${({ width }) => (width ? width : "110px")};
  height: ${({ height }) => (height ? height : "108px")};
  padding: 10px;
  .p-menu-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 5px;
  }
  .p-submenu-header {
    display: none !important;
  }

  .p-menuitem {
    border-radius: 5px;
    width: 90px;
    cursor: pointer;
    overflow-y: hidden;
    /* height: 27px; */
    div {
      line-height: 14px;
      padding-top: 3px;
      padding-left: 5px;
      padding-bottom: 3px;
    }
  }
`;

export const Form = styled.form`
  max-width: 500px;
`;
export const CardInput = styled.div`
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
  height: 48px;
  width: 100%;
`;
export const PayButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;

  font-family: "Poppins";
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`;
export const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 20px;
`;
