import styled, { css, withTheme } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const TotalChart = ({ summary, theme }) => {
  return (
    <Chart>
      <div className="head">Total cases</div>
      <div className="chart-wrap">
        <ResponsiveContainer>
          <LineChart
            data={summary}
            margin={{ left: -30, right: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              label={{
                fontSize: 12,
                value: "Days since first case detected",
                position: "bottom",
              }}
              tickFormatter={(tick) =>
                summary.findIndex((x) => x.date === tick)
              }
            />
            <YAxis />
            <Line
              type="monotone"
              dataKey="recoveredTotal"
              stroke={theme.green}
              strokeWidth={4}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="combinedTotal"
              stroke={theme.teal}
              strokeWidth={4}
              dot={false}
            />

            {/* <Line
              type="monotone"
              dataKey="deathsTotal"
              stroke="red"
              strokeWidth={2}
              dot={false}
            /> */}

            <ReferenceLine x="2020-03-25T00:00:00.000Z" stroke="#025064" />
          </LineChart>
        </ResponsiveContainer>

        <div className="legend">
          <div className="legend-item total">Total</div>
          <div className="legend-item recovered">Recovered</div>
          <div className="legend-item lockdown">Lv4 lockdown</div>
        </div>
      </div>
    </Chart>
  );
};

export default withTheme(TotalChart);

const Chart = styled.div`
  ${({ theme, ...props }) => css`
    /* margin: 0 1em; */
    background: white;
    border-radius: 0.5em;
    padding: 2.5em 2em;
    .head {
      text-align: center;
      color: ${theme.dark};
      font-family: ${theme.fontFancy};
      font-size: 2.1em;
      text-transform: uppercase;
      margin-bottom: 1.2em;
      line-height: 1.1;
    }
    .chart-wrap {
      height: 25em;
      padding-bottom: 20px;
      ${
        props.wide &&
        css`
          @media (min-width: ${theme.sm}) {
            width: 40em;
          }
        `
      }
    }
    .legend {
      display: flex;
      justify-content: center;
      margin: 5px 0 0 0px;
      font-size: 12px;
      color: black;
    }
    .legend-item {
      margin: 0 6px;
      /* color: ${theme.navy}; */
      :before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 4px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    .total:before {
      background: ${theme.teal};
    }
    .recovered:before {
      background: ${theme.green};
    }
    .lockdown:before {
      background: ${theme.navy};
    }
  `}
`;
