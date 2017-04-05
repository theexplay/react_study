// a reducer takes 2 things

// 1. the action
// 2. copy of the current state

function posts(state = [], action) {
    console.log(state, action);
    return state;
}

export default posts;