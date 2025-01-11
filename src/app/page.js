"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.scss'
import SplashScreen from "./components/splashscreen/component";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Убедимся, что выполняется на клиенте
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setShowSplash(false);

        // Проверка наличия login в localStorage
        const isLoggedIn = localStorage.getItem("login");
        if (isLoggedIn) {
          router.replace("/leaderboard");
        } else {
          router.replace("/login");
        }
      }, 2500); // Задержка 3 секунды

      return () => clearTimeout(timer); // Очистка таймера
    }
  }, [router]);

  return (
    <div className={styles['container']}>
      <SplashScreen/>
    </div>
  );
}

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#282c34",
//   },
//   splash: {
//     textAlign: "center",
//     color: "white",
//   },
//   text: {
//     fontSize: "2rem",
//     animation: "fade-in 3s ease-in-out",
//   },
// };

