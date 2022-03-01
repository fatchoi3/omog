import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { children, is_margin, is_padding, is_width, is_background, is_color, is_border, is_radius, is_height, _onClick, is_size, is_weight, is_disabled, is_cursor} = props;

  const styles = {
    is_margin: is_margin,
    is_width: is_width,
    is_padding: is_padding,
    is_color: is_color,
    is_background: is_background,
    is_height: is_height,
    is_border: is_border,
    is_radius: is_radius,
    is_size: is_size,
    is_weight: is_weight,
    is_disabled: is_disabled,
    is_cursor: is_cursor,
}

  return (
    <>
      <ElButton {...styles} onClick={_onClick}>{children}</ElButton>
    </>
  );
};

Button.defaultProps = {
  childred: null,
  _onClick: () => {},
  is_margin: false,
  is_padding: false,
  is_width: false,
  is_height: false,
  is_background: false,
  is_color: false,
  is_border: false,
  is_radius: false,
  is_size: false,
  is_weight: false,
  is_disabled:false,
  is_cursor: false,
}

const ElButton = styled.button`
  ${(props) => (props.is_margin? `margin: ${props.is_margin};` : 'margin: 0;')};
  ${(props) => (props.is_padding? `padding: ${props.is_padding};` : 'padding: 0;')};
  ${(props) => (props.is_width? `width: ${props.is_width};` : 'width: 100%;')};
  ${(props) => (props.is_height? `height: ${props.is_height};` : 'height: 100%;')};
  ${(props) => (props.is_background? `background-color: ${props.is_background};` : '')};
  ${(props) => (props.is_color? `color: ${props.is_color};` : '')};
  ${(props) => (props.is_border? `border: ${props.is_border};` : '')};
  ${(props) => (props.is_radius? `border-radius: ${props.is_radius};` : '')};
  ${(props) => (props.is_size? `font-size: ${props.is_size};` : '')};
  ${(props) => (props.is_weight? `font-weight: ${props.is_weight};` : '')};
  ${(props) => (props.is_disabled? `disabled: ${props.is_disabled};` : '')};
  ${(props) => (props.is_cursor? `cursor: pointer;` : '')};
`;

export default Button;