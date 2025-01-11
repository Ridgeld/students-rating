"use client"
import SecondaryButton from '../buttons/secondary/component'
import Logo from '../logo/component';
import styles from './component.module.scss'
import { useRouter } from 'next/navigation';

function Header({}){
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("login");
        router.replace("/");
    };

    return (
        <header className={styles['header']}>
            <div className={styles['logo']}>
                <Logo/>
                <h6 className={styles['logo-title']}>
                    Рейтинг студентов
                </h6>
            </div>
            <SecondaryButton 
                icon={<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.80645 1H13V13H6.80645M9.12903 7H1M1 7L4.48387 3.625M1 7L4.48387 10.375" stroke="#154DE0"/>
                    </svg>}
                name={'Выйти'} 
                type={''}
                onClick={handleLogout}/>
        </header>
    )
}
export default Header