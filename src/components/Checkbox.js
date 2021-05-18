import React from "react";
import styled, {css} from 'styled-components';

const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  width: 16px;
  height: 16px;
  ${'' /* padding: 3px; */}
  border: solid 2px #e8e8e8;
  border-radius: 6px;
  background-color: #fff;

  .checkmark{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 3px;
    background-color: #82af00;
    cursor: pointer;
    display: none;
  }

  input{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    margin: 0;
  }

  ${props => props.checked && css`
    .checkmark{
      display: block;
    }
  `}
`;

export default function Checkbox(props) {
  return(
    <CheckboxLabel checked={props.checked}>
      <input 
        type="checkbox" 
        onChange={(event) => {props.onCheckChange(event)}} 
      />
      <span className="checkmark"></span>
    </CheckboxLabel>
  );
}