import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "Kundyz";
  study = "3rd-year student at the School of Information Technology and Engineering";
  goal = "My goal is to become a web developer, as I enjoy creating modern and useful websites, learning new frameworks, and improving my coding skills.";

  photoUrl = "https://i.pinimg.com/1200x/e6/8b/20/e68b201bf52850ec8ca300e2c013b9ba.jpg";

  likes = 0;
  showMessage = false;

  inputName: string = "";
  email: string = "";
  subscribed: boolean = false;

  addLike() {
    this.likes++;
  }

  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  subscribe() {
    if (this.email.trim()) {
      this.subscribed = true;
    }
  }
}
