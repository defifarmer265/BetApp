import React from 'react'
import {ReactComponent as Twitter} from '../icons/twitter.svg'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="credit">
        Credits:{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://the-odds-api.com/">
          the-odds-api
        </a>
      </div>
      <div className="owner">
        <h3>Anagbogu Christopher</h3>
        <div className="socials">
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/_Nonny__">
            <Twitter />
          </a>
        </div>
      </div>
    </footer>
  )
}
