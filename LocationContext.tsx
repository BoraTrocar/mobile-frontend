import axios from "axios";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  cidade: string | null;
  latitude: number | null; // Adicione essa linha
  longitude: number | null; // Adicione essa linha
  atualizaLocalizacao: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cidade, setCidade] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null); // Adicione essa linha
  const [longitude, setLongitude] = useState<number | null>(null); // Adicione essa linha

  const atualizaLocalizacao = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        const { latitude, longitude } = currentPosition.coords;

        setLatitude(latitude); // Adicione essa linha
        setLongitude(longitude); // Adicione essa linha

        fetchCidadeCoordenadas(latitude, longitude);
        console.log(latitude);
        console.log(longitude);
      } else {
        console.log("Permissão de localização negada");
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  const fetchCidadeCoordenadas = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const apiKey = "18624a987510c4a0758cc7006109c8e5";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      if (response.data.name) {
        const cidadeNome = response.data.name;
        setCidade(cidadeNome);
        console.log("Cidade: ", cidadeNome);
      } else {
        console.log("Não foi possível obter o nome da cidade");
      }
    } catch (error) {
      console.error("Erro ao buscar cidade:", error);
    }
  };

  useEffect(() => {
    atualizaLocalizacao();
  }, []);

  return (
    <LocationContext.Provider
      value={{ cidade, latitude, longitude, atualizaLocalizacao }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation deve ser usado dentro de um LocationProvider");
  }
  return context;
};
