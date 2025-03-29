import axios from "axios";


export const loginUser = async(email, password)=>{
    try {
        const response = await axios.post('https://reqres.in/api/login', {email, password});
        return response.data;
        
    } catch (error) {
        throw error.response?.data?.error || 'Login Failed'
        
    }

};


export const getUsers = async(page =1, pageSize=6)=>{
    try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`);
        return response.data;
        
    } catch (error) {
        throw error.response?.data?.error || 'Error Fetching Users'
        
    }

};
