import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../redux/features/favoritesSlice";
import { useCallback } from "react";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const loading = useSelector((state) => state.favorites.loading);

  const fetchAllFavorites = useCallback(
    () => dispatch(fetchFavorites()),
    [dispatch]
  );
  const addToFavorites = useCallback(
    (id) => dispatch(addFavorite(id)),
    [dispatch]
  );
  const removeFromFavorites = useCallback(
    (id) => dispatch(removeFavorite(id)),
    [dispatch]
  );

  return {
    favorites,
    loading,
    fetchAllFavorites,
    addToFavorites,
    removeFromFavorites,
  };
};
