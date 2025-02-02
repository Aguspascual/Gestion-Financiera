import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import dayjs from "dayjs";

const Dashboard1 = () => {
  const navigate = useNavigate();
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [ingresosCategoria, setIngresosCategoria] = useState([]);
  const [egresosCategoria, setEgresosCategoria] = useState([]);
  const [isChartReady, setIsChartReady] = useState(false);

  const chartRefs = {
    ingresos: useRef(null),
    egresos: useRef(null),
    ingresosCategoria: useRef(null),
    egresosCategoria: useRef(null),
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const formatDate = (date) => dayjs(date).format("DD MMM YYYY");

  const formatMonthYear = (date) => dayjs(date).format("MMM YYYY");

  const aggregateData = (data, field) => {
    const aggregated = {};
    data.forEach((item) => {
      const key = field === "fecha" ? formatDate(item.fecha) : item.categoria;
      aggregated[key] = (aggregated[key] || 0) + item.importe;
    });
    return Object.keys(aggregated).map((key) => ({ [field]: key, importe: aggregated[key] }));
  };

  const filterCurrentMonthData = (data) => {
    const currentMonth = dayjs().month(); // Mes actual
    return data.filter((item) => dayjs(item.fecha).month() === currentMonth);
  };

  const formatChartData = (data) => {
    return data.map((item) => ({
      date: new Date(item.fecha).getTime(),
      value: item.importe,
    }));
  };

  const sortDataByDate = (data) => {
    return data.sort((a, b) => a.date - b.date);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard", {
      headers: { idUsuario: userId },
    })
      .then((response) => response.json())
      .then((data) => {
        const ingresosData = aggregateData(data.ingresos, "fecha");
        const egresosData = aggregateData(data.egresos, "fecha");
        const ingresosCategoriaData = aggregateData(data.ingresos, "categoria");
        const egresosCategoriaData = aggregateData(data.egresos, "categoria");

        // Filtrar los datos del mes actual para ingresos y egresos
        setIngresos(filterCurrentMonthData(ingresosData));
        setEgresos(filterCurrentMonthData(egresosData));
        setIngresosCategoria(ingresosCategoriaData);
        setEgresosCategoria(egresosCategoriaData);
        setIsChartReady(true); // Los datos fueron cargados, podemos renderizar los gráficos
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [userId]);

  useEffect(() => {
    if (isChartReady) {
      if (ingresos.length > 0 && chartRefs.ingresos.current) {
        const formattedIngresos = formatChartData(ingresos);
        const sortedIngresos = sortDataByDate(formattedIngresos);
        createLineChart(sortedIngresos, chartRefs.ingresos);
      }

      if (egresos.length > 0 && chartRefs.egresos.current) {
        const formattedEgresos = formatChartData(egresos);
        const sortedEgresos = sortDataByDate(formattedEgresos);
        createLineChart(sortedEgresos, chartRefs.egresos);
      }

      if (ingresosCategoria.length > 0 && chartRefs.ingresosCategoria.current) {
        createPieChart(ingresosCategoria, chartRefs.ingresosCategoria);
      }

      if (egresosCategoria.length > 0 && chartRefs.egresosCategoria.current) {
        createPieChart(egresosCategoria, chartRefs.egresosCategoria);
      }
    }
  }, [isChartReady, ingresos, egresos, ingresosCategoria, egresosCategoria]);

  const createLineChart = (data, ref) => {
    if (!ref.current) return;
    const root = am5.Root.new(ref.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 90,
        }),
        dateFormats: {
          day: "DD MMM YYYY", // Formato con día, mes y año
        },
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Serie",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{dateX.format('DD MMM YYYY')}: {valueY}",
        }),
      })
    );

    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  };

  const createPieChart = (data, ref) => {
    if (!ref.current) return;
    const root = am5.Root.new(ref.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(am5percent.PieChart.new(root, {}));

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "importe",
        categoryField: "categoria",
        tooltipText: "{category}: {value}",
      })
    );

    series.data.setAll(data);

    chart.appear(1000, 100);

    return () => root.dispose();
  };

  return (
    <div>
      <div style={{ marginLeft: "35px" }}>
        <h2>Gráfico de Ingresos</h2>
        <div ref={chartRefs.ingresos} style={{ width: "100%", height: "500px" }}></div>
  
        <h2 style={{ marginTop: "50px" }}>Gráfico de Egresos</h2>
        <div ref={chartRefs.egresos} style={{ width: "100%", height: "500px" }}></div>
  
        <h2 style={{ marginTop: "50px" }}>Gráficos de Ingresos y Egresos por Categoría (Mes Actual)</h2>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginTop: "20px" }}>
          <div ref={chartRefs.ingresosCategoria} style={{ width: "50%", height: "300px" }}></div>
          <div ref={chartRefs.egresosCategoria} style={{ width: "50%", height: "300px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;



