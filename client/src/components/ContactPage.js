import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <div id='contact-page'>
        <h1>Contact Page</h1>
        <p>
          Want to contact us, to let us know about an issue, tell us an amusing
          anecdote, or, better yet, tell us an inspiring story about how JobJar
          has changed your life for the better and you couldn't possibly go back
          to living without it?? &ensp;
          <span>&#128522;</span>
        </p>
        <p>
          Send us an e-mail at{' '}
          <a href='mailto: contactjobjar@gmail.com' className='email-link'>
            contactjobjar@gmail.com
          </a>
          , and we'll get back to you just as soon as we finish our current
          JobJar task.
        </p>
        <Link to='/'>Go back</Link>
      </div>
    </div>
  );
}
