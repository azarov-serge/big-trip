import {pointGroupToTypes} from '../../../const';
import {formatDateYyyyMmDdHhMmWithDash} from '../../../utils/date';
import {getPointTypeWithPreposition} from '../../../utils/type-preposition';


const FAVORITE_ICON = (
  `<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z">
      </path>
  </svg>`
);

const groupTypes = Object.entries(pointGroupToTypes);

// Header templates (header.js)

const createTypeGroupTemplate = (groupName, types, currentType) => {

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${groupName}</legend>
      ${types
        .map((type, i) => {
          const id = type.toLowerCase();

          return (
            `<div class="event__type-item">
            <input
              id="event-type-${id}-${i}"
              class="event__type-input  visually-hidden"
              type="radio"
              name="event-type"
              value="${type}"
              ${id === currentType ? `checked` : ``}
            >
            <label
              class="event__type-label event__type-label--${id}"
              for="event-type-${id}-${i}"
            >
              ${type}
            </label>
          </div>`
          );
        })
        .join(``)}
    </fieldset>`
  );
};

export const createTypeListTemplate = (currentType) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img
          class="event__type-icon"
          width="17"
          height="17"
          src="img/icons/${currentType}.png"
          alt="Event type icon"
        >
      </label>
      <input
        class="event__type-toggle
        visually-hidden"
        id="event-type-toggle-1"
        type="checkbox"
      >
      <div class="event__type-list">
        ${groupTypes
          .map(([groupName, types]) => createTypeGroupTemplate(groupName, types, currentType))
          .join(``)}
      </div>
    </div>`
  );
};

export const createDestinationTemplate = (currentType, destination, destinations) => {

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${getPointTypeWithPreposition(currentType)}
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1" type="text" name="event-destination"
        value="${destination}"
        list="destination-list-1"
      >
      <datalist id="destination-list-1">
        ${destinations
          .map((item) => `<option value="${item}"></option>`)
          .join(``)}
      </datalist>
    </div>`
  );
};

export const createTimeTemplate = ({start, end}) => {
  const timeStart = formatDateYyyyMmDdHhMmWithDash(start);
  const timeEnd = formatDateYyyyMmDdHhMmWithDash(end);
  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
        value="${timeStart}"
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text" name="event-end-time"
        value="${timeEnd}"
      >
    </div>`
  );
};

export const createPriceTemplate = (price) => {
  return (
    `<div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input  event__input--price"
        id="event-price-1"
        type="number"
        min="0"
        step="0.01"
        required
        name="event-price"
        value="${price}"
      >
    </div>`
  );
};

export const createSaveButtonTemplate = (isDisabled) => {
  return (
    `<button
      class="event__save-btn  btn  btn--blue"
      type="submit"
      ${isDisabled ? `disabled` : ``}
    >
      Save
    </button>`
  );
};

export const createResetButtonTemplate = (isAddMode) => {
  return (
    `<button class="event__reset-btn" type="reset">
      ${isAddMode ? `Cancel` : `Delete`}
    </button>`
  );
};

export const createFavoriteTemplate = (isFavorite) => {
  return (
    `<input
      id="event-favorite-1"
      class="event__favorite-checkbox  visually-hidden"
      type="checkbox" name="event-favorite"
      ${isFavorite ? `checked` : ``}
    >
      <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      ${FAVORITE_ICON}
    </label>`
  );
};

export const createRollupButtonTemplate = () => {
  return (
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">
      Open event
      </span>
    </button>`
  );
};

// Details templates (details.js)

export const createOffersTemplate = (offers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">
        Offers
      </h3>
      <div class="event__available-offers">
        ${offers
          .map((offer) => {
            const {key, name, price} = offer;

            return (
              `<div class="event__offer-selector">
                <input
                  class="event__offer-checkbox visually-hidden"
                  id="event-offer-${key}-1"
                  value="${key}"
                  type="checkbox" name="event-offer-${key}"
                  ${offer.isActivated ? `checked` : ``}
                >
                 <label class="event__offer-label" for="event-offer-${key}-1">
                  <span class="event__offer-title">
                    ${name}
                  </span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">
                    ${price}
                 </span>
                </label>
              </div>`
            );
          })
          .join(``)}
      </div>
    </section>`
  );
};
