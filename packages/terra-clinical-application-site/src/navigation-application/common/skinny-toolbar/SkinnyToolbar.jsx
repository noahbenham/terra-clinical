import React from 'react';
import classNames from 'classnames/bind';
import styles from './SkinnyToolbar.scss';

const cx = classNames.bind(styles);

const SkinnyToolbar = (props) => {
  return (
    <div className={cx('skinny')}>
      {props.buttons}
    </div>
  )
}

export default SkinnyToolbar;
