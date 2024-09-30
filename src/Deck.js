import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'; // create this for deck-specific styles

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

function Deck() {
  const [deck, setDeck] = useState(null); // to store deck data
  const [cards, setCards] = useState([]); // to store drawn cards
  const [shuffleInProgress, setShuffleInProgress] = useState(false); // to disable shuffle button

  // Fetch a new deck when component mounts
  useEffect(() => {
    async function fetchDeck() {
      let res = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(res.data);
    }
    fetchDeck();
  }, []);

  // Draw a card from the deck
  async function drawCard() {
    if (!deck) return;

    try {
      let res = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);
      if (res.data.remaining === 0) {
        alert('Error: no cards remaining!');
      } else {
        setCards(cards => [...cards, res.data.cards[0]]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Shuffle the deck
  async function shuffleDeck() {
    setShuffleInProgress(true);
    try {
      let res = await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
      setDeck(res.data); // update deck state
      setCards([]); // clear drawn cards
    } catch (err) {
      console.error(err);
    }
    setShuffleInProgress(false);
  }

  return (
    <div className="Deck">
      <h1 className="Deck-title">Card Drawing App</h1>
      <button className="Deck-btn" onClick={drawCard}>
        Draw Card
      </button>
      <button
        className="Deck-btn"
        onClick={shuffleDeck}
        disabled={shuffleInProgress}
      >
        Shuffle Deck
      </button>

      <div className="Deck-cardarea">
        {cards.map((card, idx) => (
          <Card key={idx} image={card.image} alt={card.value + ' of ' + card.suit} />
        ))}
      </div>
    </div>
  );
}

export default Deck;
