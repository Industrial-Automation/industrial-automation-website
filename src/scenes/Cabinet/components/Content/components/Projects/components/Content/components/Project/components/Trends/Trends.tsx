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
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  fetchGetTrendsArchive,
  TrendsArchiveStateType,
  TrendsArchiveType
} from 'src/reducers/trends-archive';
import { ProjectScreenType } from 'src/reducers/project-screens';

interface TrendsPropsType {
  projectScreen: ProjectScreenType;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Trends: React.FC<TrendsPropsType> = ({ projectScreen }) => {
  const { trends_archive } = useSelector<any>(
    (state) => state.trends_archive
  ) as TrendsArchiveStateType;

  useEffect(() => {
    const fetchTrendsData = async () => {
      await fetchGetTrendsArchive(projectScreen.id);
    };

    fetchTrendsData();

    const intervalId = setInterval(fetchTrendsData, 2000);

    return () => clearInterval(intervalId);
  }, [projectScreen.id]);

  const groupedTrends = Object.values(
    trends_archive.reduce<Record<string, TrendsArchiveType[]>>((acc, item) => {
      (acc[item.tag] ||= []).push(item);

      return acc;
    }, {})
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
      labels: data.map((item) => item.created_at),
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
      {groupedTrends.map((trend, index) => (
        <Line
          className='bg-main-white'
          key={index}
          options={getLineOptions(trend[0].title)}
          data={getLineData(trend)}
        />
      ))}
    </div>
  );
};
