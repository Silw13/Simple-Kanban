import Scrollbars from "react-custom-scrollbars-2";
import Card from "./card/card";
import { useTasks } from "../../../hooks/task/use-task";
import { useState } from "react";

export default function Column(props) {
    const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
    const [inputCardName, setInputCardName] = useState();

    const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(undefined);

    const { getTasksByState, getTasksByExcludedState, addTask, moveTask } = useTasks();

    const tasks = getTasksByState(props.state);
    const hasTasks = tasks.length > 0;

    const onInputCard = (e) => {
        setInputCardName(e.target.value);
    }

    return (
        <div className="column">
            <div className="column__wrapper">
                <div className="column__header">{props.name}</div >

                {hasTasks &&
                    //scrollbars    

                    tasks.map((task) =>

                        <Card key={task.id} id={task.id} name={task.name} />)
                    //scrollbars

                }

                {isNewTaskInputShown &&
                    <div>
                        <input onInput={onInputCard} />
                    </div>
                }

                {isNewTaskSelectShown &&
                    <select onChange={(e) =>
                        setSelectedTaskId(e.target.value)}
                    >
                        <option>Select Task</option>
                        {getTasksByExcludedState(props.state).map((task) =>
                            <option key={task.id} value={task.id}>{task.name}</option>
                        )}
                    </select>
                }

                <div >
                    {(!isNewTaskInputShown && !isNewTaskSelectShown) &&
                        <button onClick={() => props.state === 'backlog'
                            ? setIsNewTaskInputShown(true)
                            : setIsNewTaskSelectShown(true)}
                        >Add Task</button>}

                    {(isNewTaskInputShown || isNewTaskSelectShown) &&
                        <button onClick={() => {
                            if (props.state === 'backlog') {
                                setIsNewTaskInputShown(false)
                                addTask(inputCardName);
                                setInputCardName(undefined);
                            } else {
                                setIsNewTaskSelectShown(false);
                                moveTask(selectedTaskId, props.state);
                            }
                        }}
                        >Submit</button>
                    }
                    {(isNewTaskInputShown || isNewTaskSelectShown)
                        && <button onClick={() =>
                            props.state = 'backlog'
                                ? setIsNewTaskInputShown(false)
                                : setIsNewTaskSelectShown(false)
                        }> Hide</button>}
                </div>

            </div>
        </div>


    )
}