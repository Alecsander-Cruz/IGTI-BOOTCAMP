import React from 'react';
import Position from './Position/Position';
import Picture from './Picture/Picture';
import Info from './Info/Info';
import Name from './Info/Name';
import Votes from './Info/Votes';
import Percentage from './Info/Percentage';
import Popularity from './Info/Popularity';
import css from './candidate.module.css';

export default function Candidate({
  candidate,
  position,
  previousVote,
  previousPercentage,
}) {
  const { id, name, votes, percentage, popularity } = candidate;

  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture imgSource={`${id}.jpg`} description={name} />
      <Info>
        <Name>{name}</Name>
        <Votes value={votes} previous={previousVote} />
        <Percentage value={percentage} previous={previousPercentage} />
        <Popularity value={popularity} />
      </Info>
    </div>
  );
}
