// GraphCard.tsx
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ContributionGraph,
    ProgressChart,
} from 'react-native-chart-kit';



const screenWidth = Dimensions.get('window').width;

// Types from your configuration
export interface ChartConfig {
    backgroundColor: string;
    backgroundGradientFrom: string;
    backgroundGradientTo: string;
    color: (opacity?: number) => string;
    style?: {
        borderRadius: number;
    };
    decimalPlaces?: number;
    labelColor?: (opacity?: number) => string;
    strokeWidth?: number;
}

export interface ChartTheme {
    name: string;
    config: ChartConfig;
    textColor: string;
}

// Chart themes from your configuration
export const chartThemes: ChartTheme[] = [
    {
        name: 'Matrix Green',
        config: {
            backgroundColor: '#000000',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            style: {borderRadius: 16},
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        },
        textColor: 'rgba(26, 255, 146, 1)',
    },
    {
        name: 'Ocean Blue',
        config: {
            backgroundColor: '#406ada',
            backgroundGradientFrom: '#022173',
            backgroundGradientTo: '#1b3fa0',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {borderRadius: 16},
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Clean White',
        config: {
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        },
        textColor: 'rgba(0, 0, 0, 1)',
    },
    {
        name: 'Nature Green',
        config: {
            backgroundColor: '#26872a',
            backgroundGradientFrom: '#43a047',
            backgroundGradientTo: '#66bb6a',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {borderRadius: 16},
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Dark Mode',
        config: {
            backgroundColor: '#000000',
            backgroundGradientFrom: '#000000',
            backgroundGradientTo: '#000000',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Electric Blue',
        config: {
            backgroundColor: '#0091EA',
            backgroundGradientFrom: '#0091EA',
            backgroundGradientTo: '#0091EA',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Sunset Orange',
        config: {
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {borderRadius: 16},
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Fire Red',
        config: {
            backgroundColor: '#b90602',
            backgroundGradientFrom: '#e53935',
            backgroundGradientTo: '#ef5350',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {borderRadius: 16},
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Neon Orange',
        config: {
            backgroundColor: '#ff3e03',
            backgroundGradientFrom: '#ff3e03',
            backgroundGradientTo: '#ff3e03',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        },
        textColor: 'rgba(0, 0, 0, 1)',
    },
];

// Chart types
export type ChartType = 'line' | 'bar' | 'pie' | 'progress' | 'contribution'|'area';

// Data interfaces
export interface LineBarData {
    labels: string[];
    datasets: [{
        data: number[];
        color?: (opacity: number) => string;
        strokeWidth?: number;
    }];
}

export interface PieData {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

export interface ProgressData {
    labels: string[];
    data: number[];
}

export interface ContributionData {
    date: string;
    count: number;
}

// Props interface
export interface GraphCardProps {
    theme: string;
    data: LineBarData | PieData[] | ProgressData | ContributionData[];
    title: string;
    chartType: ChartType;
    width?: number;
    height?: number;
    numDays?: number; // Pour contribution graph
    endDate?: Date; // Pour contribution graph
}

// Main GraphCard component
export const GraphCard: React.FC<GraphCardProps> = ({
                                                        theme,
                                                        data,
                                                        title,
                                                        chartType,
                                                        width = screenWidth - 32,
                                                        height = 220,
                                                        numDays = 105,
                                                        endDate = new Date(),
                                                    }) => {
    const selectedTheme = chartThemes.find(t => t.name === theme) || chartThemes[0];

    // Convert theme config to react-native-chart-kit format
    const chartConfig = {
        backgroundColor: selectedTheme.config.backgroundColor,
        backgroundGradientFrom: selectedTheme.config.backgroundGradientFrom,
        backgroundGradientTo: selectedTheme.config.backgroundGradientTo,
        decimalPlaces: selectedTheme.config.decimalPlaces || 2,
        color: selectedTheme.config.color,
        labelColor: selectedTheme.config.labelColor || selectedTheme.config.color,
        style: {
            borderRadius: selectedTheme.config.style?.borderRadius || 16,
        },
        strokeWidth: selectedTheme.config.strokeWidth || 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
    };

    const containerStyle = {
        backgroundColor: selectedTheme.config.backgroundColor,
        borderRadius: selectedTheme.config.style?.borderRadius || 16,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    };

    const renderChart = () => {
        switch (chartType) {

            case 'line':
                return (
                    <LineChart
                        data={data as LineBarData}
                        width={width - 32}
                        height={height}
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: chartConfig.style.borderRadius,
                        }}
                    />
                );

            case 'bar':
                return (
                    <BarChart
                        data={data as LineBarData}
                        width={width - 32}
                        height={height}
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                        style={{
                            marginVertical: 8,
                            borderRadius: chartConfig.style.borderRadius,
                        }} yAxisLabel={''} yAxisSuffix={''}                    />
                );

            case 'pie':
                return (
                    <PieChart
                        data={data as PieData[]}
                        width={width - 32}
                        height={height}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        center={[10, 50]}
                        absolute
                        style={{
                            marginVertical: 8,
                            borderRadius: chartConfig.style.borderRadius,
                        }}
                    />
                );

            case 'progress':
                return (
                    <ProgressChart
                        data={data as ProgressData}
                        width={width - 32}
                        height={height}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        style={{
                            marginVertical: 8,
                            borderRadius: chartConfig.style.borderRadius,
                        }}
                    />
                );

            case 'contribution':
                return (
                    <ContributionGraph
                        values={data as ContributionData[]}
                        endDate={endDate}
                        numDays={numDays}
                        width={width - 32}
                        height={height}
                        chartConfig={chartConfig}
                        style={{
                            marginVertical: 8,
                            borderRadius: chartConfig.style.borderRadius,
                        }}
                        tooltipDataAttrs={(value) => ({
                            fill: value.value > 0 ? 'green' : 'gray',
                            stroke: 'black',
                            strokeWidth: 0.5,
                        })}                />
                );

            default:
                return null;
        }
    };

    return (
        <View style={containerStyle}>
            <Text style={[styles.title, { color: selectedTheme.textColor }]}>
                {title}
            </Text>
            {renderChart()}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
});
