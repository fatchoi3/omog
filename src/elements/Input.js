import React, { forwardRef } from 'react';
import styled from 'styled-components';


const Input = forwardRef(({ _onKeyPress, _onChange, is_margin, is_padding, is_width, is_height, is_color, is_border, is_radius, value, type, placeholder, is_border_bottom, is_border_top, is_box_sizing, is_font_size, is_outline }, ref) => {

  const styles = {
    is_margin: is_margin,
    is_padding: is_padding,
    is_width: is_width,
    is_height: is_height,
    is_color: is_color,
    is_border: is_border,
    is_radius: is_radius,
    is_border_bottom: is_border_bottom,
    is_border_top: is_border_top,
    is_box_sizing: is_box_sizing,
    is_font_size: is_font_size,
    is_outline: is_outline,
  }

  return (
    <>
      <ElInput
        {...styles}
        // value={value} 
        placeholder={placeholder}
        type={type}
        onChange={_onChange}
        onKeyPress={_onKeyPress}
        ref={ref}
      />
    </>
  );
});

Input.defaultProps = {
  _onChange: () => { },
  is_margin: false,
  is_padding: false,
  is_width: false,
  is_height: false,
  is_color: false,
  is_border: false,
  is_radius: false,
  value: "",
  type: "text",
  placeholder: '텍스트를 입력해주세요.',
}

const ElInput = styled.input`
  ${(props) => (props.is_margin ? `margin: ${props.is_margin};` : 'margin: 0;')};
  ${(props) => (props.is_padding ? `padding: ${props.is_padding};` : 'padding: 0;')};
  ${(props) => (props.is_width ? `width: ${props.is_width};` : 'width: 100%;')};
  ${(props) => (props.is_height ? `height: ${props.is_height};` : 'height: 100%;')};
  ${(props) => (props.is_color ? `color: ${props.is_color};` : '')};
  ${(props) => (props.is_border ? `border: ${props.is_border};` : '')};
  ${(props) => (props.is_radius ? `border-radius: ${props.is_radius};` : '')};
  ${(props) => (props.is_border_bottom ? `border-bottom: ${props.is_border_bottom};` : '')};
  ${(props) => (props.is_border_top ? `border-top: ${props.is_border_top};` : '')};
  ${(props) => (props.is_box_sizing ? `box-sizing: ${props.is_box_sizing};` : 'border-box')};
  ${(props) => (props.is_font_size ? `font-size: ${props.is_font_size};` : '14px')};
  ${(props) => (props.is_outline ? `outline: ${props.is_outline};` : '')};
`

export default Input;