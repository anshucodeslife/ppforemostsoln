
import bg1 from '../assets/images/bg1.jpg';
import bg2 from '../assets/images/bg2.jpg';
import bg3 from '../assets/images/bg3.jpg';
import bg4 from '../assets/images/bg4.jpg';
import bg5 from '../assets/images/bg5.jpg';
import webdev from '../assets/images/web-dev.jpeg';
import api from '../assets/images/api.jpg';
import automation from '../assets/images/automation.jpg';
import { motion } from 'framer-motion';
import interceptor from '../interceptor';
import { Link } from 'react-router-dom';
import logo from '../assets/images/P&PLogo.png';
import type { IBluePrintDto } from '../interfaces/BluePrint';
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';




const Home = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const statsChartRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [floatingElements, setFloatingElements] = useState<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }>>([]);
    // Initialize floating elements
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload: IBluePrintDto = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        };

        try {
            const response = await interceptor.post('/blueprint', payload);
            if (response.status !== 200) throw new Error('API request failed');
            alert('Thank you! We will contact you shortly.');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setFormData({ name: '', email: '', phone: '' });
            setLoading(false);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        const elements = [];
        for (let i = 0; i < 15; i++) {
            elements.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 30 + 10,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        setFloatingElements(elements);
        const animateElements = () => {
            setFloatingElements(prevElements =>
                prevElements.map(el => {
                    // Update position
                    let newX = el.x + el.vx;
                    let newY = el.y + el.vy;
                    // Boundary check
                    if (newX < 0 || newX > window.innerWidth) el.vx *= -1;
                    if (newY < 0 || newY > window.innerHeight) el.vy *= -1;
                    // Cursor attraction
                    const dx = cursorRef.current.x - newX;
                    const dy = cursorRef.current.y - newY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200) {
                        newX += dx * 0.01;
                        newY += dy * 0.01;
                    }
                    return {
                        ...el,
                        x: newX,
                        y: newY
                    };
                })
            );
            requestAnimationFrame(animateElements);
        };
        const animationId = requestAnimationFrame(animateElements);
        return () => cancelAnimationFrame(animationId);
    }, []);

    //Testimonial one-by-one staggered animation
    // const testimonialContainer = {
    //     hidden: {},
    //     visible: {
    //         transition: {
    //             staggerChildren: 0.3,
    //         },
    //     },
    // };

    // const testimonialItem = {
    //     hidden: { opacity: 0, y: 20 },
    //     visible: { opacity: 1, y: 0 },
    // };

    // Track cursor position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const RobotIcon = () => (
        <svg
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z" />
        </svg>
    );

    // Initialize stats chart
    useEffect(() => {
        if (statsChartRef.current) {
            const chart = echarts.init(statsChartRef.current);
            const option = {
                animation: false,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['Web Dev', 'APIs', 'Automation', 'AI Integration', 'UI/UX'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.2)'
                            }
                        },
                        axisLabel: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.2)'
                            }
                        },
                        axisLabel: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: 'Projects Completed',
                        type: 'bar',
                        barWidth: '60%',
                        data: [124, 98, 87, 56, 112],
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#ff00cc' },
                                { offset: 1, color: '#3333ff' }
                            ])
                        }
                    }
                ]
            };
            chart.setOption(option);
            const handleResize = () => {
                chart.resize();
            };
            window.addEventListener('resize', handleResize);
            return () => {
                chart.dispose();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    // Counter animation for stats
    type CounterProps = {
        end: number;
        duration?: number;
        prefix?: string;
        suffix?: string;
        start?: number;
    };

    const Counter = ({
        end,
        duration = 2000,
        prefix = "",
        suffix = "",
        start = 0,
    }: CounterProps) => {
        // ✅ Now the type is being used
        const [count, setCount] = useState(start);
        const startTimeRef = useRef<number | null>(null);

        useEffect(() => {
            const animate = (timestamp: number) => {
                if (!startTimeRef.current) startTimeRef.current = timestamp;
                const progress = timestamp - startTimeRef.current;
                const percentage = Math.min(progress / duration, 1);
                const current = Math.floor(start + percentage * (end - start));
                setCount(current);
                if (percentage < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
            return () => {
                startTimeRef.current = null;
            };
        }, [end, duration, start]);

        return <span>{prefix}{count}{suffix}</span>;
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {floatingElements.map((el, index) => (
                    <div
                        key={index}
                        className="absolute rounded-full"
                        style={{
                            left: `${el.x}px`,
                            top: `${el.y}px`,
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            background: `radial-gradient(circle, rgba(255,0,204,${el.opacity}) 0%, rgba(51,51,255,${el.opacity}) 100%)`,
                            transform: 'translate(-50%, -50%)',
                            filter: 'blur(8px)',
                        }}
                    />
                ))}
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-[100] backdrop-blur-md bg-black bg-opacity-20 border-b border-white border-opacity-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center space-x-2">
                                {/* Small Logo */}
                                <img src={logo} alt="Logo" className="h-10 w-auto" />

                                {/* Company Name */}
                                <span className="text-xl font-bold text-white">
                                    P&amp;P Foremost Solution
                                </span>
                            </div>



                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {[
                                        "Home",
                                        "Services",
                                        // "Projects",
                                        "About",
                                        "Contact",
                                    ].map((item) => (
                                        <a
                                            key={item}
                                            href={`#${item.toLowerCase()}`}
                                            className="px-3 py-2 rounded-md text-sm font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-300 cursor-pointer whitespace-nowrap"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                {isMenuOpen ? (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap mx-2">
                                Get Started
                            </button>
                        </div>

                    </div>
                </div>
            </nav>


            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className="fixed top-16 left-0 w-full bg-black bg-opacity-90 backdrop-blur-md transform transition-transform duration-300 ease-in-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6">
                            {["Home", "Services", "About", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}

                            {/* 🔽 Resource Dropdown for Mobile */}
                            <div className="border-t border-white border-opacity-10 pt-2">
                                <details className="group">
                                    <summary className="px-3 py-2 rounded-md text-base font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 cursor-pointer list-none flex justify-between items-center">
                                        <span>Resource</span>
                                        <svg
                                            className="w-4 h-4 ml-2 transition-transform duration-200 group-open:rotate-180"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="mt-2 pl-3">
                                        <Link
                                            to="/live-webinar"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Live Webinar
                                        </Link>
                                        <Link
                                            to="/courses"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Courses
                                        </Link>
                                    </div>
                                </details>
                            </div>

                            <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Hero Section */}
            <motion.section
                className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white text-black"
                id="home"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            // transition={{ duration: 0.6 }}
            // variants={fadeInUp}
            >
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Sliding Image Background */}
                    <div className="absolute w-[500%] h-full flex animate-slide">
                        <img src={bg1} className="w-[20%] object-cover h-full" alt="bg1" />
                        <img src={bg2} className="w-[20%] object-cover h-full" alt="bg2" />
                        <img src={bg3} className="w-[20%] object-cover h-full" alt="bg3" />
                        <img src={bg4} className="w-[20%] object-cover h-full" alt="bg4" />
                        <img src={bg5} className="w-[20%] object-cover h-full" alt="bg5" />
                    </div>

                    {/* Overlay (dark blur with grid effect) */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm 
        [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.015)_1px,transparent_1px),repeating-linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] 
        [background-size:20px_20px]">
                    </div>
                </div>



                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 animate-pulse">We Build To Thrive</span>
                                <span className="block mt-2 text-white">25 Years In The Future</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                You dream it. We build it. Let's make the future happen — together at P&P Foremost Solution.
                            </p>
                            <div className="flex flex-col gap-6">
                                {/* Button */}
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => {
                                            setShowForm(true);
                                            setTimeout(() => {
                                                const element = document.getElementById('schedule-call');
                                                element?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }}
                                        className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 text-lg cursor-pointer !rounded-button whitespace-nowrap group relative overflow-hidden"
                                    >
                                        <span className="relative z-10">Schedule Free Call</span>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </button>
                                </div>

                                {/* Conditional Form */}
                                {showForm && (
                                    <div id="schedule-call" className="mt-8 p-6 backdrop-blur-lg bg-black bg-opacity-30 rounded-2xl border border-white border-opacity-20">
                                        <h3 className="text-xl font-bold mb-4 text-white">Schedule a Free Call & Get Our Blueprint</h3>

                                        {loading && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 mb-4 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            />
                                            <button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                                            >
                                                Get Free Blueprint
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="hidden md:block relative">
                            {/* This div is intentionally left empty as the hero background image covers this area */}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Services Showcase */}
            <motion.section
                className="py-20 bg-gradient-to-br from-white to-gray-100 text-black"
                id="services"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            // transition={{ duration: 0.6 }}
            // variants={fadeLeft}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Cutting-edge digital solutions powered by the latest technologies
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Web Development',
                                description: 'Modern, responsive websites with cutting-edge technologies and immersive user experiences.',
                                icon: 'fa-code',
                                image: webdev
                            },
                            {
                                title: 'API Integration',
                                description: 'Seamless integration of third-party APIs and development of custom API solutions.',
                                icon: 'fa-plug',
                                image: api
                            },
                            {
                                title: 'Automation',
                                description: 'Streamline your workflows with intelligent automation solutions that save time and resources.',
                                icon: 'fa-robot',
                                image: automation
                            },
                            {
                                title: 'AI Integration',
                                description: 'Leverage the power of artificial intelligence to enhance your products and services.',
                                icon: 'fa-brain',
                                image: 'https://readdy.ai/api/search-image?query=artificial%20intelligence%20visualization%20with%20neural%20network%2C%20digital%20brain%20concept%20with%20glowing%20connections%2C%20futuristic%20AI%20technology%2C%20purple%20and%20blue%20color%20scheme%2C%20dark%20tech%20background%2C%20professional%203D%20rendering%20with%20depth%20of%20field&width=600&height=400&seq=ai-1&orientation=landscape'
                            }
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="h-48 overflow-hidden">

                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-60 object-cover rounded-lg object-top transition-transform duration-700 group-hover:scale-110"
                                    />

                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-3">
                                            <i className={`fas ${service.icon}`}></i>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                                        Learn more <i className="fas fa-arrow-right ml-2"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
            {/* About Us Section */}
            <motion.section
                className="py-20 relative overflow-hidden bg-white text-black"
                id="about"
                initial="hidden"
                whileInView="visible"
            // viewport={{ once: true, amount: 0.3 }}
            // transition={{ duration: 0.6 }}
            // variants={fadeRight}
            >
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c]">
                        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm 
              [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.015)_1px,transparent_1px),repeating-linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] 
              [background-size:20px_20px]">
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">Our Journey</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            From startup to industry leader: Our story of innovation and success
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
                            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                                Transforming Ideas into Reality
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Founded in 2020, P&P Foremost Solution began with a vision to revolutionize digital experiences. Our journey started with a small team of passionate innovators who believed in pushing the boundaries of what's possible in web development and digital solutions.
                            </p>
                            <p className="text-gray-300 mb-6">
                                Today, we've grown into a team of 32 experts, serving clients globally and delivering cutting-edge solutions that drive real business results. Our commitment to innovation and excellence has earned us recognition as a leader in the digital transformation space.
                            </p>
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-pink-500 mb-2">
                                        <Counter end={200} start={80} suffix="+" />
                                    </div>
                                    <p className="text-sm text-gray-400">Projects Completed</p>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-500 mb-2">
                                        <Counter end={80} start={50} suffix="+" />
                                    </div>
                                    <p className="text-sm text-gray-400">Global Clients</p>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-500 mb-2">
                                        <Counter end={15} start={10} suffix="+" />
                                    </div>
                                    <p className="text-sm text-gray-400">Industry Awards</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl opacity-30 blur-lg"></div>
                            <div className="relative backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
                                <h3 className="text-2xl font-bold mb-6 text-gray-100">Success Story: TechVision Transformation</h3>
                                <div className="mb-6">
                                    <img
                                        src="https://www.sthapatigroup.com/wp-content/uploads/2020/08/DSC_0062-scaled-e1598250429198.jpg"
                                        alt="Success Story"
                                        className="w-full h-48 object-cover rounded-lg mb-6"
                                    />
                                    <p className="text-gray-300 mb-4">
                                        One of our earliest clients, a small business owner struggling to manage a growing workload, approached us to build a website and automate their daily reports. Within 2 weeks, we built a dynamic platform that not only handled their sales tracking but also saved them 5+ hours a day through smart automation. Today, they've scaled their business 3x — and we're still just one message away for anything they need.That's P&P Foremost Solution. Always there. Always evolving. Always delivering.
                                    </p>
                                    {/* <p className="text-gray-300 mb-4">
                    Our solution combined cutting-edge web development with AI integration, resulting in:
                  </p>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-pink-500 mr-2"></i>
                      300% increase in user engagement
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-pink-500 mr-2"></i>
                      50% reduction in operational costs
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-pink-500 mr-2"></i>
                      95% improvement in system performance
                    </li>
                  </ul> */}
                                    <div className="flex justify-end">
                                        <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                                            Read Full Case Study
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 text-gray-100 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Our Mission',
                                description: 'To empower businesses with innovative digital solutions that drive growth and success in the modern digital landscape.',
                                icon: 'fa-rocket'
                            },
                            {
                                title: 'Our Vision',
                                description: 'To be the global leader in creating transformative digital experiences that shape the future of technology.',
                                icon: 'fa-eye'
                            },
                            {
                                title: 'Our Values',
                                description: 'Innovation, excellence, collaboration, and unwavering commitment to delivering value to our clients.',
                                icon: 'fa-heart'
                            }
                        ].map((item, index) => (
                            <div key={index} className="backdrop-blur-lg bg-black bg-opacity-20 p-6 rounded-2xl border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mb-4">
                                    <i className={`fas ${item.icon} text-xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
            { }


            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-20 relative overflow-hidden bg-white text-black"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Client Testimonials</h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Hear what our clients have to say about their experience working with us
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8">
                        {[
                            {
                                name: 'Ravi Mehta',
                                position: 'Founder, MehtaTech Solutions',
                                image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20male%20CTO%20with%20modern%20business%20attire%2C%20neutral%20expression%2C%20studio%20lighting%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20professional%20photography%2C%20realistic&width=200&height=200&seq=testimonial-2&orientation=squarish',
                                quote: 'Working with P&P Foremost Solution has been a game-changer. Their team understood our vision from day one and built a scalable product that exceeded expectations. Their turnaround time and support are top-notch. We consider them an extension of our core team now.',
                            },
                            {
                                name: 'Ananya Desai',
                                position: 'Marketing Head, Skynest Naturals',
                                image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20female%20CEO%20with%20modern%20business%20attire%2C%20neutral%20expression%2C%20studio%20lighting%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20professional%20photography%2C%20realistic&width=200&height=200&seq=testimonial-1&orientation=squarish',
                                quote: "P&P Foremost Solution didn’t just deliver a website—they brought our brand to life online. Their design sense is intuitive, and the user experience they crafted has directly boosted our online sales. Highly recommended for any brand that wants to stand out digitally.",
                            },
                            {
                                name: 'Vikram Sharma',
                                position: 'COO, EduCraft Learning',
                                image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?fit=crop&w=200&h=200',
                                quote: 'We needed a custom LMS built in record time, and P&P Foremost Solution delivered. Their technical skills, proactive updates, and post-launch support were stellar. Thanks to them, our platform now serves 10,000+ students seamlessly.',
                            },
                            {
                                name: 'Emily Thompson',
                                position: 'Director of Operations, MapleWell Co.',
                                image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20female%20marketing%20director%20with%20modern%20business%20attire%2C%20neutral%20expression%2C%20studio%20lighting%2C%20clean%20background%2C%20high%20quality%20portrait%2C%20professional%20photography%2C%20realistic&width=200&height=200&seq=testimonial-3&orientation=squarish',
                                quote: 'Finding a reliable offshore tech partner isn’t easy—but P&P Foremost Solution nailed it. Their professionalism, clear communication, and quality of code were exceptional. We’ve worked with other agencies before, but P&P Foremost Solution stands out for their integrity and commitment.',
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-8 md:p-10 rounded-2xl border border-gray-300 shadow-sm"
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-400">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-500 mb-4">
                                            <i className="fas fa-quote-left text-3xl opacity-50"></i>
                                        </div>
                                        <p className="text-lg mb-6 italic text-gray-800">"{testimonial.quote}"</p>
                                        <div>
                                            <h4 className="text-xl font-bold text-black">{testimonial.name}</h4>
                                            <p className="text-gray-600">{testimonial.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Contact Form */}
            <motion.section
                id="contact"
                className="py-20 relative overflow-hidden bg-white text-black"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-[#121212] to-[#1f1f1f]">
                        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm 
        [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.015)_1px,transparent_1px),
        repeating-linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] 
        [background-size:20px_20px]">
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">Get In Touch</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Ready to start your next project? Contact us today for a free consultation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-100">Send Us a Message</h3>
                            <form>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="backdrop-blur-lg bg-black bg-opacity-20 p-8 rounded-2xl border border-white border-opacity-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-100">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-4">
                                        <i className="fas fa-map-marker-alt text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1 text-gray-100">Our Locations</h4>
                                        <p className="text-gray-300">Mumbai</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-4">
                                        <i className="fas fa-phone-alt text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1 text-gray-100">Phone Numbers</h4>
                                        <ul className="text-gray-300">
                                            <li>
                                                India: <a href="tel:+918888855555" className="hover:underline">+91 888-885-5555</a>
                                            </li>
                                            <li>
                                                <a href="tel:+918888452122" className="hover:underline">+91 888-845-2122</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-4">
                                        <i className="fas fa-envelope text-white"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1 text-gray-100">Email Address</h4>
                                        <p className="text-gray-300">team@Pforemostsolution.in</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="mt-8">
                                <h4 className="text-lg font-medium mb-4 text-gray-100">Follow Us</h4>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: 'fa-facebook-f', url: 'https://facebook.com/P&P.in' },
                                        { icon: 'fa-twitter', url: 'https://twitter.com/P&Pin' },
                                        { icon: 'fa-instagram', url: 'https://www.instagram.com/p&p.in_?igsh=ZTZ1cXBxOXRydms2&utm_source=qr' },
                                        { icon: 'fa-linkedin-in', url: 'https://linkedin.com/company/P&PForemostSolution-in' },
                                        { icon: 'fa-github', url: 'https://github.com/P&PForemostSolution-in' }
                                    ].map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-black bg-opacity-50 border border-white border-opacity-20 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 transition-all duration-300"
                                        >
                                            <i className={`fab ${item.icon} text-white`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>


            {/* Footer */}
            <footer className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                        {/* Brand & Social */}
                        <div>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-4">
                                P&P Foremost Solution
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Creating ultra-modern digital experiences with cutting-edge technology and immersive design.
                            </p>
                            <div className="flex space-x-4">
                                {['fa-facebook-f', 'fa-twitter', 'fa-instagram', 'fa-linkedin-in'].map((icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                                    >
                                        <i className={`fab ${icon} text-sm`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-lg font-bold text-black mb-4">Services</h4>
                            <ul className="space-y-2">
                                {['Web Development', 'API Integration', 'Automation', 'AI Integration'].map((item, index) => (
                                    <li key={index}>
                                        <span className="text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ✅ Company Section with React Router Links */}
                        <div>
                            <h4 className="text-lg font-bold text-black mb-4">Company</h4>
                            <ul className="space-y-2">
                                {[
                                    { name: 'About Us', path: '#' },
                                    { name: 'Our Team', path: '#' },
                                    { name: 'Careers', path: '#' },
                                    { name: 'Blog', path: '#' },
                                    { name: 'Contact Us', path: '#' },
                                    { name: 'Privacy Policy', path: '#' },
                                ].map((item, index) => (
                                    <li key={index}>
                                        {item.path !== '#' ? (
                                            <Link
                                                to={item.path}
                                                className="text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer"
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer">
                                                {item.name}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-lg font-bold text-black mb-4">Newsletter</h4>
                            <p className="text-gray-600 mb-4">
                                Subscribe to our newsletter to receive updates on our latest projects and technologies.
                            </p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-l-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-r-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Bottom Credits */}
                    <div className="pt-8 border-t border-gray-200 text-center">
                        <p className="text-gray-600">
                            &copy; {new Date().getFullYear()} P&P Foremost Solution. All rights reserved.
                        </p>
                        <div className="flex justify-center space-x-4 mt-4">
                            {['fa-cc-visa', 'fa-cc-mastercard', 'fa-cc-paypal', 'fa-cc-apple-pay'].map((icon, index) => (
                                <i key={index} className={`fab ${icon} text-2xl text-gray-500`}></i>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>


            {/* AI Chat Bot */}

            <div className="fixed bottom-6 right-6 z-50" style={{ pointerEvents: 'auto' }}>
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                    {isChatOpen ? (
                        <svg
                            fill="currentColor"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="text-white"
                        >
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <RobotIcon />
                    )}
                </button>

                {isChatOpen && (
                    <div className="absolute bottom-20 right-0 w-80 backdrop-blur-lg bg-black bg-opacity-80 rounded-2xl border border-white border-opacity-20 shadow-2xl overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-pink-500 to-blue-500">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                                    <RobotIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">P&P Foremost Solution Assistant</h3>
                                    <p className="text-sm text-white text-opacity-80">AI Powered Support</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-80 p-4 overflow-y-auto">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
                                        <RobotIcon />
                                    </div>
                                    <div className="bg-white bg-opacity-10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                                        <p className="text-sm text-white">Hello! Welcome to P&P Foremost Solution. How can I assist you today?</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-white border-opacity-10">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-grow px-4 py-2 bg-black bg-opacity-50 border border-white border-opacity-20 rounded-l-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                                />
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-r-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
                                >
                                    <svg
                                        fill="currentColor"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        className="text-white"
                                    >
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>);
};

export default Home;
