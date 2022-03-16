import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as roomActions } from '../../redux/modules/room';


function StateChangeBtn({ socket }) {
    const dispatch = useDispatch();
    const waitingPerson = useSelector((state) => state.room.userInfo);

    const ChangeToObserver = (e) => {
        e.preventDefault();
        console.log("여기입니다.", waitingPerson)
        socket.emit("changeToObserver", "observer")
        console.log("옵져버로 변경");
        dispatch(roomActions.changeToObserver(waitingPerson))
    };

    const ChangeToPlayer = (e) => {
        e.preventDefault();
        console.log("여기입니다.", waitingPerson)
        socket.emit("changeToPlayer", "player")
        console.log("플레이어로 변경");
        dispatch(roomActions.changeToPlayer(waitingPerson))
    }


    useEffect(() => {
        const changeState = (id) => {
            console.log("됩니까?", id)
        }

        socket.once("moveToObserver", changeState)

        socket.once("moveToPlayer", changeState)

        return () => {
            socket.off("moveToObserver", changeState);
            socket.off("moveToPlayer", changeState);
        }
    }, [])

    return (
        <>
            <div className="button_box" style={{ textAlign: "center" }}>
                <button style={{ width: "50px", border: "1px solid pink" }} onClick={ChangeToObserver}>옵져버로 이동</button>
            </div>
            <div className="button_box" style={{ textAlign: "center" }}>
                <button style={{ width: "50px", border: "1px solid pink" }} onClick={ChangeToPlayer}>플레이어로 이동</button>
            </div>
        </>
    );
}

export default StateChangeBtn;