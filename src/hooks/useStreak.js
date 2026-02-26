import { useState, useEffect } from 'react';
import localforage from 'localforage';
import dayjs from 'dayjs';

const TRACKER_KEYS = [
  'is_puasa','subuh','dzuhur','ashar','maghrib','isya','tarawih','quran','sedekah',
];

/**
 * Hitung streak (hari berturut-turut dengan minimal 1 ibadah selesai)
 * dari data ramadhan_tracker di localforage.
 */
export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [todayPercent, setTodayPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calc = async () => {
      try {
        const data = (await localforage.getItem('ramadhan_tracker')) || {};
        const today = dayjs().format('YYYY-MM-DD');

        // Kumpulkan semua tanggal yang punya minimal 1 ibadah selesai
        const doneDates = new Set(
          Object.entries(data)
            .filter(([, row]) => TRACKER_KEYS.some(k => row[k]))
            .map(([date]) => date)
        );

        // Hitung streak dari hari ini ke belakang
        let current = 0;
        let d = dayjs();
        while (true) {
          const key = d.format('YYYY-MM-DD');
          if (doneDates.has(key)) {
            current++;
            d = d.subtract(1, 'day');
          } else {
            break;
          }
        }

        // Hitung best streak sepanjang masa
        let best = 0;
        let run = 0;
        const sortedDates = [...doneDates].sort();
        for (let i = 0; i < sortedDates.length; i++) {
          if (i === 0) {
            run = 1;
          } else {
            const prev = dayjs(sortedDates[i - 1]);
            const curr = dayjs(sortedDates[i]);
            run = curr.diff(prev, 'day') === 1 ? run + 1 : 1;
          }
          if (run > best) best = run;
        }

        // Progress hari ini
        const todayRow = data[today] || {};
        const completed = TRACKER_KEYS.filter(k => todayRow[k]).length;
        const percent = Math.round((completed / TRACKER_KEYS.length) * 100);

        setStreak(current);
        setBestStreak(best);
        setTodayPercent(percent);
      } catch (e) {
        console.error('useStreak error:', e);
      } finally {
        setLoading(false);
      }
    };
    calc();
  }, []);

  return { streak, bestStreak, todayPercent, loading };
}
