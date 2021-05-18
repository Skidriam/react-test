import React from "react";
import styled from 'styled-components';
import Table from "./Table";

const Styles = styled.div`
  width: 1200px;
  margin: auto;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    line-height: normal;
    color: #4c4c4c;
  }

  table {
    border-radius: 6px;
    background: #ffffff;
    margin: auto;
    width: 100%;
    margin: 16px 0 24px;
    padding: 0 0 16px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #f5f5f5;
    border-spacing: 0;
  }

  thead {
    background: #f0f0f0;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    color: #4c4c4c;
  }

  tbody tr:nth-child(2n){
    background: #fafafa !important;
  }

  th,
  td {
    padding: 12px 15px;
    text-align: left;
  }

  td {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    color: #4c4c4c;
    min-height: 48px;
  }

  td.person-checkbox,
  td.person-number{
    width: 20px;
  }

  td.person-name{
    width: 280px;
  }

  td.person-age{
    width: 130px;
  }

  td.person-weight,
  td.person-height{
    width: 80px;
  }

`;

export default function App(props) {
  return (
      <Styles>
        <Table />
      </Styles>
    );
}