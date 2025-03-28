import axios from "axios";


export const loginUser = async(email, password)=>{
    try {
        const response = await axios.post('https://reqres.in/api/login', {email, password});
        return response.data;
        
    } catch (error) {
        throw error.response?.data?.error || 'Login Failed'
        
    }

};
