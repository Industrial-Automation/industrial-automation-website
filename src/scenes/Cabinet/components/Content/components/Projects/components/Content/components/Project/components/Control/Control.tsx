import { useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';

import { Text } from 'src/components/Text';
import { Icons } from 'src/components/Icons';
import { Button } from 'src/components/Button';
import { Switcher } from 'src/components/Switcher';
import { CircleProgress } from 'src/components/CircleProgress';
import { ProjectScreenType } from 'src/reducers/project-screens';
import { ControlGaugesStateType, fetchGetControlGauges } from 'src/reducers/control-gauges';
import { ControlSwitchesStateType, fetchGetControlSwitches } from 'src/reducers/control-switches';

interface ControlStatePropsType {
  projectScreen: ProjectScreenType;
}

const ControlElementTypes = Object.freeze({
  GAUGE: 'gauge',
  SWITCH: 'switch'
});

export const Control: React.FC<ControlStatePropsType> = ({ projectScreen }) => {
  const { control_switches } = useSelector<any>(
    (state) => state.control_switches
  ) as ControlSwitchesStateType;

  const { control_gauges } = useSelector<any>(
    (state) => state.control_gauges
  ) as ControlGaugesStateType;

  const formattedControlSwitches = useMemo(
    () =>
      control_switches.map((control_switch) => ({
        ...control_switch,
        type: ControlElementTypes.SWITCH
      })),
    [control_switches]
  );

  const formattedControlGauges = useMemo(
    () =>
      control_gauges.map((control_gauge) => ({
        ...control_gauge,
        type: ControlElementTypes.GAUGE
      })),
    [control_gauges]
  );

  const controlElements = useMemo(
    () =>
      [...formattedControlGauges, ...formattedControlSwitches].sort(
        (b, a) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [formattedControlGauges, formattedControlSwitches]
  );

  useEffect(() => {
    const fetchControlData = async () => {
      await fetchGetControlSwitches(projectScreen.id);

      await fetchGetControlGauges(projectScreen.id);
    };

    fetchControlData();

    const intervalId = setInterval(fetchControlData, 3000);

    return () => clearInterval(intervalId);
  }, [projectScreen.id]);

  return (
    <div className='scrollbar grid h-full w-full grid-cols-3 gap-5 overflow-y-auto p-2'>
      {controlElements.map((controlElement) => (
        <div
          key={controlElement.id}
          className='flex flex-col justify-between gap-4 rounded-3xl bg-subtone-black-5 p-3'
        >
          <div className='flex flex-row items-center justify-between'>
            <Text as='p' variant='header_3' className='text-main-white'>
              {controlElement.title}
            </Text>

            <div className='rounded-full bg-subtone-black-4 p-2'>
              <Icons variant='menu' size='sm' color='white' />
            </div>
          </div>

          <div className='flex w-full flex-row items-center justify-center'>
            {controlElement.type === ControlElementTypes.SWITCH && (
              <Switcher
                className='mb-9'
                barColor='gray'
                checkedBarColor='skyblue'
                circleColor='white'
              />
            )}

            {controlElement.type === ControlElementTypes.GAUGE && (
              <div className='flex flex-col items-center'>
                <CircleProgress
                  className='w-48'
                  barColor='gray'
                  circleColor='white'
                  strokeWidth={8}
                  reduction={0.15}
                  value={controlElement.value as number}
                />

                <div className='flex flex-row items-center gap-10'>
                  <Button
                    className='!h-4 !w-4 !p-4 text-main-white'
                    variant='secondary'
                    color='graphite'
                    size='md'
                    label='-'
                    onClick={() => {}}
                  />

                  <Button
                    className='!h-4 !w-4 !p-4 text-main-white'
                    variant='secondary'
                    color='graphite'
                    size='md'
                    label='+'
                    onClick={() => {}}
                  />
                </div>
              </div>
            )}
          </div>

          <Text as='p' align='center' variant='sm_medium' className='text-center text-main-white'>
            {controlElement.description}
          </Text>
        </div>
      ))}
    </div>
  );
};
