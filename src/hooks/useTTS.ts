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
      return;
    }

    try {
      // Stop any ongoing speech first
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // High-quality native English
      utterance.rate = 0.88; // Calm, clear tempo for primary school children
      utterance.pitch = 1.05; // Pleasant, friendly tone

      // Pick the best natural English voice available on device (Siri, Google US English, Samantha, etc.)
      const voices = voicesRef.current.length > 0 ? voicesRef.current : (window.speechSynthesis.getVoices() || []);
      const englishVoice = voices.find(
        (v) =>
          (v.lang === 'en-US' || v.lang.startsWith('en')) &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel') || v.default)
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('Speech error:', e.error);
        }
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      setIsSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking, isSupported };
};
