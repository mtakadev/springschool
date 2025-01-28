import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../../models/auth.models";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

}
