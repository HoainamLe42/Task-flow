import {
    Activity,
    CalendarRange,
    ChartPie,
    FolderOpenDot,
    SquareChartGantt,
} from 'lucide-react';
import { SidebarItem } from '../types/sidebarItem';

export const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', path: '/', icon: SquareChartGantt },
    {
        id: 'calendar',
        label: 'Calendar',
        path: '/calendar',
        icon: CalendarRange,
    },
    {
        id: 'analytics',
        label: 'Analytics',
        path: '/analytics',
        icon: ChartPie,
    },
    { id: 'activity', label: 'Activity', path: '/activity', icon: Activity },
    {
        id: 'projects',
        label: 'Projects',
        path: '/projects',
        icon: FolderOpenDot,
    },
];
