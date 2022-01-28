import { nanoid } from "nanoid";

export const rootUser = {
  id: nanoid(),
  firstName: "Gilman",
  lastName: "Huang",
  imageUrl: "",
};

export const friends = {
  data: [
    {
      id: nanoid(),
      firstName: "Sherzod",
      lastName: "Mirsharipov",
      phone: "",
      imageUrl: "",
      strength: "70",
      lastContact: "",
      userId: 0,
    },
    {
      id: nanoid(),
      firstName: "Gallelee",
      lastName: "Thimotus",
      phone: "",
      imageUrl: "",
      strength: "45",
      lastContact: "",
      userId: 0,
    },
    {
      id: nanoid(),
      firstName: "Awais",
      lastName: "A",
      phone: "",
      imageUrl: "",
      strength: "90",
      lastContact: "",
      userId: 0,
    },
  ],
};
