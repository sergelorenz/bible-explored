import React from 'react'

import apiBibleLogo from '../../res/images/api-logo@2x.png';
import { ReactComponent as LinkedInIcon } from '../../res/icons/linkedin-square-icon.svg';
import { ReactComponent as GithubIcon } from '../../res/icons/github-icon.svg';

import './Footer.scss';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <hr />
        <div className='footer-row'>
          <p>This Bible Web Application makes use of <a href='https://scripture.api.bible/' target='_blank' rel="noreferrer">API.Bible</a> for the retrieval of Bible content</p>
          <img src={apiBibleLogo} alt='API.Bible Logo' id='api-bible-logo'/>
        </div>
        <hr />
        <div className='footer-row'>
          <p>Created by Serge Lorenz Villasica as an Open Source Project (2023-2024)</p>
          <div className='footer-icons'>
            <a href='https://www.linkedin.com/in/serge-lorenz-villasica/' target='_blank' rel='noreferrer'>
              <LinkedInIcon />
            </a>
            <a href='https://github.com/sergelorenz/' target='_blank' rel='noreferrer'>
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer