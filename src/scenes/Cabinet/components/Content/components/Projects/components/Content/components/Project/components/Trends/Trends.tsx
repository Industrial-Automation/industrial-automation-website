import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';

import {
  fetchGetTrendsArchive,
  TrendsArchiveStateType,
  TrendsArchiveType
} from 'src/reducers/trends-archive';
import { Input } from 'src/components/Input';
import { Switcher } from 'src/components/Switcher';
import { ProjectScreenType } from 'src/reducers/project-screens';

import Translations from './translations';

interface TrendsPropsType {
  projectScreen: ProjectScreenType;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Trends: React.FC<TrendsPropsType> = ({ projectScreen }) => {
  const { trends_archive } = useSelector<any>(
    (state) => state.trends_archive
  ) as TrendsArchiveStateType;

  const [dateTimeStart, setDateTimeStart] = useState('');
  const [dateTimeEnd, setDateTimeEnd] = useState('');

  const [isRealTime, setIsRealTime] = useState(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchTrendsData = async () => {
      await fetchGetTrendsArchive(projectScreen.id);
    };

    fetchTrendsData();

    const intervalId = setInterval(fetchTrendsData, 3000);

    return () => clearInterval(intervalId);
  }, [projectScreen.id]);

  const groupedTrends = useMemo(
    () =>
      Object.values(
        trends_archive.reduce<Record<string, TrendsArchiveType[]>>((acc, item) => {
          (acc[item.tag] ||= []).push(item);

          return acc;
        }, {})
      ),
    [trends_archive]
  );

  const sortedGroupedTrends = useMemo(
    () =>
      groupedTrends.map((arr) =>
        arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      ),
    [groupedTrends]
  );

  const filteredTrends = useMemo(
    () =>
      sortedGroupedTrends.map((group) => {
        if (isRealTime) {
          return group.slice(Math.max(group.length - 10, 0));
        }

        let filteredGroup = [...group];

        if (dateTimeStart) {
          filteredGroup = group.filter(
            (item) =>
              new Date(new Date(item.created_at).setMilliseconds(0)).getTime() >=
              new Date(dateTimeStart).getTime()
          );
        }

        if (dateTimeEnd) {
          filteredGroup = filteredGroup.filter(
            (item) =>
              new Date(new Date(item.created_at).setMilliseconds(0)).getTime() <=
              new Date(dateTimeEnd).getTime()
          );
        }

        return filteredGroup;
      }),
    [dateTimeEnd, dateTimeStart, isRealTime, sortedGroupedTrends]
  );

  const getLineOptions = (title: string) => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: true,
          text: title
        }
      }
    };
  };

  const getLineData = (data: TrendsArchiveType[]) => {
    return {
      labels: data.map((item) => formatDate(new Date(item.created_at))),
      datasets: [
        {
          label: 'Dataset 1',
          data: data.map((item) => item.value),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    };
  };

  return (
    <div className='scrollbar grid h-full w-full grid-cols-1 gap-5 overflow-y-auto p-2'>
      {filteredTrends.map((trend, index) => (
        <div key={index} className='mb-10 flex flex-col'>
          <div className='flex items-center justify-between gap-x-24'>
            <Switcher
              labelClassName='text-main-white'
              size='sm'
              barColor='gray'
              checkedBarColor='skyblue'
              circleColor='white'
              value={isRealTime}
              label={Translations.realTimeLabel}
              onChange={(isChecked) => setIsRealTime(isChecked)}
            />

            <div className='flex gap-x-5'>
              <Input
                className='mb-5 h-8 w-52 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
                labelClassName='text-main-white'
                type='datetime-local'
                label={Translations.startLabel}
                value={dateTimeStart}
                step={1}
                onChange={(e) => setDateTimeStart(e.target.value)}
                disabled={isRealTime}
              />

              <Input
                className='mb-5 h-8 w-52 bg-main-white shadow-skyblue ring-0 [&>input]:text-sm'
                labelClassName='text-main-white'
                type='datetime-local'
                label={Translations.endLabel}
                value={dateTimeEnd}
                step={1}
                onChange={(e) => setDateTimeEnd(e.target.value)}
                disabled={isRealTime}
              />
            </div>
          </div>

          <Line
            className='bg-main-white'
            options={getLineOptions(trend[0]?.title || '')}
            data={getLineData(trend)}
          />
        </div>
      ))}
    </div>
  );
};
