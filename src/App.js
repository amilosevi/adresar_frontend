import React, { useState, useEffect } from 'react'
import Korisnik from './components/Korisnik'
import korisniciServer from './services/korisnici'
//import axios from 'axios'

//const Poruka = require('./models/poruka')



const App = () => {
  const [ korisnici, postaviKorisnike ] = useState([])
  const [ unosImePrezime, postaviImePrezime] = useState("")
  const [ unosEmail, postaviEmail] = useState("")
  const [ ispisSve, postaviIspis] = useState(korisnici)
  const [ filter, postaviFilter] = useState("") 
  useEffect(()=>{
    korisniciServer
    .dohvatiSve()
    .then(response => {
      postaviKorisnike(response.data)
    })
  },[])

  const hook = () => {  
  korisniciServer
  .dohvatiSve()   
  .then( response => {      
  postaviKorisnike(response.data)    
}) 
 } 
useEffect(hook, [])



  const noviKorisnik = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
    const noviObjekt = {
      imePrezime: unosImePrezime,
      email: unosEmail
    }

    korisniciServer
    .stvori(noviObjekt)
    .then(response => {
      postaviKorisnike(korisnici.concat(response.data))
      postaviImePrezime("")
      postaviEmail("")
    })
    
    
  }
  const promjenaIme = (e) => {  
    console.log(e.target.value);  
    postaviImePrezime(e.target.value)
  }
  const promjenaEmail = (e) => {  
    console.log(e.target.value);  
    postaviEmail(e.target.value)
  }
  const promjenaFilter = (e) => {  
    console.log(e.target.value);  
    postaviFilter(e.target.value)
  }
  const kor = ispisSve
  ? korisnici
  : korisnici.filter(k => k.imePrezime.substring(0, filter.length).toLowerCase() === filter)

  const brisiKorisnika = (id) => {  
    korisniciServer    
    .brisi(id)    
    .then( response => {      
      console.log(response);      
      postaviKorisnike(korisnici.filter(k => k.id !== id))    
    })
  }

  return (
      <div>
          <h1>Adresar</h1>
          <input placeholder="Filtriraj..." value={filter} onChange = {promjenaFilter} onClick={() => postaviIspis(!ispisSve)} />
              {kor.map( k => 
              <Korisnik 
              key={k.id} 
              korisnik={k}
              brisiKorisnika={()=> brisiKorisnika(k.id)} 
              />
              )}
          
          <form onSubmit={noviKorisnik}>
          <h2>Novi kontakt</h2>
            <input value = {unosImePrezime} placeholder="Ime i prezime" onChange={promjenaIme} /> <br/>
            <input value = {unosEmail} placeholder="Email" onChange={promjenaEmail}/> <br/>
            <button class="btn" type='submit' onClick={noviKorisnik}>Dodaj</button>
          </form>
      </div>
  )
}



export default App