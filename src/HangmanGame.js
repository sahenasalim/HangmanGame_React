
import React, { useState, useEffect } from "react";
import HangmanCanvas from "./HangmanCanvas";
import "./HangmanGame.css"; 

const words = ["ALGORITHM", "DATA", "ANALYTICS", "MACHINE LEARNING",  "DEEP LEARNING", "NEURAL NETWORK", "COMPUTER VISION", "NLP", "ROBOTICS",
    "CODING", "PROGRAMMING", "SOFTWARE", "HARDWARE", "DEVELOPMENT",  "WEB", "MOBILE", "APP", "CLOUD", "SERVER",
    "BLOCKCHAIN", "CRYPTOCURRENCY", "SMART CONTRACT", "DECENTRALIZED", "DAPP", "IOT", "INTERNET OF THINGS", "SMART HOME", "WEARABLES", "CONNECTIVITY",
    "VIRTUAL REALITY", "AUGMENTED REALITY", "MIXED REALITY", "GAMING", "SIMULATION",
    "BIG DATA", "DATA SCIENCE", "DATA ENGINEERING", "DATA VISUALIZATION", "DATABASE",  "CYBERSECURITY", "INFOSEC", "PENTESTING", "ETHICAL HACKING", "SECURITY",
     "USER INTERFACE", "USER EXPERIENCE", "DESIGN",  "AGILE", "SCRUM", "KANBAN", "LEAN", "DEVOPS",
    "VERSION CONTROL", "GIT", "GITHUB", "BITBUCKET", "SVN",  "CONTINUOUS INTEGRATION",  "AUTOMATION", "PIPELINE", "TESTING",
    "ALERT", "NOTIFICATION", "MONITORING", "ALERTING", "INCIDENT",  "SUPPORT", "TROUBLESHOOTING", "DEBUGGING", "ISSUE TRACKING", "TICKET",
    "DOCUMENTATION", "WIKI", "KNOWLEDGE BASE",  "API", "SDK", "LIBRARY", "FRAMEWORK", "MODULE",
    "SCALABILITY", "PERFORMANCE", "EFFICIENCY", "OPTIMIZATION", "LOAD BALANCING",
    "ARCHITECTURE", "MICROSERVICES", "SERVICE ORIENTED", "SERVERLESS", "CONTAINERIZATION",
    "VIRTUALIZATION", "DOCKER", "KUBERNETES", "CONTAINER", "ORCHESTRATION",
    "AGILITY", "ITERATION", "INCREMENTAL", "SPRINT", "RELEASE", "VERSIONING", "BACKEND", "FRONTEND", "FULL STACK", "STACK",
    "LANGUAGES", "FRAMEWORKS", "TOOLS", "TECHNIQUES", "PATTERNS", "ALGORITHMS", "DATA STRUCTURES",
     "COMPUTATION", "COMPLEXITY", "PROBLEM SOLVING", "API", "GUI", "IDE", "CLI", "CSS",   "HTML", "JSON", "XML", "SQL",
    "PHP", "JAVA", "PYTHON", "RUBY", "SWIFT", "RUST", "KOTLIN", "TYPESCRIPT", "BASH", "SHELL", "PERL", "LUA", "MATLAB"];


const HangmanGame = () => {
	const [word, setWord] = useState("");
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [mistakes, setMistakes] = useState(0);

	useEffect(() => {
		resetGame();
	}, []);

	const chooseRandomWord = () => {
		const randomIndex = Math.floor(Math.random() * words.length);
		return words[randomIndex].toUpperCase();
	};

	const handleGuess = (letter) => {
		if (!guessedLetters.includes(letter)) {
			setGuessedLetters([...guessedLetters, letter]);
			if (!word.includes(letter)) {
				setMistakes(mistakes + 1);
			}
		}
	};

	const isGameWon = () => {
		return word
			.split("")
			.every((letter) => guessedLetters.includes(letter));
	};

	const isGameLost = () => {
		return mistakes >= 6;
	};

	const resetGame = () => {
		setWord(chooseRandomWord());
		setGuessedLetters([]);
		setMistakes(0);
	};

	return (
		<div className="hangman-container">
			<div class="game-introduction">
    <h2>Welcome to Hangman!</h2>
    <p>Hangman is a thrilling word-guessing game. Your objective is to guess the hidden word by suggesting letters. Every incorrect guess brings you closer to completing the hangman figure. But don't worry, you have multiple chances to get it right!</p>
    </div>
    

			<HangmanCanvas mistakes={mistakes} />
			<div className="word-display">
				{word.split("").map((letter, index) => (
					<span key={index} className="letter">
						{guessedLetters.includes(letter) ? letter : "_"}
					</span>
				))}
			</div>
            <div class="keyboard-container">
			<div className="keyboard">
				{Array.from(Array(26)).map((_, index) => (
					<button
						key={index}
						onClick={() =>
							handleGuess(String.fromCharCode(65 + index))
						}
						disabled={guessedLetters.includes(
							String.fromCharCode(65 + index)
						)}
					>
						{String.fromCharCode(65 + index)}
					</button>
				))}
			</div>
            </div>
			{isGameWon() && <p className="result-message">You won!</p>}
			{isGameLost() && (
				<p className="result-message">You lost! The word was: {word}</p>
			)}
			<button className="new-game-button" onClick={resetGame}>
				New Game
			</button>
		</div>
	);
};

export default HangmanGame;
