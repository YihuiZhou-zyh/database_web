import {set} from '../utils/vuex.js'
export default {
    changeStep (state, step){
        state.step = step
        try{
            localStorage.step = step
        }catch (e) {}
    },
    setDrawer: set('drawer')
}