import actions from "actions";

export default (store) => (textAnnotation) => {
  console.log('wowie');
  store.dispatch(actions.setActiveTextAnnotation(textAnnotation));
};
