import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import propertiesData from "../data/properties.json";

const PropertyContext = createContext(null);

const STORAGE_KEY = "natdemy-properties";

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const savedProperties = localStorage.getItem(STORAGE_KEY);

      if (savedProperties) {
        return JSON.parse(savedProperties);
      }

      return propertiesData;
    } catch (error) {
      console.error("Failed to load properties:", error);
      return propertiesData;
    }
  });

  // Save properties whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(properties)
      );
    } catch (error) {
      console.error("Failed to save properties:", error);
    }
  }, [properties]);

  // Add a new property
  const addProperty = (newProperty) => {
    setProperties((prevProperties) => [
      newProperty,
      ...prevProperties,
    ]);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);

  if (!context) {
    throw new Error(
      "useProperties must be used within PropertyProvider"
    );
  }

  return context;
}
