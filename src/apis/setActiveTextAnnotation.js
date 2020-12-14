import actions from "actions";

export default (store) => (textAnnotation) =>
  store.dispatch(actions.setActiveTextAnnotation(textAnnotation));
