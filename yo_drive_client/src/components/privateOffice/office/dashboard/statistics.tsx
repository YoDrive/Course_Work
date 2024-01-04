import styles from './statistics.module.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    UsersModel,
    BookingsModel,
    RevenueModel,
    MonthRevenueModel,
    DashboardModel
} from '../../../../models/Dashboard/DashboardModels'
import {useEffect, useState} from "react";
import LkService from "../../../../services/lkService";
import StatisticService from "../../../../services/StatisticService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

export function Statistics(){
    const [statistic, setStatistic] = useState<DashboardModel>();

    useEffect(() => {
        const fetchStatisticData = async () => {
            try {
                const statistic = await StatisticService.GetStatistic();
                setStatistic(statistic.data);
            } catch (error) {
                console.error('Error fetching statistic data:', error);
            }
        };
        fetchStatisticData();
    }, []);

    const data = {
        labels: statistic?.monthRevenueModel.labels,
        datasets: [
            {
                label: 'Доход',
                data: statistic?.monthRevenueModel.data,
                backgroundColor: 'rgb(123, 167, 99)',
                borderRadius: 13
            },
        ],
    };

    return(
        <>
            {statistic ?
                <div className={styles.dashboard}>
                    <div className={styles.dashboard_single_metric}>
                        <div className={styles.metric}>
                            <div className={styles.container}>
                                <div className={styles.metric_info}>
                                    <p className={styles.metric_info_name}>Новых пользователей</p>
                                    <p className={styles.metric_info_desc}>Общее количество новых пользователей сегодня</p>
                                    <p className={styles.metric_num}>{statistic.usersModel.value}</p>
                                </div>
                                <div className={styles.metric_circle}>
                                    <CircularProgressbar
                                        value={statistic.usersModel.percent}
                                        text={`${statistic.usersModel.percent.toFixed(0)}%`}
                                        strokeWidth={13}
                                        styles={{
                                            path: {
                                                stroke: '#7ba763',
                                                strokeLinecap: 'round',
                                                transition: 'stroke-dashoffset 0.5s ease 0s'
                                            },
                                            trail: {
                                                stroke: '#d6d6d6',
                                                strokeLinecap: 'round'
                                            },
                                            text: {
                                                fontSize: '16px',
                                                transform: 'translate(-14px, 5px)'
                                            },
                                            background: {
                                                fill: '#3e98c7'
                                            }
                                        }}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.container}>
                                <div className={styles.metric_info}>
                                    <p className={styles.metric_info_name}>Брони</p>
                                    <p className={styles.metric_info_desc}>Общее количество броней сегодня</p>
                                    <p className={styles.metric_num}>{statistic.bookingsModel.value}</p>
                                </div>
                                <div className={styles.metric_circle}>
                                    <CircularProgressbar
                                        value={statistic.bookingsModel.percent}
                                        text={`${statistic.bookingsModel.percent.toFixed(0)}%`}
                                        strokeWidth={13}
                                        styles={{
                                            path: {
                                                stroke: '#7ba763',
                                                strokeLinecap: 'round',
                                                transition: 'stroke-dashoffset 0.5s ease 0s'
                                            },
                                            trail: {
                                                stroke: '#d6d6d6',
                                                strokeLinecap: 'round'
                                            },
                                            text: {
                                                fontSize: '16px',
                                                transform: 'translate(-14px, 5px)'
                                            },
                                            background: {
                                                fill: '#3e98c7'
                                            }
                                        }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.second_container}>
                        <div className={styles.dashboard_revenue_month}>
                            <p className={styles.dashboard_graph_name}>Ежемесячный доход</p>
                            <div className={styles.dashboard_graph}>
                                <Bar options={options} data={data} />
                            </div>
                        </div>
                        <div className={styles.metric_revenue}>
                            <p className={styles.metric_revenue_name}>Доход</p>
                            <p className={styles.metric_revenue_num}>{statistic.revenueModel.value.toFixed(0)}₽</p>
                            <div className={styles.metric_revenue_circle}>
                                <CircularProgressbar
                                    value={statistic.revenueModel.percent}
                                    text={`${statistic.revenueModel.percent.toFixed(0)}%`}
                                    strokeWidth={13}
                                    styles={{
                                        path: {
                                            stroke: '#d6d6d6',
                                            strokeLinecap: 'round',
                                            transition: 'stroke-dashoffset 0.5s ease 0s'
                                        },
                                        trail: {
                                            stroke: '#D9D9D933',
                                            strokeLinecap: 'round'
                                        },
                                        text: {
                                            fontSize: '16px',
                                            transform: 'translate(-14px, 5px)'
                                        },
                                        background: {
                                            fill: '#3e98c7'
                                        }
                                    }}/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.dashboard}>
                    <div className={styles.dashboard_single_metric}>
                        <div className={styles.metric}>
                            <div className={styles.container}>
                                <div className={styles.metric_info}>
                                    <p className={styles.metric_info_name}>Новых пользователей</p>
                                    <p className={styles.metric_info_desc}>Общее количество новых пользователей сегодня</p>
                                    <p className={styles.metric_num}>{0}</p>
                                </div>
                                <div className={styles.metric_circle}>
                                    <CircularProgressbar
                                        value={0}
                                        text={`${0}%`}
                                        strokeWidth={13}
                                        styles={{
                                            path: {
                                                stroke: '#7ba763',
                                                strokeLinecap: 'round',
                                                transition: 'stroke-dashoffset 0.5s ease 0s'
                                            },
                                            trail: {
                                                stroke: '#d6d6d6',
                                                strokeLinecap: 'round'
                                            },
                                            text: {
                                                fontSize: '16px',
                                                transform: 'translate(-14px, 5px)'
                                            },
                                            background: {
                                                fill: '#3e98c7'
                                            }
                                        }}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.container}>
                                <div className={styles.metric_info}>
                                    <p className={styles.metric_info_name}>Брони</p>
                                    <p className={styles.metric_info_desc}>Общее количество броней сегодня</p>
                                    <p className={styles.metric_num}>{0}</p>
                                </div>
                                <div className={styles.metric_circle}>
                                    <CircularProgressbar
                                        value={0}
                                        text={`${0}%`}
                                        strokeWidth={13}
                                        styles={{
                                            path: {
                                                stroke: '#7ba763',
                                                strokeLinecap: 'round',
                                                transition: 'stroke-dashoffset 0.5s ease 0s'
                                            },
                                            trail: {
                                                stroke: '#d6d6d6',
                                                strokeLinecap: 'round'
                                            },
                                            text: {
                                                fontSize: '16px',
                                                transform: 'translate(-14px, 5px)'
                                            },
                                            background: {
                                                fill: '#3e98c7'
                                            }
                                        }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.second_container}>
                        <div className={styles.dashboard_revenue_month}>
                            <p className={styles.dashboard_graph_name}>Ежемесячный доход</p>
                            <div className={styles.dashboard_graph}>
                                <Bar options={options} data={data} />
                            </div>
                        </div>
                        <div className={styles.metric_revenue}>
                            <p className={styles.metric_revenue_name}>Доход</p>
                            <p className={styles.metric_revenue_num}>{0}₽</p>
                            <div className={styles.metric_revenue_circle}>
                                <CircularProgressbar
                                    value={0}
                                    text={`${0}%`}
                                    strokeWidth={13}
                                    styles={{
                                        path: {
                                            stroke: '#d6d6d6',
                                            strokeLinecap: 'round',
                                            transition: 'stroke-dashoffset 0.5s ease 0s'
                                        },
                                        trail: {
                                            stroke: '#D9D9D933',
                                            strokeLinecap: 'round'
                                        },
                                        text: {
                                            fontSize: '16px',
                                            transform: 'translate(-14px, 5px)'
                                        },
                                        background: {
                                            fill: '#3e98c7'
                                        }
                                    }}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}