import { ComputedOptions, Options } from './types';

export const defaultStyle: Options = {
  width: 300,
  boxHeight: 130,
  canvasPadding: 25,
  spaceBetweenColumns: 30,
  spaceBetweenRows: 10,
  connectorColor: 'rgb(47, 54, 72)',
  connectorColorHighlight: '#DDD',
  roundHeader: {
    isShown: true,
    height: 40,
    marginBottom: 25,
    fontSize: 16,
    fontColor: 'white',
    backgroundColor: 'rgb(47, 54, 72)',
    fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
    roundTextGenerator: undefined
  },
  roundSeparatorWidth: 24,
  lineInfo: {
    separation: -13,
    homeVisitorSpread: 0.5,
  },
  horizontalOffset: 5,
  wonBywalkOverText: 'WO',
  lostByNoShowText: 'NS',
};

export const getCalculatedStyles = (style = defaultStyle): ComputedOptions => {
  const { boxHeight, width, spaceBetweenColumns, spaceBetweenRows } = style;
  const columnWidth = width + spaceBetweenColumns;
  const rowHeight = boxHeight + spaceBetweenRows;
  return { ...style, rowHeight, columnWidth };
};
