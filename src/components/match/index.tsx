import React from 'react';
import { MatchComponentProps } from '../../types';
import {
  Score,
  Side,
  StyledMatch,
  Team,
  TopText,
  BottomText,
  Wrapper,
  Line,
  Anchor,
} from './styles';

function Match({
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon,
}: MatchComponentProps) {

  // Hide match component
  if (match.lHideMatch) {
    return null
  }



  return (
    <Wrapper onClick={event =>
      onMatchClick?.({ match, topWon, bottomWon, event })
    }>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TopText>{topText}</TopText>
        {(match.href || typeof onMatchClick === 'function') && (
          <Anchor
            href={match.href}
          >
            <TopText>Match Details</TopText>
          </Anchor>
        )}
      </div>
      <StyledMatch>
        <Side
          onMouseEnter={() => onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          won={topWon}
          team={topParty}
          hovered={topHovered}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          <Team>{topParty?.name}</Team>
          <Score won={topWon}>{topParty?.resultText}</Score>
        </Side>
        <Line highlighted={topHovered || bottomHovered} />
        <Side
          onMouseEnter={() => onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          won={bottomWon}
          team={bottomParty}
          hovered={bottomHovered}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <Team>{bottomParty?.name}</Team>
          <Score won={bottomWon}>{bottomParty?.resultText}</Score>
        </Side>
      </StyledMatch>
      <BottomText>{bottomText ?? ' '}</BottomText>
    </Wrapper>
  );
}

export default Match;
