import React from 'react';
import Card from './Card/Card';
import Candidate from './Candidate/Candidate';
import FlipMove from 'react-flip-move';

export default function Candidates({
  candidates,
  previousVotes,
  previousPercentages,
}) {
  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, index) => {
          const previousVoteObject = previousVotes.find((item) => {
            return item.id === candidate.id;
          });

          const previousVote = !!previousVoteObject
            ? previousVoteObject.votes
            : 0;

          const previousPercentageObject = previousPercentages.find((item) => {
            return item.id === candidate.id;
          });

          const previousPercentage = !!previousPercentageObject
            ? previousPercentageObject.percentage
            : 0;

          return (
            <div key={candidate.id}>
              <Card>
                <Candidate
                  candidate={candidate}
                  position={index + 1}
                  previousVote={previousVote}
                  previousPercentage={previousPercentage}
                />
              </Card>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
