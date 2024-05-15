export const theme = {
  /**
   *  색상: palette.primary[500] 또는 palette.folder.blue 로 접근합니다.
   */

  palette: {
    primary: {
      500: '#3184FF',
      100: '#E9EFFF',
    },
    neutral: {
      500: '#1F1F1F',
      400: '#989898',
      300: '#848484',
      200: '#989898',
      150: '#E1E1E1',
      100: '#F4F5F7',
    },
    folder: {
      blue: '#D7EBFF',
      pink: '#FFE4E9',
      purple: '#E2D8FF',
      orange: '#FFE5D7',
      yellow: '#FFF6C5',
      green: '#DFF8E1',
    },
    system: {
      warning: '#f1404b',
      disabled: '#878787',
      background: '#FBFBFB',
    },
  },
  typo: {
    Head_24_B: `
        font-size: 24px;
        font-weight: 700;
        line-height: 140%;
    `,
    Head_20_B: `
        font-size: 20px;
        font-weight: 700;
        line-height: 140%;
    `,
    Head_20_M: `
        font-size: 20px;
        font-weight: 500;
        line-height: 140%;
    `,
    Body_18_B: `
        font-size: 18px;
        font-weight: 700;
        line-height: 140%;
    `,
    Body_18_R: `
        font-size: 18px;
        font-weight: 400;
        line-height: 140%;
    `,
    Body_16_SB: `
        font-size: 16px;
        font-weight: 600;
        line-height: 140%;
    `,
    Body_14_B: `
        font-size: 14px;
        font-weight: 700;
        line-height: 140%;
    `,
    Body_14_M: `
        font-size: 14px;
        font-weight: 500;
        line-height: 140%;
    `,
    Caption_12_B: `
        font-size: 12px;
        font-weight: 700;
        line-height: 140%;
    `,
    Caption_12_M: `
        font-size: 12px;
        font-weight: 500;
        line-height: 140%;
    `,
    Caption_10_SB: `
        font-size: 10px;
        font-weight: 600;
        line-height: 140%;
    `,
  },
};

export type ThemeType = typeof theme;
