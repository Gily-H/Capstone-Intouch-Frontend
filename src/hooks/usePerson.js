import { useState } from "react";

export default function usePerson(initialValues) {
  const [person, setPerson] = useState(initialValues);

  return [person, (personToSet) => setPerson((prevPerson) => personToSet)];
}
