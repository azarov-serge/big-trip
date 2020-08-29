import {diffDate} from "../../utils/date.js";
import Observer from "../../utils/observer.js";

export default class Trip extends Observer {
  constructor() {
    super();
    this._destinations = [];
    this._offers = {};
    this._points = [];
  }

  static adaptPointToClient(point) {
    const start = new Date(point.date_from);
    const end = new Date(point.date_to);

    const adaptedPoint = {
      id: point.id,
      type: point.type,
      destination: point.destination,
      start,
      end,
      duration: diffDate(end, start),
      price: point.base_price,
      offers: point.offers,
      isFavorite: point.is_favorite,
    };

    return adaptedPoint;
  }

  static adaptPointToServer(point) {
    const adaptedPoint = {
      "id": point.id,
      "type": point.type,
      "base_price": point.price,
      "date_from": point.start.toString(),
      "date_to": point.end.toString(),
      "destination": point.destination,
      "is_favorite": point.isFavorite,
      "offers": point.offers,
    };

    return adaptedPoint;
  }

  static adaptOffersToClient(offers) {
    return offers.reduce((mapOffer, offer) => {
      mapOffer[offer.type] = offer.offers;
      return mapOffer;
    }, {});
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffers() {
    return this._offers;
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  setError(updateType) {
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
