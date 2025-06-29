import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Target, 
  Brain, 
  TrendingUp, 
  Timer, 
  Gauge, 
  Award, 
  LineChart, 
  BarChart, 
  Activity, 
  FileText, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  Clock,
  Zap,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Star,
  User,
  UserCheck,
  Briefcase,
  BookOpen,
  DollarSign,
  PieChart
} from 'lucide-react';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import StatusBadge from '../components/UI/StatusBadge';
import { employees } from '../data/mockData';

const ExtraWorkerEfficiency: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');

  useEffect(() => {
    setPageTitle('Worker Efficiency Analysis');
  }, [setPageTitle]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'dashboard', label: 'দক্ষতা ড্যাশবোর্ড', icon: BarChart3 },
    { id: 'individual-analysis', label: 'ব্যক্তিগত বিশ্লেষণ', icon: Users },
    { id: 'team-analysis', label: 'টিম বিশ্লেষণ', icon: Target },
    { id: 'skill-assessment', label: 'দক্ষতা মূল্যায়ন', icon: Brain },
    { id: 'productivity-tracking', label: 'উৎপাদনশীলতা ট্র্যাকিং', icon: TrendingUp },
    { id: 'time-motion-study', label: 'সময় ও গতি অধ্যয়ন', icon: Timer },
    { id: 'performance-metrics', label: 'পারফরম্যান্স মেট্রিক্স', icon: Gauge },
    { id: 'training-needs', label: 'প্রশিক্ষণ প্রয়োজন', icon: Award },
    { id: 'efficiency-trends', label: 'দক্ষতার ট্রেন্ড', icon: LineChart },
    { id: 'benchmarking', label: 'বেঞ্চমার্কিং', icon: BarChart },
    { id: 'incentive-analysis', label: 'প্রণোদনা বিশ্লেষণ', icon: Award },
    { id: 'workload-analysis', label: 'কাজের চাপ বিশ্লেষণ', icon: Activity },
    { id: 'efficiency-reports', label: 'দক্ষতা রিপোর্ট', icon: FileText },
    { id: 'improvement-plans', label: 'উন্নতি পরিকল্পনা', icon: TrendingUp },
    { id: 'efficiency-settings', label: 'দক্ষতা সেটিংস', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Worker Efficiency Dashboard</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">গড় দক্ষতা</p>
              <p className="text-2xl font-bold text-blue-600">87.5%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +3.2% from last week
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Gauge className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">শীর্ষ পারফরমার</p>
              <p className="text-2xl font-bold text-green-600">25</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Star size={12} className="mr-1" />
                90%+ efficiency
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Award className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">প্রশিক্ষণ প্রয়োজন</p>
              <p className="text-2xl font-bold text-orange-600">18</p>
              <p className="text-xs text-orange-500 flex items-center mt-1">
                <BookOpen size={12} className="mr-1" />
                Below 75% efficiency
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Brain className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">গড় উৎপাদনশীলতা</p>
              <p className="text-2xl font-bold text-purple-600">142 pcs/hr</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Zap size={12} className="mr-1" />
                +8 pcs from target
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Department-wise Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            বিভাগ অনুযায়ী দক্ষতা
          </h4>
          <div className="space-y-4">
            {[
              { dept: 'Sewing', efficiency: 89.2, target: 85, workers: 45, trend: 'up' },
              { dept: 'Cutting', efficiency: 92.1, target: 90, workers: 18, trend: 'up' },
              { dept: 'Finishing', efficiency: 85.7, target: 85, workers: 28, trend: 'stable' },
              { dept: 'Quality', efficiency: 94.3, target: 95, workers: 12, trend: 'down' },
              { dept: 'Packing', efficiency: 88.9, target: 85, workers: 22, trend: 'up' }
            ].map((dept, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h5 className="font-semibold">{dept.dept}</h5>
                    <p className="text-sm text-gray-600">{dept.workers} workers</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      dept.efficiency >= dept.target ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {dept.efficiency}%
                    </span>
                    {dept.trend === 'up' && <TrendingUp className="text-green-500" size={16} />}
                    {dept.trend === 'down' && <TrendingDown className="text-red-500" size={16} />}
                    {dept.trend === 'stable' && <Target className="text-gray-500" size={16} />}
                  </div>
                </div>
                <ProgressBar 
                  progress={dept.efficiency} 
                  color={dept.efficiency >= dept.target ? 'green' : dept.efficiency >= 80 ? 'yellow' : 'red'}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Target: {dept.target}%</span>
                  <span>{dept.efficiency >= dept.target ? 'Above Target' : 'Below Target'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Star className="mr-2" size={20} />
            শীর্ষ পারফরমার (এই সপ্তাহ)
          </h4>
          <div className="space-y-3">
            {[
              { name: 'ফাতিমা বেগম', dept: 'Quality', efficiency: 97.8, production: 165, rank: 1 },
              { name: 'আবুল কালাম', dept: 'Sewing', efficiency: 95.2, production: 158, rank: 2 },
              { name: 'করিম মিয়া', dept: 'Cutting', efficiency: 94.7, production: 152, rank: 3 },
              { name: 'সালমা খাতুন', dept: 'Finishing', efficiency: 93.1, production: 148, rank: 4 },
              { name: 'রহিম উদ্দিন', dept: 'Sewing', efficiency: 92.5, production: 145, rank: 5 }
            ].map((worker, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    worker.rank === 1 ? 'bg-yellow-500' :
                    worker.rank === 2 ? 'bg-gray-400' :
                    worker.rank === 3 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {worker.rank}
                  </div>
                  <div>
                    <p className="font-medium">{worker.name}</p>
                    <p className="text-sm text-gray-600">{worker.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{worker.efficiency}%</p>
                  <p className="text-sm text-gray-600">{worker.production} pcs/hr</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 flex items-center">
          <LineChart className="mr-2" size={20} />
          সাপ্তাহিক দক্ষতার ট্রেন্ড
        </h4>
        <div className="space-y-3">
          {[
            { week: 'সপ্তাহ ১', efficiency: 85.2, target: 85 },
            { week: 'সপ্তাহ ২', efficiency: 86.8, target: 85 },
            { week: 'সপ্তাহ ৩', efficiency: 84.9, target: 85 },
            { week: 'সপ্তাহ ৪', efficiency: 87.5, target: 85 },
            { week: 'সপ্তাহ ৫', efficiency: 89.1, target: 85 }
          ].map((week, index) => {
            const percentage = (week.efficiency / 100) * 100;
            const isAboveTarget = week.efficiency >= week.target;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{week.week}</span>
                  <span className={`font-semibold ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
                    {week.efficiency}% (Target: {week.target}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      isAboveTarget ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('individual-analysis')}
          >
            <Users size={24} />
            <span className="text-sm">Individual Analysis</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('skill-assessment')}
          >
            <Brain size={24} />
            <span className="text-sm">Skill Assessment</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('training-needs')}
          >
            <BookOpen size={24} />
            <span className="text-sm">Training Needs</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('efficiency-reports')}
          >
            <FileText size={24} />
            <span className="text-sm">Generate Report</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderIndividualAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Individual Worker Analysis</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search workers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>All Departments</option>
            <option>Sewing</option>
            <option>Cutting</option>
            <option>Finishing</option>
            <option>Quality</option>
          </select>
          <Button variant="secondary" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Worker</th>
                <th className="p-3 font-semibold text-sm">Department</th>
                <th className="p-3 font-semibold text-sm">Efficiency</th>
                <th className="p-3 font-semibold text-sm">Productivity</th>
                <th className="p-3 font-semibold text-sm">Quality Score</th>
                <th className="p-3 font-semibold text-sm">Attendance</th>
                <th className="p-3 font-semibold text-sm">Trend</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  id: 'EMP-0101', 
                  name: 'আবুল কালাম', 
                  dept: 'Sewing', 
                  efficiency: 95.2, 
                  productivity: 158, 
                  quality: 96.8, 
                  attendance: 98, 
                  trend: 'up',
                  status: 'Excellent'
                },
                { 
                  id: 'EMP-0256', 
                  name: 'ফাতিমা বেগম', 
                  dept: 'Quality', 
                  efficiency: 97.8, 
                  productivity: 165, 
                  quality: 99.2, 
                  attendance: 100, 
                  trend: 'up',
                  status: 'Outstanding'
                },
                { 
                  id: 'EMP-0102', 
                  name: 'করিম মিয়া', 
                  dept: 'Cutting', 
                  efficiency: 72.5, 
                  productivity: 98, 
                  quality: 88.5, 
                  attendance: 85, 
                  trend: 'down',
                  status: 'Needs Improvement'
                }
              ].map((worker, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <p className="text-sm text-gray-600">{worker.id}</p>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{worker.dept}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${
                        worker.efficiency >= 90 ? 'text-green-600' : 
                        worker.efficiency >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {worker.efficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-sm font-semibold">{worker.productivity} pcs/hr</td>
                  <td className="p-3 text-sm font-semibold text-blue-600">{worker.quality}%</td>
                  <td className="p-3 text-sm">{worker.attendance}%</td>
                  <td className="p-3">
                    {worker.trend === 'up' && <TrendingUp className="text-green-500" size={16} />}
                    {worker.trend === 'down' && <TrendingDown className="text-red-500" size={16} />}
                    {worker.trend === 'stable' && <Target className="text-gray-500" size={16} />}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={worker.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeamAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Team Performance Analysis</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>All Teams</option>
            <option>Team Alpha</option>
            <option>Team Beta</option>
            <option>Team Gamma</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Team Performance Comparison</h4>
          <div className="space-y-4">
            {[
              { team: 'Team Alpha', members: 12, efficiency: 92.5, productivity: 155, leader: 'সুপারভাইজার আহমেদ' },
              { team: 'Team Beta', members: 10, efficiency: 88.7, productivity: 142, leader: 'সুপারভাইজার রহমান' },
              { team: 'Team Gamma', members: 15, efficiency: 85.2, productivity: 138, leader: 'সুপারভাইজার খান' },
              { team: 'Team Delta', members: 8, efficiency: 90.1, productivity: 148, leader: 'সুপারভাইজার আলী' }
            ].map((team, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold">{team.team}</h5>
                    <p className="text-sm text-gray-600">{team.members} members • {team.leader}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{team.efficiency}%</p>
                    <p className="text-sm text-gray-600">Efficiency</p>
                  </div>
                </div>
                <ProgressBar 
                  progress={team.efficiency} 
                  color={team.efficiency >= 90 ? 'green' : team.efficiency >= 85 ? 'yellow' : 'red'}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Productivity: {team.productivity} pcs/hr</span>
                  <span>{team.efficiency >= 90 ? 'Excellent' : team.efficiency >= 85 ? 'Good' : 'Needs Improvement'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Collaboration Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Team Collaboration Metrics</h4>
          <div className="space-y-4">
            {[
              { metric: 'Communication Score', value: 87, color: 'blue' },
              { metric: 'Coordination Level', value: 92, color: 'green' },
              { metric: 'Problem Solving', value: 85, color: 'yellow' },
              { metric: 'Knowledge Sharing', value: 78, color: 'orange' },
              { metric: 'Team Spirit', value: 94, color: 'purple' }
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{metric.metric}</span>
                  <span className="font-semibold">{metric.value}%</span>
                </div>
                <ProgressBar progress={metric.value} color={metric.color as any} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillAssessment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Skill Assessment</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Skill Categories Overview</h4>
          <div className="space-y-4">
            {[
              { skill: 'Technical Skills', average: 85.2, workers: 156, color: 'blue' },
              { skill: 'Quality Awareness', average: 91.7, workers: 156, color: 'green' },
              { skill: 'Time Management', average: 78.9, workers: 156, color: 'yellow' },
              { skill: 'Problem Solving', average: 82.4, workers: 156, color: 'purple' },
              { skill: 'Communication', average: 76.3, workers: 156, color: 'orange' },
              { skill: 'Leadership', average: 68.5, workers: 25, color: 'red' }
            ].map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h5 className="font-semibold">{skill.skill}</h5>
                    <p className="text-sm text-gray-600">{skill.workers} workers assessed</p>
                  </div>
                  <span className="font-semibold text-lg">{skill.average}%</span>
                </div>
                <ProgressBar progress={skill.average} color={skill.color as any} />
              </div>
            ))}
          </div>
        </div>

        {/* Individual Skill Matrix */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Top Skilled Workers</h4>
          <div className="space-y-3">
            {[
              { 
                name: 'ফাতিমা বেগম', 
                dept: 'Quality', 
                skills: { technical: 95, quality: 98, time: 92, problem: 89, communication: 85 },
                overall: 91.8
              },
              { 
                name: 'আবুল কালাম', 
                dept: 'Sewing', 
                skills: { technical: 92, quality: 88, time: 85, problem: 87, communication: 78 },
                overall: 86.0
              },
              { 
                name: 'করিম মিয়া', 
                dept: 'Cutting', 
                skills: { technical: 88, quality: 85, time: 82, problem: 84, communication: 75 },
                overall: 82.8
              }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h5 className="font-semibold">{worker.name}</h5>
                    <p className="text-sm text-gray-600">{worker.dept}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-600">{worker.overall}%</p>
                    <p className="text-sm text-gray-600">Overall</p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-center">
                    <p className="font-medium">Tech</p>
                    <p className={`font-semibold ${worker.skills.technical >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {worker.skills.technical}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Quality</p>
                    <p className={`font-semibold ${worker.skills.quality >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {worker.skills.quality}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Time</p>
                    <p className={`font-semibold ${worker.skills.time >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {worker.skills.time}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Problem</p>
                    <p className={`font-semibold ${worker.skills.problem >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {worker.skills.problem}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Comm</p>
                    <p className={`font-semibold ${worker.skills.communication >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {worker.skills.communication}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductivityTracking = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Productivity Tracking</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Productivity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Output</p>
              <p className="text-2xl font-bold text-blue-600">142 pcs/hr</p>
            </div>
            <Target className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Target Achievement</p>
              <p className="text-2xl font-bold text-green-600">106%</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quality Rate</p>
              <p className="text-2xl font-bold text-purple-600">96.8%</p>
            </div>
            <Award className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Downtime</p>
              <p className="text-2xl font-bold text-red-600">3.2%</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Hourly Productivity Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Hourly Productivity Today</h4>
        <div className="space-y-3">
          {[
            { hour: '8:00 AM', target: 140, actual: 135, efficiency: 96.4 },
            { hour: '9:00 AM', target: 140, actual: 148, efficiency: 105.7 },
            { hour: '10:00 AM', target: 140, actual: 152, efficiency: 108.6 },
            { hour: '11:00 AM', target: 140, actual: 138, efficiency: 98.6 },
            { hour: '1:00 PM', target: 140, actual: 142, efficiency: 101.4 },
            { hour: '2:00 PM', target: 140, actual: 155, efficiency: 110.7 },
            { hour: '3:00 PM', target: 140, actual: 149, efficiency: 106.4 },
            { hour: '4:00 PM', target: 140, actual: 145, efficiency: 103.6 }
          ].map((hour, index) => {
            const percentage = (hour.actual / hour.target) * 100;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{hour.hour}</span>
                  <span className="text-gray-700">
                    {hour.actual}/{hour.target} pcs/hr ({hour.efficiency}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      percentage >= 100 ? 'bg-green-500' : 
                      percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTimeMotionStudy = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Time & Motion Study</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Study
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Time Breakdown Analysis</h4>
          <div className="space-y-4">
            {[
              { activity: 'Productive Work', time: 85.2, color: 'green', target: 85 },
              { activity: 'Setup/Changeover', time: 8.5, color: 'blue', target: 10 },
              { activity: 'Quality Check', time: 4.8, color: 'purple', target: 5 },
              { activity: 'Waiting/Idle', time: 1.5, color: 'red', target: 2 }
            ].map((activity, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{activity.activity}</span>
                  <span className={`font-semibold ${
                    activity.activity === 'Waiting/Idle' 
                      ? activity.time <= activity.target ? 'text-green-600' : 'text-red-600'
                      : activity.time >= activity.target ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.time}% (Target: {activity.target}%)
                  </span>
                </div>
                <ProgressBar progress={activity.time} color={activity.color as any} />
              </div>
            ))}
          </div>
        </div>

        {/* Motion Efficiency */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Motion Efficiency Metrics</h4>
          <div className="space-y-4">
            {[
              { metric: 'Hand Movement Efficiency', score: 92.5, benchmark: 90 },
              { metric: 'Body Posture Score', score: 88.7, benchmark: 85 },
              { metric: 'Tool Utilization', score: 94.2, benchmark: 90 },
              { metric: 'Workspace Organization', score: 86.3, benchmark: 85 },
              { metric: 'Ergonomic Compliance', score: 91.8, benchmark: 90 }
            ].map((metric, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{metric.metric}</span>
                  <span className={`font-semibold ${
                    metric.score >= metric.benchmark ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.score}%
                  </span>
                </div>
                <ProgressBar 
                  progress={metric.score} 
                  color={metric.score >= metric.benchmark ? 'green' : 'red'}
                />
                <div className="text-xs text-gray-500 mt-1">
                  Benchmark: {metric.benchmark}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Performance Metrics</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>All Metrics</option>
            <option>Efficiency Only</option>
            <option>Quality Only</option>
            <option>Productivity Only</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { kpi: 'Overall Efficiency', value: 87.5, target: 85, unit: '%', trend: 'up', color: 'blue' },
          { kpi: 'Quality Score', value: 96.8, target: 95, unit: '%', trend: 'up', color: 'green' },
          { kpi: 'Productivity Rate', value: 142, target: 135, unit: 'pcs/hr', trend: 'up', color: 'purple' },
          { kpi: 'Attendance Rate', value: 94.2, target: 95, unit: '%', trend: 'down', color: 'orange' },
          { kpi: 'Training Hours', value: 8.5, target: 10, unit: 'hrs/month', trend: 'stable', color: 'yellow' },
          { kpi: 'Safety Score', value: 98.5, target: 98, unit: '%', trend: 'up', color: 'red' },
          { kpi: 'Cost per Unit', value: 2.85, target: 3.00, unit: '৳', trend: 'down', color: 'green' },
          { kpi: 'Overtime Hours', value: 12.5, target: 15, unit: 'hrs/week', trend: 'down', color: 'blue' }
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-gray-700">{kpi.kpi}</h4>
              {kpi.trend === 'up' && <TrendingUp className="text-green-500" size={16} />}
              {kpi.trend === 'down' && <TrendingDown className="text-red-500" size={16} />}
              {kpi.trend === 'stable' && <Target className="text-gray-500" size={16} />}
            </div>
            <div className="mb-2">
              <span className="text-2xl font-bold">{kpi.value}</span>
              <span className="text-sm text-gray-600 ml-1">{kpi.unit}</span>
            </div>
            <div className="text-xs text-gray-500">
              Target: {kpi.target} {kpi.unit}
            </div>
            <ProgressBar 
              progress={kpi.kpi === 'Cost per Unit' || kpi.kpi === 'Overtime Hours' 
                ? ((kpi.target - kpi.value) / kpi.target) * 100 
                : (kpi.value / kpi.target) * 100
              } 
              color={kpi.color as any}
            />
          </div>
        ))}
      </div>

      {/* Performance Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Performance Distribution</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3">Efficiency Distribution</h5>
            <div className="space-y-3">
              {[
                { range: 'Excellent (90-100%)', count: 42, percentage: 27, color: 'bg-green-500' },
                { range: 'Good (80-89%)', count: 68, percentage: 44, color: 'bg-blue-500' },
                { range: 'Average (70-79%)', count: 32, percentage: 20, color: 'bg-yellow-500' },
                { range: 'Below Average (<70%)', count: 14, percentage: 9, color: 'bg-red-500' }
              ].map((range, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{range.range}</span>
                    <span>{range.count} workers ({range.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${range.color}`}
                      style={{ width: `${range.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3">Quality Score Distribution</h5>
            <div className="space-y-3">
              {[
                { range: 'Excellent (95-100%)', count: 89, percentage: 57, color: 'bg-green-500' },
                { range: 'Good (90-94%)', count: 45, percentage: 29, color: 'bg-blue-500' },
                { range: 'Average (85-89%)', count: 18, percentage: 11, color: 'bg-yellow-500' },
                { range: 'Below Average (<85%)', count: 4, percentage: 3, color: 'bg-red-500' }
              ].map((range, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{range.range}</span>
                    <span>{range.count} workers ({range.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${range.color}`}
                      style={{ width: `${range.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrainingNeeds = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Training Needs Analysis</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Schedule Training
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Priority Matrix */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Training Priority Matrix</h4>
          <div className="space-y-4">
            {[
              { skill: 'Quality Control Techniques', priority: 'High', workers: 25, urgency: 'Immediate', color: 'red' },
              { skill: 'Machine Operation Efficiency', priority: 'High', workers: 18, urgency: 'This Month', color: 'orange' },
              { skill: 'Time Management', priority: 'Medium', workers: 42, urgency: 'Next Quarter', color: 'yellow' },
              { skill: 'Safety Procedures', priority: 'Medium', workers: 15, urgency: 'Next Month', color: 'blue' },
              { skill: 'Communication Skills', priority: 'Low', workers: 35, urgency: 'Next Quarter', color: 'green' }
            ].map((training, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold">{training.skill}</h5>
                    <p className="text-sm text-gray-600">{training.workers} workers need training</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      training.priority === 'High' ? 'bg-red-100 text-red-800' :
                      training.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {training.priority} Priority
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{training.urgency}</p>
                  </div>
                </div>
                <ProgressBar 
                  progress={training.priority === 'High' ? 90 : training.priority === 'Medium' ? 60 : 30} 
                  color={training.color as any}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Individual Training Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Individual Training Recommendations</h4>
          <div className="space-y-3">
            {[
              { 
                name: 'করিম মিয়া', 
                dept: 'Cutting', 
                efficiency: 72.5,
                recommendations: ['Quality Control', 'Time Management', 'Machine Operation'],
                priority: 'High'
              },
              { 
                name: 'সালমা খাতুন', 
                dept: 'Finishing', 
                efficiency: 78.2,
                recommendations: ['Efficiency Techniques', 'Problem Solving'],
                priority: 'Medium'
              },
              { 
                name: 'রহিম উদ্দিন', 
                dept: 'Sewing', 
                efficiency: 81.5,
                recommendations: ['Advanced Techniques', 'Leadership'],
                priority: 'Low'
              }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold">{worker.name}</h5>
                    <p className="text-sm text-gray-600">{worker.dept} • {worker.efficiency}% efficiency</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    worker.priority === 'High' ? 'bg-red-100 text-red-800' :
                    worker.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {worker.priority}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Recommended Training:</p>
                  <div className="flex flex-wrap gap-1">
                    {worker.recommendations.map((rec, recIndex) => (
                      <span key={recIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEfficiencyTrends = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Efficiency Trends Analysis</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Monthly Efficiency Trends</h4>
        <div className="space-y-3">
          {[
            { month: 'জুলাই ২০২৪', efficiency: 82.5, productivity: 135, quality: 94.2, target: 85 },
            { month: 'আগস্ট ২০২৪', efficiency: 84.1, productivity: 138, quality: 95.1, target: 85 },
            { month: 'সেপ্টেম্বর ২০২ৄ', efficiency: 85.8, productivity: 142, quality: 95.8, target: 85 },
            { month: 'অক্টোবর ২০২৪', efficiency: 86.9, productivity: 145, quality: 96.2, target: 85 },
            { month: 'নভেম্বর ২০২৪', efficiency: 87.2, productivity: 148, quality: 96.5, target: 85 },
            { month: 'ডিসেম্বর ২০২৪', efficiency: 87.5, productivity: 142, quality: 96.8, target: 85 }
          ].map((month, index) => {
            const percentage = (month.efficiency / 100) * 100;
            const isAboveTarget = month.efficiency >= month.target;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{month.month}</span>
                  <div className="flex space-x-4 text-xs">
                    <span>Efficiency: {month.efficiency}%</span>
                    <span>Productivity: {month.productivity} pcs/hr</span>
                    <span>Quality: {month.quality}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      isAboveTarget ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Positive Trends</h4>
          <div className="space-y-3">
            {[
              { metric: 'Overall Efficiency', change: '+5.0%', period: '6 months', icon: TrendingUp, color: 'green' },
              { metric: 'Quality Score', change: '+2.6%', period: '6 months', icon: TrendingUp, color: 'green' },
              { metric: 'Productivity Rate', change: '+7 pcs/hr', period: '6 months', icon: TrendingUp, color: 'green' },
              { metric: 'Training Completion', change: '+15%', period: '3 months', icon: TrendingUp, color: 'green' }
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <trend.icon className={`text-${trend.color}-500`} size={20} />
                  <div>
                    <p className="font-medium">{trend.metric}</p>
                    <p className="text-sm text-gray-600">Last {trend.period}</p>
                  </div>
                </div>
                <span className={`font-semibold text-${trend.color}-600`}>{trend.change}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Areas for Improvement</h4>
          <div className="space-y-3">
            {[
              { metric: 'Attendance Rate', change: '-1.2%', period: '2 months', icon: TrendingDown, color: 'red' },
              { metric: 'Machine Downtime', change: '+0.8%', period: '1 month', icon: TrendingUp, color: 'red' },
              { metric: 'Communication Score', change: '-2.1%', period: '3 months', icon: TrendingDown, color: 'red' },
              { metric: 'Overtime Hours', change: '+3.5 hrs', period: '1 month', icon: TrendingUp, color: 'orange' }
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <trend.icon className={`text-${trend.color}-500`} size={20} />
                  <div>
                    <p className="font-medium">{trend.metric}</p>
                    <p className="text-sm text-gray-600">Last {trend.period}</p>
                  </div>
                </div>
                <span className={`font-semibold text-${trend.color}-600`}>{trend.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBenchmarking = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Performance Benchmarking</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>Industry Standards</option>
            <option>Internal Benchmarks</option>
            <option>Best Practices</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Industry Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Industry Benchmark Comparison</h4>
        <div className="space-y-4">
          {[
            { metric: 'Overall Efficiency', ourValue: 87.5, industry: 82.0, best: 92.0, unit: '%' },
            { metric: 'Quality Rate', ourValue: 96.8, industry: 94.5, best: 98.5, unit: '%' },
            { metric: 'Productivity', ourValue: 142, industry: 135, best: 165, unit: 'pcs/hr' },
            { metric: 'Training Hours/Month', ourValue: 8.5, industry: 12.0, best: 16.0, unit: 'hrs' },
            { metric: 'Attendance Rate', ourValue: 94.2, industry: 96.0, best: 98.5, unit: '%' },
            { metric: 'Safety Score', ourValue: 98.5, industry: 95.0, best: 99.2, unit: '%' }
          ].map((metric, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-semibold">{metric.metric}</h5>
                <div className="flex space-x-4 text-sm">
                  <span className="text-blue-600 font-semibold">Us: {metric.ourValue}{metric.unit}</span>
                  <span className="text-gray-600">Industry: {metric.industry}{metric.unit}</span>
                  <span className="text-green-600">Best: {metric.best}{metric.unit}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs w-16">Our Score:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${(metric.ourValue / metric.best) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs w-12">{((metric.ourValue / metric.best) * 100).toFixed(1)}%</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs w-16">Industry:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gray-500 h-3 rounded-full"
                      style={{ width: `${(metric.industry / metric.best) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs w-12">{((metric.industry / metric.best) * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="mt-2 text-xs">
                <span className={`font-medium ${
                  metric.ourValue >= metric.industry ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.ourValue >= metric.industry 
                    ? `Above industry average by ${(metric.ourValue - metric.industry).toFixed(1)}${metric.unit}`
                    : `Below industry average by ${(metric.industry - metric.ourValue).toFixed(1)}${metric.unit}`
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Benchmarking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Department Ranking</h4>
          <div className="space-y-3">
            {[
              { dept: 'Quality', score: 94.3, rank: 1, change: 'up' },
              { dept: 'Cutting', score: 92.1, rank: 2, change: 'up' },
              { dept: 'Sewing', score: 89.2, rank: 3, change: 'stable' },
              { dept: 'Packing', score: 88.9, rank: 4, change: 'up' },
              { dept: 'Finishing', score: 85.7, rank: 5, change: 'down' }
            ].map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    dept.rank === 1 ? 'bg-yellow-500' :
                    dept.rank === 2 ? 'bg-gray-400' :
                    dept.rank === 3 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {dept.rank}
                  </div>
                  <div>
                    <p className="font-medium">{dept.dept}</p>
                    <p className="text-sm text-gray-600">Efficiency Score</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{dept.score}%</span>
                  {dept.change === 'up' && <TrendingUp className="text-green-500" size={16} />}
                  {dept.change === 'down' && <TrendingDown className="text-red-500" size={16} />}
                  {dept.change === 'stable' && <Target className="text-gray-500" size={16} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Best Practice Examples</h4>
          <div className="space-y-3">
            {[
              { practice: 'Quality Control Process', leader: 'Quality Dept', score: 99.2, adoptable: true },
              { practice: 'Workflow Optimization', leader: 'Cutting Dept', score: 95.8, adoptable: true },
              { practice: 'Team Communication', leader: 'Sewing Dept', score: 92.5, adoptable: true },
              { practice: 'Time Management', leader: 'Packing Dept', score: 91.3, adoptable: false }
            ].map((practice, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{practice.practice}</p>
                    <p className="text-sm text-gray-600">Led by {practice.leader}</p>
                  </div>
                  <span className="font-semibold text-green-600">{practice.score}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <ProgressBar progress={practice.score} color="green" />
                  <Button 
                    size="sm" 
                    variant={practice.adoptable ? "success" : "secondary"}
                    disabled={!practice.adoptable}
                  >
                    {practice.adoptable ? 'Adopt' : 'In Use'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncentiveAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Incentive Analysis</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Create Incentive Plan
        </Button>
      </div>

      {/* Incentive Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Incentives Paid</p>
              <p className="text-2xl font-bold text-green-600">৳2,45,000</p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Eligible Workers</p>
              <p className="text-2xl font-bold text-blue-600">89/156</p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ROI on Incentives</p>
              <p className="text-2xl font-bold text-purple-600">285%</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Incentive Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Active Incentive Programs</h4>
          <div className="space-y-4">
            {[
              { 
                program: 'Efficiency Bonus', 
                criteria: '90%+ efficiency', 
                amount: '৳2,000/month', 
                participants: 42,
                impact: '+8.5% efficiency'
              },
              { 
                program: 'Quality Excellence', 
                criteria: '98%+ quality score', 
                amount: '৳1,500/month', 
                participants: 25,
                impact: '+3.2% quality'
              },
              { 
                program: 'Perfect Attendance', 
                criteria: '100% attendance', 
                amount: '৳1,000/month', 
                participants: 18,
                impact: '+5.1% attendance'
              },
              { 
                program: 'Innovation Award', 
                criteria: 'Process improvement', 
                amount: '৳5,000/idea', 
                participants: 8,
                impact: '+12% productivity'
              }
            ].map((program, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold">{program.program}</h5>
                    <p className="text-sm text-gray-600">{program.criteria}</p>
                  </div>
                  <span className="font-semibold text-green-600">{program.amount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{program.participants} participants</span>
                  <span className="text-blue-600 font-medium">{program.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Incentive Effectiveness</h4>
          <div className="space-y-4">
            {[
              { metric: 'Productivity Increase', before: 135, after: 142, improvement: 5.2 },
              { metric: 'Quality Score', before: 93.5, after: 96.8, improvement: 3.5 },
              { metric: 'Efficiency Rate', before: 82.1, after: 87.5, improvement: 6.6 },
              { metric: 'Employee Satisfaction', before: 78, after: 89, improvement: 14.1 }
            ].map((metric, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-semibold">{metric.metric}</h5>
                  <span className="text-green-600 font-semibold">+{metric.improvement}%</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Before: {metric.before}</span>
                  <span>After: {metric.after}</span>
                </div>
                <ProgressBar progress={(metric.improvement / 20) * 100} color="green" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Incentive Tracking */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Top Incentive Earners</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Worker</th>
                <th className="p-3 font-semibold text-sm">Department</th>
                <th className="p-3 font-semibold text-sm">Programs Qualified</th>
                <th className="p-3 font-semibold text-sm">This Month</th>
                <th className="p-3 font-semibold text-sm">Total Earned</th>
                <th className="p-3 font-semibold text-sm">Performance Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: 'ফাতিমা বেগম', 
                  dept: 'Quality', 
                  programs: ['Efficiency', 'Quality', 'Attendance'], 
                  thisMonth: 4500, 
                  total: 18000,
                  impact: '+15.2%'
                },
                { 
                  name: 'আবুল কালাম', 
                  dept: 'Sewing', 
                  programs: ['Efficiency', 'Attendance'], 
                  thisMonth: 3000, 
                  total: 12000,
                  impact: '+12.8%'
                },
                { 
                  name: 'করিম মিয়া', 
                  dept: 'Cutting', 
                  programs: ['Innovation'], 
                  thisMonth: 5000, 
                  total: 5000,
                  impact: '+8.5%'
                }
              ].map((worker, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{worker.name}</td>
                  <td className="p-3 text-sm">{worker.dept}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {worker.programs.map((program, pIndex) => (
                        <span key={pIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {program}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-green-600">৳{worker.thisMonth.toLocaleString()}</td>
                  <td className="p-3 font-semibold">৳{worker.total.toLocaleString()}</td>
                  <td className="p-3 font-semibold text-blue-600">{worker.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWorkloadAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Workload Analysis</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Week</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Workload Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Workload</p>
              <p className="text-2xl font-bold text-blue-600">78%</p>
            </div>
            <Activity className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overloaded Workers</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Underutilized</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <TrendingDown className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Optimal Load</p>
              <p className="text-2xl font-bold text-green-600">136</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
      </div>

      {/* Department Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Department Workload Distribution</h4>
          <div className="space-y-4">
            {[
              { dept: 'Sewing', workload: 85, capacity: 100, workers: 45, status: 'High' },
              { dept: 'Cutting', workload: 72, capacity: 100, workers: 18, status: 'Optimal' },
              { dept: 'Finishing', workload: 68, capacity: 100, workers: 28, status: 'Low' },
              { dept: 'Quality', workload: 92, capacity: 100, workers: 12, status: 'Overloaded' },
              { dept: 'Packing', workload: 78, capacity: 100, workers: 22, status: 'Optimal' }
            ].map((dept, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h5 className="font-semibold">{dept.dept}</h5>
                    <p className="text-sm text-gray-600">{dept.workers} workers</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{dept.workload}%</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      dept.status === 'Overloaded' ? 'bg-red-100 text-red-800' :
                      dept.status === 'High' ? 'bg-orange-100 text-orange-800' :
                      dept.status === 'Optimal' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {dept.status}
                    </span>
                  </div>
                </div>
                <ProgressBar 
                  progress={dept.workload} 
                  color={
                    dept.status === 'Overloaded' ? 'red' :
                    dept.status === 'High' ? 'orange' :
                    dept.status === 'Optimal' ? 'green' : 'yellow'
                  }
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Capacity: {dept.capacity}%</span>
                  <span>Utilization: {dept.workload}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Workload Balance Recommendations</h4>
          <div className="space-y-3">
            {[
              { 
                issue: 'Quality Department Overloaded', 
                recommendation: 'Redistribute 2 workers from Finishing', 
                priority: 'High',
                impact: 'Reduce workload by 15%'
              },
              { 
                issue: 'Finishing Department Underutilized', 
                recommendation: 'Assign additional quality tasks', 
                priority: 'Medium',
                impact: 'Increase utilization by 10%'
              },
              { 
                issue: 'Sewing Department High Load', 
                recommendation: 'Consider overtime or temporary staff', 
                priority: 'Medium',
                impact: 'Maintain current efficiency'
              },
              { 
                issue: 'Cross-training Opportunity', 
                recommendation: 'Train Finishing workers in Quality tasks', 
                priority: 'Low',
                impact: 'Improve flexibility'
              }
            ].map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold text-sm">{rec.issue}</h5>
                    <p className="text-sm text-gray-600">{rec.recommendation}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-blue-600 font-medium">Expected Impact: {rec.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Workload Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Individual Workload Analysis</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Worker</th>
                <th className="p-3 font-semibold text-sm">Department</th>
                <th className="p-3 font-semibold text-sm">Current Load</th>
                <th className="p-3 font-semibold text-sm">Capacity</th>
                <th className="p-3 font-semibold text-sm">Utilization</th>
                <th className="p-3 font-semibold text-sm">Stress Level</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: 'ফাতিমা বেগম', 
                  dept: 'Quality', 
                  load: 95, 
                  capacity: 100, 
                  utilization: 95, 
                  stress: 'High',
                  status: 'Overloaded'
                },
                { 
                  name: 'আবুল কালাম', 
                  dept: 'Sewing', 
                  load: 82, 
                  capacity: 100, 
                  utilization: 82, 
                  stress: 'Medium',
                  status: 'Optimal'
                },
                { 
                  name: 'সালমা খাতুন', 
                  dept: 'Finishing', 
                  load: 58, 
                  capacity: 100, 
                  utilization: 58, 
                  stress: 'Low',
                  status: 'Underutilized'
                }
              ].map((worker, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{worker.name}</td>
                  <td className="p-3 text-sm">{worker.dept}</td>
                  <td className="p-3 text-sm">{worker.load}%</td>
                  <td className="p-3 text-sm">{worker.capacity}%</td>
                  <td className="p-3">
                    <ProgressBar progress={worker.utilization} color={
                      worker.utilization > 90 ? 'red' :
                      worker.utilization > 75 ? 'green' : 'yellow'
                    } />
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      worker.stress === 'High' ? 'bg-red-100 text-red-800' :
                      worker.stress === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {worker.stress}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={worker.status} />
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="secondary">
                      Adjust
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEfficiencyReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Efficiency Reports</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Generate Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: 'Individual Efficiency Report', 
            description: 'Detailed analysis of each worker\'s performance', 
            icon: User, 
            color: 'blue',
            frequency: 'Weekly',
            lastGenerated: '2 days ago'
          },
          { 
            title: 'Department Performance Report', 
            description: 'Department-wise efficiency and productivity metrics', 
            icon: Users, 
            color: 'green',
            frequency: 'Monthly',
            lastGenerated: '1 week ago'
          },
          { 
            title: 'Skill Assessment Report', 
            description: 'Comprehensive skill evaluation and gaps analysis', 
            icon: Brain, 
            color: 'purple',
            frequency: 'Quarterly',
            lastGenerated: '2 weeks ago'
          },
          { 
            title: 'Training Effectiveness Report', 
            description: 'Impact analysis of training programs on efficiency', 
            icon: BookOpen, 
            color: 'orange',
            frequency: 'Monthly',
            lastGenerated: '3 days ago'
          },
          { 
            title: 'Productivity Trends Report', 
            description: 'Historical trends and forecasting analysis', 
            icon: LineChart, 
            color: 'yellow',
            frequency: 'Monthly',
            lastGenerated: '1 week ago'
          },
          { 
            title: 'Benchmarking Report', 
            description: 'Comparison with industry standards and best practices', 
            icon: BarChart, 
            color: 'red',
            frequency: 'Quarterly',
            lastGenerated: '1 month ago'
          },
          { 
            title: 'Workload Analysis Report', 
            description: 'Workload distribution and balance analysis', 
            icon: Activity, 
            color: 'indigo',
            frequency: 'Weekly',
            lastGenerated: '1 day ago'
          },
          { 
            title: 'Incentive Impact Report', 
            description: 'ROI analysis of incentive programs', 
            icon: DollarSign, 
            color: 'green',
            frequency: 'Monthly',
            lastGenerated: '5 days ago'
          },
          { 
            title: 'Executive Summary Report', 
            description: 'High-level overview for management decision making', 
            icon: Briefcase, 
            color: 'gray',
            frequency: 'Monthly',
            lastGenerated: '3 days ago'
          }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}>
              <report.icon className={`text-${report.color}-600`} size={24} />
            </div>
            <h4 className="font-semibold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{report.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Frequency:</span>
                <span className="font-medium">{report.frequency}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Last Generated:</span>
                <span className="font-medium">{report.lastGenerated}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" className="flex-1">
                <Eye size={14} className="mr-1" />
                View
              </Button>
              <Button size="sm" className="flex-1">
                <Download size={14} className="mr-1" />
                Generate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Recent Reports</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Report Name</th>
                <th className="p-3 font-semibold text-sm">Type</th>
                <th className="p-3 font-semibold text-sm">Generated</th>
                <th className="p-3 font-semibold text-sm">Generated By</th>
                <th className="p-3 font-semibold text-sm">Size</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: 'Weekly Individual Efficiency Report', 
                  type: 'Individual Analysis', 
                  date: '2025-01-15 09:30', 
                  by: 'HR Manager',
                  size: '2.4 MB'
                },
                { 
                  name: 'Monthly Department Performance', 
                  type: 'Department Analysis', 
                  date: '2025-01-10 14:15', 
                  by: 'Production Manager',
                  size: '1.8 MB'
                },
                { 
                  name: 'Q4 Skill Assessment Report', 
                  type: 'Skill Assessment', 
                  date: '2025-01-05 11:45', 
                  by: 'Training Coordinator',
                  size: '3.2 MB'
                }
              ].map((report, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{report.name}</td>
                  <td className="p-3 text-sm">{report.type}</td>
                  <td className="p-3 text-sm">{report.date}</td>
                  <td className="p-3 text-sm">{report.by}</td>
                  <td className="p-3 text-sm">{report.size}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderImprovementPlans = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Improvement Plans</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Create New Plan
        </Button>
      </div>

      {/* Active Improvement Plans */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Active Improvement Plans</h4>
        <div className="space-y-4">
          {[
            {
              title: 'Quality Department Efficiency Enhancement',
              target: 'Increase efficiency from 94.3% to 97%',
              timeline: '3 months',
              progress: 65,
              actions: ['Skills training', 'Process optimization', 'Tool upgrades'],
              responsible: 'Quality Manager',
              status: 'On Track'
            },
            {
              title: 'Sewing Line Productivity Boost',
              target: 'Increase productivity from 142 to 155 pcs/hr',
              timeline: '2 months',
              progress: 40,
              actions: ['Workflow redesign', 'Equipment maintenance', 'Team training'],
              responsible: 'Production Supervisor',
              status: 'Behind Schedule'
            },
            {
              title: 'Cross-Training Initiative',
              target: 'Train 30 workers in multiple skills',
              timeline: '6 months',
              progress: 80,
              actions: ['Skill assessment', 'Training modules', 'Certification'],
              responsible: 'HR Manager',
              status: 'Ahead of Schedule'
            }
          ].map((plan, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{plan.title}</h5>
                  <p className="text-sm text-gray-600">{plan.target}</p>
                  <p className="text-sm text-gray-500">Timeline: {plan.timeline} • Responsible: {plan.responsible}</p>
                </div>
                <StatusBadge status={plan.status} />
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{plan.progress}%</span>
                </div>
                <ProgressBar 
                  progress={plan.progress} 
                  color={plan.progress >= 80 ? 'green' : plan.progress >= 60 ? 'yellow' : 'red'}
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Key Actions:</p>
                <div className="flex flex-wrap gap-1">
                  {plan.actions.map((action, actionIndex) => (
                    <span key={actionIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Identified Opportunities</h4>
          <div className="space-y-3">
            {[
              {
                area: 'Communication Skills',
                currentScore: 76.3,
                targetScore: 85,
                impact: 'High',
                effort: 'Medium',
                priority: 'High'
              },
              {
                area: 'Time Management',
                currentScore: 78.9,
                targetScore: 88,
                impact: 'Medium',
                effort: 'Low',
                priority: 'Medium'
              },
              {
                area: 'Machine Maintenance',
                currentScore: 82.1,
                targetScore: 90,
                impact: 'High',
                effort: 'High',
                priority: 'Medium'
              },
              {
                area: 'Workplace Organization',
                currentScore: 74.5,
                targetScore: 85,
                impact: 'Medium',
                effort: 'Low',
                priority: 'High'
              }
            ].map((opportunity, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold">{opportunity.area}</h5>
                    <p className="text-sm text-gray-600">
                      Current: {opportunity.currentScore}% → Target: {opportunity.targetScore}%
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opportunity.priority === 'High' ? 'bg-red-100 text-red-800' :
                    opportunity.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {opportunity.priority}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Impact:</span>
                    <span className={`ml-2 font-medium ${
                      opportunity.impact === 'High' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {opportunity.impact}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Effort:</span>
                    <span className={`ml-2 font-medium ${
                      opportunity.effort === 'Low' ? 'text-green-600' : 
                      opportunity.effort === 'Medium' ?   'text-yellow-600' : 'text-red-600'
                    }`}>
                      {opportunity.effort}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Success Stories</h4>
          <div className="space-y-3">
            {[
              {
                title: 'Finishing Department Turnaround',
                description: 'Improved efficiency from 78% to 85.7% in 2 months',
                impact: '+7.7% efficiency',
                methods: ['Process redesign', 'Skills training', 'Equipment upgrade'],
                timeline: 'Completed 2 months ago'
              },
              {
                title: 'Quality Control Excellence',
                description: 'Achieved 99.2% quality score through systematic improvements',
                impact: '+4.7% quality',
                methods: ['Training program', 'Standard procedures', 'Regular audits'],
                timeline: 'Completed 3 months ago'
              },
              {
                title: 'Cross-Training Success',
                description: 'Trained 25 workers in multiple skills, improving flexibility',
                impact: '+15% flexibility',
                methods: ['Skill mapping', 'Structured training', 'Mentorship program'],
                timeline: 'Completed 1 month ago'
              }
            ].map((story, index) => (
              <div key={index} className="border rounded-lg p-4 bg-green-50">
                <div className="mb-2">
                  <h5 className="font-semibold text-green-800">{story.title}</h5>
                  <p className="text-sm text-gray-600">{story.description}</p>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-green-600">{story.impact}</span>
                  <span className="text-xs text-gray-500 ml-2">• {story.timeline}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-700">Methods Used:</p>
                  <div className="flex flex-wrap gap-1">
                    {story.methods.map((method, methodIndex) => (
                      <span key={methodIndex} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEfficiencySettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Efficiency Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Targets */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Performance Targets</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Minimum Efficiency Target (%)</label>
              <input
                type="number"
                defaultValue={85}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Excellent Performance Threshold (%)</label>
              <input
                type="number"
                defaultValue={90}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Quality Score Target (%)</label>
              <input
                type="number"
                defaultValue={95}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Productivity Target (pcs/hr)</label>
              <input
                type="number"
                defaultValue={135}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Performance Targets</Button>
        </div>

        {/* Assessment Frequency */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Assessment Frequency</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Individual Assessment</label>
              <select className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Team Assessment</label>
              <select className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Bi-annually</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Skill Assessment</label>
              <select className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Quarterly</option>
                <option>Bi-annually</option>
                <option>Annually</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Performance Review</label>
              <select className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Quarterly</option>
                <option>Bi-annually</option>
                <option>Annually</option>
              </select>
            </div>
          </div>
          <Button className="w-full mt-4">Save Assessment Settings</Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Low Performance Alert</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Training Due Reminder</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Achievement Notifications</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Weekly Summary Report</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
          <Button className="w-full mt-4">Save Notification Settings</Button>
        </div>

        {/* Data Retention */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Data Retention</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Performance Data (months)</label>
              <input
                type="number"
                defaultValue={24}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Training Records (months)</label>
              <input
                type="number"
                defaultValue={36}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Assessment Results (months)</label>
              <input
                type="number"
                defaultValue={12}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Data Settings</Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'individual-analysis':
        return renderIndividualAnalysis();
      case 'team-analysis':
        return renderTeamAnalysis();
      case 'skill-assessment':
        return renderSkillAssessment();
      case 'productivity-tracking':
        return renderProductivityTracking();
      case 'time-motion-study':
        return renderTimeMotionStudy();
      case 'performance-metrics':
        return renderPerformanceMetrics();
      case 'training-needs':
        return renderTrainingNeeds();
      case 'efficiency-trends':
        return renderEfficiencyTrends();
      case 'benchmarking':
        return renderBenchmarking();
      case 'incentive-analysis':
        return renderIncentiveAnalysis();
      case 'workload-analysis':
        return renderWorkloadAnalysis();
      case 'efficiency-reports':
        return renderEfficiencyReports();
      case 'improvement-plans':
        return renderImprovementPlans();
      case 'efficiency-settings':
        return renderEfficiencySettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default ExtraWorkerEfficiency;