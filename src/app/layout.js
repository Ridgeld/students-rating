import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './layout.module.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <div className={styles['wrapper']}>
          <div className={styles['content']}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
