import {
  useEffect,
  useMemo,
  ReactElement,
  Children,
  isValidElement,
  ReactNode,
  useState,
} from 'react';

type NonEmptyArray<T> = readonly [T, ...T[]];

interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number];
  children:
    | Array<ReactElement<StepProps<Steps>>>
    | ReactElement<StepProps<Steps>>;
}

const Funnel = <Steps extends NonEmptyArray<string>>({
  steps,
  step,
  children,
}: FunnelProps<Steps>) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((i) =>
      steps.includes((i.props as Partial<StepProps<Steps>>).name ?? ''),
    ) as Array<ReactElement<StepProps<Steps>>>;

  const targetStep = validChildren.find((child) => child.props.name === step);

  return <>{targetStep}</>;
};

interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  onEnter?: () => void;
  children: ReactNode;
}

const Step = <Steps extends NonEmptyArray<string>>({
  onEnter,
  children,
}: StepProps<Steps>) => {
  useEffect(() => {
    onEnter?.();
  }, [onEnter]);

  return <>{children}</>;
};

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  'steps' | 'step'
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>,
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
): readonly [FunnelComponent<Steps>, () => void, () => void] => {
  const [step, setStep] = useState(steps[0]);
  const currentStepIdx = steps.indexOf(step);

  const toPrevStep = () => {
    if (currentStepIdx <= 0) return;
    setStep(steps[currentStepIdx - 1]);
  };
  const toNextStep = () => {
    if (currentStepIdx >= steps.length - 1) return;
    setStep(steps[currentStepIdx + 1]);
  };

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          return <Funnel<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step,
        },
      ),
    [],
  );

  return Object.assign([FunnelComponent, toPrevStep, toNextStep] as const);
};
