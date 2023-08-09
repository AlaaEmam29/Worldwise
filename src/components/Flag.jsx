import { useAppContext } from '../context/AppContext';
import { memo } from 'react';

const Flag = memo((props) => {
  const { flag } = useAppContext();
  const flagText = flag(props.flagInfo);

  if (!flagText) return null;

  return (
    <span>
      <img
        className='imgFlag'
        src={`https://flagcdn.com/24x18/${flagText}.png`}
        alt={`flag ${flagText}`}
        width='200'
        height='100'
      />
    </span>
  );
});

export default Flag;
