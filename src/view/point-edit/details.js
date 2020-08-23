import {createOffersTemplate} from './templates';

export const createDetailsTemplate = (point) => {
  const {offers} = point;
  return (
    `<section class="event__details">
      ${createOffersTemplate(offers)}
    </section>`
  );
};
