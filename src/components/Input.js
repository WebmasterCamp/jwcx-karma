import React from 'react'
import styled, {css} from 'react-emotion'

// prettier-ignore
export const TextInput = styled.input`
  font-weight: 300;
  text-align: left;
  font-size: 1.08em;
  line-height: 1.3em;

  width: 100%;
  padding: 0.5em 0.8em;

  min-width: 13em;
  outline: none;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  border: none;
  border-radius: 4px;

  background: white;
  color: #555;
  border-bottom: 2px solid #555;
  box-shadow: 0 1px 1.5px 1px rgba(0, 0, 0, 0.12);

  &::placeholder {
    color: #999;
  }

  &:hover {
    box-shadow: 0 3px 18.5px 2px rgba(0, 0, 0, 0.18);
  }

  &:focus,
  &:active {
    transform: scale(1.045);
    box-shadow: 0 3px 18.5px 2px rgba(0, 0, 0, 0.18);
  }

  &:focus + label {
    transform: translateY(-40px) scale(1);
  }

  ${props => props.meta && props.meta.touched && props.meta.error && css`
    border-bottom: 2px solid #e74c3c;
  `};
`

export default ({input, ...props}) => <TextInput {...input} {...props} />
