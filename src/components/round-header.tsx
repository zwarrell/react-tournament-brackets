import React from 'react';
import { Options } from '../types';

export type RoundHeaderProps = {
  x: number;
  y?: number;
  width: number;
  roundHeader: Options['roundHeader'];
  canvasPadding: number;
  numOfRounds: number;
  tournamentRoundText: string;
  columnIndex: number;
};

export default function RoundHeader({
  x,
  y = 0,
  width,
  roundHeader,
  canvasPadding,
  numOfRounds,
  tournamentRoundText,
  columnIndex,
}: RoundHeaderProps) {
  return null  // Remove round headers
  return (
    <g>
      <rect
        x={x}
        y={y + canvasPadding + roundHeader.height}
        width={width}
        height="2px"
        fill={roundHeader.backgroundColor}
      />
      <text
        x={x + width / 2}
        y={y + canvasPadding + roundHeader.height / 2}
        style={{
          fontFamily: roundHeader.fontFamily,
          fontSize: `${roundHeader.fontSize}px`,
          color: roundHeader.fontColor,
        }}
        fill="currentColor"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {!roundHeader.roundTextGenerator &&
          columnIndex + 1 === numOfRounds &&
          'Final'}
        {!roundHeader.roundTextGenerator &&
          columnIndex + 1 === numOfRounds - 1 &&
          'Semi-final'}
        {!roundHeader.roundTextGenerator &&
          columnIndex + 1 < numOfRounds - 1 &&
          `Round ${tournamentRoundText}`}
        {roundHeader.roundTextGenerator &&
          roundHeader.roundTextGenerator(columnIndex + 1, numOfRounds)}
      </text>
    </g>
  );
}
