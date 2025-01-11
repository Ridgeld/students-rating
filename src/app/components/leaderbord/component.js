"use client";

import { useEffect, useRef, useState } from "react";
import UserComponent from "../user-element/component";
import SearchInput from "../inputs/search/component";
import styles from './component.module.scss'

function LeaderboardTable() {
  const [users, setUsers] = useState([]); // Исходный список пользователей
  const [filteredUsers, setFilteredUsers] = useState([]); // Фильтрованный список
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedUser, setHighlightedUser] = useState(null); // Для выделения пользователя

  const containerRef = useRef(null);

  // Функция для фильтрации пользователей по запросу
  const filterUsers = (query) => {
    if (!query) {
      setFilteredUsers(users); // Если нет запроса, показываем исходный список
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = users.filter((user) => {
        return (
          (user.login && user.login.toLowerCase().includes(lowerCaseQuery)) ||
          (user.name && user.name.toLowerCase().includes(lowerCaseQuery)) ||
          (user.group && user.group.toLowerCase().includes(lowerCaseQuery)) ||
          (user.score && user.score.toString().includes(lowerCaseQuery)) ||
          (user.rank && user.rank.toString().includes(lowerCaseQuery))
        );
      });
      setFilteredUsers(filtered); // Отображаем отфильтрованный список
    }
  };

  // Обработчик изменения значения в input для поиска
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterUsers(query);

    // Найдем пользователя, который соответствует запросу
    if (query) {
      const user = users.find((user) => {
        return (
          (user.login && user.login.toLowerCase().includes(query.toLowerCase())) ||
          (user.name && user.name.toLowerCase().includes(query.toLowerCase())) ||
          (user.group && user.group.toLowerCase().includes(query.toLowerCase())) ||
          (user.score && user.score.toString().includes(query)) || 
          (user.rank && user.rank.toString().includes(query))
        );
      });
      setHighlightedUser(user); // Выделяем этого пользователя
    } else {
      setHighlightedUser(null); // Если поиск очищен, сбрасываем выделение
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("leaderboardData");

    if (cachedData) {
      const cachedUsers = JSON.parse(cachedData);
      setUsers(cachedUsers); // Сохраняем все пользователи
      setFilteredUsers(cachedUsers); // Показываем все пользователи
      setIsLoading(false); // Отображаем кэшированные данные сразу
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/firestore/leaderboard"); // Ваш API для получения данных
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Ошибка загрузки данных");
        }

        console.log("Полученные данные:", data.users);

        // Сортируем пользователей по баллам (по убыванию)
        const sortedUsers = data.users.sort((a, b) => b.score - a.score);

        // Сохраняем данные в localStorage
        localStorage.setItem("leaderboardData", JSON.stringify(sortedUsers));
        setUsers(sortedUsers); // Сохраняем отсортированный список
        setFilteredUsers(sortedUsers); // Показываем отсортированный список
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles['container']}>
      <style>{`
                ::-webkit-scrollbar {
                  width: 10px; /* Ширина ползунка */
                }

                /* Стилизация ползунка скроллбара */
                ::-webkit-scrollbar-thumb {
                  background: #fff; /* Цвет ползунка */
                  border-radius: 5px; /* Закругление углов ползунка */
                  cursor: pointer;
                }

                /* Стилизация фона скроллбара */
                ::-webkit-scrollbar-track {
                  background-color: rgba($color: #000000, $alpha: 0.3); /* Цвет фона */
                }
            `}</style>
      <div className={styles['component-container']}>
        <SearchInput 
          value={searchQuery} 
          placeholder={'Поиск'}
          onChange={handleSearchChange} />
      </div>
      <div className={styles['users-container']}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : filteredUsers.length > 0 ? (
          <div className={styles['filterer-container']} ref={containerRef}>
            {filteredUsers.map((user, index) => (
              <UserComponent
                key={user.login}
                user={user}
                containerRef={containerRef}
                rank={users.findIndex((u) => u.login === user.login) + 1} // Позиция сохраняется по порядку исходного списка
                isHighlighted={highlightedUser?.login === user.login} // Выделяем карточку
              />
            ))}
          </div>
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>
    </div>
  );
}

export default LeaderboardTable;
