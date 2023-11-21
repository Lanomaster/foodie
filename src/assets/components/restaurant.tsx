import React, { useEffect, useState } from 'react';
import useRestaurantStore from '../../store/restaurantStore';
import './Restaurant.css'; 
import useSpeiseStore from '../../store/speiseStore';

const Restaurant = () => {
  const [angezeigt, setAngezeigt] = useState(3);
  const [selectedSpeise, setSelectedSpeise] = useState<SpeiseType | null>(null);

  const liste = useRestaurantStore(state => state.liste)
  const setListe = useRestaurantStore(state => state.setListe)
  const menu = useSpeiseStore(state=> state.menu)
  const setMenu = useSpeiseStore(state => state.setMenu)
  const like = useSpeiseStore(state => state.like)
  

  useEffect(() => {
    fetch("http://localhost:5173/restaurant.json")
      .then(response => response.json())
      .then(data =>
        {
          const updatedMenu = data.menu.map((speise: SpeiseType) => (
            {...speise, liked: false}
            ))
          const reduced: SpeiseType[] = updatedMenu.slice(0, angezeigt)
          const updatedList: RestaurantType  = {...data, menu: reduced}
          setListe(updatedList)
          setMenu(updatedList.menu)
        }
        )
  }, [angezeigt])

  function handleClick() {

    setAngezeigt(angezeigt+2)
  }
  
  function handleInfoClick(speise: SpeiseType) {
    setSelectedSpeise(speise);
  }

  function handleCloseOverlay() {
    setSelectedSpeise(null);
  }

  function handleLike(id: number) {
    console.log("liked")
    like(id)
  }

  if(!liste) {
    <h1>Loading...</h1>
  }

  return(
    <>
      <h1>{liste?.restaurantName}</h1>
      <p>{liste?.description}</p>
      <p>{liste?.freeDeliveryThreshold}</p>
      <p>{liste?.minOrderValue}</p>
      <ul>
        {menu && menu.map(speise => (
          <li key={speise.id}>
            <h2>{speise.name}</h2>
            <p>{speise.description}</p>
            <p>{speise.price}</p>
            <p>Bewertung: {speise.rating.score}</p>
            <button onClick={() => handleInfoClick(speise)}>Informationen</button>
            <button onClick={() => handleLike(speise.id)} style={{ color: speise.liked ? "red" : "black" }}>Like</button>
          </li>
        ))}
      </ul>

      <button onClick={handleClick}>Load</button>

      {selectedSpeise && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Preis: {selectedSpeise.price} €</p>
            <p>Bewertung: {selectedSpeise.rating.score}</p>
            <p>Varianten: {selectedSpeise.variants.join(', ')}</p>
            <p>Extras: {selectedSpeise.extras.join(', ')}</p>
            <button onClick={handleCloseOverlay}>Schließen</button>
          </div>
        </div>
      )}
    </>
  )
};

export default Restaurant;