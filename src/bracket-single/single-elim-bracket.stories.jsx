import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import useWindowSize from 'Hooks/use-window-size';
import styled from 'styled-components';
import Match from 'Components/match';
import SingleElimBracketLeaderboard from './single-elim-bracket';
import SvgViewer from '../svg-viewer';
import {
  walkOverData,
  simpleBracket,
  simpleSmallBracket,
} from '../mock-data/simple-data';
import soloWalkover from '../mock-data/solo-walkover';

export default {
  title: 'Components/Bracket',
  component: SingleElimBracketLeaderboard,
};

const StyledSvgViewer = styled(SvgViewer).attrs(props => {
  return {
    background: props.theme.canvasBackground,
    SVGBackground: props.theme.canvasBackground,
  };
})``;

const Template = ({ ...args }) => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <SingleElimBracketLeaderboard
      onMatchClick={(match) => { console.log(match) }}
      // currentRound={4}
      svgWrapper={({ children, ...props }) => (
        <StyledSvgViewer width={finalWidth} height={finalHeight}
          {...props}>
          {children}
        </StyledSvgViewer>
      )
      }
      {...args}
    />
  );
};

export const Bracket = Template.bind({});
Bracket.args = {
  matches: simpleBracket,
  matchComponent: Match,
};
export const SmallBracket = Template.bind({});
SmallBracket.args = {
  matches: simpleSmallBracket,
  matchComponent: Match,
};
export const WalkOverBracket = Template.bind({});
WalkOverBracket.args = {
  matches: walkOverData,
  matchComponent: Match,
};
export const SoloWalkOverBracket = Template.bind({});
SoloWalkOverBracket.args = {
  matches: soloWalkover,
  matchComponent: Match,
};

export const SoloWalkOverBracketCustomHeaders = Template.bind({});
SoloWalkOverBracketCustomHeaders.args = {
  matches: soloWalkover,
  matchComponent: Match,
  options: {
    style: {
      roundHeader: {
        fontFamily: 'monospace',
        roundTextGenerator: (currentRoundNumber, roundsTotalNumber) => {
          if (currentRoundNumber === roundsTotalNumber) {
            return 'Grand Top';
          }
          if (currentRoundNumber === roundsTotalNumber - 1) {
            return 'Semi Top';
          }
          if (currentRoundNumber < roundsTotalNumber - 1) {
            return 'Top ' + currentRoundNumber;
          }
        },
      },
    },
  },
};

export const CustomMatchViewBracket = Template.bind({});
CustomMatchViewBracket.args = {
  matches: simpleBracket,
  matchComponent: ({
    match,
    onMatchClick,
    onPartyClick,
    onMouseEnter,
    onMouseLeave,
    topParty,
    bottomParty,
    topWon,
    bottomWon,
    topHovered,
    bottomHovered,
    topText,
    bottomText,
    connectorColor,
    computedStyles,
  }) => (
    <div>
      <div />
      <div />
    </div>
  ),
};
