import {set} from '../utils/vuex.js'
export default {
    changeStep (state, step, post_data = null){
        state.step = step;
        try{
            localStorage.step = step;
            for(let key in post_data){
                state.info_data = post_data[key];
                localStorage.info_data[key] = post_data[key];
            }
        }catch (e) {}
    },
    setDrawer: set('drawer'),
    setSchool: set('school'),
    setSubject: set('subject'),
    getIdentityName(state){
        return state.indentity_to_name[state.identity]
    },
    getParams(state){
        return {
                userid: state.user_id,
        }
    },
    getHeaders(state){
        return{
            'Authorization': state.TOKEN
        }
    },
}