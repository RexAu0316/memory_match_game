window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;
  const MemoryMatch = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isFlipped, setIsFlipped] = useState([]);
    const [backImage, setBackImage] = useState(`${assetsUrl}/back.png`);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    useEffect(() => {
      // Initialize the game cards
      const cardImages = [
        'mario.png', 'mario.png',
        'Toad.png', 'Toad.png',
        'Yoshi.png', 'Yoshi.png',
        'Luigi.png', 'Luigi.png',
      ];

    
      // Shuffle the cards
      const shuffledCards = cardImages.sort(() => Math.random() - 0.5).map((image, index) => ({
        image: `${assetsUrl}/${image}`,
        id: index,
        isFlipped: false,
      }));

    
      setCards(shuffledCards);
      setIsFlipped(shuffledCards.map(() => false)); // Initialize all cards as not flipped
    }, []);

    
    const handleCardClick = (card) => {
      // If the game hasn't started yet, start the game
      if (!gameStarted) {
        setGameStarted(true);
      }
      // If the card is already matched, do nothing
      if (matchedCards.includes(card.id)) return;
      // Flip the clicked card
      const newIsFlipped = [...isFlipped];
      newIsFlipped[card.id] = true;
      setIsFlipped(newIsFlipped);
      // If there are already two open cards, close them
      if (openCards.length === 2) {
        setOpenCards([]);
      }
      // Open the clicked card
      setOpenCards([...openCards, card.id]);
      // Check if the two open cards match
      if (openCards.length === 1 && openCards[0] === card.id) {
        setMatchedCards([...matchedCards, card.id, openCards[0]]);
        setScore(score + 1);
        // Check if the game is finished
        if (matchedCards.length === cards.length) {
          setGameFinished(true);
        }
      } else if (openCards.length === 2 && openCards[0] !== openCards[1]) {
        // Flip the cards back over after a short delay
        setTimeout(() => {
          const newIsFlipped = [...isFlipped];
          newIsFlipped[openCards[0]] = false;
          newIsFlipped[openCards[1]] = false;
          setIsFlipped(newIsFlipped);
          setOpenCards([]);
        }, 1500); // Increase the delay to 1.5 seconds
      }
    };
    return React.createElement(
      'div',
      { className: "memory-match" },
      React.createElement('h2', null, "Memory Match"),
      React.createElement('p', null, `Score: ${score}`),
      gameFinished
        ? React.createElement('p', null, "Congratulations! You've finished the game.")
        : React.createElement(
            'div',
            { className: "game-board" },
            cards.map((card, index) =>
              React.createElement(
                'div',
                {
                  key: index,
                  className: `card ${isFlipped[card.id] || matchedCards.includes(card.id) ? 'open' : ''}`,
                  onClick: () => handleCardClick(card)
                },
                React.createElement('img', { src: isFlipped[card.id] || matchedCards.includes(card.id) ? card.image : backImage, alt: `Card ${index}` })
              )
            )
          )
    );
  };
  return () => React.createElement(MemoryMatch, { assetsUrl: assetsUrl });
};
console.log('Memory Match script loaded');
