import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar';

interface SupportTicket {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: string;
  message: string;
  createdAt: string;
  lastReply: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  avatar: string;
}

@Component({
  selector: 'app-support',
  imports: [FormsModule, SidebarComponent],
  templateUrl: './support.html',
  styleUrl: './support.css',
})
export class Support {

  searchText = '';
  selectedStatus = 'All';
  selectedPriority = 'All';

  selectedTicket: SupportTicket | null = null;

  showTicketModal = false;
  showReplyModal = false;

  replyMessage = '';

  currentPage = 1;
  pageSize = 5;

  tickets: SupportTicket[] = [

    {
      id: 'SUP-1001',
      userName: 'Arun Kumar',
      userEmail: 'arun@example.com',
      subject: 'Unable to upload video',
      category: 'Video Upload',
      message: 'I am trying to upload a video but the upload is failing every time.',
      createdAt: 'Today, 10:30 AM',
      lastReply: '10 mins ago',
      priority: 'High',
      status: 'Open',
      avatar: 'AK'
    },

    {
      id: 'SUP-1002',
      userName: 'Priya S',
      userEmail: 'priya@example.com',
      subject: 'Story is not visible',
      category: 'Stories',
      message: 'My story was successfully uploaded but it is not visible to my friends.',
      createdAt: 'Today, 09:45 AM',
      lastReply: '25 mins ago',
      priority: 'Medium',
      status: 'In Progress',
      avatar: 'PS'
    },

    {
      id: 'SUP-1003',
      userName: 'Rahul Kumar',
      userEmail: 'rahul@example.com',
      subject: 'Account access issue',
      category: 'Account',
      message: 'I cannot access my account after changing my phone number.',
      createdAt: 'Today, 08:20 AM',
      lastReply: '1 hour ago',
      priority: 'High',
      status: 'Open',
      avatar: 'RK'
    },

    {
      id: 'SUP-1004',
      userName: 'Divya R',
      userEmail: 'divya@example.com',
      subject: 'Music upload problem',
      category: 'Music',
      message: 'My music file is not uploading correctly.',
      createdAt: 'Yesterday, 06:30 PM',
      lastReply: '2 hours ago',
      priority: 'Medium',
      status: 'Resolved',
      avatar: 'DR'
    },

    {
      id: 'SUP-1005',
      userName: 'Karthik M',
      userEmail: 'karthik@example.com',
      subject: 'Profile update issue',
      category: 'Profile',
      message: 'I am unable to update my profile picture.',
      createdAt: 'Yesterday, 04:15 PM',
      lastReply: '3 hours ago',
      priority: 'Low',
      status: 'Closed',
      avatar: 'KM'
    },

    {
      id: 'SUP-1006',
      userName: 'Sneha P',
      userEmail: 'sneha@example.com',
      subject: 'Message not delivered',
      category: 'Messages',
      message: 'Messages are not being delivered to another user.',
      createdAt: 'Yesterday, 02:40 PM',
      lastReply: '4 hours ago',
      priority: 'High',
      status: 'In Progress',
      avatar: 'SP'
    },

    {
      id: 'SUP-1007',
      userName: 'Vijay R',
      userEmail: 'vijay@example.com',
      subject: 'Report inappropriate content',
      category: 'Report',
      message: 'I found inappropriate content and would like to report it.',
      createdAt: '20 Sep 2026, 11:20 AM',
      lastReply: 'Yesterday',
      priority: 'High',
      status: 'Open',
      avatar: 'VR'
    },

    {
      id: 'SUP-1008',
      userName: 'Meena S',
      userEmail: 'meena@example.com',
      subject: 'Notification problem',
      category: 'Notifications',
      message: 'I am not receiving community notifications.',
      createdAt: '20 Sep 2026, 09:10 AM',
      lastReply: 'Yesterday',
      priority: 'Low',
      status: 'Resolved',
      avatar: 'MS'
    }

  ];


  get filteredTickets(): SupportTicket[] {

    const search = this.searchText
      .toLowerCase()
      .trim();

    return this.tickets.filter(ticket => {

      const matchesSearch =
        !search ||
        ticket.id.toLowerCase().includes(search) ||
        ticket.userName.toLowerCase().includes(search) ||
        ticket.userEmail.toLowerCase().includes(search) ||
        ticket.subject.toLowerCase().includes(search) ||
        ticket.category.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        ticket.status === this.selectedStatus;

      const matchesPriority =
        this.selectedPriority === 'All' ||
        ticket.priority === this.selectedPriority;

      return matchesSearch &&
        matchesStatus &&
        matchesPriority;

    });

  }

  get totalPages(): number {
    return Math.ceil(this.filteredTickets.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get paginatedTickets(): SupportTicket[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredTickets.slice(start, start + this.pageSize);
  }

  onSearch(): void {
    this.currentPage = 1;
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }


  get openTickets(): number {

    return this.tickets.filter(
      ticket => ticket.status === 'Open'
    ).length;

  }


  get inProgressTickets(): number {

    return this.tickets.filter(
      ticket => ticket.status === 'In Progress'
    ).length;

  }


  get resolvedTickets(): number {

    return this.tickets.filter(
      ticket => ticket.status === 'Resolved'
    ).length;

  }


  get highPriorityTickets(): number {

    return this.tickets.filter(
      ticket => ticket.priority === 'High'
    ).length;

  }


  viewTicket(ticket: SupportTicket): void {

    this.selectedTicket = ticket;

    this.showTicketModal = true;

  }


  closeTicketModal(): void {

    this.showTicketModal = false;

    this.selectedTicket = null;

  }


  openReply(ticket: SupportTicket): void {

    this.selectedTicket = ticket;

    this.replyMessage = '';

    this.showReplyModal = true;

  }


  closeReply(): void {

    this.showReplyModal = false;

    this.replyMessage = '';

  }


  sendReply(): void {

    if (!this.selectedTicket) {
      return;
    }

    if (!this.replyMessage.trim()) {
      alert('Please enter a reply message.');
      return;
    }

    console.log(
      'Reply sent:',
      this.selectedTicket.id,
      this.replyMessage
    );

    this.selectedTicket.status = 'In Progress';

    this.closeReply();

  }


  changeStatus(
    ticket: SupportTicket,
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  ): void {

    ticket.status = status;

  }


  deleteTicket(ticket: SupportTicket): void {

    const confirmDelete = confirm(
      `Delete support ticket ${ticket.id}?`
    );

    if (!confirmDelete) {
      return;
    }

    this.tickets = this.tickets.filter(
      item => item.id !== ticket.id
    );

    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }

  }


  refreshTickets(): void {

    console.log('Refreshing support tickets...');

  }

}