// GraphCard.tsx
import React from 'react';
import {Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ContributionGraph,
    ProgressChart,
} from 'react-native-chart-kit';
import {Colors} from "@/utils/colors";
import {LinearGradient} from "expo-linear-gradient";
import { ContributionChartValue } from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';
import { RectProps } from 'react-native-svg';

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
            backgroundColor: '#022173',
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
            backgroundColor: '#66bb6a',
            backgroundGradientFrom: '#29ae2e',
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
            backgroundColor: Colors.primary,
            backgroundGradientFrom: Colors.primary,
            backgroundGradientTo: Colors.secondary,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: 'rgba(255, 255, 255, 1)',
    },
    {
        name: 'Sunset Orange',
        config: {
            backgroundColor: '#e66d01',
            backgroundGradientFrom: '#fa9a20',
            backgroundGradientTo: '#fbd399',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {borderRadius: 16},
            decimalPlaces: 2,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        },
        textColor: '#ffffff',
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
export type ChartType = 'line' | 'bar' | 'pie' | 'progress' | 'contribution';

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
    withDots?: boolean; // Pour line chart
    withInnerLines?: boolean; // Pour line chart
    withOuterLines?: boolean; // Pour line chart
    withVerticalLines?: boolean; // Pour line chart
    withHorizontalLines?: boolean; // Pour line chart
    segments?: number; // Pour line/bar charts
}

// Main GraphCard component
export const GraphCard: React.FC<GraphCardProps> = ({
                                                        theme,
                                                        data,
                                                        title,
                                                        chartType,
                                                        width = screenWidth,
                                                        height = 220,
                                                        numDays = 105,
                                                        endDate = new Date(),
                                                        withDots = true,
                                                        withInnerLines = true,
                                                        withOuterLines = true,
                                                        withVerticalLines = true,
                                                        withHorizontalLines = true,
                                                        segments = 4,
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
        width: screenWidth - 10,
    };

    const containerStyle = {
        backgroundColor: selectedTheme.config.backgroundColor,
        borderRadius: selectedTheme.config.style?.borderRadius || 16,
        margin: 4,
        shadowColor: '#000',
        width: screenWidth - 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    };

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <LineChart
                            data={data as LineBarData}
                            width={screenWidth}
                            height={height}
                            chartConfig={chartConfig}
                            bezier
                            withDots={withDots}
                            withInnerLines={withInnerLines}
                            withOuterLines={withOuterLines}
                            withVerticalLines={withVerticalLines}
                            withHorizontalLines={withHorizontalLines}
                            segments={segments}
                            style={{
                                marginVertical: 8,
                                borderRadius: chartConfig.style.borderRadius,
                            }}
                        />
                    </ScrollView>
                );

            case 'bar':
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>


                        <BarChart
                            data={data as LineBarData}
                            width={screenWidth}
                            height={screenWidth}
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                            withInnerLines={withInnerLines}
                            segments={segments}
                            style={{
                                marginVertical: 8,
                                borderRadius: chartConfig.style.borderRadius,
                            }} yAxisLabel={''} yAxisSuffix={''}/>
                    </ScrollView>
                );

            case 'pie':
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <PieChart
                            data={data as PieData[]}
                            width={screenWidth}
                            height={height}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                            style={{
                                marginVertical: 8,
                                borderRadius: chartConfig.style.borderRadius,
                            }}
                        />
                    </ScrollView>
                );

            case 'progress':
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <ProgressChart
                            data={data as ProgressData}
                            width={screenWidth}
                            height={height}
                            chartConfig={chartConfig}
                            hideLegend={false}
                            style={{
                                marginVertical: 8,
                                borderRadius: chartConfig.style.borderRadius,
                            }}
                        />
                    </ScrollView>
                );

            case 'contribution':
                return (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <ContributionGraph
                            values={data as ContributionData[]}
                            endDate={endDate}
                            numDays={numDays}
                            width={screenWidth}
                            height={height}
                            chartConfig={chartConfig}
                            style={{
                                marginVertical: 8,
                                borderRadius: chartConfig.style.borderRadius,
                            }}
                        />
                        </ScrollView>
                );
            default:
                return null;
        }
    };

    return (
        <LinearGradient colors={[selectedTheme.config.backgroundGradientFrom,selectedTheme.config.backgroundGradientTo]} style={containerStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
            <Text style={[styles.title, { color: selectedTheme.textColor }]}>
                {title}
            </Text>
            {renderChart()}
        </LinearGradient>
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
