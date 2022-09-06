import React, {useState} from 'react';
import {useSelector} from "react-redux";
import TodoItem from "./TodoItem";
import styles from '../styles/modules/app.module.scss'
import Pagination from "./Pagination";


const AppContent = () => {
    const todoList = useSelector((state)=>state.todo.todoList)
    const filterStatus = useSelector((state)=>state.todo.filterStatus)
    const sortedTodoList = [...todoList]
    sortedTodoList.sort((a,b)=>new Date(b.time) - new Date(a.time))

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(15)
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const lastPage = Math.ceil(todoList.length/postsPerPage)
    const currentPosts = todoList.slice(firstPostIndex, lastPostIndex)

    const filteredTodoList = sortedTodoList.filter(item=>{
        if(filterStatus==='all'){
            return true
        }
        return item.status === filterStatus;
    })

    return (

    <>
        {
            filterStatus === 'all' && <Pagination totalPosts={todoList.length} postsPerPage={postsPerPage}
                                                  setCurrentPage={setCurrentPage}></Pagination>

        }
        {
            filterStatus === 'all' && <div className={styles.content__wrapper}>
                {filteredTodoList && filteredTodoList.length > 0
                    ? currentPosts.map((todo) => <TodoItem key={todo.id} todo={todo}/>)
                    : <p style={{fontSize: '20px', opacity: 0.7}}>Нет задач</p>
                }
                {lastPage === currentPage && <p>Конец списка</p>}
            </div>

        }
        {
            filterStatus !== 'all' && <div className={styles.content__wrapper}>
                {filteredTodoList && filteredTodoList.length > 0
                    ? filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo}/>)
                    : <p style={{fontSize: '20px', opacity: 0.7}}>Нет задач</p>
                }
                <p>Конец списка</p>
            </div>
        }

    </>

    );
};

export default AppContent;
