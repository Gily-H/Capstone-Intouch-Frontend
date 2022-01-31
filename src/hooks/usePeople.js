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

  function changeRelations(newRelation) {
    setPeopleData((prevPeopleData) => ({
      ...prevPeopleData,
      relations: [...newRelation],
    }));
  }

  return [peopleData, changePeople, changeRelations];
}
