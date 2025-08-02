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
    <div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Revenue Summary */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">Total Revenue</h4>
          <p className="text-2xl font-bold text-green-600">${calculations.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-700 mt-1">
            Per Patient: ${calculations.perPatientRevenue.toLocaleString()}
          </p>
        </div>

        {/* Cost Summary */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-semibold text-red-800 mb-3">Personnel Cost</h4>
          <p className="text-2xl font-bold text-red-600">${calculations.totalPersonnelCost.toLocaleString()}</p>
          <p className="text-sm text-red-700 mt-1">
            Per Patient: ${calculations.perPatientCost.toLocaleString()}
          </p>
        </div>

        {/* Margin Summary */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Net Margin</h4>
          <p className={`text-2xl font-bold ${calculations.margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${calculations.margin.toLocaleString()}
          </p>
          <p className={`text-sm mt-1 ${calculations.margin >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {calculations.marginPercentage.toFixed(1)}% margin
          </p>
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