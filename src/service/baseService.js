import axios from 'axios';

// const baseUrl="https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app";
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://cerulean-marlin-wig.cyclic.app';
const BaseService=axios.create({
    baseURL:baseUrl
})
export default BaseService