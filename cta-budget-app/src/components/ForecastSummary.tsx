import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import type { BudgetData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastSummaryProps {
  budgetData: BudgetData;
}

const ForecastSummary: React.FC<ForecastSummaryProps> = ({ budgetData }) => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const calculations = useMemo(() => {
    const { startupFees, visits, overhead, customRevenueItems, targetEnrollment, personnelCosts } = budgetData;

    // Calculate startup costs
    const totalStartupFees = Object.values(startupFees).reduce((sum, fee) => sum + fee, 0);

    // Calculate visit revenue
    const totalVisitRevenue = visits.reduce((sum, visit) => sum + visit.paymentPerVisit, 0) * targetEnrollment;

    // Calculate custom revenue
    const customRevenue = customRevenueItems.reduce((sum, item) => {
      if (item.type === 'flat') return sum + item.amount;
      if (item.type === 'perPatient') return sum + item.amount * targetEnrollment;
      if (item.type === 'perVisit') return sum + item.amount * visits.length * targetEnrollment;
      return sum;
    }, 0);

    // Calculate total revenue before overhead
    const revenueBeforeOverhead = totalStartupFees + totalVisitRevenue + customRevenue;
    
    // Apply overhead
    const overheadAmount = revenueBeforeOverhead * (overhead / 100);
    const totalRevenue = revenueBeforeOverhead + overheadAmount;

    // Calculate personnel costs
    const totalPersonnelCost = personnelCosts.reduce((sum, cost) => {
      if (cost.type === 'perPatient') {
        return sum + (cost.hourlyRate || 0) * (cost.hours || 0) * targetEnrollment;
      } else {
        return sum + (cost.monthlyFee || 0) * (cost.months || 0);
      }
    }, 0);

    // Calculate per-patient values
    const perPatientRevenue = targetEnrollment > 0 ? totalRevenue / targetEnrollment : 0;
    const perPatientCost = targetEnrollment > 0 ? totalPersonnelCost / targetEnrollment : 0;

    // Calculate margin
    const margin = totalRevenue - totalPersonnelCost;
    const marginPercentage = totalRevenue > 0 ? (margin / totalRevenue) * 100 : 0;

    return {
      totalStartupFees,
      totalVisitRevenue,
      customRevenue,
      revenueBeforeOverhead,
      overheadAmount,
      totalRevenue,
      totalPersonnelCost,
      perPatientRevenue,
      perPatientCost,
      margin,
      marginPercentage,
    };
  }, [budgetData]);

  const chartData = {
    labels: ['Startup Fees', 'Visit Revenue', 'Custom Revenue', 'Overhead', 'Personnel Cost'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [
          calculations.totalStartupFees,
          calculations.totalVisitRevenue,
          calculations.customRevenue,
          calculations.overheadAmount,
          -calculations.totalPersonnelCost,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(168, 85, 247)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Budget Breakdown',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-6">
        {/* Revenue Card */}
        <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-green-100">Total Revenue</h4>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">${calculations.totalRevenue.toLocaleString()}</p>
              <p className="text-green-200 text-sm">
                ${calculations.perPatientRevenue.toFixed(0)} per patient
              </p>
            </div>
          </div>
        </div>

        {/* Cost Card */}
        <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-400 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-red-100">Personnel Cost</h4>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">${calculations.totalPersonnelCost.toLocaleString()}</p>
              <p className="text-red-200 text-sm">
                ${calculations.perPatientCost.toFixed(0)} per patient
              </p>
            </div>
          </div>
        </div>

        {/* Margin Card */}
        <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
          calculations.margin >= 0 
            ? 'bg-emerald-500/20 border-emerald-400/30' 
            : 'bg-red-500/20 border-red-400/30'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                calculations.margin >= 0 ? 'bg-emerald-400' : 'bg-red-400'
              }`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className={`text-lg font-bold ${
                calculations.margin >= 0 ? 'text-emerald-100' : 'text-red-100'
              }`}>
                Net Margin
              </h4>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">${calculations.margin.toLocaleString()}</p>
              <p className={`text-sm ${
                calculations.margin >= 0 ? 'text-emerald-200' : 'text-red-200'
              }`}>
                {calculations.marginPercentage.toFixed(1)}% margin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Revenue Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Startup Fees:</span>
              <span className="font-medium">${calculations.totalStartupFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Visit Revenue:</span>
              <span className="font-medium">${calculations.totalVisitRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Custom Revenue:</span>
              <span className="font-medium">${calculations.customRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overhead ({budgetData.overhead}%):</span>
              <span className="font-medium">${calculations.overheadAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Study Metrics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Target Enrollment:</span>
              <span className="font-medium">{budgetData.targetEnrollment} patients</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Number of Visits:</span>
              <span className="font-medium">{budgetData.visits.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Personnel Items:</span>
              <span className="font-medium">{budgetData.personnelCosts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Custom Revenue Items:</span>
              <span className="font-medium">{budgetData.customRevenueItems.length}</span>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-800">Budget Visualization</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'line'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Line Chart
            </button>
          </div>
        </div>
        <div className="h-80 bg-gray-50 rounded-lg p-4">
          {chartType === 'bar' ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForecastSummary;