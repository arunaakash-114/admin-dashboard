import { DecimalPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, NgFor, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {

  dashboardData = {
    totalUsers: 12450,
    activeUsers: 9820,
    newRegistrations: 328,
    totalStories: 3240,
    totalVideos: 1850,
    totalMusic: 2130,
    totalImages: 8420,
    totalMessages: 5620,
    supportTickets: 86,
    pendingReports: 24
  };

  recentUsers = [
    {
      name: 'Arun Kumar',
      email: 'arun@example.com',
      date: '21 Sep 2026',
      status: 'Active'
    },
    {
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      date: '21 Sep 2026',
      status: 'Active'
    },
    {
      name: 'Priya S',
      email: 'priya@example.com',
      date: '20 Sep 2026',
      status: 'Pending'
    },
    {
      name: 'Karthik M',
      email: 'karthik@example.com',
      date: '20 Sep 2026',
      status: 'Active'
    },
    {
      name: 'Divya R',
      email: 'divya@example.com',
      date: '19 Sep 2026',
      status: 'Blocked'
    }
  ];

  contentStats = [
    {
      title: 'Stories',
      value: this.dashboardData.totalStories,
      icon: 'bi-camera-reels',
      percentage: '+12.5%',
      type: 'success'
    },
    {
      title: 'Videos',
      value: this.dashboardData.totalVideos,
      icon: 'bi-play-btn',
      percentage: '+8.4%',
      type: 'success'
    },
    {
      title: 'Music',
      value: this.dashboardData.totalMusic,
      icon: 'bi-music-note-beamed',
      percentage: '+15.2%',
      type: 'success'
    },
    {
      title: 'Images',
      value: this.dashboardData.totalImages,
      icon: 'bi-images',
      percentage: '+10.8%',
      type: 'success'
    }
  ];

  activityData = [
    {
      title: 'New User Registration',
      description: '328 new users registered',
      time: 'Today',
      icon: 'bi-person-plus'
    },
    {
      title: 'New Stories',
      description: '145 stories uploaded',
      time: 'Today',
      icon: 'bi-camera-reels'
    },
    {
      title: 'Video Uploads',
      description: '82 new videos uploaded',
      time: 'Today',
      icon: 'bi-play-circle'
    },
    {
      title: 'Support Tickets',
      description: '12 new support requests',
      time: 'Today',
      icon: 'bi-headset'
    }
  ];

}