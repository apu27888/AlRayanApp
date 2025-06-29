import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  Brain,
  Users,
  Target,
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
  BookOpen,
  Briefcase,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import StatusBadge from '../components/UI/StatusBadge';

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
    { id: 'dashboard', label: 'দক্ষতা ড্যাশবোর্ড', icon: BarChart },
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
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Dashboard
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
                <ArrowUp size={12} className="mr-1" />
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
              <p className="text-sm font-medium text-gray-500">উৎপাদনশীলতা</p>
              <p className="text-2xl font-bold text-green-600">92.3%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUp size={12} className="mr-1" />
                +5.1% improvement
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">গুণগত মান</p>
              <p className="text-2xl font-bold text-purple-600">94.8%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <CheckCircle size={12} className="mr-1" />
                Excellent quality
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">প্রশিক্ষণ প্রয়োজন</p>
              <p className="text-2xl font-bold text-orange-600">23</p>
              <p className="text-xs text-orange-500 flex items-center mt-1">
                <BookOpen size={12} className="mr-1" />
                Workers need training
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Efficiency by Department */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Target className="mr-2" size={20} />
            বিভাগ অনুযায়ী দক্ষতা
          </h4>
          <div className="space-y-4">
            {[
              { dept: 'Sewing', efficiency: 89.5, target: 85, workers: 45, trend: 'up' },
              { dept: 'Cutting', efficiency: 92.1, target: 90, workers: 18, trend: 'up' },
              { dept: 'Finishing', efficiency: 85.3, target: 85, workers: 28, trend: 'stable' },
              { dept: 'Quality Control', efficiency: 96.8, target: 95, workers: 12, trend: 'up' },
              { dept: 'Packing', efficiency: 83.7, target: 85, workers: 22, trend: 'down' },
              { dept: 'Maintenance', efficiency: 78.2, target: 80, workers: 8, trend: 'down' }
            ].map((dept, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold">{dept.dept}</h5>
                    <span className="text-xs text-gray-500">({dept.workers} workers)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${
                      dept.efficiency >= dept.target ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {dept.efficiency}%
                    </span>
                    {dept.trend === 'up' && <ArrowUp className="text-green-500" size={16} />}
                    {dept.trend === 'down' && <ArrowDown className="text-red-500" size={16} />}
                    {dept.trend === 'stable' && <Minus className="text-gray-500" size={16} />}
                  </div>
                </div>
                <ProgressBar 
                  progress={dept.efficiency} 
                  color={dept.efficiency >= dept.target ? 'green' : dept.efficiency >= dept.target - 5 ? 'yellow' : 'red'}
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
              { name: 'ফাতিমা খাতুন', dept: 'Sewing', efficiency: 98.5, production: 145, quality: 99.2, rank: 1 },
              { name: 'আবুল কালাম', dept: 'Cutting', efficiency: 96.8, production: 132, quality: 98.5, rank: 2 },
              { name: 'সালমা বেগম', dept: 'Quality Control', efficiency: 95.2, production: 128, quality: 100, rank: 3 },
              { name: 'করিম মিয়া', dept: 'Finishing', efficiency: 94.7, production: 125, quality: 97.8, rank: 4 },
              { name: 'রহিমা খাতুন', dept: 'Sewing', efficiency: 93.9, production: 122, quality: 96.5, rank: 5 }
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
                    <p className="text-xs text-gray-500">{worker.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{worker.efficiency}%</p>
                  <p className="text-xs text-gray-500">{worker.production} pcs/day</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="secondary" size="sm" className="w-full">
              <Eye size={14} className="mr-2" />
              View All Rankings
            </Button>
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
            { week: 'Week 1', overall: 84.2, sewing: 86.1, cutting: 89.5, finishing: 82.3, quality: 95.8 },
            { week: 'Week 2', overall: 85.8, sewing: 87.3, cutting: 90.2, finishing: 83.7, quality: 96.2 },
            { week: 'Week 3', overall: 86.9, sewing: 88.1, cutting: 91.8, finishing: 84.9, quality: 96.5 },
            { week: 'Week 4', overall: 87.5, sewing: 89.5, cutting: 92.1, finishing: 85.3, quality: 96.8 }
          ].map((week, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{week.week}</span>
                <span className="text-blue-600">Overall: {week.overall}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Sewing: {week.sewing}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Cutting: {week.cutting}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Finishing: {week.finishing}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Quality: {week.quality}%</span>
                </div>
              </div>
              <ProgressBar progress={week.overall} color={week.overall >= 85 ? 'green' : week.overall >= 80 ? 'yellow' : 'red'} />
            </div>
          ))}
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
            <Award size={24} />
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
            <option>Quality Control</option>
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
                <th className="p-3 font-semibold text-sm">Worker ID</th>
                <th className="p-3 font-semibold text-sm">Name</th>
                <th className="p-3 font-semibold text-sm">Department</th>
                <th className="p-3 font-semibold text-sm">Efficiency</th>
                <th className="p-3 font-semibold text-sm">Productivity</th>
                <th className="p-3 font-semibold text-sm">Quality Score</th>
                <th className="p-3 font-semibold text-sm">Attendance</th>
                <th className="p-3 font-semibold text-sm">Trend</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'EMP-0101', name: 'আবুল কালাম', dept: 'Sewing', efficiency: 89.5, productivity: 92.3, quality: 96.8, attendance: 95.2, trend: 'up' },
                { id: 'EMP-0256', name: 'ফাতিমা বেগম', dept: 'Quality Control', efficiency: 96.8, productivity: 94.1, quality: 99.2, attendance: 98.5, trend: 'up' },
                { id: 'EMP-0102', name: 'করিম মিয়া', dept: 'Cutting', efficiency: 85.3, productivity: 88.7, quality: 94.5, attendance: 92.1, trend: 'stable' },
                { id: 'EMP-0203', name: 'সালমা খাতুন', dept: 'Finishing', efficiency: 78.9, productivity: 82.4, quality: 91.2, attendance: 89.7, trend: 'down' }
              ].map((worker, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{worker.id}</td>
                  <td className="p-3 text-sm">{worker.name}</td>
                  <td className="p-3 text-sm">{worker.dept}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${
                        worker.efficiency >= 90 ? 'text-green-600' : 
                        worker.efficiency >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {worker.efficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm font-semibold ${
                      worker.productivity >= 90 ? 'text-green-600' : 
                      worker.productivity >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {worker.productivity}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm font-semibold ${
                      worker.quality >= 95 ? 'text-green-600' : 
                      worker.quality >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {worker.quality}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm font-semibold ${
                      worker.attendance >= 95 ? 'text-green-600' : 
                      worker.attendance >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {worker.attendance}%
                    </span>
                  </td>
                  <td className="p-3">
                    {worker.trend === 'up' && <ArrowUp className="text-green-500" size={16} />}
                    {worker.trend === 'down' && <ArrowDown className="text-red-500" size={16} />}
                    {worker.trend === 'stable' && <Minus className="text-gray-500" size={16} />}
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
            Export Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Cards */}
        {[
          { 
            team: 'Team Alpha', 
            leader: 'সুপারভাইজার আহমেদ', 
            members: 12, 
            efficiency: 92.5, 
            productivity: 94.8, 
            quality: 97.2,
            target: 90,
            status: 'Excellent'
          },
          { 
            team: 'Team Beta', 
            leader: 'সুপারভাইজার রহিম', 
            members: 10, 
            efficiency: 87.3, 
            productivity: 89.1, 
            quality: 94.5,
            target: 85,
            status: 'Good'
          },
          { 
            team: 'Team Gamma', 
            leader: 'সুপারভাইজার করিম', 
            members: 15, 
            efficiency: 83.7, 
            productivity: 85.9, 
            quality: 92.1,
            target: 85,
            status: 'Average'
          },
          { 
            team: 'Team Delta', 
            leader: 'সুপারভাইজার সালাম', 
            members: 8, 
            efficiency: 78.2, 
            productivity: 81.4, 
            quality: 89.7,
            target: 80,
            status: 'Needs Improvement'
          }
        ].map((team, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{team.team}</h4>
                <p className="text-sm text-gray-600">{team.leader}</p>
                <p className="text-xs text-gray-500">{team.members} members</p>
              </div>
              <StatusBadge status={team.status} />
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency</span>
                  <span className="font-semibold">{team.efficiency}%</span>
                </div>
                <ProgressBar 
                  progress={team.efficiency} 
                  color={team.efficiency >= team.target ? 'green' : team.efficiency >= team.target - 5 ? 'yellow' : 'red'}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Productivity</span>
                  <span className="font-semibold">{team.productivity}%</span>
                </div>
                <ProgressBar 
                  progress={team.productivity} 
                  color={team.productivity >= 90 ? 'green' : team.productivity >= 85 ? 'yellow' : 'red'}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quality Score</span>
                  <span className="font-semibold">{team.quality}%</span>
                </div>
                <ProgressBar 
                  progress={team.quality} 
                  color={team.quality >= 95 ? 'green' : team.quality >= 90 ? 'yellow' : 'red'}
                />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Target: {team.target}%</span>
                <span className={team.efficiency >= team.target ? 'text-green-600' : 'text-red-600'}>
                  {team.efficiency >= team.target ? 'Above Target' : 'Below Target'}
                </span>
              </div>
            </div>
            
            <Button variant="secondary" size="sm" className="w-full mt-3">
              <Eye size={14} className="mr-2" />
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillAssessment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Skill Assessment & Development</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Skill Categories Assessment</h4>
          <div className="space-y-4">
            {[
              { skill: 'Machine Operation', average: 87.5, workers: 45, level: 'Advanced' },
              { skill: 'Quality Control', average: 92.3, workers: 12, level: 'Expert' },
              { skill: 'Pattern Making', average: 78.9, workers: 8, level: 'Intermediate' },
              { skill: 'Fabric Cutting', average: 85.2, workers: 18, level: 'Advanced' },
              { skill: 'Finishing Techniques', average: 82.7, workers: 28, level: 'Intermediate' },
              { skill: 'Problem Solving', average: 75.4, workers: 156, level: 'Intermediate' }
            ].map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{skill.skill}</h5>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                      skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                      skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{skill.workers} workers assessed</span>
                  <span>Average: {skill.average}%</span>
                </div>
                <ProgressBar 
                  progress={skill.average} 
                  color={skill.average >= 90 ? 'green' : skill.average >= 80 ? 'yellow' : 'red'}
                />
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
                name: 'ফাতিমা খাতুন', 
                dept: 'Quality Control', 
                skills: { machine: 95, quality: 98, pattern: 85, cutting: 90, finishing: 92, problem: 88 },
                overall: 94.7
              },
              { 
                name: 'আবুল কালাম', 
                dept: 'Sewing', 
                skills: { machine: 92, quality: 88, pattern: 78, cutting: 85, finishing: 90, problem: 82 },
                overall: 85.8
              },
              { 
                name: 'করিম মিয়া', 
                dept: 'Cutting', 
                skills: { machine: 88, quality: 85, pattern: 92, cutting: 95, finishing: 80, finishing: 85 },
                overall: 87.5
              }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h5 className="font-medium">{worker.name}</h5>
                    <p className="text-sm text-gray-600">{worker.dept}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{worker.overall}%</p>
                    <p className="text-xs text-gray-500">Overall Score</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Machine:</span>
                    <span className="font-medium">{worker.skills.machine}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality:</span>
                    <span className="font-medium">{worker.skills.quality}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pattern:</span>
                    <span className="font-medium">{worker.skills.pattern}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cutting:</span>
                    <span className="font-medium">{worker.skills.cutting}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finishing:</span>
                    <span className="font-medium">{worker.skills.finishing}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Problem:</span>
                    <span className="font-medium">{worker.skills.problem}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4">
            <Eye size={14} className="mr-2" />
            View All Assessments
          </Button>
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
            Export Data
          </Button>
        </div>
      </div>

      {/* Productivity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Daily Target</p>
              <p className="text-2xl font-bold text-blue-600">2,400</p>
            </div>
            <Target className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Actual Production</p>
              <p className="text-2xl font-bold text-green-600">2,215</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Efficiency Rate</p>
              <p className="text-2xl font-bold text-purple-600">92.3%</p>
            </div>
            <Gauge className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Variance</p>
              <p className="text-2xl font-bold text-red-600">-185</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Hourly Productivity Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Hourly Productivity Today</h4>
        <div className="space-y-3">
          {[
            { hour: '8:00 AM', target: 200, actual: 185, efficiency: 92.5 },
            { hour: '9:00 AM', target: 200, actual: 195, efficiency: 97.5 },
            { hour: '10:00 AM', target: 200, actual: 210, efficiency: 105.0 },
            { hour: '11:00 AM', target: 200, actual: 188, efficiency: 94.0 },
            { hour: '1:00 PM', target: 200, actual: 175, efficiency: 87.5 },
            { hour: '2:00 PM', target: 200, actual: 205, efficiency: 102.5 },
            { hour: '3:00 PM', target: 200, actual: 192, efficiency: 96.0 },
            { hour: '4:00 PM', target: 200, actual: 198, efficiency: 99.0 }
          ].map((hour, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{hour.hour}</span>
                <div className="flex space-x-4">
                  <span>Target: {hour.target}</span>
                  <span>Actual: {hour.actual}</span>
                  <span className={`font-semibold ${
                    hour.efficiency >= 100 ? 'text-green-600' : 
                    hour.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {hour.efficiency}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${
                    hour.efficiency >= 100 ? 'bg-green-500' : 
                    hour.efficiency >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, hour.efficiency)}%` }}
                />
              </div>
            </div>
          ))}
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
        {/* Operation Time Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Operation Time Analysis</h4>
          <div className="space-y-4">
            {[
              { operation: 'Fabric Cutting', standard: 45, actual: 42, variance: -3, efficiency: 107.1 },
              { operation: 'Sewing - Basic Seam', standard: 30, actual: 35, variance: 5, efficiency: 85.7 },
              { operation: 'Button Attachment', standard: 15, actual: 18, variance: 3, efficiency: 83.3 },
              { operation: 'Quality Check', standard: 20, actual: 22, variance: 2, efficiency: 90.9 },
              { operation: 'Pressing', standard: 25, actual: 23, variance: -2, efficiency: 108.7 },
              { operation: 'Packaging', standard: 10, actual: 12, variance: 2, efficiency: 83.3 }
            ].map((op, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{op.operation}</h5>
                  <span className={`text-sm font-semibold ${
                    op.efficiency >= 100 ? 'text-green-600' : 
                    op.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {op.efficiency}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Standard</p>
                    <p className="font-semibold">{op.standard}s</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Actual</p>
                    <p className="font-semibold">{op.actual}s</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Variance</p>
                    <p className={`font-semibold ${op.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {op.variance > 0 ? '+' : ''}{op.variance}s
                    </p>
                  </div>
                </div>
                <ProgressBar 
                  progress={op.efficiency} 
                  color={op.efficiency >= 100 ? 'green' : op.efficiency >= 90 ? 'yellow' : 'red'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Motion Efficiency */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Motion Efficiency Analysis</h4>
          <div className="space-y-4">
            {[
              { worker: 'ফাতিমা খাতুন', operation: 'Sewing', motions: 85, optimal: 78, efficiency: 91.8, waste: 8.2 },
              { worker: 'আবুল কালাম', operation: 'Cutting', motions: 92, optimal: 85, efficiency: 92.4, waste: 7.6 },
              { worker: 'করিম মিয়া', operation: 'Finishing', motions: 105, optimal: 95, efficiency: 90.5, waste: 9.5 },
              { worker: 'সালমা বেগম', operation: 'Quality Check', motions: 68, optimal: 65, efficiency: 95.6, waste: 4.4 }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h5 className="font-medium">{worker.worker}</h5>
                    <p className="text-sm text-gray-600">{worker.operation}</p>
                  </div>
                  <span className={`text-sm font-semibold ${
                    worker.efficiency >= 95 ? 'text-green-600' : 
                    worker.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {worker.efficiency}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                  <div>
                    <p className="text-gray-600">Actual Motions: <span className="font-semibold">{worker.motions}</span></p>
                    <p className="text-gray-600">Optimal Motions: <span className="font-semibold">{worker.optimal}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-600">Efficiency: <span className="font-semibold">{worker.efficiency}%</span></p>
                    <p className="text-red-600">Waste: <span className="font-semibold">{worker.waste}%</span></p>
                  </div>
                </div>
                <ProgressBar 
                  progress={worker.efficiency} 
                  color={worker.efficiency >= 95 ? 'green' : worker.efficiency >= 90 ? 'yellow' : 'red'}
                />
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
        <h3 className="text-xl font-semibold">Performance Metrics Dashboard</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Metrics
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Equipment Effectiveness</p>
              <p className="text-2xl font-bold text-blue-600">85.7%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUp size={12} className="mr-1" />
                +2.3% from last month
              </p>
            </div>
            <Gauge className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">First Pass Yield</p>
              <p className="text-2xl font-bold text-green-600">94.2%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <CheckCircle size={12} className="mr-1" />
                Excellent quality
              </p>
            </div>
            <Star className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Cycle Time Efficiency</p>
              <p className="text-2xl font-bold text-purple-600">89.5%</p>
              <p className="text-xs text-yellow-500 flex items-center mt-1">
                <Timer size={12} className="mr-1" />
                Room for improvement
              </p>
            </div>
            <Timer className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Labor Productivity</p>
              <p className="text-2xl font-bold text-orange-600">92.8%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +1.8% improvement
              </p>
            </div>
            <Activity className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Detailed Performance Metrics</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Metric</th>
                <th className="p-3 font-semibold text-sm">Current Value</th>
                <th className="p-3 font-semibold text-sm">Target</th>
                <th className="p-3 font-semibold text-sm">Variance</th>
                <th className="p-3 font-semibold text-sm">Trend</th>
                <th className="p-3 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Production Efficiency', current: 87.5, target: 85, variance: 2.5, trend: 'up', status: 'Above Target' },
                { metric: 'Quality Rate', current: 94.8, target: 95, variance: -0.2, trend: 'stable', status: 'Near Target' },
                { metric: 'Attendance Rate', current: 91.2, target: 95, variance: -3.8, trend: 'down', status: 'Below Target' },
                { metric: 'On-Time Delivery', current: 96.5, target: 98, variance: -1.5, trend: 'up', status: 'Near Target' },
                { metric: 'Defect Rate', current: 3.2, target: 2.5, variance: 0.7, trend: 'down', status: 'Above Target' },
                { metric: 'Rework Rate', current: 4.1, target: 3.0, variance: 1.1, trend: 'stable', status: 'Above Target' }
              ].map((metric, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{metric.metric}</td>
                  <td className="p-3 text-sm font-semibold">{metric.current}%</td>
                  <td className="p-3 text-sm">{metric.target}%</td>
                  <td className="p-3 text-sm">
                    <span className={metric.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {metric.variance > 0 ? '+' : ''}{metric.variance}%
                    </span>
                  </td>
                  <td className="p-3">
                    {metric.trend === 'up' && <ArrowUp className="text-green-500" size={16} />}
                    {metric.trend === 'down' && <ArrowDown className="text-red-500" size={16} />}
                    {metric.trend === 'stable' && <Minus className="text-gray-500" size={16} />}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={metric.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              { skill: 'Advanced Machine Operation', priority: 'High', workers: 23, impact: 'High', urgency: 'High' },
              { skill: 'Quality Control Techniques', priority: 'High', workers: 15, impact: 'High', urgency: 'Medium' },
              { skill: 'Time Management', priority: 'Medium', workers: 45, impact: 'Medium', urgency: 'High' },
              { skill: 'Safety Procedures', priority: 'High', workers: 156, impact: 'High', urgency: 'High' },
              { skill: 'Problem Solving', priority: 'Medium', workers: 67, impact: 'Medium', urgency: 'Medium' },
              { skill: 'Communication Skills', priority: 'Low', workers: 34, impact: 'Low', urgency: 'Low' }
            ].map((training, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{training.skill}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    training.priority === 'High' ? 'bg-red-100 text-red-800' :
                    training.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {training.priority} Priority
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Workers Needed</p>
                    <p className="font-semibold">{training.workers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Impact</p>
                    <p className="font-semibold">{training.impact}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Urgency</p>
                    <p className="font-semibold">{training.urgency}</p>
                  </div>
                </div>
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
                currentSkill: 78.5, 
                targetSkill: 85, 
                recommendations: ['Pattern Making', 'Precision Cutting'],
                priority: 'High'
              },
              { 
                name: 'সালমা বেগম', 
                dept: 'Finishing', 
                currentSkill: 82.3, 
                targetSkill: 90, 
                recommendations: ['Quality Standards', 'Finishing Techniques'],
                priority: 'Medium'
              },
              { 
                name: 'রহিম উদ্দিন', 
                dept: 'Sewing', 
                currentSkill: 75.8, 
                targetSkill: 85, 
                recommendations: ['Machine Maintenance', 'Speed Improvement'],
                priority: 'High'
              },
              { 
                name: 'নাসির আহমেদ', 
                dept: 'Packing', 
                currentSkill: 80.1, 
                targetSkill: 85, 
                recommendations: ['Packaging Standards', 'Efficiency Methods'],
                priority: 'Medium'
              }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-medium">{worker.name}</h5>
                    <p className="text-sm text-gray-600">{worker.dept}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    worker.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {worker.priority}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Skill Level</span>
                    <span>Target: {worker.targetSkill}%</span>
                  </div>
                  <ProgressBar 
                    progress={worker.currentSkill} 
                    color={worker.currentSkill >= worker.targetSkill ? 'green' : 'yellow'}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Gap: {(worker.targetSkill - worker.currentSkill).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Recommended Training:</p>
                  <div className="flex flex-wrap gap-1">
                    {worker.recommendations.map((rec, recIndex) => (
                      <span key={recIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
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
            <option>Last 12 Months</option>
            <option>This Year</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Trends
          </Button>
        </div>
      </div>

      {/* Monthly Efficiency Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Monthly Efficiency Trends</h4>
        <div className="space-y-4">
          {[
            { month: 'জানুয়ারি', overall: 84.2, sewing: 86.1, cutting: 89.5, finishing: 82.3, quality: 95.8, target: 85 },
            { month: 'ফেব্রুয়ারি', overall: 85.8, sewing: 87.3, cutting: 90.2, finishing: 83.7, quality: 96.2, target: 85 },
            { month: 'মার্চ', overall: 86.9, sewing: 88.1, cutting: 91.8, finishing: 84.9, quality: 96.5, target: 85 },
            { month: 'এপ্রিল', overall: 87.5, sewing: 89.5, cutting: 92.1, finishing: 85.3, quality: 96.8, target: 85 },
            { month: 'মে', overall: 88.2, sewing: 90.1, cutting: 92.8, finishing: 86.1, quality: 97.1, target: 85 },
            { month: 'জুন', overall: 89.1, sewing: 91.2, cutting: 93.5, finishing: 87.2, quality: 97.5, target: 85 }
          ].map((month, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">{month.month}</h5>
                <div className="flex items-center space-x-4">
                  <span className={`font-semibold ${
                    month.overall >= month.target ? 'text-green-600' : 'text-red-600'
                  }`}>
                    Overall: {month.overall}%
                  </span>
                  <span className="text-sm text-gray-500">Target: {month.target}%</span>
                </div>
              </div>
              <ProgressBar 
                progress={month.overall} 
                color={month.overall >= month.target ? 'green' : month.overall >= month.target - 2 ? 'yellow' : 'red'}
              />
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="flex justify-between">
                  <span>Sewing:</span>
                  <span className="font-medium">{month.sewing}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cutting:</span>
                  <span className="font-medium">{month.cutting}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Finishing:</span>
                  <span className="font-medium">{month.finishing}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="font-medium">{month.quality}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Trend Analysis Summary</h4>
          <div className="space-y-4">
            {[
              { metric: 'Overall Efficiency', trend: 'Increasing', change: '+5.9%', status: 'Positive' },
              { metric: 'Sewing Department', trend: 'Steady Growth', change: '+5.1%', status: 'Positive' },
              { metric: 'Cutting Department', trend: 'Strong Growth', change: '+4.0%', status: 'Positive' },
              { metric: 'Finishing Department', trend: 'Moderate Growth', change: '+4.9%', status: 'Positive' },
              { metric: 'Quality Control', trend: 'Slight Improvement', change: '+1.7%', status: 'Stable' }
            ].map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{trend.metric}</p>
                  <p className="text-sm text-gray-600">{trend.trend}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    trend.status === 'Positive' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {trend.change}
                  </p>
                  <p className="text-xs text-gray-500">6 months</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Efficiency Forecasting</h4>
          <div className="space-y-4">
            {[
              { period: 'Next Month', predicted: 89.8, confidence: 85, trend: 'up' },
              { period: 'Next Quarter', predicted: 91.2, confidence: 78, trend: 'up' },
              { period: 'Next 6 Months', predicted: 92.5, confidence: 65, trend: 'up' }
            ].map((forecast, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{forecast.period}</h5>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-blue-600">{forecast.predicted}%</span>
                    {forecast.trend === 'up' && <ArrowUp className="text-green-500" size={16} />}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Level</span>
                    <span>{forecast.confidence}%</span>
                  </div>
                  <ProgressBar 
                    progress={forecast.confidence} 
                    color={forecast.confidence >= 80 ? 'green' : forecast.confidence >= 70 ? 'yellow' : 'red'}
                  />
                </div>
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
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Add Benchmark
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Benchmarks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Industry Benchmarks Comparison</h4>
          <div className="space-y-4">
            {[
              { metric: 'Production Efficiency', ourValue: 87.5, industry: 82.3, best: 94.2, status: 'Above Average' },
              { metric: 'Quality Rate', ourValue: 94.8, industry: 91.5, best: 98.1, status: 'Above Average' },
              { metric: 'Labor Productivity', ourValue: 92.3, industry: 88.7, best: 96.8, status: 'Above Average' },
              { metric: 'On-Time Delivery', ourValue: 89.2, industry: 92.1, best: 97.5, status: 'Below Average' },
              { metric: 'Defect Rate', ourValue: 3.2, industry: 4.1, best: 1.8, status: 'Above Average' },
              { metric: 'Employee Turnover', ourValue: 8.5, industry: 12.3, best: 5.2, status: 'Above Average' }
            ].map((benchmark, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium">{benchmark.metric}</h5>
                  <StatusBadge status={benchmark.status} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Our Performance</span>
                    <span className="font-semibold text-blue-600">{benchmark.ourValue}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Industry Average</span>
                    <span className="font-semibold text-gray-600">{benchmark.industry}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Industry Best</span>
                    <span className="font-semibold text-green-600">{benchmark.best}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${(benchmark.ourValue / benchmark.best) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0%</span>
                      <span className="text-gray-500">Industry Avg: {benchmark.industry}%</span>
                      <span>Best: {benchmark.best}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Benchmarks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Internal Department Benchmarks</h4>
          <div className="space-y-4">
            {[
              { dept: 'Sewing', efficiency: 89.5, rank: 2, bestPractice: 'Team Alpha Methods', gap: 2.7 },
              { dept: 'Cutting', efficiency: 92.1, rank: 1, bestPractice: 'Precision Cutting Protocol', gap: 0 },
              { dept: 'Finishing', efficiency: 85.3, rank: 4, bestPractice: 'Quality First Approach', gap: 6.8 },
              { dept: 'Quality Control', efficiency: 96.8, rank: 1, bestPractice: 'Six Sigma Methods', gap: 0 },
              { dept: 'Packing', efficiency: 83.7, rank: 5, bestPractice: 'Lean Packing System', gap: 8.4 },
              { dept: 'Maintenance', efficiency: 78.2, rank: 6, bestPractice: 'Preventive Maintenance', gap: 13.9 }
            ].map((dept, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h5 className="font-medium">{dept.dept}</h5>
                    <p className="text-sm text-gray-600">Rank #{dept.rank}</p>
                  </div>
                  <span className={`font-semibold ${
                    dept.rank === 1 ? 'text-green-600' : 
                    dept.rank <= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {dept.efficiency}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="text-gray-600">Best Practice:</p>
                    <p className="font-medium">{dept.bestPractice}</p>
                  </div>
                  {dept.gap > 0 && (
                    <div className="text-sm">
                      <p className="text-red-600">Gap to Best: {dept.gap}%</p>
                      <ProgressBar 
                        progress={100 - dept.gap} 
                        color={dept.gap <= 3 ? 'green' : dept.gap <= 7 ? 'yellow' : 'red'}
                      />
                    </div>
                  )}
                  {dept.gap === 0 && (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle size={16} className="mr-1" />
                      Department Leader
                    </div>
                  )}
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
        <h3 className="text-xl font-semibold">Incentive & Motivation Analysis</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Create Incentive Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incentive Performance Correlation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Incentive Impact Analysis</h4>
          <div className="space-y-4">
            {[
              { 
                incentive: 'Production Bonus', 
                participants: 45, 
                avgIncrease: 12.5, 
                cost: 25000, 
                roi: 185,
                effectiveness: 'High'
              },
              { 
                incentive: 'Quality Bonus', 
                participants: 12, 
                avgIncrease: 8.3, 
                cost: 8000, 
                roi: 156,
                effectiveness: 'High'
              },
              { 
                incentive: 'Attendance Bonus', 
                participants: 156, 
                avgIncrease: 5.2, 
                cost: 18000, 
                roi: 142,
                effectiveness: 'Medium'
              },
              { 
                incentive: 'Skill Development Bonus', 
                participants: 23, 
                avgIncrease: 15.8, 
                cost: 15000, 
                roi: 198,
                effectiveness: 'High'
              }
            ].map((incentive, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium">{incentive.incentive}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    incentive.effectiveness === 'High' ? 'bg-green-100 text-green-800' :
                    incentive.effectiveness === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {incentive.effectiveness}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Participants</p>
                    <p className="font-semibold">{incentive.participants}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg. Performance Increase</p>
                    <p className="font-semibold text-green-600">+{incentive.avgIncrease}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Cost</p>
                    <p className="font-semibold">৳{incentive.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">ROI</p>
                    <p className="font-semibold text-blue-600">{incentive.roi}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Incentive Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Top Incentive Earners</h4>
          <div className="space-y-3">
            {[
              { 
                name: 'ফাতিমা খাতুন', 
                dept: 'Quality Control', 
                totalIncentive: 4500, 
                bonusTypes: ['Quality', 'Attendance', 'Skill'],
                performance: 96.8
              },
              { 
                name: 'আবুল কালাম', 
                dept: 'Sewing', 
                totalIncentive: 3800, 
                bonusTypes: ['Production', 'Attendance'],
                performance: 89.5
              },
              { 
                name: 'করিম মিয়া', 
                dept: 'Cutting', 
                totalIncentive: 3200, 
                bonusTypes: ['Production', 'Skill'],
                performance: 85.3
              },
              { 
                name: 'সালমা বেগম', 
                dept: 'Finishing', 
                totalIncentive: 2900, 
                bonusTypes: ['Quality', 'Attendance'],
                performance: 82.7
              }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-medium">{worker.name}</h5>
                    <p className="text-sm text-gray-600">{worker.dept}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">৳{worker.totalIncentive.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Performance Score</span>
                    <span className="font-semibold">{worker.performance}%</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Bonuses:</p>
                    <div className="flex flex-wrap gap-1">
                      {worker.bonusTypes.map((bonus, bonusIndex) => (
                        <span key={bonusIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {bonus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incentive Effectiveness Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Monthly Incentive vs Performance Correlation</h4>
        <div className="space-y-3">
          {[
            { month: 'জানুয়ারি', incentivePaid: 45000, avgPerformance: 84.2, participation: 78 },
            { month: 'ফেব্রুয়ারি', incentivePaid: 52000, avgPerformance: 85.8, participation: 82 },
            { month: 'মার্চ', incentivePaid: 58000, avgPerformance: 86.9, participation: 85 },
            { month: 'এপ্রিল', incentivePaid: 61000, avgPerformance: 87.5, participation: 88 },
            { month: 'মে', incentivePaid: 64000, avgPerformance: 88.2, participation: 91 },
            { month: 'জুন', incentivePaid: 67000, avgPerformance: 89.1, participation: 94 }
          ].map((month, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{month.month}</span>
                <div className="flex space-x-4">
                  <span>Incentive: ৳{month.incentivePaid.toLocaleString()}</span>
                  <span>Performance: {month.avgPerformance}%</span>
                  <span>Participation: {month.participation}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Performance</div>
                  <ProgressBar progress={month.avgPerformance} color="blue" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Participation</div>
                  <ProgressBar progress={month.participation} color="green" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkloadAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Workload Distribution Analysis</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Workload Distribution by Department */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Department Workload Distribution</h4>
          <div className="space-y-4">
            {[
              { dept: 'Sewing', workers: 45, capacity: 100, utilization: 92, overload: 8, status: 'High' },
              { dept: 'Cutting', workers: 18, capacity: 100, utilization: 85, overload: 0, status: 'Optimal' },
              { dept: 'Finishing', workers: 28, capacity: 100, utilization: 78, overload: 0, status: 'Under' },
              { dept: 'Quality Control', workers: 12, capacity: 100, utilization: 95, overload: 12, status: 'High' },
              { dept: 'Packing', workers: 22, capacity: 100, utilization: 88, overload: 3, status: 'Optimal' },
              { dept: 'Maintenance', workers: 8, capacity: 100, utilization: 65, overload: 0, status: 'Under' }
            ].map((dept, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h5 className="font-medium">{dept.dept}</h5>
                    <p className="text-sm text-gray-600">{dept.workers} workers</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dept.status === 'High' ? 'bg-red-100 text-red-800' :
                    dept.status === 'Optimal' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {dept.status} Load
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Capacity Utilization</span>
                    <span className="font-semibold">{dept.utilization}%</span>
                  </div>
                  <ProgressBar 
                    progress={dept.utilization} 
                    color={dept.utilization > 90 ? 'red' : dept.utilization > 80 ? 'green' : 'yellow'}
                  />
                  {dept.overload > 0 && (
                    <div className="text-sm text-red-600">
                      <AlertTriangle size={14} className="inline mr-1" />
                      {dept.overload}% overload detected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Workload Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Individual Workload Status</h4>
          <div className="space-y-3">
            {[
              { 
                name: 'ফাতিমা খাতুন', 
                dept: 'Quality Control', 
                workload: 105, 
                efficiency: 96.8, 
                overtime: 8, 
                stress: 'Medium',
                status: 'Overloaded'
              },
              { 
                name: 'আবুল কালাম', 
                dept: 'Sewing', 
                workload: 95, 
                efficiency: 89.5, 
                overtime: 4, 
                stress: 'Low',
                status: 'Optimal'
              },
              { 
                name: 'করিম মিয়া', 
                dept: 'Cutting', 
                workload: 88, 
                efficiency: 85.3, 
                overtime: 2, 
                stress: 'Low',
                status: 'Optimal'
              },
              { 
                name: 'সালমা বেগম', 
                dept: 'Finishing', 
                workload: 72, 
                efficiency: 82.7, 
                overtime: 0, 
                stress: 'Low',
                status: 'Underutilized'
              }
            ].map((worker, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-medium">{worker.name}</h5>
                    <p className="text-sm text-gray-600">{worker.dept}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    worker.status === 'Overloaded' ? 'bg-red-100 text-red-800' :
                    worker.status === 'Optimal' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {worker.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Workload</p>
                    <p className="font-semibold">{worker.workload}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Efficiency</p>
                    <p className="font-semibold">{worker.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Overtime (hrs/week)</p>
                    <p className="font-semibold">{worker.overtime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Stress Level</p>
                    <p className={`font-semibold ${
                      worker.stress === 'High' ? 'text-red-600' :
                      worker.stress === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {worker.stress}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <ProgressBar 
                    progress={worker.workload} 
                    color={worker.workload > 100 ? 'red' : worker.workload > 85 ? 'green' : 'yellow'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload Balancing Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Workload Balancing Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-3 text-red-600">Overloaded Areas</h5>
            <div className="space-y-3">
              {[
                { area: 'Quality Control Department', issue: '12% overload', solution: 'Add 2 temporary inspectors' },
                { area: 'Sewing Line A', issue: '8% overload', solution: 'Redistribute work to Line C' },
                { area: 'ফাতিমা খাতুন', issue: '105% workload', solution: 'Reduce inspection quota by 15%' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="font-medium">{item.area}</p>
                  <p className="text-sm text-gray-600">{item.issue}</p>
                  <p className="text-sm text-blue-600">💡 {item.solution}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-3 text-yellow-600">Underutilized Areas</h5>
            <div className="space-y-3">
              {[
                { area: 'Maintenance Department', issue: '35% underutilized', solution: 'Cross-train for quality control' },
                { area: 'Finishing Department', issue: '22% underutilized', solution: 'Take on additional orders' },
                { area: 'সালমা বেগম', issue: '72% workload', solution: 'Assign additional finishing tasks' }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="font-medium">{item.area}</p>
                  <p className="text-sm text-gray-600">{item.issue}</p>
                  <p className="text-sm text-blue-600">💡 {item.solution}</p>
                </div>
              ))}
            </div>
          </div>
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
          Create Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: 'Daily Efficiency Report', 
            description: 'Daily worker and department efficiency metrics', 
            icon: Calendar, 
            color: 'blue',
            lastGenerated: '2 hours ago',
            frequency: 'Daily'
          },
          { 
            title: 'Weekly Performance Summary', 
            description: 'Comprehensive weekly performance analysis', 
            icon: BarChart, 
            color: 'green',
            lastGenerated: '1 day ago',
            frequency: 'Weekly'
          },
          { 
            title: 'Individual Worker Analysis', 
            description: 'Detailed individual performance breakdown', 
            icon: Users, 
            color: 'purple',
            lastGenerated: '3 hours ago',
            frequency: 'On-demand'
          },
          { 
            title: 'Skill Assessment Report', 
            description: 'Worker skill levels and training needs', 
            icon: Brain, 
            color: 'orange',
            lastGenerated: '1 week ago',
            frequency: 'Monthly'
          },
          { 
            title: 'Productivity Trends', 
            description: 'Long-term productivity trend analysis', 
            icon: TrendingUp, 
            color: 'yellow',
            lastGenerated: '2 days ago',
            frequency: 'Monthly'
          },
          { 
            title: 'Benchmarking Report', 
            description: 'Performance comparison with industry standards', 
            icon: Target, 
            color: 'red',
            lastGenerated: '1 week ago',
            frequency: 'Quarterly'
          },
          { 
            title: 'Training Effectiveness', 
            description: 'Impact analysis of training programs', 
            icon: Award, 
            color: 'indigo',
            lastGenerated: '3 days ago',
            frequency: 'Quarterly'
          },
          { 
            title: 'Workload Distribution', 
            description: 'Department and individual workload analysis', 
            icon: Activity, 
            color: 'pink',
            lastGenerated: '5 hours ago',
            frequency: 'Weekly'
          },
          { 
            title: 'Incentive Impact Analysis', 
            description: 'ROI and effectiveness of incentive programs', 
            icon: Award, 
            color: 'teal',
            lastGenerated: '1 week ago',
            frequency: 'Monthly'
          }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}>
              <report.icon className={`text-${report.color}-600`} size={24} />
            </div>
            <h4 className="font-semibold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{report.description}</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span>{report.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Generated:</span>
                <span>{report.lastGenerated}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
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
                <th className="p-3 font-semibold text-sm">Generated By</th>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Type</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Daily Efficiency - Jan 15', user: 'HR Manager', date: '2025-01-15 14:30', type: 'Daily', status: 'Ready' },
                { name: 'Weekly Performance Summary', user: 'Production Manager', date: '2025-01-14 09:15', type: 'Weekly', status: 'Ready' },
                { name: 'Individual Analysis - Top 10', user: 'Supervisor Ahmed', date: '2025-01-14 16:45', type: 'Custom', status: 'Ready' },
                { name: 'Skill Assessment Q4 2024', user: 'Training Coordinator', date: '2025-01-13 11:20', type: 'Quarterly', status: 'Ready' }
              ].map((report, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{report.name}</td>
                  <td className="p-3 text-sm">{report.user}</td>
                  <td className="p-3 text-sm">{report.date}</td>
                  <td className="p-3 text-sm">{report.type}</td>
                  <td className="p-3">
                    <StatusBadge status={report.status} />
                  </td>
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
        <h3 className="text-xl font-semibold">Improvement Plans & Action Items</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Create Improvement Plan
        </Button>
      </div>

      {/* Active Improvement Plans */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Active Improvement Plans</h4>
        <div className="space-y-4">
          {[
            {
              title: 'Sewing Department Efficiency Enhancement',
              target: 'Increase efficiency from 89.5% to 95%',
              timeline: '3 months',
              progress: 65,
              owner: 'Production Manager',
              status: 'In Progress',
              actions: ['Implement lean manufacturing', 'Upgrade equipment', 'Skills training'],
              priority: 'High'
            },
            {
              title: 'Quality Control Process Optimization',
              target: 'Reduce defect rate from 3.2% to 2%',
              timeline: '2 months',
              progress: 40,
              owner: 'Quality Manager',
              status: 'In Progress',
              actions: ['Six Sigma implementation', 'Inspector training', 'New inspection tools'],
              priority: 'High'
            },
            {
              title: 'Finishing Department Capacity Utilization',
              target: 'Increase utilization from 78% to 90%',
              timeline: '6 weeks',
              progress: 80,
              owner: 'Finishing Supervisor',
              status: 'On Track',
              actions: ['Workflow optimization', 'Cross-training', 'Equipment maintenance'],
              priority: 'Medium'
            }
          ].map((plan, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-lg">{plan.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{plan.target}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plan.priority === 'High' ? 'bg-red-100 text-red-800' :
                    plan.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {plan.priority}
                  </span>
                  <StatusBadge status={plan.status} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="font-medium">{plan.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Owner</p>
                  <p className="font-medium">{plan.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-medium">{plan.progress}%</p>
                </div>
              </div>
              
              <div className="mb-4">
                <ProgressBar 
                  progress={plan.progress} 
                  color={plan.progress >= 80 ? 'green' : plan.progress >= 50 ? 'yellow' : 'red'}
                />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Key Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {plan.actions.map((action, actionIndex) => (
                    <span key={actionIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button size="sm" variant="secondary">
                  <Eye size={14} className="mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="secondary">
                  <Edit size={14} className="mr-1" />
                  Update Progress
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Identified Improvement Opportunities</h4>
          <div className="space-y-3">
            {[
              {
                area: 'Maintenance Department',
                issue: 'Low capacity utilization (65%)',
                potential: 'Cross-train for quality control',
                impact: 'High',
                effort: 'Medium'
              },
              {
                area: 'Time & Motion Study',
                issue: 'Excessive motion waste in sewing',
                potential: 'Optimize workstation layout',
                impact: 'Medium',
                effort: 'Low'
              },
              {
                area: 'Skill Development',
                issue: '23 workers need advanced training',
                potential: 'Structured training program',
                impact: 'High',
                effort: 'High'
              },
              {
                area: 'Incentive Program',
                issue: 'Low participation in skill bonus',
                potential: 'Redesign incentive structure',
                impact: 'Medium',
                effort: 'Low'
              }
            ].map((opportunity, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium">{opportunity.area}</h5>
                  <div className="flex space-x-1">
                    <span className={`px-2 py-1 rounded text-xs ${
                      opportunity.impact === 'High' ? 'bg-green-100 text-green-800' :
                      opportunity.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.impact} Impact
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      opportunity.effort === 'Low' ? 'bg-green-100 text-green-800' :
                      opportunity.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {opportunity.effort} Effort
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{opportunity.issue}</p>
                <p className="text-sm text-blue-600">💡 {opportunity.potential}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Quick Wins & Low-Hanging Fruits</h4>
          <div className="space-y-3">
            {[
              {
                action: 'Optimize workstation layout in sewing',
                impact: 'Reduce motion waste by 15%',
                timeframe: '1 week',
                cost: 'Low',
                difficulty: 'Easy'
              },
              {
                action: 'Implement daily efficiency tracking',
                impact: 'Increase awareness and accountability',
                timeframe: '2 weeks',
                cost: 'Low',
                difficulty: 'Easy'
              },
              {
                action: 'Cross-train maintenance staff',
                impact: 'Increase department utilization by 20%',
                timeframe: '1 month',
                cost: 'Medium',
                difficulty: 'Medium'
              },
              {
                action: 'Redesign skill development incentives',
                impact: 'Increase participation by 40%',
                timeframe: '2 weeks',
                cost: 'Low',
                difficulty: 'Easy'
              }
            ].map((win, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-green-700">{win.action}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    win.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    win.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {win.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{win.impact}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Timeframe:</span>
                    <span className="font-medium ml-1">{win.timeframe}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost:</span>
                    <span className="font-medium ml-1">{win.cost}</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3">
                  <Plus size={14} className="mr-1" />
                  Create Action Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEfficiencySettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Efficiency Analysis Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Targets */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Performance Targets</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overall Efficiency Target (%)</label>
                <input
                  type="number"
                  defaultValue={85}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quality Rate Target (%)</label>
                <input
                  type="number"
                  defaultValue={95}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Productivity Target (%)</label>
                <input
                  type="number"
                  defaultValue={90}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Target (%)</label>
                <input
                  type="number"
                  defaultValue={95}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <h5 className="font-medium text-gray-700 mt-6 mb-3">Department-wise Targets</h5>
            {[
              { dept: 'Sewing', target: 85 },
              { dept: 'Cutting', target: 90 },
              { dept: 'Finishing', target: 85 },
              { dept: 'Quality Control', target: 95 }
            ].map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-sm font-medium">{dept.dept} Target (%)</label>
                <input
                  type="number"
                  defaultValue={dept.target}
                  className="w-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">Save Targets</Button>
        </div>

        {/* Analysis Parameters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Analysis Parameters</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Efficiency Calculation Method</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Standard Time Based</option>
                <option>Target vs Actual</option>
                <option>Weighted Average</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Collection Frequency</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Hourly</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Performance Review Period</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Threshold (%)</label>
                <input
                  type="number"
                  defaultValue={80}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Critical Threshold (%)</label>
                <input
                  type="number"
                  defaultValue={70}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <Button className="w-full mt-4">Save Parameters</Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Notification Settings</h4>
          <div className="space-y-4">
            {[
              { setting: 'Daily efficiency reports', enabled: true },
              { setting: 'Weekly performance summaries', enabled: true },
              { setting: 'Low efficiency alerts', enabled: true },
              { setting: 'Training need notifications', enabled: false },
              { setting: 'Benchmark comparison alerts', enabled: true },
              { setting: 'Improvement plan updates', enabled: true }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-sm font-medium">{setting.setting}</label>
                <input
                  type="checkbox"
                  defaultChecked={setting.enabled}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">Save Notifications</Button>
        </div>

        {/* Report Automation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Report Automation</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Auto-generate Daily Reports</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Report Day</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Monday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Report Date</label>
              <input
                type="number"
                defaultValue={1}
                min="1"
                max="28"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Recipients</label>
              <textarea
                rows={3}
                defaultValue="hr@company.com, production@company.com, manager@company.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email addresses separated by commas"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Automation</Button>
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