import './LoadMore.scss';
import cn from 'classnames';
import { ClipLoader } from 'react-spinners';

type Props = {
  classname: string;
  onClick: () => void;
  text: string;
  disabled: boolean;
  isLoading: boolean;
  type : "button" | "submit" | "reset"
};

export const Button: React.FC<Props> = ({
  classname,
  onClick,
  text,
  disabled,
  isLoading,
  type,
}) => {
  return (
    <button className={classname} onClick={onClick} disabled={disabled}>
      <div className={cn('add-container', { 'animate': isLoading })}>
        {isLoading && <ClipLoader color="#fff" size="15px" />}
        {text}
      </div>
    </button >
  );
};
