"use client";

import React, { useEffect, useState } from "react";
import styles from './component.module.scss'

function UserComponent({ user, rank }) {
  // Получаем логин авторизованного пользователя из localStorage
  const loggedInUser = localStorage.getItem("login");

  // Проверяем, совпадает ли логин пользователя с авторизованным
  const isLoggedInUser = loggedInUser === user.login;

  let borderColor = "";

  if (rank === 1) {
    borderColor = "1px solid #154DE0"; // Золотой фон для первого пользователя
  } else if (rank === 2) {
    borderColor = "1px solid #154DE0"; // Серебряный фон для второго пользователя
  } else if (rank === 3) {
    borderColor = "1px solid #154DE0"; // Бронзовый фон для третьего пользователя
  } else {
    borderColor = "1px solid #fff";
  }

  // Состояния для отслеживания положения и закрепления пользователя


  // Функция для отслеживания прокрутки


  return (
    <div
      id={user.login}
      className={styles['user-item']}
      style={{
        border: isLoggedInUser ? '1px solid #154DE0' : borderColor,
        position: isLoggedInUser ? 'sticky' : 'relative',
        top: '0',
        bottom: '0',
        zIndex: isLoggedInUser && '9999', 
      }}
    >
      <div className={styles['user-group']}>
        <div className={styles['rank']}>{rank}</div>
        <div className={styles['user-info']}>
          <div className={styles['name']}>{user.name}</div>
          <div className={styles['group']}>{user.group}</div>
        </div>
      </div>
      <div className={styles['score']}>{user.score}</div>
    </div>
  );
}

export default UserComponent;
