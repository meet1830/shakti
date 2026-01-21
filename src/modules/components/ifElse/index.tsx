import {FC, ReactNode} from 'react';

interface Props {
  condition: any;
  ifComp?: ReactNode;
  elseComp?: ReactNode;
}

const IfElse: FC<Props> = ({condition, ifComp, elseComp}) => {
  return condition ? <>{ifComp}</> : <>{elseComp}</>;
};

export default IfElse;
