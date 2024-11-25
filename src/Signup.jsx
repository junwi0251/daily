import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // CSS 모듈 활용

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const signupData = { username, email, phone, password, birthdate };

        try {
            const response = await axios.post('http://122.202.46.151:54321/api/signup', signupData);
            console.log('회원가입 성공:', response.data);

            navigate('/welcome');
        } catch (error) {
            console.error('회원가입 실패:', error);
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const formatPhoneNumber = (value) => {
        const cleaned = ('' + value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return value;
    };

    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
    };

    return (
        <div id="background" className={styles.background}>
            <div className={styles.container}>
                <h2>회원가입</h2>
                <form onSubmit={handleSignup} autoComplete="off" className={styles.form}>
                    <div className={styles['form-group']}>
                        <label htmlFor="username">아이디</label>
                        <input 
                            type="text" 
                            id="username" 
                            required 
                            autoComplete="off" 
                            minLength="4" 
                            maxLength="20" 
                            title="아이디는 4자 이상 20자 이하로 입력하세요." 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="email">이메일</label>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            autoComplete="off" 
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                            title="유효한 이메일 주소를 입력하세요." 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="phone">전화번호</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            required 
                            autoComplete="off" 
                            pattern="^\d{3}-\d{3,4}-\d{4}$" 
                            title="전화번호는 000-0000-0000 형식으로 입력하세요." 
                            value={phone}
                            onChange={handlePhoneChange} 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="birthdate">생년월일</label>
                        <input 
                            type="date" 
                            id="birthdate" 
                            required 
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)} 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="password">비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            autoComplete="new-password" 
                            pattern="(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}" 
                            title="비밀번호는 최소 8자 이상이며, 숫자와 특수 문자를 포함해야 합니다." 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="confirm-password">비밀번호 확인</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            required 
                            autoComplete="new-password" 
                            pattern="(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}" 
                            title="비밀번호는 최소 8자 이상이며, 숫자와 특수 문자를 포함해야 합니다." 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>회원가입</button>
                </form>
                <p className={styles.signup}>
                    이미 회원이신가요? <a href="/login">로그인</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
