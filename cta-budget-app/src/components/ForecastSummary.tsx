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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Forecast Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Revenue Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Startup Fees:</span>
              <span className="font-medium">${calculations.totalStartupFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Visit Revenue:</span>
              <span className="font-medium">${calculations.totalVisitRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Custom Revenue:</span>
              <span className="font-medium">${calculations.customRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Overhead ({budgetData.overhead}%):</span>
              <span className="font-medium">${calculations.overheadAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Total Revenue:</span>
              <span className="font-bold text-green-600">${calculations.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Cost & Margin</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Personnel Cost:</span>
              <span className="font-medium text-red-600">${calculations.totalPersonnelCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Margin:</span>
              <span className={`font-bold ${calculations.margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${calculations.margin.toLocaleString()} ({calculations.marginPercentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Per-Patient Metrics</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Revenue per Patient:</span>
              <span className="font-medium">${calculations.perPatientRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cost per Patient:</span>
              <span className="font-medium">${calculations.perPatientCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Study Metrics</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Target Enrollment:</span>
              <span className="font-medium">{budgetData.targetEnrollment} patients</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Visits:</span>
              <span className="font-medium">{budgetData.visits.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Revenue Visualization</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded text-sm ${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded text-sm ${
                chartType === 'line'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Line Chart
            </button>
          </div>
        </div>
        <div className="h-64">
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