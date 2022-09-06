import React, {useState} from 'react';
import Button, {SelectButton} from "./Button";
import styles from '../styles/modules/app.module.scss'
import TodoModal from "./TodoModal";
import {useDispatch, useSelector} from "react-redux";
import {updateFilterStatus} from "../slices/todoSlices";


const AppHeader = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const filterStatus = useSelector((state)=>state.todo.filterStatus)
    const dispatch = useDispatch();
    const updateFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value))
    }
    return (
        <div className={styles.appHeader}>
            <Button
                type='button'
                variant='primary'
                onClick={()=>setModalOpen(true)}
            >
                Добавить</Button>
            <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
                <option value="all">Все</option>
                <option value="incomplete">Не выполнено</option>
                <option value="complete">Выполнено</option>
            </SelectButton>
            <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}></TodoModal>
        </div>
    );
};

export default AppHeader;
