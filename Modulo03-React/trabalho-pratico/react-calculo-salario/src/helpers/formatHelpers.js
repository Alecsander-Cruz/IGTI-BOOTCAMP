const formater = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formater.format(value);
}

export { formatNumber };
