import React, {useEffect, useState} from 'react';
import styles from '../styles/modules/modal.module.scss'
import {useDispatch} from 'react-redux';

import {MdOutlineClose} from "react-icons/md";
import Button from "./Button";
import {addTodo, updateTodo} from "../slices/todoSlices";
import { v4 as uuid} from 'uuid';
import toast from "react-hot-toast";

const today = () =>{
    let today = new Date().toISOString().slice(0, 10)
    return today;
}

const TodoModal = ({type, modalOpen, setModalOpen, todo}) => {
    const [startDate, setStartDate] = useState(today())
    const [endDate, setEndDate] = useState(today())
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [status, setStatus] = useState('incomplete');
    const dispatch = useDispatch()

    useEffect(() => {
        if(type === 'update' && todo){
            setTitle(todo.title)
            setSubtitle(todo.subtitle)
            setStartDate(todo.startDate)
            setEndDate(todo.endDate)


        }
        else{
            setTitle('')
            setSubtitle('')
            setStartDate('')
            setEndDate('')
            setStatus('incomplete')

        }
    }, [todo, type, modalOpen]);


    const handleSubmit = (event) => {
        event.preventDefault()
        if(title===''){
            toast.error('Укажите название задачи')
        }
        if(startDate===''){
            toast.error('Укажите дату начала задачи')
        }
        if(endDate===''){
            toast.error('Укажите дату конца задачи')
        }
        if(title && startDate && endDate){
            if(type==='add'){
                dispatch(addTodo({

                    id:uuid(),
                    title,
                    subtitle,
                    startDate,
                    endDate,
                    status: 'incomplete'

                }))
            toast.success("Задача сохранена!")
            setModalOpen(false);
            }

            if(type==='update'){
                if(todo.title !== title || todo.subtitle !== subtitle || todo.startDate !== startDate || todo.endDate !== endDate ){
                    dispatch(updateTodo({
                        ...todo,
                        title,
                        subtitle,
                        startDate,
                        endDate,


                    }))
                }
                else{
                    toast.error('Нет никаких изменений!')
                }
            }
            setModalOpen(false);
        }


    }


    return (
        <>
            {modalOpen && (
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <div
                            className={styles.closeButton}
                            onClick={()=>setModalOpen(false)}
                            onKeyDown={()=>setModalOpen(false)}
                            tabIndex={0}
                            role="button"
                        >
                            <MdOutlineClose />
                        </div>
                        <form
                            className={styles.form}
                            onSubmit={e=>handleSubmit(e)}
                        >
                            <h1 className={styles.formTitle}>{type==='update'? 'Редактировать' : 'Добавить'} задачу</h1>
                            <label htmlFor="title">
                                Заголовок
                                <input type="text" id="title" value={title} onChange={e=>setTitle(e.target.value)}/>
                            </label>
                            <label htmlFor="subtitle">
                                Описание
                                <textarea
                                    style={{width: "100%", boxSizing: 'border-box', resize: 'none'}}
                                    type="text"
                                    id="subtitle"
                                    rows="5"
                                    value={subtitle}
                                    onChange={e=>setSubtitle(e.target.value)}
                                />
                            </label>
                            <label htmlFor="startDate">
                                Начало
                                <input name="startDate" id="startDate" type="date" min={today()} value={startDate} onChange={(e) => {
                                    setStartDate(e.target.value)
                                    if(startDate >= endDate){
                                        setEndDate(e.target.value)
                                    }
                                }}/>
                            </label>
                            <label htmlFor="endDate">
                                Конец
                                <input name="endDate" id="endDate" type="date" min={startDate} value={startDate>endDate?startDate:endDate} onChange={e => setEndDate(e.target.value)} />
                            </label>

                            <div className={styles.buttonContainer}>
                                <Button type="submit"
                                        variant="primary"
                                >
                                    {type==='update'? 'Редактировать' : 'Добавить'}</Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={()=>setModalOpen(false)}
                                    onKeyDown={()=>setModalOpen(false)}
                                >
                                    Выйти</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
};

export default TodoModal;
