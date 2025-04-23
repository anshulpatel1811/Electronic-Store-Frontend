import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { User, UsersResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  usersResponse?: UsersResponse;
  user?: User;
  pageNumber = 0;
  loading = false;
  searchQuery: string = '';
  searchSubject: Subject<string> = new Subject();

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadPaginatedUsers(0);

    // Debounced search handler
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.pageNumber = 0;
      if (query.trim() === '') {
        this.loadPaginatedUsers(0); // Load all users if input is cleared
      } else {
        this.searchUsers(query, 0);
      }
    });
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  private loadPaginatedUsers(
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'name',
    sortDir = 'asc'
  ) {
    this.loading = true;
    this.userService.getUsers(pageNumber, pageSize, sortBy, sortDir).subscribe({
      next: (usersResponse) => {
        this.usersResponse = pageNumber > 0
          ? {
              ...usersResponse,
              content: [...this.usersResponse!.content, ...usersResponse.content],
            }
          : usersResponse;

        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  private searchUsers(
    query: string,
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'name',
    sortDir = 'asc'
  ) {
    this.loading = true;
    this.userService.searchUserPaginated(query, pageNumber, pageSize, sortBy, sortDir).subscribe({
      next: (usersResponse: UsersResponse) => {
        this.usersResponse = pageNumber > 0
          ? {
              ...usersResponse,
              content: [...this.usersResponse!.content, ...usersResponse.content],
            }
          : usersResponse;

        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  openUserModal(content: any, user: User) {
    this.user = user;
    this.modalService.open(content, {
      size: 'lg',
    });
  }

  userScrolled(event: IInfiniteScrollEvent) {
    if (this.loading || this.usersResponse?.lastPage) {
      return;
    }

    this.pageNumber += 1;

    if (this.searchQuery.trim()) {
      this.searchUsers(this.searchQuery, this.pageNumber);
    } else {
      this.loadPaginatedUsers(this.pageNumber);
    }
  }
}
