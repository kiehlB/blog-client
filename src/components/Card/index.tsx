import styled from 'styled-components';

export type CardProps = {};

function Card({}: CardProps) {
  return (
    <CardBlock>
      <div>snippet</div>
    </CardBlock>
  );
}

const CardBlock = styled.div``;

export default Card;
