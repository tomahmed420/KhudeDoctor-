import { useState, useCallback, useEffect, useRef } from 'react';

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        try {
          voicesRef.current = window.speechSynthesis.getVoices() || [];
        } catch {
          voicesRef.current = [];
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Text-to-Speech is not supported in this browser');
      return;
    }

    try {
      // Stop any ongoing speech first
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD'; // Bengali (Bangladesh)
      utterance.rate = 0.9; // Friendly pacing for children
      utterance.pitch = 1.05; // Pleasant tone

      // Find Bengali voice if available (bn-BD, bn-IN, or containing 'bengali')
      const voices = voicesRef.current.length > 0 ? voicesRef.current : (window.speechSynthesis.getVoices() || []);
      const banglaVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('bn') ||
          v.name.toLowerCase().includes('bangla') ||
          v.name.toLowerCase().includes('bengali')
      );

      if (banglaVoice) {
        utterance.voice = banglaVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        // Ignored canceled errors which happen on new speak or modal close
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Failed to invoke speech synthesis:', err);
      setIsSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn('Failed to cancel speech synthesis:', err);
      }
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking, isSupported };
};
