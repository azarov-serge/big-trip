
const RenderPosition = {
  BEFORE_BEGIN: `BEFORE_BEGIN`,
  AFTER_BEGIN: `AFTER_BEGIN`,
  BEFORE_END: `BEFORE_END`,
  AFTER_END: `AFTER_END`,
};

const render = (element1, element2, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.BEFORE_BEGIN:
      element1.before(element2);
      break;
    case RenderPosition.AFTER_BEGIN:
      element1.prepend(element2);
      break;
    case RenderPosition.BEFORE_END:
      element1.append(element2);
      break;
    case RenderPosition.AFTER_END:
      element1.after(element2);
      break;
    default:
      throw new Error(`Unknown render position: ${place}`);
  }
};

export {
  RenderPosition,
  render,
};