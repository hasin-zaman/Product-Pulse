const formatMessage = (product: String) => {
    const words = product.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return product;
};

export default formatMessage;