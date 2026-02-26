import { useState, useEffect } from 'react';
import {
  getKhatamPlan,
  saveKhatamPlan,
  clearKhatamPlan,
} from '../lib/quranTrackerService';

const TOTAL_AYAT_QURAN = 6236;

// Hitung sisa hari Ramadhan dari kalender Hijriah (null = bukan Ramadhan)
const getRamadhanDaysLeft = () => {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      timeZone: 'Asia/Jakarta',
    });
    const parts = formatter.formatToParts(new Date());
    const hijriDay = parseInt(parts.find(p => p.type === 'day')?.value || '0', 10);
    const hijriMonth = parseInt(parts.find(p => p.type === 'month')?.value || '0', 10);
    if (hijriMonth === 9) return Math.max(1, 30 - hijriDay + 1);
    return null;
  } catch {
    return null;
  }
};

// Function untuk mengelola logika, kalkulasi, dan rekomendasi program khatam
export const useKhatamPlan = () => {
  const [khatamPlan, setKhatamPlan] = useState(null);
  const [stats, setStats] = useState(null);

  // Function untuk memuat data dari storage
  const loadPlan = () => {
    const plan = getKhatamPlan();
    setKhatamPlan(plan);
    if (plan) calculateStats(plan);
  };

  // Function untuk menghitung sisa target dan rekomendasi
  const calculateStats = (plan) => {
    const startDate = new Date(plan.startDate);
    const today = new Date();
    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    // Hitung sisa hari: gunakan sisa Ramadhan jika sedang Ramadhan, otherwise dari targetDays
    const ramadhanLeft = getRamadhanDaysLeft();
    const daysFromTarget = Math.max(1, plan.targetDays - daysElapsed);
    const daysRemaining = ramadhanLeft !== null
      ? ramadhanLeft  // selalu sync dengan sisa Ramadhan
      : daysFromTarget;

    const ayatRemaining = Math.max(0, TOTAL_AYAT_QURAN - plan.progressAyat);

    const targetAyatPerDay = Math.ceil(ayatRemaining / daysRemaining);
    const expectedProgress = Math.ceil(
      (TOTAL_AYAT_QURAN / plan.targetDays) * daysElapsed,
    );

    let status = 'ON_TRACK';
    let recommendation = '';

    if (plan.progressAyat < expectedProgress - 50) {
      status = 'BEHIND';
      recommendation = `Target harianmu naik menjadi ${targetAyatPerDay} ayat. Coba bagi waktu membaca setelah setiap shalat wajib (sekitar ${Math.ceil(targetAyatPerDay / 5)} ayat per shalat).`;
    } else if (plan.progressAyat > expectedProgress + 50) {
      status = 'AHEAD';
      recommendation = `MasyaAllah, bacaanmu lebih cepat dari target! Kamu bisa mempertahankan ritme santai ini.`;
    } else {
      status = 'ON_TRACK';
      recommendation = `Konsistensi yang hebat! Tetap pertahankan membaca sekitar ${targetAyatPerDay} ayat setiap harinya.`;
    }

    setStats({
      daysRemaining,
      ayatRemaining,
      targetAyatPerDay,
      status,
      recommendation,
      percentage: ((plan.progressAyat / TOTAL_AYAT_QURAN) * 100).toFixed(1),
      isRamadhan: ramadhanLeft !== null,
    });
  };

  // Function untuk membuat rencana khatam baru (atau update targetDays jika sudah ada)
  const createPlan = (targetDays) => {
    const existing = getKhatamPlan();
    const newPlan = {
      targetDays,
      progressAyat: existing?.progressAyat ?? 0,
      // Pertahankan startDate jika plan sudah ada, buat baru jika belum
      startDate: existing?.startDate || new Date().toISOString(),
    };
    saveKhatamPlan(newPlan);
  };

  // Function untuk menghapus rencana khatam
  const removePlan = () => {
    clearKhatamPlan();
    setKhatamPlan(null);
    setStats(null);
  };

  useEffect(() => {
    loadPlan();

    const handleStorageUpdate = () => loadPlan();
    window.addEventListener('khatam_plan_updated', handleStorageUpdate);

    return () => {
      window.removeEventListener('khatam_plan_updated', handleStorageUpdate);
    };
  }, []);

  return { khatamPlan, stats, createPlan, removePlan, reloadPlan: loadPlan };
};
