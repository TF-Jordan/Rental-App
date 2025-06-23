// AgencyStatistics.tsx - Version Optimisée
import React, {useMemo, useState, useCallback, memo, JSX} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { GraphCard, LineBarData, PieData} from '@/utils/types/ChartTypes';
import { AgencyProps } from "@/utils/types/AgencyProps";

export interface AgencyStatisticsProps {
    agencies: AgencyProps[];
    theme?: string;
}

// Hook personnalisé pour les dimensions d'écran
const useScreenDimensions = () => {
    const [screenData, setScreenData] = useState(() => {
        const { width, height } = Dimensions.get('window');
        return {
            width,
            height,
            isLandscape: width > height,
            chartWidth: Math.min(width - 40, 400), // Largeur optimisée avec limite max
            chartHeight: width > height ? Math.min(height * 0.35, 200) : Math.min(width * 0.6, 250),
        };
    });

    React.useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            const { width, height } = window;
            setScreenData({
                width,
                height,
                isLandscape: width > height,
                chartWidth: Math.min(width - 40, 400),
                chartHeight: width > height ? Math.min(height * 0.35, 200) : Math.min(width * 0.6, 250),
            });
        });

        return () => subscription?.remove();
    }, []);

    return screenData;
};

// Composant Chart mémorisé pour éviter les re-renders inutiles
// eslint-disable-next-line react/display-name
const MemoizedChart = memo(({ chart }: { chart: JSX.Element }) => chart);

const AgencyStatistics: React.FC<AgencyStatisticsProps> = ({
                                                               agencies,
                                                               theme = 'Sunset Orange'
                                                           }) => {
    const screenData = useScreenDimensions();
    const [refreshing, setRefreshing] = useState(false);

    // Fonction de rafraîchissement
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Simuler un délai de rafraîchissement
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    // Données préprocessées pour optimiser les calculs
    const processedData = useMemo(() => {
        const cityRatings: { [key: string]: { total: number; count: number } } = {};
        const typeCount: { [key: string]: number } = {};
        const openingHours: { [key: string]: number } = {};
        const closingHours: { [key: string]: number } = {};
        const cityCount: { [key: string]: number } = {};
        const ratingRanges = { '0-1': 0, '1-2': 0, '2-3': 0, '3-4': 0, '4-5': 0 };
        const monthlyCreations: { [key: string]: number } = {};

        agencies.forEach(agency => {
            // City ratings
            if (!cityRatings[agency.city]) {
                cityRatings[agency.city] = { total: 0, count: 0 };
            }
            cityRatings[agency.city].total += agency.rating;
            cityRatings[agency.city].count += 1;

            // Type count
            typeCount[agency.type] = (typeCount[agency.type] || 0) + 1;

            // Opening hours
            const openHour = agency.openingTime.split(':')[0];
            const closeHour = agency.closingTime.split(':')[0];
            openingHours[`${openHour}h`] = (openingHours[`${openHour}h`] || 0) + 1;
            closingHours[`${closeHour}h`] = (closingHours[`${closeHour}h`] || 0) + 1;

            // City distribution
            cityCount[agency.city] = (cityCount[agency.city] || 0) + 1;

            // Rating distribution
            const rating = agency.rating;
            if (rating < 1) ratingRanges['0-1']++;
            else if (rating < 2) ratingRanges['1-2']++;
            else if (rating < 3) ratingRanges['2-3']++;
            else if (rating < 4) ratingRanges['3-4']++;
            else ratingRanges['4-5']++;

            // Monthly creations
            const date = new Date(agency.createdAt);
            const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
            monthlyCreations[monthYear] = (monthlyCreations[monthYear] || 0) + 1;
        });

        return {
            cityRatings,
            typeCount,
            openingHours,
            closingHours,
            cityCount,
            ratingRanges,
            monthlyCreations
        };
    }, [agencies]);

    // Charts optimisés avec mise en cache
    const charts = useMemo(() => {
        const chartWidth = screenData.chartWidth;
        const baseColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#2ECC71'];

        return {
            cityRatings: (
                <GraphCard
                    key="city-ratings"
                    theme={theme}
                    data={{
                        labels: Object.keys(processedData.cityRatings), datasets: [{data: Object.values(processedData.cityRatings).map(city => Number((city.total / city.count).toFixed(2))), color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, strokeWidth: 3}]
                    }}
                    title="📍 Note Moyenne par Ville"
                    chartType="bar"
                    height={220}
                    width={chartWidth}
                />
            ),

            agencyType: (
                <GraphCard
                    key="agency-type"
                    theme={theme}
                    data={Object.entries(processedData.typeCount).map(([type, count], index) => ({
                        name: type,
                        population: count,
                        color: baseColors[index % baseColors.length],
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 11
                    }))}
                    title="🏢 Répartition par Type"
                    chartType="pie"
                    height={220}
                    width={chartWidth}
                />
            ),

            openingHours: (
                <GraphCard
                    key="opening-hours"
                    theme={theme}
                    data={{
                        labels: Object.keys(processedData.openingHours).sort(),
                        datasets: [{
                            data: Object.keys(processedData.openingHours).sort().map(hour =>
                                processedData.openingHours[hour] || 0
                            ),
                            color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
                            strokeWidth: 2
                        }]
                    }}
                    title="🕐 Heures d'Ouverture"
                    chartType="line"
                    height={220}
                    width={chartWidth}
                />
            ),

            commentsVolume: (
                <GraphCard
                    key="comments-volume"
                    theme={theme}
                    data={{
                        labels: agencies
                            .map(agency => ({
                                name: agency.name.length > 8 ? agency.name.substring(0, 8) + '...' : agency.name,
                                count: agency.reviews?.length || 0
                            }))
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 6)
                            .map(item => item.name),
                        datasets: [{
                            data: agencies
                                .map(agency => agency.reviews?.length || 0)
                                .sort((a, b) => b - a)
                                .slice(0, 6),
                            color: (opacity = 1) => `rgba(230, 126, 34, ${opacity})`,
                            strokeWidth: 3
                        }]
                    }}
                    title="💬 Volume Commentaires (Top 6)"
                    chartType="bar"
                    height={240}
                    width={chartWidth}
                />
            ),

            topFollowed: (
                <GraphCard
                    key="top-followed"
                    theme={theme}
                    data={{
                        labels: agencies
                            .sort((a, b) => b.followers - a.followers)
                            .slice(0, 6)
                            .map(agency => agency.name.length > 6 ? agency.name.substring(0, 6) + '...' : agency.name),
                        datasets: [{
                            data: agencies
                                .sort((a, b) => b.followers - a.followers)
                                .slice(0, 6)
                                .map(agency => agency.followers),
                            color: (opacity = 1) => `rgba(155, 89, 182, ${opacity})`,
                            strokeWidth: 2
                        }]
                    }}
                    title="👥 Top 6 Plus Suivies"
                    chartType="line"
                    height={240}
                    width={chartWidth}
                />
            ),

            ratingDistribution: (
                <GraphCard
                    key="rating-distribution"
                    theme={theme}
                    data={Object.entries(processedData.ratingRanges).map(([range, count], index) => ({
                        name: `${range} ⭐`,
                        population: count,
                        color: ['#E74C3C', '#F39C12', '#F1C40F', '#2ECC71', '#27AE60'][index],
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 11
                    }))}
                    title="⭐ Distribution des Notes"
                    chartType="pie"
                    height={220}
                    width={chartWidth}
                />
            ),

            cityDistribution: (
                <GraphCard
                    key="city-distribution"
                    theme={theme}
                    data={Object.entries(processedData.cityCount).map(([city, count], index) => ({
                        name: city,
                        population: count,
                        color: baseColors[index % baseColors.length],
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 11
                    }))}
                    title="🌍 Répartition Géographique"
                    chartType="pie"
                    height={220}
                    width={chartWidth}
                />
            ),

            creationTimeline: (
                <GraphCard
                    key="creation-timeline"
                    theme={theme}
                    data={{
                        labels: Object.entries(processedData.monthlyCreations)
                            .sort(([a], [b]) => {
                                const [monthA, yearA] = a.split('/');
                                const [monthB, yearB] = b.split('/');
                                return new Date(2000 + parseInt(yearA), parseInt(monthA) - 1).getTime() -
                                    new Date(2000 + parseInt(yearB), parseInt(monthB) - 1).getTime();
                            })
                            .slice(-8)
                            .map(([month]) => month),
                        datasets: [{
                            data: Object.entries(processedData.monthlyCreations)
                                .sort(([a], [b]) => {
                                    const [monthA, yearA] = a.split('/');
                                    const [monthB, yearB] = b.split('/');
                                    return new Date(2000 + parseInt(yearA), parseInt(monthA) - 1).getTime() -
                                        new Date(2000 + parseInt(yearB), parseInt(monthB) - 1).getTime();
                                })
                                .slice(-8)
                                .map(([, count]) => count),
                            color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
                            strokeWidth: 2
                        }]
                    }}
                    title="📈 Évolution Créations (8 derniers mois)"
                    chartType="line"
                    height={220}
                    width={chartWidth}
                />
            )
        };
    }, [processedData, screenData.chartWidth, theme, agencies]);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#3498DB']}
                        tintColor="#3498DB"
                    />
                }
            >
                <MemoizedChart chart={charts.cityRatings} />
                <MemoizedChart chart={charts.agencyType} />
                <MemoizedChart chart={charts.openingHours} />
                <MemoizedChart chart={charts.commentsVolume} />
                <MemoizedChart chart={charts.topFollowed} />
                <MemoizedChart chart={charts.ratingDistribution} />
                <MemoizedChart chart={charts.cityDistribution} />
                <MemoizedChart chart={charts.creationTimeline} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent:'center',
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6C757D',
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 10,
        paddingBottom: 20,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    footerText: {
        fontSize: 12,
        color: '#6C757D',
        fontStyle: 'italic',
    },
});

export default memo(AgencyStatistics);