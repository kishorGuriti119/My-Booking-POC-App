import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

// let obj = {
//   city: "hydrabad",
//   counts: [
//     {
//       label: "Hotel",
//       value: 2,
//     },
//     {
//       label: "Apartments",
//       value: 2,
//     },
//     {
//       label: "Villa",
//       value: 2,
//     },
//     {
//       label: "Cabin",
//       value: 2,
//     },
//     {
//       label: "Resort",
//       value: 2,
//     },
//   ],
// };

export default function SimpleLineChart({ dataV }) {
  const [propertyCountValues, setPropertyCountValues] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  let y_axisValues = [];
  let x_axisValues = [];

  useEffect(() => {
    console.log(dataV, "dataV");
    if (dataV && dataV[0] && dataV[0].counts) {
      segregate_labes_countValues(dataV);
    }
  }, [dataV]);

  const segregate_labes_countValues = async (dataV) => {
    let result = await Promise.all(
      dataV?.[0].counts?.map((propertyObj) => {
        y_axisValues.push(propertyObj.value);
        x_axisValues.push(propertyObj.label);
        return [x_axisValues, y_axisValues];
      })
    );
    setPropertyCountValues(result[0][1]);
    setXLabels(result[0][0]);
  };

  return (
    <LineChart
      width={500}
      height={300}
      series={[
        {
          data: propertyCountValues,
          label: ` ${dataV[0]?.city.toUpperCase()}`,
        },
        // { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
    // <h1>kk</h1>
  );
}
