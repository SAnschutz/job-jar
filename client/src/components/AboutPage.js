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
          Job jars were a thing of my childhood. Parents would take a mason jar,
          cut a hole in the lid, and into the jar would go slips of paper with a
          multitude of annoying jobs: "Empty the trash", "Dust the bookshelf",
          "Put toys away". Then, come Saturday morning, each kid would reach
          into the jar, pull out a slip of paper, and whatever job was written
          on that piece of paper had to be completed before going out to play.
        </p>
        <p>
          I hated that job jar. But it also made those weekend chorse just a WEE
          bit more fun, turning them into a kind of game.
        </p>
        <p>
          JobJar was created with that same spirit in mind -- a place to keep
          track of all those annoying jobs that need to be done, and hopefully
          making it just a wee bit more fun when they can't be ignored anymore.
          Create a jar, or create multiple jars -- one for yourself, one for
          your significant other, one for the kids...
        </p>
        <p>Enjoy, and get to work!</p>
        <Link to='/myjars'>Go back</Link>
      </div>
    </div>
  );
}
