/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769];

function getRandomInt(min, max, n) {
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min;
}

const defaultProps = {
  paragraph: false,
  lineCount: 3,
  width: '100%',
  heading: false,
};

export type SkeletonTextProps = { className?: string } & typeof defaultProps;

export const SkeletonText = ({
  paragraph,
  lineCount,
  width,
  heading,
  className,
  ...other
}: SkeletonTextProps) => {
  const classNames = cx(className, {
    [`${prefix}--skeleton__text`]: true,
    [`${prefix}--skeleton__heading`]: heading,
  });

  const widthNum = parseInt(width, 10);

  const widthPx = width.includes('px');

  const widthPercent = width.includes('%');

  if (widthPercent && paragraph) {
    const lines = [];
    for (var i = 0; i < lineCount; i++) {
      const randomWidth = getRandomInt(0, 75, i) + 'px';
      lines.push(
        <p
          className={classNames}
          style={{ width: `calc(${width} - ${randomWidth})` }}
          key={i}
          {...other}
        />
      );
    }
    return <div>{lines}</div>;
  }

  if (widthPx && paragraph) {
    const lines = [];
    for (var j = 0; j < lineCount; j++) {
      const randomWidth = getRandomInt(widthNum - 75, widthNum, j) + 'px';
      lines.push(
        <p
          className={classNames}
          style={{ width: randomWidth }}
          key={j}
          {...other}
        />
      );
    }
    return <div>{lines}</div>;
  }
  return <p className={classNames} style={{ width: width }} {...other} />;
};

SkeletonText.propTypes = {
  /**
   * will generate multiple lines of text
   */
  paragraph: PropTypes.bool,
  /**
   * the number of lines in a paragraph
   */
  lineCount: PropTypes.number,
  /**
   * width (in px or %) of single line of text or max-width of paragraph lines
   */
  width: PropTypes.string,
  /**
   * generates skeleton text at a larger size
   */
  heading: PropTypes.bool,
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
};

SkeletonText.defaultProps = defaultProps;
