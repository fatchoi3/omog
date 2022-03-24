import React from "react";
import styled from "styled-components";
import "./RoomEnter.css";

const RoomEnter = (props) => {
  const { open, close, header, enter, enterName } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>{header}</header>
          <main>{props.children}</main>
          <footer>
            {enter ? <button onClick={enter}>{enterName}</button> : ""}
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default RoomEnter;
