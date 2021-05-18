import React from "react";
import styled, {css} from "styled-components";
import Checkbox from "./Checkbox";

const ActionButtonsWrap = styled.div`
  display: flex;
  width: max-content;
  margin-left: auto;
`;

const ActionBtn = styled.div`
  width: 22px;
  height: 24px;
  margin: 0 11px;
  cursor: pointer;

  ${props => props.edit && css`
    background: url("/icons/edit_btn.svg") no-repeat;
    &:hover{
      background: url("/icons/edit_btn_hover.svg") no-repeat;
    }
  `}

  ${props => props.remove && css`
    background: url("/icons/remove_btn.svg") no-repeat;
    &:hover{
      background: url("/icons/remove_btn_hover.svg") no-repeat;
    }
  `}
`;

export default function Row(props) {
  return(
    <React.Fragment>
      <tr>
        <td className="person-checkbox">
          <Checkbox 
            onCheckChange={(event) => props.onCheckStateChanged(event)} 
            checked={props.checked}
          />
        </td>
        <td className="person-number">{props.id}</td>
        <td className="person-name">{props.person.full_name}</td>
        <td className="person-age">{props.person.age}</td>
        <td className="person-height">{props.person.height}</td>
        <td className="person-weight">{props.person.weight}</td>
        <td className="person-salary">{props.person.salary}</td>
        <td>
          <ActionButtonsWrap>
            <ActionBtn edit/>
            <ActionBtn remove onClick={props.onRemove} />
          </ActionButtonsWrap>
        </td>
      </tr>
    </React.Fragment>
  );
}