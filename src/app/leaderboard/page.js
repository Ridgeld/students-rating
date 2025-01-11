// "use client";
// import { useEffect, useState } from 'react';

// function DataRequestPage() {
//     const [error, setError] = useState(null);
//     const [authData, setAuthData] = useState(null); // Для хранения данных авторизации
//     const [personalCardData, setPersonalCardData] = useState(null);

//     // Получение данных авторизации
//     useEffect(() => {
//         const fetchAuthData = async () => {
//             try {
//                 const response = await fetch('/api/proxy', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         route: 'enticate',
//                         data: { token: 'f34ea79e-d229-496f-95f5-a40c5a91ee8f' },
//                     }),
//                 });

//                 const data = await response.json();

//                 if (!response.ok) {
//                     throw new Error(data.message || 'Ошибка получения данных авторизации');
//                 }

//                 setAuthData(data); // Сохраняем данные авторизации
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         fetchAuthData();
//     }, []);

//     // Запрос данных персональной карточки
//     const handlePersonalCardRequest = async () => {
//         if (!authData || !authData.data || !authData.data.uid || !authData.data.gid) {
//             setError('UID или GID отсутствуют в данных авторизации');
//             return;
//         }

//         try {
//             const personalCardResponse = await fetch('/api/proxy', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     route: 'personalcard',
//                     data: {
//                         id: authData.data.uid, // Используем UID из данных авторизации
//                         gid: authData.data.gid, // Используем GID из данных авторизации
//                     },
//                 }),
//             });

//             const personalCardData = await personalCardResponse.json();

//             if (!personalCardResponse.ok) {
//                 throw new Error(personalCardData.message || 'Ошибка получения данных персональной карточки');
//             }

//             console.log('Personal Card Data:', personalCardData);
//             setPersonalCardData(personalCardData); // Сохраняем данные персональной карточки
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
//             {personalCardData && (
//                 <div>
//                     <h2>Personal Card Data</h2>
//                     <pre>{JSON.stringify(personalCardData.SCORE[0], null, 2)}</pre>
//                 </div>
//             )}
//             <button onClick={handlePersonalCardRequest}>Получить персональную карточку</button>
//         </div>
//     );
// }

// export default DataRequestPage;
"use client";

import { useEffect, useState } from "react";
import LeaderboardTable from "../components/leaderbord/component";
import { useRouter } from "next/navigation";
import Header from "../components/header/component";
import styles from './page.module.scss'

function LeaderboardPage() {
  const [error, setError] = useState(null);
  const [authData, setAuthData] = useState(null);

  const [leaderboard, setLeaderboard] = useState(() => {
    // Получаем кэшированные данные из localStorage при загрузке
    const cachedData = localStorage.getItem("leaderboard");
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const router = useRouter();

  

  const localLogin = localStorage.getItem("login");


  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {
      // Убираем анимацию через 1 секунду (длительность анимации CSS)
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetch("/api/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: "enticate",
            data: { token: "f34ea79e-d229-496f-95f5-a40c5a91ee8f" },
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Ошибка получения данных авторизации");
        }

        setAuthData(data);

        if (data.data && data.data.uid) {
          localStorage.setItem("uid", data.data.uid);
          await fetchAndUpdateFirestore(data.data.uid, data.data.gid);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/firestore/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Ошибка получения данных рейтинга");
        }

        setLeaderboard(data);

        // Кэшируем данные рейтинга
        localStorage.setItem("leaderboard", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAuthData();
    fetchLeaderboard();
  }, []);

  const fetchAndUpdateFirestore = async (uid, gid) => {
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "personalcard",
          data: { id: uid, gid: gid },
        }),
      });

      const personalCardData = await response.json();

      if (!response.ok) {
        throw new Error(personalCardData.message || "Ошибка получения данных SCORE");
      }

      const totalScore = personalCardData.SCORE.reduce((sum, item) => sum + (item.ball || 0), 0);

      await fetch("/api/firestore/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          score: totalScore,
          name: personalCardData.SCORE[0].s_fio,
          group: personalCardData.SCORE[0].p20,
          login: localLogin,
        }),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("login");
  //   router.push("/");
  // };

  return (
    <div className={styles['container']}>
      {isAnimating && <div className={styles['overlay']}></div>}
      <Header/>
      {/* {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>} */}
      <LeaderboardTable/>
    </div>
  );
}

export default LeaderboardPage;

