import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ type, data, title, description }) => {
  const chartProps = {
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    },
    data: data
  };

  const components = {
    line: Line,
    bar: Bar,
    pie: Pie,
    doughnut: Doughnut
  };

  const ChartType = components[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="chart-container"
    >
      <ChartType {...chartProps} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="chart-description"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const ChartSlider = ({ charts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {charts.map((chart, index) => (
          <div key={index}>
            <ChartComponent
              type={chart.type}
              data={chart.data}
              title={chart.title}
              description={chart.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ChartSlider;