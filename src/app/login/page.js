"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../components/buttons/primary/component';
import DefaultInput from '../components/inputs/text/component';
import styles from './page.module.scss'

function LoginForm() {
    const [login, setLogin] = useState('');
    const [error, setError] = useState(null);
    const [authData, setAuthData] = useState(null);
    const router = useRouter();

    const [isAnimating, setIsAnimating] = useState(true);
    useEffect(() => {
        // Убираем анимацию через 1 секунду (длительность анимации CSS)
        const timer = setTimeout(() => setIsAnimating(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleAuthSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setAuthData(null);

        const escapedLogin = login.replace(/\\/g, '\\');

        try {
            const authResponse = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    route: 'auth',
                    data: { login: escapedLogin, password: escapedLogin },
                }),
            });

            const authData = await authResponse.json();

            if (!authResponse.ok) {
                throw new Error(authData.message || 'Неверные учетные данные');
            }

            setAuthData(authData);
            localStorage.setItem('login', escapedLogin);
            router.replace("/leaderboard")
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles['container']}>
            {isAnimating && <div className={styles['overlay']}></div>}
            <div className={styles['greeting-block']}>
                <h1 className={styles['title']}>Привет!</h1>
                <h2 className={styles['subtitle']}>Для участия необходимо войти</h2>
            </div>
            <form onSubmit={handleAuthSubmit} className={styles['action-block']}>
                <div className={styles['component-block']}>
                    <DefaultInput 
                        placeholder={'Логин'}
                        type={'text'}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required={true}/>
                </div>
                <div className={styles['component-block']}>
                    <PrimaryButton 
                        name={'Войти'} 
                        type={'submit'} />
                </div>
            </form>
            <div className={styles['bottom-block']}></div>
        </div>
    );
}

export default LoginForm;
