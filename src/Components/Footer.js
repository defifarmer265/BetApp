import React from 'react'
import {ReactComponent as Twitter} from '../assets/icons/twitter.svg'
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
        <div className="socials">
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/_Nonny__">
            <Twitter />
          </a>
        </div>
      </div>
    </footer>
  )
}
