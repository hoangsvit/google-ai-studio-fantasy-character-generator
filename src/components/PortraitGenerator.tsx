import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Wand2, Image as ImageIcon, Eye, Loader2 } from 'lucide-react';
import { FantasyCharacter } from '../types';
import { CHARACTER_CLASSES } from '../data/fantasyData';

interface PortraitGeneratorProps {
  character: FantasyCharacter;
  onPortraitGenerated?: (imageUrl: string) => void;
}

export const PortraitGenerator: React.FC<PortraitGeneratorProps> = ({
  character,
  onPortraitGenerated,
}) => {
  const [loading, setLoading] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState<string | undefined>(character.aiPortraitUrl);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const classInfo = CHARACTER_CLASSES[character.characterClass];

  const generatePortrait = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterClass: character.characterClass,
          race: character.race,
          fullName: character.fullName,
          title: character.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Portrait request failed');
      }

      const data = await response.json();
      if (data.imageUrl) {
        setPortraitUrl(data.imageUrl);
        if (onPortraitGenerated) {
          onPortraitGenerated(data.imageUrl);
        }
      } else {
        throw new Error('No image returned');
      }
    } catch (err) {
      console.error('Failed to generate portrait:', err);
      setErrorMsg('Could not render cartoon portrait. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950/70 border border-slate-800 p-4 flex flex-col gap-3">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Cartoon Video-Game Portrait
          </h3>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${classInfo.themeColor.badge}`}>
          {character.characterClass}
        </span>
      </div>

      {/* Portrait Display / Loading Canvas */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-slate-800/90 bg-slate-900/80 flex items-center justify-center group">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/90 text-center gap-3"
            >
              <div className="relative">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-ping" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">
                  Crafting {character.characterClass} Portrait...
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Stylizing cartoon hero art & class gear
                </p>
              </div>
            </motion.div>
          ) : portraitUrl ? (
            <motion.div
              key="portrait"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <img
                src={portraitUrl}
                alt={`${character.fullName} Cartoon Portrait`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-[11px] font-medium text-slate-200 backdrop-blur-sm bg-slate-900/60 px-2 py-1 rounded">
                  {character.characterClass} Cartoon Hero
                </span>
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="p-1.5 rounded-lg bg-slate-800/90 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                  title="Expand Full View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center p-6 text-center text-slate-400 gap-2"
            >
              <div className="p-3 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700">
                <Wand2 className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-xs font-semibold text-slate-300">No Cartoon Portrait Generated</p>
              <p className="text-[11px] text-slate-500 max-w-[200px]">
                Click <span className="text-amber-400 font-medium">Generate Portrait</span> below to create a video-game cartoon avatar matching this {character.characterClass}.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {errorMsg && (
          <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-red-950/90 border border-red-800 text-[11px] text-red-200 text-center">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Two Action Buttons: Generate Portrait & Regenerate Portrait */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <button
          onClick={generatePortrait}
          disabled={loading}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            loading
              ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-400'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/20 active:scale-95'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          Generate Portrait
        </button>

        <button
          onClick={generatePortrait}
          disabled={loading}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
            loading
              ? 'opacity-50 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-400'
              : 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-200 hover:border-amber-500/50 active:scale-95'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Regenerate Portrait
        </button>
      </div>

      {/* Expand Modal Preview */}
      <AnimatePresence>
        {showPreviewModal && portraitUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreviewModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-lg w-full rounded-2xl border ${classInfo.themeColor.border} bg-slate-900 p-4 shadow-2xl overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {character.fullName}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {character.race} {character.characterClass} Portrait
                  </p>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
              </div>

              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={portraitUrl}
                  alt={`${character.fullName} Cartoon Video Game Portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span>Class: <strong className="text-slate-200">{character.characterClass}</strong></span>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    generatePortrait();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
