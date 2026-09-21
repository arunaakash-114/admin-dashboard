import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  access: 'Full Access' | 'Limited Access' | 'No Access';
  stories: number;
  videos: number;
  messages: number;
  avatar: string;
}

@Component({
  selector: 'app-users',
  imports: [DecimalPipe, FormsModule, NgFor, NgIf, SidebarComponent],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent {

  searchText = '';
  selectedStatus = 'All';
  selectedAccess = 'All';

  currentPage = 1;
  pageSize = 8;

  showUserModal = false;
  showAccessModal = false;

  selectedUser: User | null = null;

  users: User[] = [
    {
      id: 1001,
      name: 'Arun Kumar',
      email: 'arun@example.com',
      phone: '+91 98765 43210',
      registeredDate: '21 Sep 2026',
      lastActive: '2 mins ago',
      status: 'Active',
      access: 'Full Access',
      stories: 24,
      videos: 12,
      messages: 86,
      avatar: 'AK'
    },
    {
      id: 1002,
      name: 'Priya S',
      email: 'priya@example.com',
      phone: '+91 98765 12345',
      registeredDate: '20 Sep 2026',
      lastActive: '10 mins ago',
      status: 'Active',
      access: 'Full Access',
      stories: 18,
      videos: 9,
      messages: 54,
      avatar: 'PS'
    },
    {
      id: 1003,
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      phone: '+91 98761 23456',
      registeredDate: '19 Sep 2026',
      lastActive: '1 hour ago',
      status: 'Inactive',
      access: 'Limited Access',
      stories: 8,
      videos: 4,
      messages: 21,
      avatar: 'RK'
    },
    {
      id: 1004,
      name: 'Divya R',
      email: 'divya@example.com',
      phone: '+91 98762 34567',
      registeredDate: '18 Sep 2026',
      lastActive: '2 hours ago',
      status: 'Blocked',
      access: 'No Access',
      stories: 3,
      videos: 1,
      messages: 8,
      avatar: 'DR'
    },
    {
      id: 1005,
      name: 'Karthik M',
      email: 'karthik@example.com',
      phone: '+91 98763 45678',
      registeredDate: '18 Sep 2026',
      lastActive: '3 hours ago',
      status: 'Active',
      access: 'Full Access',
      stories: 31,
      videos: 15,
      messages: 102,
      avatar: 'KM'
    },
    {
      id: 1006,
      name: 'Sneha P',
      email: 'sneha@example.com',
      phone: '+91 98764 56789',
      registeredDate: '17 Sep 2026',
      lastActive: '5 hours ago',
      status: 'Inactive',
      access: 'Limited Access',
      stories: 6,
      videos: 3,
      messages: 19,
      avatar: 'SP'
    },
    {
      id: 1007,
      name: 'Vijay R',
      email: 'vijay@example.com',
      phone: '+91 98765 67890',
      registeredDate: '16 Sep 2026',
      lastActive: 'Yesterday',
      status: 'Active',
      access: 'Full Access',
      stories: 14,
      videos: 7,
      messages: 48,
      avatar: 'VR'
    },
    {
      id: 1008,
      name: 'Meena S',
      email: 'meena@example.com',
      phone: '+91 98766 78901',
      registeredDate: '15 Sep 2026',
      lastActive: 'Yesterday',
      status: 'Blocked',
      access: 'No Access',
      stories: 2,
      videos: 0,
      messages: 5,
      avatar: 'MS'
    },
    {
      id: 1009,
      name: 'Ajay Kumar',
      email: 'ajay@example.com',
      phone: '+91 98767 89012',
      registeredDate: '14 Sep 2026',
      lastActive: '2 days ago',
      status: 'Active',
      access: 'Full Access',
      stories: 20,
      videos: 11,
      messages: 67,
      avatar: 'AK'
    },
    {
      id: 1010,
      name: 'Nisha R',
      email: 'nisha@example.com',
      phone: '+91 98768 90123',
      registeredDate: '13 Sep 2026',
      lastActive: '3 days ago',
      status: 'Inactive',
      access: 'Limited Access',
      stories: 5,
      videos: 2,
      messages: 13,
      avatar: 'NR'
    }
  ];

  get filteredUsers(): User[] {
    return this.users.filter(user => {

      const search = this.searchText.toLowerCase().trim();

      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.includes(search) ||
        user.id.toString().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        user.status === this.selectedStatus;

      const matchesAccess =
        this.selectedAccess === 'All' ||
        user.access === this.selectedAccess;

      return matchesSearch && matchesStatus && matchesAccess;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredUsers.slice(
      start,
      start + this.pageSize
    );
  }

  get activeUsers(): number {
    return this.users.filter(
      user => user.status === 'Active'
    ).length;
  }

  get inactiveUsers(): number {
    return this.users.filter(
      user => user.status === 'Inactive'
    ).length;
  }

  get blockedUsers(): number {
    return this.users.filter(
      user => user.status === 'Blocked'
    ).length;
  }

  get fullAccessUsers(): number {
    return this.users.filter(
      user => user.access === 'Full Access'
    ).length;
  }

  onSearch(): void {
    this.currentPage = 1;
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
    this.selectedUser = null;
  }

  openAccessControl(user: User): void {
    this.selectedUser = user;
    this.showAccessModal = true;
  }

  closeAccessModal(): void {
    this.showAccessModal = false;
    this.selectedUser = null;
  }

  changeAccess(access: 'Full Access' | 'Limited Access' | 'No Access'): void {

    if (!this.selectedUser) {
      return;
    }

    this.selectedUser.access = access;

    if (access === 'No Access') {
      this.selectedUser.status = 'Blocked';
    }

    if (
      access === 'Full Access' &&
      this.selectedUser.status === 'Blocked'
    ) {
      this.selectedUser.status = 'Active';
    }

    this.closeAccessModal();
  }

  toggleUserStatus(user: User): void {

    if (user.status === 'Active') {
      user.status = 'Inactive';

      if (user.access === 'No Access') {
        user.access = 'Limited Access';
      }

    } else if (user.status === 'Inactive') {
      user.status = 'Active';

    } else if (user.status === 'Blocked') {
      user.status = 'Active';

      if (user.access === 'No Access') {
        user.access = 'Full Access';
      }
    }
  }

  blockUser(user: User): void {

    user.status = 'Blocked';
    user.access = 'No Access';

  }

  deleteUser(user: User): void {

    const confirmed = confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.users = this.users.filter(
      item => item.id !== user.id
    );

    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(
        1,
        this.totalPages
      );
    }
  }

  exportUsers(): void {

    console.log(
      'Export users:',
      this.filteredUsers
    );

  }

}