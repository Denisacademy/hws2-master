import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Greeting from "./Greeting";
import { UserType } from "./HW3";

type GreetingContainerPropsType = {
  users: UserType[]; // need to fix any
  addUserCallback: (name: string) => void; // need to fix any
};
//setError: Dispatch<SetStateAction<string>>,
export const pureAddUser = (
  name: string,
  setError: (error: string) => void,
  setName: (name: string) => void,
  addUserCallback: (name: string) => void
) => {
  console.log("callback");

  if (!name.trim()) {
    setError("Ошибка! Введите имя!");
    return;
  }
  addUserCallback(name);
  setError("");
  setName("");
  // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
};

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
  if (name.length < 1) setError("Ошибка! Введите имя!");
  // если имя пустое - показать ошибку
};

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: (name: string) => void) => {
  console.log(e.target);
  if (e.key === "Enter") addUser("test");

  // если нажата кнопка Enter - добавить
};

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({ users, addUserCallback }) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value);
    }

    error && setError("");
  };

  const addUser = () => pureAddUser(name, setError, setName, addUserCallback);

  const onBlur = () => pureOnBlur(name, setError);

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => pureOnEnter(e, addUser);

  const totalUsers = users.length;
  const lastUserName = users.length ? users[users.length - 1].name : null;

  return (
    <Greeting
      name={name}
      error={error}
      setNameCallback={setNameCallback}
      addUser={addUser}
      totalUsers={totalUsers}
      lastUserName={lastUserName}
      onBlur={onBlur}
      onEnter={onEnter}
    />
  );
};

export default GreetingContainer;
