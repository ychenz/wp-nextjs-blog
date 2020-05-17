import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 96px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`;

export const Title = styled.div`
  margin-left: 56px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
`;

export const MenuEntry = styled.div<{ isActive?: boolean }>`
  font-size: 14px;
  line-height: 16px;
  color: ${({ isActive }) => (isActive ? "#000000" : "#434343")};
  font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
  cursor: pointer;
  margin-right: 64px;
  
  &:hover {
    color: #000000;
  }
`;

export const MenuButton = styled.div`
  margin-right: 48px;
  padding: 8px 24px;
  background-color: #4DD488;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  transition: .3s ease;
  
  &:hover {
    background-color: #000000;
  }
`;

export const MenuSlider = styled.div`
  position: absolute;
  bottom: 0;
  height: 1px;
  background-color: black;
  transition: .3s ease;
  display: none;
`;
