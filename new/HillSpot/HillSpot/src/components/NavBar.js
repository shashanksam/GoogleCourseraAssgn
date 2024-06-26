import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success" data-testid="NavBar">
        <Link className="navbar-brand" to="/" data-testid="navLink1">{props.navTitle}</Link>
    </nav>
  )
}
