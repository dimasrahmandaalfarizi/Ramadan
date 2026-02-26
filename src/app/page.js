'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

import useUser from '@/hooks/useUser';
import { studyMaterials } from '@/data/studyMaterials';
import { quotesData } from '@/data/quotes';

import useHijriDate from '@/hooks/useHijriDate';
import usePrayerTimes from '@/hooks/usePrayerTimes';
import useHeroMode from '@/hooks/useHeroMode';
import useNotifications from '@/hooks/useNotifications';
import useTrackerSummary from '@/hooks/useTrackerSummary';

import HomeHeader from '@/components/Home/HomeHeader';
import HeroCard from '@/components/Home/HeroCard';
import DailyGoalTracker from '@/components/Home/DailyGoalTracker';
import ToolGrid from '@/components/Home/ToolGrid';
import DailyKnowledge from '@/components/Home/DailyKnowledge';
import JurnalCard from '@/components/Home/JurnalCard';
import QuoteCard from '@/components/Home/QuoteCard';
import StreakCard from '@/components/Home/StreakCard';

import TrackerDrawer from '@/components/TrackerDrawer';
import ScheduleDrawer from '@/components/ScheduleDrawer';
import NotificationDrawer from '@/components/NotificationDrawer';

dayjs.locale('id');
dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * Halaman Beranda Utama Aplikasi MyRamadhan (App Router)
 * Bertugas mengoordinasikan seluruh state global untuk dashboard harian
 */
export default function MyRamadhanHome() {
  const { user } = useUser();

  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const [quoteOfTheDay, setQuoteOfTheDay] = useState(quotesData[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const { hijriDate, hijriDay } = useHijriDate();
  const { prayerTimes, userCity, fetchPrayerTimes } = usePrayerTimes();
  const { taskProgress, fetchTrackerSummary } = useTrackerSummary(user, true);
  const { notifications, hasUnreadNotif, markAsRead } = useNotifications(
    mounted,
    hijriDay,
    prayerTimes,
    currentTime,
  );

  const hero = useHeroMode(prayerTimes, currentTime);

  /**
   * Mengacak kutipan harian dengan animasi jeda
   */
  const randomizeQuote = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setQuoteOfTheDay(
        quotesData[Math.floor(Math.random() * quotesData.length)],
      );
      setIsSpinning(false);
    }, 500);
  };

  /**
   * Membuka laci notifikasi dan menandai semua sebagai telah dibaca
   */
  const handleOpenNotification = () => {
    setIsNotificationOpen(true);
    markAsRead();
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    randomizeQuote();
    fetchPrayerTimes();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user) {
      fetchTrackerSummary();
    }
  }, [user]);

  const dailyTopic =
    studyMaterials.find((m) => m.day === hijriDay) || studyMaterials[0];

  if (!mounted) return null;

  return (
    <main className='min-h-screen pb-24 transition-colors duration-300' style={{ background: 'var(--bg-page)' }}>

      {/* ── MAIN CONTAINER ── */}
      <div className='w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 pt-5 pb-4 md:px-6 md:pt-8 lg:px-8 lg:pt-10'>

        {/* Header */}
        <HomeHeader
          user={user}
          hijriDate={hijriDate}
          hasUnreadNotif={hasUnreadNotif}
          onOpenNotification={handleOpenNotification}
        />

        {/* ── BENTO GRID ── */}
        <div className='flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-6 animate-fadeUp'>

          {/* ── LEFT COLUMN ── */}
          <div className='flex-1 flex flex-col gap-4 md:gap-5 min-w-0'>
            {/* Hero */}
            <HeroCard
              hero={hero}
              userCity={userCity}
              onOpenSchedule={() => setIsScheduleOpen(true)}
            />

            {/* Daily Goal Tracker */}
            <DailyGoalTracker
              taskProgress={taskProgress}
              onClick={() => setIsTrackerOpen(true)}
            />

            {/* Streak */}
            <StreakCard />

            {/* Tool Grid */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-card)',
            }} className='rounded-[2rem] p-4 md:p-5'>
              <p className='text-[10px] uppercase tracking-widest font-bold mb-4'
                style={{ color: 'var(--text-muted)' }}>
                Fitur Islami
              </p>
              <ToolGrid />
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className='w-full lg:w-[340px] xl:w-[370px] shrink-0 flex flex-col gap-4 md:gap-5'>
            {/* Daily Knowledge + Jurnal — 2 kolom di tablet */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5'>
              <DailyKnowledge hijriDay={hijriDay} dailyTopic={dailyTopic} />
              <JurnalCard user={user} />
            </div>

            {/* Quote — full width di right col */}
            <QuoteCard
              quote={quoteOfTheDay}
              isSpinning={isSpinning}
              onRefresh={randomizeQuote}
            />
          </div>
        </div>
      </div>

      {/* SECTION: DRAWERS */}
      <TrackerDrawer
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        onUpdate={fetchTrackerSummary}
      />
      <ScheduleDrawer
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onUpdate={fetchPrayerTimes}
      />
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
      />
    </main>
  );
}
