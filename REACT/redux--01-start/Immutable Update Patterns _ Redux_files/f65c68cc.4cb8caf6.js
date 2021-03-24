(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{147:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return s})),a.d(t,"toc",(function(){return c})),a.d(t,"default",(function(){return u}));var n=a(3),r=a(7),i=(a(0),a(156)),o={id:"immutable-update-patterns",title:"Immutable Update Patterns",description:"Structuring Reducers > Immutable Update Patterns: How to correctly update state immutably, with examples of common mistakes",hide_title:!0},s={unversionedId:"recipes/structuring-reducers/immutable-update-patterns",id:"recipes/structuring-reducers/immutable-update-patterns",isDocsHomePage:!1,title:"Immutable Update Patterns",description:"Structuring Reducers > Immutable Update Patterns: How to correctly update state immutably, with examples of common mistakes",source:"@site/../docs/recipes/structuring-reducers/ImmutableUpdatePatterns.md",slug:"/recipes/structuring-reducers/immutable-update-patterns",permalink:"/recipes/structuring-reducers/immutable-update-patterns",version:"current",sidebar:"docs",previous:{title:"Reusing Reducer Logic",permalink:"/recipes/structuring-reducers/reusing-reducer-logic"},next:{title:"Initializing State",permalink:"/recipes/structuring-reducers/initializing-state"}},c=[{value:"Updating Nested Objects",id:"updating-nested-objects",children:[]},{value:"Inserting and Removing Items in Arrays",id:"inserting-and-removing-items-in-arrays",children:[]},{value:"Updating an Item in an Array",id:"updating-an-item-in-an-array",children:[]},{value:"Immutable Update Utility Libraries",id:"immutable-update-utility-libraries",children:[]},{value:"Simplifying Immutable Updates with Redux Toolkit",id:"simplifying-immutable-updates-with-redux-toolkit",children:[]}],l={toc:c};function u(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"immutable-update-patterns"},"Immutable Update Patterns"),Object(i.b)("p",null,"The articles listed in ",Object(i.b)("a",{parentName:"p",href:"/recipes/structuring-reducers/prerequisite-concepts#immutable-data-management"},"Prerequisite Concepts#Immutable Data Management")," give a number of good examples for how to perform basic update operations immutably, such as updating a field in an object or adding an item to the end of an array. However, reducers will often need to use those basic operations in combination to perform more complicated tasks. Here are some examples for some of the more common tasks you might have to implement."),Object(i.b)("h2",{id:"updating-nested-objects"},"Updating Nested Objects"),Object(i.b)("p",null,"The key to updating nested data is ",Object(i.b)("strong",{parentName:"p"},"that ",Object(i.b)("em",{parentName:"strong"},"every")," level of nesting must be copied and updated appropriately"),". This is often a difficult concept for those learning Redux, and there are some specific problems that frequently occur when trying to update nested objects. These lead to accidental direct mutation, and should be avoided."),Object(i.b)("h5",{id:"correct-approach-copying-all-levels-of-nested-data"},"Correct Approach: Copying All Levels of Nested Data"),Object(i.b)("p",null,"Unfortunately, the process of correctly applying immutable updates to deeply nested state can easily become verbose and hard to read. Here's what an example of updating ",Object(i.b)("inlineCode",{parentName:"p"},"state.first.second[someId].fourth")," might look like:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function updateVeryNestedField(state, action) {\n  return {\n    ...state,\n    first: {\n      ...state.first,\n      second: {\n        ...state.first.second,\n        [action.someId]: {\n          ...state.first.second[action.someId],\n          fourth: action.someValue\n        }\n      }\n    }\n  }\n}\n")),Object(i.b)("p",null,"Obviously, each layer of nesting makes this harder to read, and gives more chances to make mistakes. This is one of several reasons why you are encouraged to keep your state flattened, and compose reducers as much as possible."),Object(i.b)("h5",{id:"common-mistake-1-new-variables-that-point-to-the-same-objects"},"Common Mistake #1: New variables that point to the same objects"),Object(i.b)("p",null,"Defining a new variable does ",Object(i.b)("em",{parentName:"p"},"not")," create a new actual object - it only creates another reference to the same object. An example of this error would be:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function updateNestedState(state, action) {\n  let nestedState = state.nestedState\n  // ERROR: this directly modifies the existing object reference - don't do this!\n  nestedState.nestedField = action.data\n\n  return {\n    ...state,\n    nestedState\n  }\n}\n")),Object(i.b)("p",null,"This function does correctly return a shallow copy of the top-level state object, but because the ",Object(i.b)("inlineCode",{parentName:"p"},"nestedState")," variable was still pointing at the existing object, the state was directly mutated."),Object(i.b)("h5",{id:"common-mistake-2-only-making-a-shallow-copy-of-one-level"},"Common Mistake #2: Only making a shallow copy of one level"),Object(i.b)("p",null,"Another common version of this error looks like this:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function updateNestedState(state, action) {\n  // Problem: this only does a shallow copy!\n  let newState = { ...state }\n\n  // ERROR: nestedState is still the same object!\n  newState.nestedState.nestedField = action.data\n\n  return newState\n}\n")),Object(i.b)("p",null,"Doing a shallow copy of the top level is ",Object(i.b)("em",{parentName:"p"},"not")," sufficient - the ",Object(i.b)("inlineCode",{parentName:"p"},"nestedState")," object should be copied as well."),Object(i.b)("h2",{id:"inserting-and-removing-items-in-arrays"},"Inserting and Removing Items in Arrays"),Object(i.b)("p",null,"Normally, a Javascript array's contents are modified using mutative functions like ",Object(i.b)("inlineCode",{parentName:"p"},"push"),", ",Object(i.b)("inlineCode",{parentName:"p"},"unshift"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"splice"),'. Since we don\'t want to mutate state directly in reducers, those should normally be avoided. Because of that, you might see "insert" or "remove" behavior written like this:'),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function insertItem(array, action) {\n  return [\n    ...array.slice(0, action.index),\n    action.item,\n    ...array.slice(action.index)\n  ]\n}\n\nfunction removeItem(array, action) {\n  return [...array.slice(0, action.index), ...array.slice(action.index + 1)]\n}\n")),Object(i.b)("p",null,"However, remember that the key is that the ",Object(i.b)("em",{parentName:"p"},"original in-memory reference")," is not modified. ",Object(i.b)("strong",{parentName:"p"},"As long as we make a copy first, we can safely mutate the copy"),". Note that this is true for both arrays and objects, but nested values still must be updated using the same rules."),Object(i.b)("p",null,"This means that we could also write the insert and remove functions like this:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function insertItem(array, action) {\n  let newArray = array.slice()\n  newArray.splice(action.index, 0, action.item)\n  return newArray\n}\n\nfunction removeItem(array, action) {\n  let newArray = array.slice()\n  newArray.splice(action.index, 1)\n  return newArray\n}\n")),Object(i.b)("p",null,"The remove function could also be implemented as:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function removeItem(array, action) {\n  return array.filter((item, index) => index !== action.index)\n}\n")),Object(i.b)("h2",{id:"updating-an-item-in-an-array"},"Updating an Item in an Array"),Object(i.b)("p",null,"Updating one item in an array can be accomplished by using ",Object(i.b)("inlineCode",{parentName:"p"},"Array.map"),", returning a new value for the item we want to update, and returning the existing values for all other items:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"function updateObjectInArray(array, action) {\n  return array.map((item, index) => {\n    if (index !== action.index) {\n      // This isn't the item we care about - keep it as-is\n      return item\n    }\n\n    // Otherwise, this is the one we want - return an updated value\n    return {\n      ...item,\n      ...action.item\n    }\n  })\n}\n")),Object(i.b)("h2",{id:"immutable-update-utility-libraries"},"Immutable Update Utility Libraries"),Object(i.b)("p",null,"Because writing immutable update code can become tedious, there are a number of utility libraries that try to abstract out the process. These libraries vary in APIs and usage, but all try to provide a shorter and more succinct way of writing these updates. For example, ",Object(i.b)("a",{parentName:"p",href:"https://github.com/mweststrate/immer"},"Immer")," makes immutable updates a simple function and plain JavaScript objects:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"var usersState = [{ name: 'John Doe', address: { city: 'London' } }]\nvar newState = immer.produce(usersState, draftState => {\n  draftState[0].name = 'Jon Doe'\n  draftState[0].address.city = 'Paris'\n  //nested update similar to mutable way\n})\n")),Object(i.b)("p",null,"Some, like ",Object(i.b)("a",{parentName:"p",href:"https://github.com/debitoor/dot-prop-immutable"},"dot-prop-immutable"),", take string paths for commands:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"state = dotProp.set(state, `todos.${index}.complete`, true)\n")),Object(i.b)("p",null,"Others, like ",Object(i.b)("a",{parentName:"p",href:"https://github.com/kolodny/immutability-helper"},"immutability-helper")," (a fork of the now-deprecated React Immutability Helpers addon), use nested values and helper functions:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"var collection = [1, 2, { a: [12, 17, 15] }]\nvar newCollection = update(collection, {\n  2: { a: { $splice: [[1, 1, 13, 14]] } }\n})\n")),Object(i.b)("p",null,"They can provide a useful alternative to writing manual immutable update logic."),Object(i.b)("p",null,"A list of many immutable update utilities can be found in the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md#immutable-update-utilities"},"Immutable Data#Immutable Update Utilities")," section of the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/markerikson/redux-ecosystem-links"},"Redux Addons Catalog"),"."),Object(i.b)("h2",{id:"simplifying-immutable-updates-with-redux-toolkit"},"Simplifying Immutable Updates with Redux Toolkit"),Object(i.b)("p",null,"Our ",Object(i.b)("strong",{parentName:"p"},Object(i.b)("a",{parentName:"strong",href:"https://redux-toolkit.js.org/"},"Redux Toolkit"))," package includes a ",Object(i.b)("a",{parentName:"p",href:"https://redux-toolkit.js.org/api/createReducer"},Object(i.b)("inlineCode",{parentName:"a"},"createReducer")," utility"),' that uses Immer internally.\nBecause of this, you can write reducers that appear to "mutate" state, but the updates are actually applied immutably.'),Object(i.b)("p",null,"This allows immutable update logic to be written in a much simpler way. Here's what the ",Object(i.b)("a",{parentName:"p",href:"#correct-approach-copying-all-levels-of-nested-data"},"nested data example"),"\nmight look like using ",Object(i.b)("inlineCode",{parentName:"p"},"createReducer"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { createReducer } from '@reduxjs/toolkit'\n\nconst initialState = {\n  first: {\n    second: {\n      id1: { fourth: 'a' },\n      id2: { fourth: 'b' }\n    }\n  }\n}\n\nconst reducer = createReducer(initialState, {\n  UPDATE_ITEM: (state, action) => {\n    state.first.second[action.someId].fourth = action.someValue\n  }\n})\n")),Object(i.b)("p",null,"This is clearly ",Object(i.b)("em",{parentName:"p"},"much")," shorter and easier to read. However, ",Object(i.b)("strong",{parentName:"p"},"this ",Object(i.b)("em",{parentName:"strong"},"only"),' works correctly if you are using the "magic"\n',Object(i.b)("inlineCode",{parentName:"strong"},"createReducer")," function from Redux Toolkit")," that wraps this reducer in Immer's ",Object(i.b)("a",{parentName:"p",href:"https://immerjs.github.io/immer/produce"},Object(i.b)("inlineCode",{parentName:"a"},"produce")," function"),".\n",Object(i.b)("strong",{parentName:"p"},"If this reducer is used without Immer, it will actually mutate the state!"),". It's also not obvious just by\nlooking at the code that this function is actually safe and updates the state immutably. Please make sure you understand\nthe concepts of immutable updates fully. If you do use this, it may help to add some comments to your code that explain\nyour reducers are using Redux Toolkit and Immer."),Object(i.b)("p",null,"In addition, Redux Toolkit's ",Object(i.b)("a",{parentName:"p",href:"https://redux-toolkit.js.org/api/createSlice"},Object(i.b)("inlineCode",{parentName:"a"},"createSlice")," utility")," will auto-generate action creators\nand action types based on the reducer functions you provide, with the same Immer-powered update capabilities inside."))}u.isMDXComponent=!0},156:function(e,t,a){"use strict";a.d(t,"a",(function(){return m})),a.d(t,"b",(function(){return b}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},m=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=u(a),d=n,b=m["".concat(o,".").concat(d)]||m[d]||p[d]||i;return a?r.a.createElement(b,s(s({ref:t},l),{},{components:a})):r.a.createElement(b,s({ref:t},l))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var l=2;l<i;l++)o[l]=a[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"}}]);