import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div id='about-page'>
        <h1>About JobJar</h1>
        <p>
          Job jars were a thing of my childhood. Parents would keep a mason jar
          on the kitchen counter, and into the jar would go slips of paper with
          a multitude of annoying jobs: "Empty the trash", "Dust the bookshelf",
          "Put all the toys away". Then, come Saturday morning, each kid would
          reach into the jar, pull out a slip of paper, and whatever job was
          written on that piece of paper had to be completed before going out to
          play.
        </p>
        <p>
          I hated that job jar. But it also made those weekend chores just a WEE
          bit more fun, turning them into a kind of game.
        </p>
        <p>
          JobJar was created with that same spirit in mind -- a place to keep
          track of all those annoying jobs that need to be done, and hopefully
          make it just a wee bit more fun when those jobs can't be ignored any
          longer. Create a jar, or create multiple jars -- one for yourself, one
          for your significant other, one for the kids...
        </p>
        <p>Enjoy, and get to work!</p>
        <Link to='/'>Go back</Link>
      </div>
    </div>
  );
}
