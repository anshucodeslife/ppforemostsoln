import React, { useEffect, useState } from 'react';
import {
  Users,
  BarChart3,
  Video,
  GraduationCap,
  HelpCircle,
  Calendar,
  TrendingUp,
  Clock,
  Edit2,
  LogOut,
  Settings,
  MessageCircle,
  Plus,
  X,
  CheckCircle,
  Menu,
  ChevronLeft,
  Bell,
  Search,
  Sparkles,
  Zap,
  Star,
  Activity
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import type { IWebinarRegistration } from '../interfaces/Webinar';
import { WebinarService } from '../services/WebinarService';
import Dialog from '../components/Dialog';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [students, setStudents] = useState<IWebinarRegistration[]>([]);
  const [activeRoute, setActiveRoute] = useState('analytics');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [userName, setUserName] = useState('Super Admin');
  const [userRole, setUserRole] = useState('Administrator');
  const [activeWebinarTab, setActiveWebinarTab] = useState('current');
  const [showEventForm, setShowEventForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number>(0);

  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'AI & Machine Learning Fundamentals',
      photo: 'https://via.placeholder.com/300x200',
      timing: '2025-07-15T18:00',
      description: 'Learn the basics of AI and ML with hands-on examples',
      selected: false
    },
    {
      id: 2,
      name: 'Data Science Career Path',
      photo: 'https://via.placeholder.com/300x200',
      timing: '2025-07-20T19:00',
      description: 'Discover opportunities in data science field',
      selected: true
    }
  ]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    photo: '',
    timing: '',
    description: ''
  });

  const navigationItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-blue-600 to-purple-600' },
    { id: 'registrations', label: 'Webinar Registrations', icon: Users, gradient: 'from-emerald-600 to-teal-600' },
    { id: 'webinar', label: 'Webinar', icon: Video, gradient: 'from-pink-600 to-rose-600' },
    { id: 'training', label: 'Training', icon: GraduationCap, gradient: 'from-orange-600 to-amber-600' },
    { id: 'support', label: 'Support Hub', icon: HelpCircle, gradient: 'from-indigo-600 to-blue-600' },
  ];

  const earningsData = [
    { title: "Today's Earning", amount: 12500, color: 'from-orange-500 to-pink-500', icon: Calendar, change: '+12%' },
    { title: "Last 7 Days Earning", amount: 89000, color: 'from-purple-500 to-indigo-500', icon: TrendingUp, change: '+25%' },
    { title: "Last 30 Days Earning", amount: 345000, color: 'from-cyan-500 to-blue-500', icon: Clock, change: '+18%' },
    { title: "All Time Earning", amount: 1250000, color: 'from-emerald-500 to-teal-500', icon: BarChart3, change: '+45%' },
  ];

  const handleWhatsAppContact = (contactNumber: string) => {
    if (/^\d{10}$/.test(contactNumber)) {
      const whatsappUrl = `https://wa.me/91${contactNumber}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Invalid contact number. Please ensure it is a 10-digit number.');
    }
  };

  const handleMarkAsPaid = (id: number) => {
    setSelectedStudentId(id);
    setPaymentDialogOpen(true);
  }

  const handlePaymentCancel = () => setPaymentDialogOpen(false);
  const handlePaymentConfirm = async () => {
    try {
      setLoading(true);
      await WebinarService.addPayment(selectedStudentId);
      await fetchStudents();
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setPaymentDialogOpen(false);
      setSelectedStudentId(0);
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      //setLoading(true);
      const response = await WebinarService.getWebinarRegistrations();
      setStudents(response);
    } catch (error) {
      console.error('Error fetching webinar registrations:', error);
    }
    finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && userRole.trim()) {
      setShowProfileEdit(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleLogout = async () => {
    await AuthService.logout()
    navigate('/');
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.name.trim() && newEvent.timing && newEvent.description.trim()) {
      const newEventWithId = {
        ...newEvent,
        id: Date.now(),
        selected: false,
        photo: newEvent.photo || 'https://via.placeholder.com/300x200'
      };
      setEvents([...events, newEventWithId]);
      setNewEvent({ name: '', photo: '', timing: '', description: '' });
      setShowEventForm(false);
    } else {
      alert('Please fill in all required fields');
    }
  };


  const toggleEventSelection = (eventId: number) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, selected: !event.selected } : event
    ));
  };

  const renderContent = () => {
    switch (activeRoute) {
      case 'analytics':
        return (
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-8">
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {userName}!</h2>
                      <p className="text-blue-100 mt-1">Ready to achieve your goals today?</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
              {earningsData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}>
                          <IconComponent className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-emerald-600">{item.change}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-gray-800">₹ {item.amount.toLocaleString()}</div>
                        <p className="text-sm text-gray-600">{item.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Recent Performance</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Activity className="h-4 w-4" aria-hidden="true" />
                      <span>Live</span>
                    </div>
                  </div>
                  <Line
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [{
                        label: 'Performance',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        fill: true,
                        tension: 0.4
                      }]
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Recent Performance' }
                      },
                      scales: {
                        y: { beginAtZero: true }
                      }
                    }}
                    aria-label="Performance chart"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                      aria-label="Generate Report"
                    >
                      <Zap className="h-5 w-5 inline mr-2" aria-hidden="true" />
                      Generate Report
                    </button>
                    <button
                      className="w-full p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
                      aria-label="Add New Lead"
                    >
                      <Plus className="h-5 w-5 inline mr-2" aria-hidden="true" />
                      Add New Lead
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                      <span className="text-sm text-gray-600">Top Performer</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                      <span className="text-sm text-gray-600">Monthly Target</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'registrations':
        return (
          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Manage registrations</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search registrations..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Search registrations"
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  aria-label="Add Registration"
                >
                  <Plus className="h-5 w-5 inline mr-2" aria-hidden="true" />
                  Add Registration
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Contact</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Email</th>
                      {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th> */}
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Webinar</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Payment status</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {students.map((student) => (
                      <tr key={student.registrationId} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 text-center py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 text-center py-4 text-sm text-gray-600">{student.phone}</td>
                        <td className="px-6 text-center py-4 text-sm text-gray-600">{student.email}</td>
                        {/* <td className="px-6 py-4 text-sm text-gray-600">{student.date}</td> */}
                        <td className="px-6 text-center py-4 text-sm text-gray-600">{student.webinarName}</td>
                        <td className="px-6 text-center py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.paymentStatus ? 'bg-emerald-100 text-emerald-800' :
                            !student.paymentStatus ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {student.paymentStatus ? 'Done' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 text-center py-4 flex gap-2">
                          <button
                            onClick={() => handleWhatsAppContact(student.phone)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                            aria-label={`Contact ${student.name} via WhatsApp`}
                            title="Contact via WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          </button>

                          {!student.paymentStatus && (<button
                            onClick={() => handleMarkAsPaid(student.registrationId)}
                            className={`w-full py-2 px-1 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'}`}

                            aria-label={'Paid'}
                          >
                            {
                              <span className="flex items-center justify-center space-x-2">
                                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                                <span>Paid</span>
                              </span>
                            }
                          </button>)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Dialog
              isOpen={isPaymentDialogOpen}
              title="Confirm Payment"
              message="Are you sure you want to Mark as paid?"
              onCancel={handlePaymentCancel}
              onConfirm={handlePaymentConfirm}
            />
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        );

      case 'webinar':
        return (
          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Webinar Management</h2>
              {activeWebinarTab === 'schedule' && (
                <button
                  onClick={() => setShowEventForm(true)}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105"
                  aria-label="Schedule New Event"
                >
                  <Plus className="h-5 w-5 inline mr-2" aria-hidden="true" />
                  Schedule Event
                </button>
              )}
            </div>

            <div className="mb-8">
              <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg max-w-md">
                <button
                  onClick={() => setActiveWebinarTab('current')}
                  className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeWebinarTab === 'current'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  aria-label="View Current Events"
                >
                  Current Events
                </button>
                <button
                  onClick={() => setActiveWebinarTab('schedule')}
                  className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeWebinarTab === 'schedule'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  aria-label="View Scheduled Events"
                >
                  Schedule Events
                </button>
              </div>
            </div>

            {activeWebinarTab === 'current' ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center text-gray-500">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="h-12 w-12 text-pink-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Live Events</h3>
                  <p className="text-gray-500">No webinars are currently running.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="h-48 bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center">
                      <img
                        src={event.photo}
                        alt={event.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-800 mb-3 text-lg">{event.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>{new Date(event.timing).toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => toggleEventSelection(event.id)}
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${event.selected
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                          }`}
                        aria-label={event.selected ? `Deselect ${event.name}` : `Select ${event.name}`}
                      >
                        {event.selected ? (
                          <span className="flex items-center justify-center space-x-2">
                            <CheckCircle className="h-5 w-5" aria-hidden="true" />
                            <span>Selected</span>
                          </span>
                        ) : (
                          'Select Event'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showEventForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Schedule New Event</h3>
                    <button
                      onClick={() => setShowEventForm(false)}
                      className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close event form"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="event-name">Event Name</label>
                      <input
                        id="event-name"
                        type="text"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Enter event name"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="event-photo">Photo URL</label>
                      <input
                        id="event-photo"
                        type="url"
                        value={newEvent.photo}
                        onChange={(e) => setNewEvent({ ...newEvent, photo: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Enter image URL (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="event-timing">Date & Time</label>
                      <input
                        id="event-timing"
                        type="datetime-local"
                        value={newEvent.timing}
                        onChange={(e) => setNewEvent({ ...newEvent, timing: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="event-description">Description</label>
                      <textarea
                        id="event-description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Event description..."
                        required
                        aria-required="true"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowEventForm(false)}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="Cancel event creation"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-200 transform hover:scale-105"
                        aria-label="Schedule Event"
                      >
                        Schedule Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'training':
        return (
          <div className="p-4 md:p-6 lg:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Training Center</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center text-gray-500">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-12 w-12 text-orange-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Training Materials Coming Soon</h3>
                <p className="text-gray-500">We're preparing comprehensive training materials for you.</p>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="p-4 md:p-6 lg:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Support Hub</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center text-gray-500">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="h-12 w-12 text-indigo-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Need Help?</h3>
                <p className="text-gray-500 mb-6">Our support team is here to assist you with any questions.</p>
                <button
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  aria-label="Contact Support"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-6">Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white/90 shadow-2xl border-r border-gray-200/50 relative z-10`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center space-x-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-white">
                <img src="src/assets/P&PLogo.png" alt="P&P Foremost Solution Logo" className="object-contain w-full h-full" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  P&P Foremost Solution
                </span>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <Menu className="h-5 w-5 text-gray-600" aria-hidden="true" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-600" aria-hidden="true" />
              )}
            </button>
          </div>

          <nav className="space-y-2" aria-label="Main navigation">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRoute(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${activeRoute === item.id
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 ${sidebarCollapsed ? 'justify-center' : ''
                }`}
              aria-label="Open user menu"
              aria-expanded={showUserMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-800">{userName}</div>
                  <div className="text-xs text-gray-500">{userRole}</div>
                </div>
              )}
            </button>

            {showUserMenu && (
              <div className={`absolute bottom-full mb-2 ${sidebarCollapsed ? 'left-20' : 'left-0'} w-48 bg-white rounded-xl shadow-xl border border-gray-200/50 p-2`} role="menu">
                <button
                  onClick={() => setShowProfileEdit(true)}
                  className="w-full flex items-center space-x-2 p-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  role="menuitem"
                  aria-label="Edit Profile"
                >
                  <Edit2 className="h-4 w-4" aria-hidden="true" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  role="menuitem"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <div className="bg-white/90 shadow-lg border-b border-gray-200/50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Notifications">
              <Bell className="h-5 w-5 text-gray-600" aria-hidden="true" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                aria-label="Search dashboard"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Settings">
              <Settings className="h-5 w-5 text-gray-600" aria-hidden="true" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2"
                aria-label="Open user menu"
                aria-expanded={showUserMenu}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-gray-800 hidden md:block">{userName}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto" role="main">
          {renderContent()}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 id="edit-profile-title" className="text-xl font-bold text-gray-800">Edit Profile</h3>
              <button
                onClick={() => setShowProfileEdit(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close profile edit"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="profile-name">Name</label>
                <input
                  id="profile-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="profile-role">Role</label>
                <input
                  id="profile-role"
                  type="text"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your role"
                  required
                  aria-required="true"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProfileEdit(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="Cancel profile edit"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  aria-label="Save profile changes"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;