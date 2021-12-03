import rest from '../../rest';

const bitcoin = {
  getPrices() {
    return rest.get('https://api.coindesk.com/v1/bpi/historical/close.json');
  },
};

export default bitcoin;
