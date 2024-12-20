import React from 'react';
import theme from '../../../theme';

/**
 * User icon, exclusively for Post components
 *
 * @param {string} width
 * @param {string} color
 */
export const PostUserIcon = ({ width, color }) => {
  const DEFAULT_WIDTH = '22';
  const DEFAULT_COLOR = theme.colors.text.secondary;

  return (
    <svg width={width || DEFAULT_WIDTH} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g id="Layer_1">
        <circle cx="32" cy="32" fill="#4F5D73" r="32" />
        <path
          d="M43.905 47.543c-3.821-1.66-5.217-4.242-5.643-6.469 2.752-2.215 4.943-5.756 6.148-9.573 1.239-1.579 1.96-3.226 1.96-4.62 0-.955-.347-1.646-.955-2.158-.203-8.106-5.942-14.613-13.039-14.714-.054 0-.108-.009-.163-.009-.022 0-.043.004-.065.004-7.052.039-12.783 6.41-13.125 14.409-.884.528-1.394 1.305-1.394 2.469 0 1.641.992 3.63 2.663 5.448 1.187 3.327 3.118 6.38 5.5 8.438-.354 2.292-1.699 5.039-5.697 6.776-2.159.938-6.105 1.781-7.808 2.649 4.362 4.769 12.624 7.769 19.589 7.805l.099.003c.008-.002.017-.001.025-.001 7.014 0 15.325-3.01 19.713-7.808-1.703-.868-5.65-1.711-7.808-2.649z"
          fill={theme.colors[color] || DEFAULT_COLOR}
          opacity="0.2"
        />
        <path
          d="M43.905 45.543c-3.821-1.66-5.217-4.242-5.643-6.469 2.752-2.215 4.943-5.756 6.148-9.573 1.239-1.579 1.96-3.226 1.96-4.62 0-.955-.347-1.646-.955-2.158-.202-8.105-5.941-14.613-13.037-14.713-.056-.001-.11-.01-.165-.01-.022 0-.043.004-.065.004-7.052.039-12.783 6.41-13.125 14.409-.884.528-1.394 1.305-1.394 2.469 0 1.641.992 3.63 2.663 5.448 1.187 3.327 3.118 6.38 5.5 8.438-.354 2.292-1.699 5.039-5.697 6.776-2.159.938-6.105 1.781-7.808 2.649 4.362 4.769 12.624 7.769 19.589 7.805l.099.003c.008-.002.017-.001.025-.001 7.014 0 15.325-3.01 19.713-7.808-1.703-.868-5.65-1.711-7.808-2.649z"
          fill={color || DEFAULT_COLOR}
        />
      </g>
    </svg>
  );
};
