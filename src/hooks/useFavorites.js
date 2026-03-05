import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export const useFavorites = (user) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Si pas connecté, favoris vides
    if (!user) {
      setFavorites([]);
      return;
    }

    // Écoute en temps réel la collection favoris de l'utilisateur
    const favRef = collection(db, "users", user.uid, "favorites");
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const movies = snapshot.docs.map((doc) => doc.data());
      setFavorites(movies);
    });

    return () => unsubscribe();
  }, [user]);

  const addFavorite = async (movie) => {
    if (!user) return;
    const favRef = doc(db, "users", user.uid, "favorites", movie.imdbID);
    await setDoc(favRef, movie);
  };

  const removeFavorite = async (imdbID) => {
    if (!user) return;
    const favRef = doc(db, "users", user.uid, "favorites", imdbID);
    await deleteDoc(favRef);
  };

  const isFavorite = (imdbID) => {
    return favorites.some((m) => m.imdbID === imdbID);
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return { favorites, toggleFavorite, isFavorite };
};