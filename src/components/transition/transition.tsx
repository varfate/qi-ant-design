/**
 * 封装常用动画
 */
import CSSTransition, {
  CSSTransitionProps,
} from 'react-transition-group/CSSTransition';

export type TransitionAnimation =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right';

export type TransitionProps = CSSTransitionProps & {
  animation: TransitionAnimation;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation,
    children,
    appear = true,
    unmountOnExit = false,
    ...restProps
  } = props;
  return (
    <CSSTransition
      {...restProps}
      appear={appear}
      unmountOnExit={unmountOnExit}
      classNames={`qi-animation-${animation}`}
    >
      {children}
    </CSSTransition>
  );
};

export default Transition;
