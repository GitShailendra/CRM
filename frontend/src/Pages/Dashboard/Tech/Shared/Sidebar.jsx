import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    BarChart2,
    Calendar,
    ShoppingBag,
    Settings,
    ChevronLeft,
    HelpCircle,
    LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../Assets/logo.png";
function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    const menuItems = [
        { id: "dashboard", icon: Home, label: "Dashboard", path: "/tech" },
        { id: "proposal", icon: BarChart2, label: "Proposals", path: "/tech/proposal" },
        { id: "resources", icon: ShoppingBag, label: "Resources", path: "/tech/Resources" },
        { id: "curriculum", icon: Calendar, label: "Curriculum", path: "/tech/curriculum" },
        { id: "team", icon: Calendar, label: "Team Management", path: "/tech/team" },


    ];

    const bottomMenuItems = [
        { id: "settings", icon: Settings, label: "Settings", path: "/tech/settings" },
        { id: 'help', icon: HelpCircle, label: 'Help', path: "/tech/help" },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];

    // Update activeTab based on current route
    useEffect(() => {
        const currentTab = menuItems.concat(bottomMenuItems).find((item) => item.path === location.pathname);
        if (currentTab) {
            setActiveTab(currentTab.id);
        }
    }, [location.pathname, setActiveTab]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const sidebarVariants = {
        expanded: { width: 256, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
        collapsed: { width: 80, transition: { duration: 0.3, type: "spring", stiffness: 100 } }
    };

    const textVariants = {
        visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.2 } },
        hidden: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    };

    return (
        <motion.aside
            className="fixed left-0 top-0 h-screen bg-background-sidebar border-r border-border-dark z-20 overflow-hidden"
            initial="expanded"
            animate={collapsed ? "collapsed" : "expanded"}
            variants={sidebarVariants}
        >
            <div className="p-6 flex items-center justify-between">
                <AnimatePresence>
                      <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
                    {!collapsed && (
                         <motion.h1 className="text-xl font-bold text-text"  style={{ fontFamily: "'MotoyaLMaru'" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                         Flariex
                     </motion.h1>
                    )}
                </AnimatePresence>
                <motion.button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-background-hover transition-colors text-text-muted hover:text-text"
                >
                    <ChevronLeft size={20} />
                </motion.button>
            </div>

            <nav className="mt-6">
                <ul className={`space-y-2 ${collapsed ? "px-2" : "px-4"}`}>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path ? "bg-primary text-text" : "text-text-muted hover:bg-background-hover"
                                }`}
                                title={collapsed ? item.label : ""}
                            >
                                <item.icon className="h-5 w-5" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span initial="hidden" animate="visible" exit="hidden" variants={textVariants} className="ml-3">
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={`absolute bottom-8 w-full ${collapsed ? "px-2" : "px-4"}`}>
                <ul className="space-y-2">
                    {bottomMenuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`flex items-center w-full ${collapsed ? "justify-center" : ""} px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path ? "bg-primary text-text" : "text-text-muted hover:bg-background-hover"
                                }`}
                                title={collapsed ? item.label : ""}
                            >
                                <item.icon className="h-5 w-5" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span initial="hidden" animate="visible" exit="hidden" variants={textVariants} className="ml-3">
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.aside>
    );
}

export default Sidebar;
