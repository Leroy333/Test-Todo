import './App.css';
import PageTitle from "./components/PageTitle";
import style from "./styles/modules/app.module.scss"
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";



function App() {
    const todoList = useSelector((state)=>state.todo.todoList)
    const [timeout, setTimeout] = useState(false)


    useEffect(() => {
            window.setTimeout(() => {
                setTimeout(true)
            }, 500)
            return () => {setTimeout(false)}

            return
        },
        [todoList.length]);






  return (
      <>
        <div>
            <PageTitle>Список задач</PageTitle>
            <div className={style.app__wrapper}>
                <AppHeader></AppHeader>
                {
                    timeout ? <AppContent></AppContent> : 'Синхронизация.....'
                }







            </div>
        </div>
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    fontSize: '1.4rem'
                }

            }}
        ></Toaster>
      </>
  );
}

export default App;
