/**
 * Структура данных для дополнительной опции
 * @typedef {Object} Offer
 * @property {string} id - Уникальный идентификатор
 * @property {string} title - Название опции
 * @property {number} price - Цена
 */

/**
 * Структура данных для группы опций по типу события
 * @typedef {Object} OfferGroup
 * @property {string} type - Тип события (taxi, bus, flight и т.д.)
 * @property {Array<Offer>} offers - Массив доступных опций
 */

export const offerGroups = [
  {
    type: 'taxi',
    offers: [
      { id: 'taxi-1', title: 'Order Uber', price: 20 },
      { id: 'taxi-2', title: 'Child seat', price: 15 },
      { id: 'taxi-3', title: 'Wi-Fi in car', price: 5 }
    ]
  },
  {
    type: 'bus',
    offers: [
      { id: 'bus-1', title: 'Extra luggage', price: 10 },
      { id: 'bus-2', title: 'Comfort seat', price: 25 },
      { id: 'bus-3', title: 'Meal', price: 15 }
    ]
  },
  {
    type: 'train',
    offers: [
      { id: 'train-1', title: 'First class', price: 50 },
      { id: 'train-2', title: 'Meal', price: 20 },
      { id: 'train-3', title: 'Wi-Fi', price: 10 }
    ]
  },
  {
    type: 'ship',
    offers: [
      { id: 'ship-1', title: 'Cabin with view', price: 100 },
      { id: 'ship-2', title: 'Meal', price: 30 },
      { id: 'ship-3', title: 'Excursion', price: 50 }
    ]
  },
  {
    type: 'drive',
    offers: [
      { id: 'drive-1', title: 'Rent a car', price: 200 },
      { id: 'drive-2', title: 'GPS', price: 20 },
      { id: 'drive-3', title: 'Child seat', price: 15 }
    ]
  },
  {
    type: 'flight',
    offers: [
      { id: 'flight-1', title: 'Add luggage', price: 30 },
      { id: 'flight-2', title: 'Switch to comfort class', price: 100 },
      { id: 'flight-3', title: 'Add meal', price: 15 },
      { id: 'flight-4', title: 'Choose seats', price: 5 },
      { id: 'flight-5', title: 'Priority boarding', price: 20 }
    ]
  },
  {
    type: 'check-in',
    offers: [
      { id: 'check-in-1', title: 'Add breakfast', price: 50 },
      { id: 'check-in-2', title: 'Late check-out', price: 30 },
      { id: 'check-in-3', title: 'Room upgrade', price: 80 }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      { id: 'sightseeing-1', title: 'Book tickets', price: 40 },
      { id: 'sightseeing-2', title: 'Lunch in city', price: 30 },
      { id: 'sightseeing-3', title: 'Guide', price: 25 }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      { id: 'restaurant-1', title: 'Reservation', price: 10 },
      { id: 'restaurant-2', title: 'Special menu', price: 50 },
      { id: 'restaurant-3', title: 'Wine selection', price: 30 }
    ]
  }
];

/**
 * Получить опции по типу события
 * @param {string} type
 * @returns {Array<Offer>}
 */
export const getOffersByType = (type) => {
  const group = offerGroups.find(group => group.type === type);
  return group ? group.offers : [];
};

/**
 * Получить опцию по ID
 * @param {string} offerId
 * @returns {Offer|undefined}
 */
export const getOfferById = (offerId) => {
  for (const group of offerGroups) {
    const offer = group.offers.find(o => o.id === offerId);
    if (offer) return offer;
  }
  return undefined;
};