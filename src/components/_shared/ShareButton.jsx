'use client';

import { useState, useCallback } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';

/**
 * ShareButton — tombol share universal untuk ayat, doa, hadits, atau quote.
 *
 * Props:
 *   text: string   — teks yang akan di-share
 *   label?: string — label opsional di atas text (misal: "QS. Al-Baqarah: 255")
 *   className?: string
 */
const ShareButton = ({ text, label, className = '' }) => {
  const [state, setState] = useState('idle'); // idle | copied | shared

  const handleShare = useCallback(async () => {
    const fullText = label ? `${label}\n\n${text}\n\n— MyRamadhan App` : `${text}\n\n— MyRamadhan App`;

    // Gunakan Web Share API jika tersedia (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ text: fullText });
        setState('shared');
        setTimeout(() => setState('idle'), 2000);
      } catch {
        // User cancel share — tidak perlu fallback
      }
      return;
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(fullText);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('idle');
    }
  }, [text, label]);

  return (
    <button
      onClick={handleShare}
      className={`btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
        state === 'copied'
          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
          : state === 'shared'
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
      } ${className}`}
      aria-label='Bagikan'
    >
      {state === 'copied' ? (
        <><Check size={13} /> Tersalin</>
      ) : state === 'shared' ? (
        <><Check size={13} /> Dibagikan</>
      ) : (
        <><Share2 size={13} /> Bagikan</>
      )}
    </button>
  );
};

export default ShareButton;
