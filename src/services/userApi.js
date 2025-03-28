import axios from "axios";


export const loginUser = async(email, password)=>{
    try {
        const response = await axios.post('https://reqres.in/api/login', {email, password});
        return response.data;
        
    } catch (error) {
        throw error.response?.data?.error || 'Login Failed'
        
    }

};


export const getUsers = async()=>{
    try {
        const response = await axios.get('https://reqres.in/api/users?page=1');
        return response.data;
        
    } catch (error) {
        throw error.response?.data?.error || 'Error Fetching Users'
        
    }

};
