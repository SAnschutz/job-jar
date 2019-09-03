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
          Want to contact me, to let me know about an issue, tell me an amusing
          anecdote, or, better yet, tell me an inspiring story about how JobJar
          has changed your life for the better and you couldn't possibly go back
          to living without it?? &ensp;
          <span>&#128522;</span>
        </p>
        <p>
          Send me an e-mail at{' '}
          <a href='mailto: contactjobjar@gmail.com' className='email-link'>
            contactjobjar@gmail.com
          </a>
        </p>
        <p>
          I'll get back to you just as soon as I finish my current JobJar task.
        </p>
        <Link to='/'>Go back</Link>
      </div>
    </div>
  );
}
