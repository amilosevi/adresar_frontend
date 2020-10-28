	
import axios from 'axios'
const osnovniUrl = 'https://cryptic-island-66590.herokuapp.com/api/korisnici'
//const osnovniUrl = '/api/korisnici'
const dohvatiSve = () => {  
    return axios.get(osnovniUrl);
}
 
const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt)
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi = id => {
    return axios.delete(`${osnovniUrl}/${id}`)
}
 
export default { dohvatiSve, stvori, osvjezi, brisi}
/* export default {
    dohvatiSve: dohvatiSve,
    stvori: stvori,
    osvjezi: osvjezi
} */