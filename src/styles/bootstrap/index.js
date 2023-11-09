// triggered from main.ts at first load

// only run the the colors if these elements are run in a separeate context
// otherwise it is loaded from top styles folder and shared for all contexts

// colors - only if not loaded at top
// import "../css/color-base.css";
// import "../css/color-dark.css";
// elements
import '../css/base.css'
import '../css/display.css'

// loaded last,
// only for context specific overrides
// can also be used for dev testing
// import "../css/overrides.css";
