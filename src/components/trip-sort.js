import {tripSorts} from '../const';

const DEFAULT = `event`;
const DISABLEDS = [`day`, `offers`];
const isDisabled = (element) => DISABLEDS.includes(element);

const createTemplateTripSort = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

      ${Array.from(tripSorts)
        .map(([key, value]) => {
          if (isDisabled(key)) {
            return (
              `<span class="trip-sort__item  trip-sort__item--${key}">
                ${value}
              </span>`
            );
          }

          return (
            `<div class="trip-sort__item  trip-sort__item--${key}">
            <input
              id="sort-${key}"
              class="trip-sort__input  visually-hidden"
              type="radio" name="trip-sort"
              value="sort-${key}"
              ${key === DEFAULT ? `checked` : ``}
            >
            <label class="trip-sort__btn" for="sort-${key}">
              ${value}
              ${key === DEFAULT
              ? ``
              : `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>`}
            </label>
          </div>`
          );
        })
        .join(`\n`)}
    </form>`
  );
};

export {createTemplateTripSort};