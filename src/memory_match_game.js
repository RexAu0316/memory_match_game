window.initGame = (React, assetsUrl) => {
  const { useState, useEffect, useCallback } = React;

  const MemoryMatch = ({ assetsUrl }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
      const cardImages = ['mario.png', 'Toad.png', 'Luigi.png', 'Yoshi.png'];
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map(image => ({ image, flipped: false }));

      setCards(shuffledCards);
    }, []);

    const handleCardClick = useCallback(
      (index) => {
        if (flippedCards.length < 2 && !matchedCards.includes(index)) {
          const updatedCards = [...cards];
          updatedCards[index].flipped = true;
          setCards(updatedCards);
          setFlippedCards([...flippedCards, index]);

          if (flippedCards.length === 1 && cards[flippedCards[0]].image === cards[index].image) {
            setMatchedCards([...matchedCards, flippedCards[0], index]);
            setFlippedCards([]);
          } else if (flippedCards.length === 1) {
            setTimeout(() => {
              const resetCards = [...cards];
              resetCards[flippedCards[0]].flipped = false;
              resetCards[index].flipped = false;
              setCards(resetCards);
              setFlippedCards([]);
            }, 1000);
          }
        }
      },
      [cards, flippedCards, matchedCards]
    );

    return React.createElement(
      'div',
      { className: 'memory-match' },
      React.createElement('h1', null, 'Memory Match'),
      React.createElement(
        'div',
        { className: 'card-grid' },
        cards.map((card, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `card ${card.flipped || matchedCards.includes(index) ? 'flipped' : ''}`,
              style: { backgroundImage: `url(${assetsUrl}/${card.image})` },
              onClick: () => handleCardClick(index)
            }
          )
        )
      )
    );
  };

  return () => React.createElement(MemoryMatch, { assetsUrl: assetsUrl });
};

console.log('Memory Match game script loaded');
