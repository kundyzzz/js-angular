import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { University } from '../../services/items.service';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() university!: University;
}
