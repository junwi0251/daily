import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // AuthContext 임포트
import styles from './Login.module.css'; // CSS 모듈 임포트

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const loginData = { username, password };
        console.log('로그인 데이터:', loginData);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('로그인에 실패했습니다.');
            }

            const data = await response.json();
            console.log('로그인 성공:', data);

            login();
            navigate('/sidebar');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="background" className={styles.background}>
            <div className={styles.container}>
                <h2>로그인</h2>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles['form-group']}>
                        <label htmlFor="username">아이디</label>
                        <input 
                            type="text" 
                            id="username" 
                            required 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength="4" 
                            maxLength="20" 
                            title="아이디는 4자 이상 20자 이하로 입력하세요." 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="password">비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>로그인</button>
                </form>
                <p className={styles.signup}>
                    아직 회원이 아니신가요? <a href="/signup">회원가입</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
