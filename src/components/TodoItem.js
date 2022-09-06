import React, {useEffect, useState} from 'react';
import styles from '../styles/modules/todoItem.module.scss'
import {getClasses} from "../utils/getClasses";
import {format} from "date-fns";
import {ru} from 'date-fns/locale'
import {MdDelete, MdEdit} from "react-icons/md";
import {useDispatch} from "react-redux";
import {deleteTodo, updateTodo} from "../slices/todoSlices";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";

const TodoItem = ({todo}) => {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        if(todo.status==='complete'){
            setChecked(true);
        }
        else{
            setChecked(false);
        }
    }, [todo.status])

    const handleDelete = () => {

        if(window.confirm("Вы действительно хотите удалить задачу?")) {
            dispatch(deleteTodo(todo.id))
            toast.success("Задача удалена!")
        }


    }
    const handleUpdate = () => {
        setUpdateModalOpen(true)

    }

    const handleCheck = () => {
        setChecked(!checked)
        dispatch(
            updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete',
        }))
    }
    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck}/>
                    <div className={styles.texts}>
                        <p className={getClasses([
                            styles.todoText,
                            todo.status === 'complete' && styles
                            [`todoText--completed`],
                        ])}
                        >
                            {todo.title}
                        </p>
                        <p className={getClasses([
                            styles.todoSubText,
                            todo.status === 'complete' && styles
                                [`todoText--completed`],
                        ])}
                        >
                            {todo.subtitle}
                        </p>
                        <p className={styles.time}>{format(new Date(todo.startDate), 'd MMM yyyy г.', {locale: ru}) } {todo.startDate === todo.endDate ? '' : `- ${format(new Date(todo.endDate), 'd MMM yyyy г.', {locale: ru})}`}</p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div
                        className={styles.icon}
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        role="button"
                        tabIndex={0}
                    >
                        <MdDelete />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={handleUpdate}
                        onKeyDown={handleUpdate}
                        role="button"
                        tabIndex={0}>
                        <MdEdit />
                    </div>

                </div>
            </div>
            <TodoModal todo={todo} type="update" modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
        </>
    );
};

export default TodoItem;
