import React from 'react';
import styles from '../styles/modules/pagination.module.scss'
const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    let pages = []
    for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }
    const handleClick = (e)=>{
        let foo = document.querySelectorAll("a");

        for (let i = 0; i < foo.length; i++) {
            foo[i].classList.remove("active");
        }
        e.currentTarget.classList.add("active");
    }

    return (
        <div className={styles.content}>
            {pages.map((page, index)=>
                    <a className={styles.a_wrapper} onClick={(e)=> {
                        setCurrentPage(page)
                        handleClick(e)
                    }} key={index}>{page}</a>
        )}

        </div>
    );
};

export default Pagination;
