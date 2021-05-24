import React, { useEffect, useState } from "react";
import CallApi from "../api";
import Checkbox from "./Checkbox";
import Row from "./Row";
import Button from "./Button";

export default function Table(props) {
  const [state, setState] = useState({
    people: [],
    checked: []
  });

  const colsList = ["№", "ФИО", "Возраст(лет)", "Рост", "Вес", "Зарплата", ""]

  const convertHeight = (oldHeight) => {//TODO проверить правильность расчета вручную
    let pd = oldHeight.replace("\"", "");
    pd = pd.split("'");
    let smFull = pd[0]*30.48 + pd[1]*2.54;
    let mSm = 0;
    if(smFull > 200)
      mSm = "2м " + Math.round(smFull-200) + "см";
    else if(smFull >100)
      mSm = "1м " + Math.round(smFull-100) + "см";
    else
      mSm = smFull + "см";
    return mSm;
  }

  const convertWeight = (oldWeight) => {
    const weightKg = Math.round(oldWeight * 0.453592);
    return weightKg + " кг";
  }

  // const convertSalary = (eur) => {
  //     const salaryUSD = Math.round(eur * state.currencyData.rates.USD);
  //     return "$" + salaryUSD;
  // }

  const convertDate = (birth_date) => {
    return Math.round((Date.now()/1000 - birth_date) / (3600 * 24 * 365))
  }

  const handleRowCheck = (id, event) => {
    const checked = event.target.checked;
    let newCheckedState = state.checked.slice();
    if(event.nativeEvent.shiftKey){
      if(state.checked.includes(true)){
        const lastChecked = state.checked.indexOf(true);
          newCheckedState = newCheckedState.map((elem, i) => {
            if((i >= id && i <= lastChecked) || elem === true) {
              return elem = true;
            }
            else if((i <= id && i >= lastChecked)) {
              return elem = true;
            }
            return false;
          });
      }
    }
    newCheckedState[id] = checked;
    setState({...state, checked: newCheckedState})
  }

  const handleHeadingCheck = (event) => {
    const checked = event.target.checked;
    let newChecked = state.checked.slice();
    newChecked = newChecked.fill(checked);
    setState({...state, checked: newChecked});
  }

  const handleRowRemoveClick = (id) => {
    let newChecked = state.checked.filter((item, index) => index !== id);
    let newPeople = state.people.filter((item, index) => index !== id);
    setState({people: newPeople, checked: newChecked});
  }

  const handleRemoveChecked = () => {
    let checkedIds = state.checked.slice().reduce((arr, elem, index) => {
      if(elem === true) arr.push(index);
        return arr;
    }, []);
    let newChecked = state.checked.filter((item, index) => !checkedIds.includes(index));
    let newPeople = state.people.filter((item, index) => !checkedIds.includes(index));
    setState({people: newPeople, checked: newChecked})
  }

  useEffect(() => {
    const preparePeopleDetails = (peopleData) => {
      const data = peopleData;
      let loadedPeople = [];
      data.forEach((element, i) => {
        let person = {};
        person.full_name = element.first_name + " " + element.last_name;
        person.age = convertDate(element.date_of_birth);
        person.height = convertHeight(element.height);
        person.weight = convertWeight(element.weight);
        person.salary = "EUR: " + element.salary;
        loadedPeople.push(person);
      });
      setState({
        people: loadedPeople, 
        checked: new Array(loadedPeople.length).fill(false)
      });
    }

    Promise.all([
      CallApi.getPeopleData(),
    ]).then(([peopleRes]) => {
      preparePeopleDetails(peopleRes);
    });
  }, []);

  return(
    <React.Fragment>
      <h1>
        Таблица пользователей
      </h1>
        <table>
          <thead>
            <tr>
              <th>
              <Checkbox 
                onCheckChange={(event) => handleHeadingCheck(event)}
                checked={!state.checked.includes(false)}
              />
              </th>
              {colsList.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {state.people.map((element, index) => (
            <Row 
              key={index}
              id={index+1}
              person={element}
              onCheckStateChanged={(event) => handleRowCheck(index, event)}
              onRemove={() => handleRowRemoveClick(index)}
              checked={state.checked[index]}
            />
          ))}
        </tbody>
        </table>
      <Button
        onDeleteClick={() => handleRemoveChecked()}
        disabled={!state.checked.includes(true)}
      />
    </React.Fragment>
  );
}