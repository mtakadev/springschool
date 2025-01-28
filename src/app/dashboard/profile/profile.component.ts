import { Component } from '@angular/core';
import {StudentService} from "../../services/services/student.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private studentService: StudentService) {}

}
