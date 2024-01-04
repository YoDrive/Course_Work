import styles from './statistics.module.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { UsersModel, BookingsModel, RevenueModel, MonthRevenueModel} from '../../../../models/Dashboard/DashboardModels'

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

const bookings: BookingsModel = {
  value: 15,
  percent: 70
}

const users: UsersModel = {
  value: 34,
  percent: 44
}

const revenue: RevenueModel = {
  value: 145000,
  percent: 78
}

const revenue_sum: MonthRevenueModel = {
  labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
  data: [300, 300, 280, 380, 200, 300, 280, 350]
}

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
  
const data = {
    labels: revenue_sum.labels,
    datasets: [
      {
        label: 'Доход',
        data: revenue_sum.data,
        backgroundColor: 'rgb(123, 167, 99)',
        borderRadius: 13
      },
    ],
  };

export function Statistics(){
    return(
        <div className={styles.dashboard}>
            <div className={styles.dashboard_single_metric}>
                <div className={styles.metric}>
                    <div className={styles.container}>
                        <div className={styles.metric_info}>
                            <p className={styles.metric_info_name}>Новых пользователей</p>
                            <p className={styles.metric_info_desc}>Общее количество новых пользователей сегодня</p>
                            <p className={styles.metric_num}>{users.value}</p>
                        </div>
                        <div className={styles.metric_circle}>
                                <CircularProgressbar
                                    value={users.percent}
                                    text={`${users.percent}%`}
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
                            <p className={styles.metric_num}>{bookings.value}</p>
                        </div>
                        <div className={styles.metric_circle}>
                                <CircularProgressbar
                                    value={bookings.percent}
                                    text={`${bookings.percent}%`}
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
                    <p className={styles.metric_revenue_num}>{revenue.value}₽</p>
                    <div className={styles.metric_revenue_circle}>
                        <CircularProgressbar
                            value={revenue.percent}
                            text={`${revenue.percent}%`}
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
        
    )
}