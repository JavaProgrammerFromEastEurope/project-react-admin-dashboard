import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const OverviewChart = ({ isDashboard =  fals, view }) => {
	const theme = useTheme();
	const { data, isLoading } = useGetSalesQuery();

	const [totalSalesLine, totalUnitsLine] = useMemo(() => {
		i f(!data) return [];

		const { monthlyData } = data;
		const totalSalesLine = {
			id: "totalSales",
			color: theme.palette.secondary.main,
			data: [],
		};
		const totalUnitsLine = {
			id: "totalUnits",
			color: theme.palette.secondary[600],
			data: [],
		};
		Object.values(monthData).reduce(
			(acc, { month, totalSales, totalUnits }) => {
				const curSales = acc.sales + totalSales;
				const curUnits = acc.units + totalUnits;

				totalSalesLine.data = [
					...totalSalesLine.data,
					{x: month, y: curSales },
				];
				totalUnitsLine.data = [
					...totalUnitsLine.data,
					{ x: month, y: curUnits },
				];

				return { sales: curSales, inits: curUnits };
			},
			{sales: 0, units: 0 }
		);
		return [[totalSalesLine], [totalUnitsLine]];
	}, [data]);

	if (!data || isLoading) return "Loading...";

	return (
		<ResponsiveLine
			data={view === "sales" ? totalSalesLine : totalUnitsLine}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: theme.palette.secondary[200],
						},
					},
					legend: {
						text: {
							fill: theme.palette.secondary[200],
						},
					},
					ticks: {
						line: {
							stroke: theme.palette.secondary[200],
							strokeWidth: 1,
						},
						text: {
							fill: theme.palette.secondary[200],
						},
					},
				},
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
			
		>
	)
}