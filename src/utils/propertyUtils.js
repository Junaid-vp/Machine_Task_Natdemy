export const getCoverPhoto = (property) => {
  return property.photos.find((photo) => photo.isCover);
};

export const formatLocation = (property) => {
  return `${property.location.area}, ${property.location.city}`;
};

export const formatPrice = (price, purpose) => {
  if (purpose === "Rent") {
    return `₹${price.toLocaleString("en-IN")}/month`;
  }

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakhs`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
};

export const getSimilarProperties = (properties, property) => {
  return properties
    .filter(
      (item) =>
        item.id !== property.id &&
        item.type === property.type &&
        item.purpose === property.purpose
    )
    .slice(0, 3);
};
