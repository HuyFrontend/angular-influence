
//  export enum PEOPLE_ACCTIONS  {
//     ADD_PERSON, REMOVE_PERSON, ADD_GUESTS, REMOVE_GUESTS, TOGGLE_ATTENDING
//  };

// export const people = (state: any = [], action) => {
//     console.log('Action', action);
//     console.log('State', state);
//     switch(action.type){

//         case PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.ADD_PERSON]:
//             return [
//                 ...state,
//                 action.payload
//             ];

//         case PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.REMOVE_PERSON]:
//             return state.filter((person) => person.id !== action.payload);

//         case PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.ADD_GUESTS]:
//             return state.map(person => {
//                 if(person.id === action.payload){
//                     return Object.assign({}, person, {
//                         guests: person.guests + 1
//                     })
//                 }
//                 return person;
//             });
//         case PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.REMOVE_GUESTS]:
//             return state.map(person => {
//                 if(person.id === action.payload){
//                     return Object.assign({}, person, {
//                         guests: person.guests - 1
//                     })
//                 }
//                 return person;
//             });
//         case PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.TOGGLE_ATTENDING]:
//             return state.map(person => {
//                 if(person.id === action.payload){
//                     return Object.assign({}, person, {
//                         attending: !person.attending
//                     })
//                 }
//                 return person;
//             });

//         default:
//             return state;
//     }
// }
