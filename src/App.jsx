import { useState } from 'react'
import './App.css'

function App() {
  const [characterName, setCharacterName] = useState('')
  const [characters, setCharacters] = useState([])

  const rollInitiative = () => {
    return Math.floor(Math.random() * 12) + 1
  }

  const handleAddCharacter = (e) => {
    e.preventDefault()

    if (characterName.trim() === '') {
      return
    }

    const newCharacter = {
      id: Date.now(),
      name: characterName.trim(),
      initiative: rollInitiative()
    }

    const updatedCharacters = [...characters, newCharacter].sort((a, b) => b.initiative - a.initiative)
    setCharacters(updatedCharacters)
    setCharacterName('')
  }

  const handleRemoveCharacter = (id) => {
    setCharacters(characters.filter(char => char.id !== id))
  }

  const handleRerollAll = () => {
    const rerolledCharacters = characters.map(char => ({
      ...char,
      initiative: rollInitiative()
    })).sort((a, b) => b.initiative - a.initiative)

    setCharacters(rerolledCharacters)
  }

  const handleClearAll = () => {
    setCharacters([])
  }

  return (
    <div className="app">
      <div className="container">
        <h1>D&D Turn Order Tracker</h1>

        <form onSubmit={handleAddCharacter} className="character-form">
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Enter character name..."
            className="character-input"
          />
          <button type="submit" className="btn btn-primary">
            Roll Initiative
          </button>
        </form>

        {characters.length > 0 && (
          <div className="controls">
            <button onClick={handleRerollAll} className="btn btn-secondary">
              Reroll All
            </button>
            <button onClick={handleClearAll} className="btn btn-danger">
              Clear All
            </button>
          </div>
        )}

        {characters.length > 0 ? (
          <div className="character-list">
            <h2>Turn Order</h2>
            {characters.map((character, index) => (
              <div key={character.id} className="character-item">
                <div className="character-info">
                  <span className="turn-number">#{index + 1}</span>
                  <span className="character-name">{character.name}</span>
                  <span className="initiative-score">Initiative: {character.initiative}</span>
                </div>
                <button
                  onClick={() => handleRemoveCharacter(character.id)}
                  className="btn-remove"
                  aria-label="Remove character"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No characters yet. Add some characters to start tracking turn order!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
