import React from 'react';
import { useAuth } from './AuthContext'; // AuthContext에서 로그인 상태 가져오기
import styles from './Home.module.css'; // CSS 모듈 활용

const Home = () => {
    const { user } = useAuth(); // AuthContext에서 현재 로그인한 사용자 정보 가져오기

    return (
        <div className={styles['home-container']}>
            {/* 좌측 사이드바 */}
            <div className={styles.sidebar}>
                <div className={styles.buttons}>
                    <button>Button</button>
                    <button>Button</button>
                </div>
                <div className={styles.calendar}>
                    {/* 달력 (간단한 날짜 레이아웃) */}
                    <ul>
                        <li>m</li><li>t</li><li>w</li><li>t</li><li>f</li><li>s</li><li>s</li>
                        <li>01</li><li>02</li><li>03</li><li>04</li><li>05</li><li>06</li><li>07</li>
                        {/* 추가적인 날짜 */}
                    </ul>
                </div>
            </div>

            {/* 상단 바 */}
            <div className={styles['top-bar']}>
                <div className={styles['date-display']}>01-07 2022</div>
                <div className={styles['view-options']}>
                    <select>
                        <option>Week</option>
                        <option>Month</option>
                    </select>
                </div>
                <div className={styles.actions}>
                    <button>이벤트 추가</button>
                </div>
            </div>

            {/* 로그인 상태 표시 */}
            <div className={styles['user-status']}>
                {user ? <p>로그인 상태입니다: {user.username}</p> : <p>로그인되지 않았습니다.</p>}
            </div>

            {/* 메인 캘린더 영역 */}
            <div className={styles['calendar-grid']}>
                {[...Array(24)].map((_, i) => (
                    <div key={i} className={styles['time-row']}>
                        <span className={styles['time-label']}>{`${String(i).padStart(2, '0')}:00`}</span>
                        <div className={styles['time-cell']}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
