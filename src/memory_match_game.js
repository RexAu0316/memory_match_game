window.initGame = (React, assetsUrl) => {
  const { useState, useEffect, useCallback } = React;

  const MemoryMatch = ({ assetsUrl }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [timer, setTimer] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
      let interval;
      if (!gameOver) {
        interval = setInterval(() => {
          setTimer(timer => timer + 1);
        }, 1000);
      }

      return () => clearInterval(interval);
    }, [gameOver]);

    // Shuffle the cards only once when the component is first rendered
    useEffect(() => {
      const cardImages = ['mario.png', 'Luigi.png', 'Yoshi.png', 'Toad.png'];
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map(image => ({ image, flipped: false }));

      setCards(shuffledCards);
    }, []);

    const handleCardClick = useCallback(
      (index) => {
        if (!gameOver && flippedCards.length < 2 && !matchedCards.includes(index)) {
          const updatedCards = [...cards];
          updatedCards[index].flipped = true;
          setCards(updatedCards);
          setFlippedCards([...flippedCards, index]);
          setMoves(moves + 1);

          if (flippedCards.length === 1 && cards[flippedCards[0]].image === cards[index].image) {
            setMatchedCards([...matchedCards, flippedCards[0], index]);
            setFlippedCards([]);

            if (matchedCards.length === cards.length - 2) {
              setGameOver(true);
            }
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
      [cards, flippedCards, matchedCards, timer, moves, gameOver]
    );

    const handleRestart = () => {
      setFlippedCards([]);
      setMatchedCards([]);
      setTimer(0);
      setGameOver(false);
      setMoves(0);
    };

    return React.createElement(
      'div',
      { className: 'memory-match' },
      React.createElement('h1', null, 'Memory Match'),
      React.createElement('p', null, `Time: ${timer} seconds`),
      React.createElement('p', null, `Moves: ${moves}`),
      React.createElement(
        'div',
        { className: 'card-grid' },
        cards.map((card, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `card ${card.flipped || matchedCards.includes(index) ? 'flipped' : ''}`,
              onClick: () => handleCardClick(index)
            },
            React.createElement('div', { className: 'front' }),
            React.createElement(
              'div',
              {
                className: 'back',
                style: { backgroundImage: `url(${assetsUrl}/${card.image})` }
              }
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'game-over-container' },
        gameOver && (
          React.createElement(
            'div',
            { className: 'game-over' },
            React.createElement('h2', null, 'Game Over'),
            React.createElement('p', null, `You completed the game in ${timer} seconds and ${moves} moves!`),
            React.createElement(
              'button',
              { onClick: handleRestart },
              'Restart'
            )
          )
        )
      )
    );
  };

    return () => React.createElement(MemoryMatch, { assetsUrl: assetsUrl });
};

console.log('Memory Match game script loaded');
