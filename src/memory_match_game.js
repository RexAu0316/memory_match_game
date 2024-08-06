window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const MemoryMatch = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
      // Initialize the game cards
      const cardImages = [
        'mario.png', 'mario.png',
        'toad.png', 'toad.png',
        'yoshi.png', 'yoshi.png',
        'luigi.png', 'luigi.png',
      ];

      // Shuffle the cards
      const shuffledCards = cardImages.sort(() => Math.random() - 0.5).map((image, index) => ({
        image: `${assetsUrl}/${image}`,
        id: index
      }));

      setCards(shuffledCards);
    }, [assetsUrl]);

    const handleCardClick = (card) => {
      // If the card is already matched, do nothing
      if (matchedCards.includes(card.id)) return;

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
      }
    };

    return (
      <div className="memory-match">
        <h2>Memory Match</h2>
        <p>Score: {score}</p>
        <div className="game-board">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${openCards.includes(card.id) || matchedCards.includes(card.id) ? 'open' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              <img src={card.image} alt={`Card ${index}`} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return () => <MemoryMatch assetsUrl={assetsUrl} />;
};

console.log('Memory Match script loaded');
