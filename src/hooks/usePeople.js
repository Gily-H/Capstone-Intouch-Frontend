import { useState } from "react";

export default function usePeople() {
  const [peopleData, setPeopleData] = useState({
    root: {},
    relations: [],
  });

  function changePeople(people) {
    setPeopleData((prevPeopleData) => ({
      root: people.user,
      relations: people.friends,
    }));
  }

  function changeSingleRelation(newRelation) {
    setPeopleData((prevPeopleData) => ({
      ...prevPeopleData,
      relations: [...prevPeopleData.relations, newRelation],
    }));
  }

  function changeRelations(updatedRelations) {
    setPeopleData((prevPeopleData) => ({
      ...prevPeopleData,
      relations: [...updatedRelations],
    }));
  }

  return [peopleData, changePeople, changeSingleRelation, changeRelations];
}
