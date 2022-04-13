import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    is_size,
    is_color,
    is_margin,
    is_padding,
    _onClick,
    is_bold,
    is_height,
    is_width,
    is_center,
    is_line_height,
    is_box_sizing,
    is_stroke,
    is_border,
    is_cursor,
    is_outline,
  } = props;

  const styles = {
    is_bold: is_bold,
    is_margin: is_margin,
    is_padding: is_padding,
    is_size: is_size,
    is_color: is_color,
    is_width: is_width,
    is_height: is_height,
    is_center: is_center,
    is_line_height: is_line_height,
    is_box_sizing: is_box_sizing,
    is_stroke: is_stroke,
    is_border: is_border,
    is_cursor: is_cursor,
    is_outline: is_outline,
  };

  return (
    <>
      <ElText {...styles} onClick={_onClick}>
        {children}
      </ElText>
    </>
  );
};

Text.defaultProps = {
  _onClick: () => {},
  children: null,
  is_bold: false,
  is_size: false,
  is_color: false,
  is_margin: false,
  is_padding: false,
  is_width: false,
  is_height: false,
  is_center: false,
};

const ElText = styled.p`
  ${(props) =>
    props.is_margin ? `margin: ${props.is_margin};` : "margin: 0;"};
  ${(props) =>
    props.is_padding ? `padding: ${props.is_padding};` : "padding: 0;"};
  ${(props) =>
    props.is_size ? `font-size: ${props.is_size};` : "font-size: 0.94vw;"};
  ${(props) => (props.is_color ? `color: ${props.is_color};` : "")};
  ${(props) => (props.is_bold ? `font-weight: 700;` : "font-weight: 400")};
  ${(props) => (props.is_width ? `width: ${props.is_width};` : "")};
  ${(props) => (props.is_height ? `height: ${props.is_height};` : "")};
  ${(props) =>
    props.is_center ? `text-align: ${props.is_center};` : "text-align: center"};
  ${(props) =>
    props.is_line_height
      ? `line-height: ${props.is_line_height};`
      : "line-height: 0.94vw"};
  ${(props) =>
    props.is_box_sizing
      ? `box-sizing: ${props.is_box_sizing};`
      : "box-sizing: border-box"};
  ${(props) =>
    props.is_stroke ? `-webkit-text-stroke: ${props.is_stroke};` : ""};
  ${(props) => (props.is_border ? `border: ${props.is_border};` : "")};
  ${(props) => (props.is_cursor ? `cursor: ${props.is_cursor};` : "")};
  ${(props) => (props.is_outline ? `outline: ${props.is_outline};` : "")};
  ${(props) => (props.is_cursor ? `cursor: pointer;` : "")};
`;

export default Text;
