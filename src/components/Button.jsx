import React from "react";
import styled, { css } from 'styled-components';


const DelBtn = styled.div`
  font-family: "Roboto", sans-seif;
  color: #dbdbdb;
  background: white;
  border: 2px solid #dbdbdb;
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
  width: max-content;
  min-width: 139px;
  line-height: 16px;
  padding: 16px 39px;
  margin-left: auto;
  margin-top: 20px;
  cursor: pointer;
  ${props => !props.disabled && css`
    color: white;
    background: #0085be;
    border: 2px solid #0085be;
    &:hover {
      background: #02597e;
      border: 2px solid #02597e;
    }
    &:active {
      background: #002abe;
      border: 2px solid #002abe;
    }
  `}
`;

export default function Button(props) {
  return (
    <DelBtn disabled={props.disabled} onClick={props.onDeleteClick}>
      Удалить выбранные
    </DelBtn>
  );
}