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
export default function RoundHeader({ x, y, width, roundHeader, canvasPadding, numOfRounds, tournamentRoundText, columnIndex, }: RoundHeaderProps): JSX.Element;
