const formattedPrice = (price) => {
  return parseFloat(price).toLocaleString("es-ES", {
    minimumFractionDigits: 2, // Mínimo de dígitos decimales (si no hay, se agrega 0)
    maximumFractionDigits: 2, // Máximo de dígitos decimales
  });
};

export default formattedPrice;
