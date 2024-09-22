"use client"; // Marks this component as a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Header() {
    // Initialize darkMode based on localStorage, or default to false
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("darkMode");
            return savedTheme === "true"; // Return true if savedTheme is "true"
        }
        return false;
    });

    const [isLoading, setIsLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false); // State to control the menu visibility

    useEffect(() => {
        // Apply or remove the "dark" class based on the darkMode state
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Save the theme mode to localStorage
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    // Simulate loading delay for navigation skeleton
    useEffect(() => {
        const fetchData = async () => {
            const startTime = new Date().getTime();
            await new Promise((resolve) => setTimeout(resolve, 700));

            const endTime = new Date().getTime();
            const dynamicDelay =
                endTime - startTime > 500 ? endTime - startTime : 500;
            setTimeout(() => setIsLoading(false), dynamicDelay);
        };

        fetchData();
        return () => clearTimeout();
    }, []);

    // Toggle the hamburger menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Toggle light/dark mode
    const toggleTheme = () => {
        setDarkMode(!darkMode); // Toggle dark mode state
    };

    return (
        <div className="p-4 flex justify-between items-center relative bg-background text-foreground">
            {/* Placeholder on the left to keep hamburger aligned on the right */}
            <div className="flex-1 lg:hidden"></div>

            {/* Navigation menu */}
            <NavigationMenu>
                <NavigationMenuList
                    className={`${menuOpen
                        ? "fixed inset-0 bg-black text-white flex flex-col justify-center items-center z-40 h-full w-full"
                        : "hidden"
                        } lg:flex lg:justify-center lg:items-center space-x-6`} /* Full screen for mobile, centered for desktop */
                >
                    {isLoading ? (
                        <>
                            <Skeleton className="h-8 w-[150px] mb-4 bg-gray-300" />
                            <Skeleton className="h-8 w-[150px] mb-4 bg-gray-300" />
                        </>
                    ) : (
                        <>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} flex items-center space-x-2 text-xl font-sans`}
                                    >
                                        <span className="text-lg">Homepage</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link href="/pages/about" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} flex items-center space-x-2 text-xl font-sans`}
                                    >
                                        <span className="text-lg">About</span>
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </>
                    )}
                </NavigationMenuList>

                {/* Other NavigationMenu-related components if needed */}
                <NavigationMenuIndicator />
                <NavigationMenuViewport />
            </NavigationMenu>

            {/* Right side: Hamburger and Theme toggle */}
            <div className="flex items-center space-x-4">
                {/* Light/Dark Mode Toggle with skeleton */}
                {isLoading ? (
                    <Skeleton className="w-8 h-8 rounded-full bg-gray-300" />
                ) : (
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="text-xl p-2"
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
                    </button>
                )}

                {/* Hamburger Icon for Mobile (on the right) */}
                <button
                    className="lg:hidden block text-xl p-2 z-50 flex-shrink-0"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Dark background overlay when the menu is open (only in mobile) */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black opacity-75 lg:hidden z-30"></div>
            )}
        </div>
    );
}
