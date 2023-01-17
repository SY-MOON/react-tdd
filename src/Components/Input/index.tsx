import styled from 'styled-components';

interface Props {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onChange?: (text: string) => void;
}

export const Input = ({ placeholder, value, onChange }: Props) => {
  return (
    <InputBox
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

const InputBox = styled.input`
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;
