import React from 'react';
import { ThemeProvider } from 'styled-components';
import { sortAlphanumerically } from 'Utils/string';
import { calculateSVGDimensions } from 'Core/calculate-svg-dimensions';
import { MatchContextProvider } from 'Core/match-context';
import MatchWrapper from 'Core/match-wrapper';
import RoundHeader from 'Components/round-header';
import { getPreviousMatches } from 'Core/match-functions';
import { Match, SingleElimLeaderboardProps } from '../types';
import { defaultStyle, getCalculatedStyles } from '../settings';
import { calculatePositionOfMatch } from './calculate-match-position';

import Connectors from './connectors';
import defaultTheme from '../themes/themes';

const SingleEliminationBracket = ({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  options: { style: inputStyle } = {
    style: defaultStyle,
  },
  fTeamStyles,
}: SingleElimLeaderboardProps) => {
  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...(inputStyle?.roundHeader ?? {}),
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...(inputStyle?.lineInfo ?? {}),
    },
  };

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    getCalculatedStyles(style);

  const lastGame = matches.find(match => !match.nextMatchId);

  const generateColumn = (matchesColumn: Match[]): Match[][] => {
    const previousMatchesColumn = matchesColumn.reduce<Match[]>(
      (result, match) => {
        return [
          ...result,
          ...matches
            .filter(m => m.nextMatchId === match.id)
            .sort((a, b) => sortAlphanumerically(a.name, b.name)),
        ];
      },
      []
    );

    if (previousMatchesColumn.length > 0) {
      return [...generateColumn(previousMatchesColumn), previousMatchesColumn];
    }
    return [previousMatchesColumn];
  };
  const generate2DBracketArray = (final: Match) => {
    return final
      ? [...generateColumn([final]), [final]].filter(arr => arr.length > 0)
      : [];
  };
  const columns = generate2DBracketArray(lastGame);
  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]

  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    columns[0].length,
    columns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  const test = async () => {

    let popupWinindow;
    let innerContents = document.getElementById("testThing").outerHTML;
    console.log(`<svg>${innerContents}</svg>`)
    popupWinindow = window.open('', '_blank', 'width=1000,height=1000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><style></style></head><body onload="window.print()"><svg>' + innerContents + '</svg></html>');
    console.log('<html><head><style></style></head><body onload="window.print()"><svg>' + innerContents + '</svg></html>')
    popupWinindow.document.close();

//     let innerContents = document.getElementById("testThing").outerHTML;
//     console.log(`<svg>${innerContents}</svg>`)
//     // build SVG string
//     const svg = `
// <svg xmlns='http://www.w3.org/2000/svg' width='${816}' height='${1056}'>
// <path d="M363 225.5 H338 V295 H325" id="connector-355-95-1" fill="transparent"
// stroke="rgb(47, 54, 72)"></path>
// </svg>`;

//     // convert SVG to data-uri
//     const dataUri = `data:image/svg+xml;base64,${window.btoa(svg)}`;
//     console.log(dataUri)
//     const img = new Image();
//     img.src = dataUri
//     img.id="testImage"
//     document.body.appendChild(img)

    // let innerContents = document.getElementById("testThing").outerHTML;
    // console.log(`<svg>${innerContents}</svg>`)
    // console.log(await svgToPng(`<svg height="1056px" width="816px">${innerContents}</svg>`))
  }


  /**
 * converts an svg string to base64 png using the domUrl
 * @param {string} svgText the svgtext
 * @param {number} [margin=0] the width of the border - the image size will be height+margin by width+margin
 * @param {string} [fill] optionally backgrund canvas fill
 * @return {Promise} a promise to the bas64 png image
 */
  var svgToPng = function (svgText, margin = 0, fill = "") {
    // convert an svg text to png using the browser
    return new Promise(function (resolve, reject) {
      try {
        // can use the domUrl function from the browser
        var domUrl = (window.URL || window.webkitURL || window) as any;
        if (!domUrl) {
          throw new Error("(browser doesnt support this)")
        }

        // figure out the height and width from svg text
        var match = svgText.match(/height=\"(\d+)/m);
        var height = match && match[1] ? parseInt(match[1], 10) : 200;
        var match = svgText.match(/width=\"(\d+)/m);
        var width = match && match[1] ? parseInt(match[1], 10) : 200;
        margin = margin || 0;

        // it needs a namespace
        if (!svgText.match(/xmlns=\"/mi)) {
          svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
        }

        // create a canvas element to pass through
        var canvas = document.createElement("canvas");
        canvas.width = height + margin * 2;
        canvas.height = width + margin * 2;
        var ctx = canvas.getContext("2d");


        // make a blob from the svg
        var svg = new Blob([svgText], {
          type: "image/svg+xml;charset=utf-8"
        });

        // create a dom object for that image
        var url = domUrl.createObjectURL(svg);

        // create a new image to hold it the converted type
        var img = new Image;

        // when the image is loaded we can get it as base64 url
        img.onload = function () {
          // draw it to the canvas
          ctx.drawImage(this as any, margin, margin);

          // if it needs some styling, we need a new canvas
          if (fill) {
            var styled = document.createElement("canvas");
            styled.width = canvas.width;
            styled.height = canvas.height;
            var styledCtx = styled.getContext("2d");
            styledCtx.save();
            styledCtx.fillStyle = fill;
            styledCtx.fillRect(0, 0, canvas.width, canvas.height);
            styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
            styledCtx.restore();
            styledCtx.drawImage(canvas, 0, 0);
            canvas = styled;
          }
          // we don't need the original any more
          domUrl.revokeObjectURL(url);
          // now we can resolve the promise, passing the base64 url
          resolve(canvas.toDataURL());
        };

        // load the image
        img.src = url;

      } catch (err) {
        reject('failed to convert svg to png ' + err);
      }
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <button onClick={test}>test</button>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={gameHeight}
        startAt={startPosition}
      >
        <svg
          height={gameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${gameHeight}`}
        >
          <MatchContextProvider>
            <g id="testThing">
              {columns.map((matchesColumn, columnIndex) =>
                matchesColumn.map((match, rowIndex) => {
                  const { x, y } = calculatePositionOfMatch(
                    rowIndex,
                    columnIndex,
                    {
                      canvasPadding,
                      columnWidth,
                      rowHeight,
                    }
                  );
                  const previousBottomPosition = (rowIndex + 1) * 2 - 1;

                  const { previousTopMatch, previousBottomMatch } =
                    getPreviousMatches(
                      columnIndex,
                      columns,
                      previousBottomPosition
                    );
                  return (
                    <g key={x + y}>
                      {roundHeader.isShown && (
                        <RoundHeader
                          x={x}
                          roundHeader={roundHeader}
                          canvasPadding={canvasPadding}
                          width={width}
                          numOfRounds={columns.length}
                          tournamentRoundText={match.tournamentRoundText}
                          columnIndex={columnIndex}
                        />
                      )}
                      {columnIndex !== 0 && (
                        <Connectors
                          {...{
                            bracketSnippet: {
                              currentMatch: match,
                              previousTopMatch,
                              previousBottomMatch,
                            },
                            rowIndex,
                            columnIndex,
                            gameHeight,
                            gameWidth,
                            style,
                          }}
                        />
                      )}
                      <g>
                        <MatchWrapper
                          x={x}
                          y={
                            y +
                            (roundHeader.isShown
                              ? roundHeader.height + roundHeader.marginBottom
                              : 0)
                          }
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                          match={match}
                          previousBottomMatch={previousBottomMatch}
                          topText={match.startTime}
                          bottomText={match.name}
                          teams={match.participants}
                          onMatchClick={onMatchClick}
                          onPartyClick={onPartyClick}
                          style={style}
                          matchComponent={matchComponent}
                          fTeamStyles={fTeamStyles}
                        />
                      </g>
                    </g>
                  );
                })
              )}
            </g>
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default SingleEliminationBracket;
