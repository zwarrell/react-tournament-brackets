declare function Match({ rowIndex, columnIndex, match, previousBottomMatch, teams, topText, bottomText, style, matchComponent: MatchComponent, onMatchClick, onPartyClick, ...rest }: {
    [x: string]: any;
    rowIndex: any;
    columnIndex: any;
    match: any;
    previousBottomMatch?: any;
    teams: any;
    topText: any;
    bottomText: any;
    style?: import("../types").Options;
    matchComponent: any;
    onMatchClick: any;
    onPartyClick: any;
}): JSX.Element;
export default Match;
