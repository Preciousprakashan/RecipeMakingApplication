import React, { useState } from "react";
import "./TextToSpeech.css";
import CopyToClipboard from "../CopytoClipboard/CopyToClipboard";



const TextToSpeech = ({ targetSelector }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const synth = window.speechSynthesis;
  let currentWordIndex = 0;

  const handleSpeakPauseResume = () => {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
      console.error(`Element with selector "${targetSelector}" not found.`);
      return;
    }

    if (isSpeaking) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
        return;
      }
      synth.pause();
      setIsPaused(true);
      return;
    }

    const childElements = targetElement.querySelectorAll("*");

    childElements.forEach((child) => {
      if (!child.hasAttribute("data-original-html")) {
        child.setAttribute("data-original-html", child.innerHTML); // Save original structure
      }
      if (child.tagName.toLowerCase() === "ul") {
        return; // Skip altering <ul> and <li>
      }

      const textContent = child.innerText;
      const allWords = textContent.split(/\s+/); // Split into words
      const wordsArray = allWords.map((word) => `<span>${word}</span>`).join(" ");
      child.innerHTML = wordsArray; // Wrap words
    });

    const utterance = new SpeechSynthesisUtterance(targetElement.innerText);
    utterance.rate = speechSpeed;

    const highlightWord = (index) => {
      const allWords = targetElement.querySelectorAll("span");
      allWords.forEach((word) => {
        word.style.backgroundColor = "";
        word.style.fontWeight = "";
      });

      const currentWord = allWords[index];
      if (currentWord) {
        currentWord.style.backgroundColor = "yellow"; // Highlight the current word
        currentWord.style.fontWeight = "bold"; // Optionally, make the word bold
      }
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        currentWordIndex++;
        highlightWord(currentWordIndex);
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      currentWordIndex = 0;

      childElements.forEach((child) => {
        const originalHtml = child.getAttribute("data-original-html");
        if (originalHtml) {
          child.innerHTML = originalHtml; // Restore original structure
        }
      });
    };

    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const handleStop = () => {
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    currentWordIndex = 0;

    const targetElement = document.querySelector(targetSelector);
    const childElements = targetElement.querySelectorAll("*");
    childElements.forEach((child) => {
      const originalHtml = child.getAttribute("data-original-html");
      if (originalHtml) {
        child.innerHTML = originalHtml; // Restore original structure
      }
    });
  };

  return (
    <div className="container">
      <CopyToClipboard targetSelector="#instructions" />
      <div
        className={`btn ${isSpeaking ? (isPaused ? "play" : "pause") : "play"}`}
        aria-pressed={isSpeaking ? (isPaused ? "true" : "false") : "false"}
        onClick={handleSpeakPauseResume}
      >
        <span className="bar bar-1"></span>
        <span className="bar bar-2"></span>
      </div>

      <div className="btn stop" onClick={handleStop}>
        <span className="box"></span>
      </div>

      <div style={{ fontSize: "16px", textAlign: "center", }}>
        <label htmlFor="speed" style={{ marginRight: "10px" }}>
          Speed:
        </label>
        <input
          type="range"
          id="speed"
          min="0.5"
          max="2"
          step="0.1"
          value={speechSpeed}
          onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
        />
        <span style={{ marginLeft: "10px" }}>{speechSpeed}x</span>
      </div>
      
    </div>
  );
};

export default TextToSpeech;
