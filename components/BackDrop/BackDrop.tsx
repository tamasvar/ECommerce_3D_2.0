import { FC } from 'react';

type Props = {
  isOpen: boolean;
};

const BackDrop: FC<Props> = ({ isOpen }) =>
  isOpen ? (
    <div className='fixed left-0 top-0 z-[60] h-screen w-screen bg-[rgba(0,0,0,0.8)]' />
  ) : (
    <></>
  );

export default BackDrop;
