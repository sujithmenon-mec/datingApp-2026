import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AsyncPipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule } from "@angular/forms";
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, FormsModule, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberservice = inject(MemberService);
  protected members$ : Observable<Member[]>;

  constructor() {
    this.members$ = this.memberservice.getMembers();
  }
}
