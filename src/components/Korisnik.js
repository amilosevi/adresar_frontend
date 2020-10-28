import React from 'react'

    const Korisnik = ({korisnik, brisiKorisnika}) => {
        return(
        <div>
            {korisnik.imePrezime}({korisnik.email})
            <button onClick={brisiKorisnika}>Brisi</button>
            </div>
        )
    }


export default Korisnik