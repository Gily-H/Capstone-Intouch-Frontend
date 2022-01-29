import { useState } from "react";

export default function usePeople(rootUserId) {
  const [peopleData, setPeopleData] = useState({
    root: rootUserId,
    nonRoot: [],
  });

  function changePeople(people) {
    setPeopleData((prevPeopleData) => ({
      ...prevPeopleData,
      nonRoot: people,
    }));
  }

  return [peopleData, changePeople];
}
