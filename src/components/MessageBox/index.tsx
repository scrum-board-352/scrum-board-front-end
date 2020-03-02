import React, { useState, Fragment } from "react";
import { Alert } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style.css";

export enum Type {
  Success = "success",
  Error = "danger",
  Info = "info",
}

export interface Message {
  type: Type;
  title: string;
  content: string;
  timerId?: number;
  id?: number;
}

const AUTO_CLOSE_TIMEOUT = 4000;

let msgList: Message[];
let setMsgList: React.Dispatch<React.SetStateAction<Message[]>>;

function close(msg: Message) {
  clearTimeout(msg.timerId);
  setMsgList(msgList.filter((elem) => elem !== msg));
}

export function message(msg: Message) {
  msg.id = Math.random();
  setMsgList([...msgList, msg]);
  // auto-close after delay.
  msg.timerId = setTimeout(close, AUTO_CLOSE_TIMEOUT, msg);
}

export default function MessageBox() {
  [msgList, setMsgList] = useState<Message[]>([]);

  return (
    <div className="messagebox">
      <TransitionGroup component={Fragment}>
        {msgList.map((msg) => (
          <CSSTransition
            key={msg.id}
            in={true}
            timeout={300}
            classNames="messagebox"
          >
            <Alert
              variant={msg.type}
              show={true}
              dismissible
              onClose={() => close(msg)}
            >
              <Alert.Heading>{msg.title}</Alert.Heading>
              <p className="mb-0">{msg.content}</p>
            </Alert>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}