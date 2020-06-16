import React, { Component } from 'react';
import css from './users.module.css';

export default class User extends Component {
  render() {
    const { name, picture } = this.props;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={picture.thumbnail} alt={name.first} />
        <span>{name.first}</span>
      </div>
    );
  }
}
