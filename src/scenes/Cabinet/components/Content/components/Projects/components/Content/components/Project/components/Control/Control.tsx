import { useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';

import {
  ControlGaugesStateType,
  ControlGaugeType,
  fetchGetControlGauges,
  fetchUpdateControlGauge
} from 'src/reducers/control-gauges';
import {
  ControlSwitchesStateType,
  ControlSwitchType,
  fetchGetControlSwitches
} from 'src/reducers/control-switches';
import { debounce } from 'src/utils';
import { Text } from 'src/components/Text';
import { useModal } from 'src/hooks/useModal';
import { Button } from 'src/components/Button';
import { ModalNames } from 'src/constants/modals';
import { Switcher } from 'src/components/Switcher';
import { CircleProgress } from 'src/components/CircleProgress';
import { ProjectScreenType } from 'src/reducers/project-screens';

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

  const modal = useModal();

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

  const handleOpenControlSwitchMenu = (e: MouseEvent, controlSwitch: ControlSwitchType) => {
    const element = e.target as HTMLButtonElement;

    modal({
      name: ModalNames.ControlSwitchMenu,
      show: true,
      frame: {
        type: 'contextModal',
        props: { className: '!bg-subtone-black-6', element, size: 'sm' }
      },
      variant: {
        type: 'controlSwitchMenu',
        props: {
          id: controlSwitch.id,
          title: controlSwitch.title,
          description: controlSwitch.description || '',
          editable: controlSwitch.editable
        }
      }
    });
  };

  const handleOpenControlGaugeMenu = (e: MouseEvent, controlGauge: ControlGaugeType) => {
    const element = e.target as HTMLButtonElement;

    modal({
      name: ModalNames.ControlGaugeMenu,
      show: true,
      frame: {
        type: 'contextModal',
        props: { className: '!bg-subtone-black-6', element, size: 'sm' }
      },
      variant: {
        type: 'controlGaugeMenu',
        props: {
          id: controlGauge.id,
          title: controlGauge.title,
          description: controlGauge.description || '',
          min_value: controlGauge.min_value,
          max_value: controlGauge.max_value,
          interval_value: controlGauge.interval_value,
          unit: controlGauge.unit,
          editable: controlGauge.editable
        }
      }
    });
  };

  const handleChangeControlGaugeValue = useMemo(
    () => debounce((id: string, value: number) => fetchUpdateControlGauge(id, { value }), 800),
    []
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

            <Button
              className='!p-2'
              variant='secondary'
              color='black'
              size='md'
              icon='menu'
              iconSize='sm'
              iconColor='white'
              onClick={(e) =>
                controlElement.type === ControlElementTypes.SWITCH
                  ? handleOpenControlSwitchMenu(e, controlElement)
                  : controlElement.type === ControlElementTypes.GAUGE
                    ? handleOpenControlGaugeMenu(e, controlElement)
                    : () => {}
              }
            />
          </div>

          <div className='flex w-full flex-row items-center justify-center'>
            {controlElement.type === ControlElementTypes.SWITCH && (
              <Switcher
                className='mb-9'
                barColor='gray'
                checkedBarColor='skyblue'
                circleColor='white'
                editable={controlElement.editable}
              />
            )}

            {controlElement.type === ControlElementTypes.GAUGE && (
              <CircleProgress
                className='w-48'
                barColor='gray'
                circleColor='white'
                strokeWidth={8}
                reduction={0.15}
                value={controlElement.value}
                minValue={controlElement.min_value}
                maxValue={controlElement.max_value}
                intervalValue={controlElement.interval_value}
                unit={controlElement.unit}
                editable={controlElement.editable}
                onChange={(value) => handleChangeControlGaugeValue(controlElement.id, value)}
              />
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
